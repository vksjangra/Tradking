# Generated by Django 3.2.6 on 2021-08-17 13:32

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('Tradking', '0005_rename_stock_trade'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trade',
            name='timestamp',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
