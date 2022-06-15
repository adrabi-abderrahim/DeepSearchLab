
'''
Remark: Since this is a test, I will not make a complex design patterns so i will
restrict this code to the use of Django ORM in the endpoints.
'''

from typing import List

from flask import request
from .generationz_endpoint import \
    get_categories_list, \
    get_graph_filter, \
    get_graph_categories, \
    post_generationz_search, \
    get_genarationz_by_sentence_sentiment_net, \
    get_genarationz_by_sentence_sentiment_score

from .youngpeople_endpoint import get_all_youngepeople
from api.schemas.generationz_schema import GenerationZSchema

from ninja import NinjaAPI

api = NinjaAPI()

# MongoDB
api.post('/genz/search', response=List[GenerationZSchema])(post_generationz_search)
api.get('/genz/categories')(get_categories_list)
api.get('/genz/sentence/net', response=List[GenerationZSchema])(get_genarationz_by_sentence_sentiment_net)
api.get('/genz/sentence/score', response=List[GenerationZSchema])(get_genarationz_by_sentence_sentiment_score)

# Neo4J
api.get('/genz/graph/categories')(get_graph_categories)
api.get('/genz/graph/filter')(get_graph_filter)


api.get('/all')(get_all_youngepeople)

