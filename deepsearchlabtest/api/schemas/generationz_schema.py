from ninja import Schema
from datetime import  date
from typing import List

from api.models.generationz import GenerationZ

class GenerationZSchema(Schema):
    """
    Generation Z schema for Json responses. 
    """
    
    id : str
    date : date
    category : str
    sentence : str
    sentence_shorts : List[str]
    sentence_keywords : List[List[str]]
    sentence_sentiment : List[float]
    sentence_sentiment_net : float
    sentence_sent_score : float
    sentence_sentiment_label : bool
    sentence_entities : List[List[str]]
    sentence_non_entities : List[str]

    @staticmethod
    def resolve_id(obj):
        if type(obj) == GenerationZ:
            return str(obj.id)
        else:
            return str(obj)