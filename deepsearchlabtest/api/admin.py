from django.contrib import admin

from .models.generationz import GenerationZ
from .models.youngpeople import YoungPeople

@admin.register(GenerationZ)
class GenerationZAdmin(admin.ModelAdmin):
    fields = ('date', 'category', 'sentence', 'sentence_sentiment_net', 'sentence_sent_score', 'sentence_sentiment_label')
    list_display = fields
    
@admin.register(YoungPeople)
class YoungPeopleAdmin(admin.ModelAdmin):
    fields = ('date', 'logits', 'net_sent', 'logits_mean', 'net_sent_mean', 'ma_logits', 'ma_net_sent')
    list_display = fields
