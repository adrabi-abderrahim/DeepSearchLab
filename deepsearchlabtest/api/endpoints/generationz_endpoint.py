from datetime import date
from typing import List
from django.db.models import Q
from api.models.generationz import GenerationZ

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
