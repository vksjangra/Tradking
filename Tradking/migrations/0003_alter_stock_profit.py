# Generated by Django 3.2.6 on 2021-08-16 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tradking', '0002_stock'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='profit',
            field=models.BooleanField(null=True),
        ),
    ]
