from django.core.management.base import BaseCommand, CommandError
from api.models.generationz import GenerationZ
import os

class Command(BaseCommand):
    """
    Load generation Z dataset to MongoDB database.
    """
    
    def add_arguments(self, parser):
        parser.add_argument('path', type=str)

    def handle(self, *args, **options):  
        file_full_path = options['path']
        if os.path.exists(file_full_path):
            import pandas as pd
            from datetime import datetime
            import bson
            import ast

            df = pd.read_csv(file_full_path)
            df = df.fillna('')
            
            data = []
            for _, row in df.iterrows():
                date_tmp = datetime.strptime(str(row.date), '%d/%m/%Y').strftime("%Y-%m-%d")

                category: str = row.category
                try:
                    if category.startswith('[') and category.endswith(']'):
                        category = ast.literal_eval(category)
                        if type(category) == list:
                            category = category[0] if len(category) else ''
                except SyntaxError:
                    pass
                    
                sentence_keywords_tmp = ast.literal_eval(row.sentence_keywords)
                sentence_keywords = []
                for keywords in sentence_keywords_tmp:
                    keywords = keywords[:-1] if not keywords[-1] else keywords
                    if keywords:
                        sentence_keywords.append(keywords)

                data.append(
                    GenerationZ(
                        id = bson.objectid.ObjectId(),
                        date = date_tmp,
                        category = category.capitalize(),
                        sentence = row.sentence,
                        sentence_shorts = ast.literal_eval(row.sentence_short),
                        sentence_keywords = sentence_keywords,
                        sentence_sentiment = ast.literal_eval(row.sentence_sentiment),
                        sentence_sentiment_net = row.sentence_sentiment_net,
                        sentence_sent_score = row.sentence_sent_score,
                        sentence_sentiment_label = row.sentence_sentiment_label,
                        sentence_entities = ast.literal_eval(row.sentence_entities),
                        sentence_non_entities = ast.literal_eval(row.sentence_non_entities)
                    )
                )
            
            #~ Bulk create
            GenerationZ.objects.bulk_create(data, batch_size=100)
            print('Dataset is successfully uploaded.')
        else:
            raise CommandError(f'The file "{file_full_path}" does not exists.')

