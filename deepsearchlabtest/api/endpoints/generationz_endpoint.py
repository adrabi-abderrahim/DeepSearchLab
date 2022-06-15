from datetime import date
from typing import List
from django.db.models import Q
from api.models.generationz import GenerationZ
from neo4j import GraphDatabase
from django.conf import settings


'''
Generation Z endpoint that contains all API endpoints.
'''

def get_categories_list(request = None):
    '''
    Returns the list of categories.
    '''
    return list(GenerationZ.objects.values_list('category', flat=True).distinct().order_by('category'))

def get_genarationz_by_sentence_sentiment_net(request=None, x:float=0, y:float=0):
    '''
    Returns a list of generation Z by the "sentence sentiment net" between two values.  
    '''
    return GenerationZ.objects.filter(Q(sentence_sentiment_net__gte=x, sentence_sentiment_net__lte=y))

def get_genarationz_by_sentence_sentiment_score(request=None, x:float=0, y:float=0):
    '''
    Returns a list of generation Z by the "sentence sentiment score" between two values.  
    '''
    return GenerationZ.objects.filter(Q(sentence_sent_score__gte=x, sentence_sent_score__lte=y))

def post_generationz_search(request=None, dates:List[date]=None, categories:List[str]=None, \
    sentences:List[str]=None, sentence_sentiment_nets:List[float]=None, sentence_sent_scores:List[float]=None, \
    sentence_keywords:List[List[str]]=None, sentence_sentiment_label:bool=None, sentence_entities:List[str]=None, \
    sentence_non_entities:List[str]=None):
    '''
    Returns a list of generation Z from a multi criteria search.
    '''
    query = Q()
    if dates:
        query &= Q(date__in=dates)
    if categories:
        query &= Q(category__in=categories)
    if sentences:
        query &= Q(sentence__in=sentences)
    if sentence_sentiment_nets:
        query &= Q(sentence_sentiment_net__in=sentence_sentiment_nets)
    if sentence_sent_scores:
        query &= Q(sentence_sent_score__in=sentence_sent_scores)
    if sentence_keywords:
        query &= Q(sentence_keywords__in=sentence_keywords)
    if sentence_sentiment_label:
        query &= Q(sentence_sentiment_label=sentence_sentiment_label)
    if sentence_entities:
        query &= Q(sentence_entities__in=sentence_entities)
    if sentence_non_entities:
        query &= Q(sentence_non_entities__in=sentence_non_entities)
    
    if query.children:
        return GenerationZ.objects.filter(query)
    else:
        return {}


def query_transaction(tx, q, **kwargs):
    return tx.run(q, kwargs).data()

def query(q, **kwargs):
    with GraphDatabase.driver(settings.NEO4J_URL, auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD)) as driver:
        with driver.session() as session:
            return session.read_transaction(query_transaction, q, **kwargs)



def get_graph_categories(request=None):
    """
    Returns the list of categories in graph database.
    """

    results = query(
        '''
        match (n)
        with distinct n.categories as categories
        with collect(categories) as categories
        WITH REDUCE(output = [], c IN categories| output + c) AS flat
        return flat as categories
        '''
    )
    if results:
        return { "categories": sorted(list(set(results[0]['categories'])))}
    return {}

def get_graph_filter(request=None, word=None, category=None):
    """
    Return nodes with their relations that have the specified word.
    """
    if not word and not category:
        return {}

    u_where_clause = []
    v_where_clause = []
    params  = {}
    if word:
        u_where_clause.append(' u.word = $word ')
        v_where_clause.append(' v.word = $word ')
        params['word'] = word.capitalize()

    if category:
        u_where_clause.append(' $category in u.categories  ')
        v_where_clause.append(' $category in v.categories  ')
        params['category'] = category.capitalize()

    u_where_clause = ' and '.join(u_where_clause)
    v_where_clause = ' and '.join(v_where_clause)

    return query(
        f'''
        match (u:Keyword)-[e:In_Sentence]-(v:Keyword)
        where ({u_where_clause}) or ({v_where_clause})
        with collect(
        DISTINCT
        {{
            id: id(u),
            total: u.total,
            positive: u.positive,
            negative: u.negative,
            categories: u.categories,
            mean_positive: u.mean_positive,
            mean_negative: u.mean_negative,
            word: u.word
        }}) as vertices,
        collect(
            distinct
            {{
                id: id(e),
                source: id(startNode(e)),
                target: id(endNode(e)),
                type: type(e),
                sentence_sentiment_label: e.sentence_sentiment_label,
                sentence_sentiment_net: e.sentence_sentiment_net,
                sentence_sent_score: e.sentence_sent_score,
                categories: e.categories
            }}
        ) as edges
    
        return {{vertices: vertices, edges: edges}}  as graph   
        ''',
        **params
    )
