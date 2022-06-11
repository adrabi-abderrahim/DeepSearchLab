from djongo import models


class GenerationZ(models.Model):
    """
    Generation Z model is the model that defines the structure of the results of NPL calculations,
    to save sentences and their scores including all other data.
    """

    id = models.ObjectIdField(primary_key=True, db_column='_id')
    
    date = models.DateField(blank=True)

    category = models.CharField(max_length=100, blank=True, default='')

    sentence = models.TextField(blank=True, default='')

    sentence_shorts = models.JSONField(blank=True, null=True, default=[])
    
    sentence_keywords = models.JSONField(blank=True, null=True, default=[])

    sentence_sentiment = models.JSONField(blank=True, null=True, default=[])

    sentence_sentiment_net = models.FloatField(blank=True, default=0)

    sentence_sent_score = models.FloatField(blank=True, default=0)

    sentence_sentiment_label = models.BooleanField(blank=True, default=False)

    sentence_entities = models.JSONField(blank=True, null=True, default=[])

    sentence_non_entities = models.JSONField(blank=True, null=True, default=[])

    class Meta:
        app_label = 'api'
