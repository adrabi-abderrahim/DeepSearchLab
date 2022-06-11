from django.core.management.base import BaseCommand, CommandError
from api.models.youngpeople import YoungPeople
import os

class Command(BaseCommand):
    """
    Load Young People dataset to MongoDB database.
    """
    
    def add_arguments(self, parser):
        parser.add_argument('path', type=str)

    def handle(self, *args, **options):  
        file_full_path = options['path']
        if os.path.exists(file_full_path):
            import pandas as pd
            import bson

            df = pd.read_csv(file_full_path)
           
            data = []
            for _, row in df.iterrows():
                data.append(
                    YoungPeople(
                        id = bson.objectid.ObjectId(),
                        date = row.date,
                        logits = row.logits,
                        net_sent = row.net_sent,
                        logits_mean = row.logits_mean,
                        net_sent_mean = row.net_sent_mean,
                        ma_logits = row.MA_logits,
                        ma_net_sent = row.MA_net_sent,
                        ma_net_sent_ema_alpha = {
                                '0.1': row['MA_net_sent_ema_alpha_0.1'],
                                '0.3': row['MA_net_sent_ema_alpha_0.3'],
                                '0.5': row['MA_net_sent_ema_alpha_0.5'],
                            }
                    )
                )
                        
            #~ Bulk create
            #YoungPeople.objects.bulk_create(data, batch_size=100)
            print('Dataset is successfully uploaded.')
        else:
            raise CommandError(f'The file "{file_full_path}" does not exists.')

