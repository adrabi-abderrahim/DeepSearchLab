from ninja import Schema
from datetime import  date
from typing import List

from api.models.youngpeople import YoungPeople

class YoungPeopleSchema(Schema):
    """
    Young people schema for json response
    """

    id : str
    date : str
    logits : float
    net_sent : float
    logits_mean : float
    net_sent_mean : float
    ma_logits : float
    ma_net_sent: float
    ma_net_sent_ema_alpha : List[float]

    @staticmethod
    def resolve_id(obj):
        if type(obj) == YoungPeople:
            return str(obj.id)
        else:
            return str(obj)