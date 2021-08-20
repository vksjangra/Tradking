# Generated by Django 3.2.6 on 2021-08-16 10:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Tradking', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stock_name', models.CharField(max_length=512)),
                ('entry', models.DecimalField(decimal_places=3, max_digits=128)),
                ('quantity', models.IntegerField()),
                ('target', models.DecimalField(decimal_places=3, max_digits=128)),
                ('stoploss', models.DecimalField(decimal_places=3, max_digits=128)),
                ('profit', models.BooleanField(blank=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]