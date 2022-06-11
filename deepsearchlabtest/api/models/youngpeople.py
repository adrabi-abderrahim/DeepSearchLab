from djongo import models

class YoungPeople(models.Model):
    """
    Young people model is the model that defines the structure of calculations results.
    """

    id = models.ObjectIdField(db_column='_id')

    date = models.DateField(blank=True)

    logits = models.FloatField(blank=True, default=0)

    net_sent = models.FloatField(blank=True, default=0)

    logits_mean = models.FloatField(blank=True, default=0)

    net_sent_mean = models.FloatField(blank=True, default=0)

    ma_logits = models.FloatField(blank=True, default=0)

    ma_net_sent = models.FloatField(blank=True, default=0)

    ma_net_sent_ema_alpha = models.JSONField(blank=True, null=True, default={})

    class Meta:
        app_label = 'api'
