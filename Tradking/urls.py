from os import name
from django.contrib.auth import logout
from django.urls import path
from Tradking import views

urlpatterns = [
    path("", views.index, name="index"),
    path("register", views.register, name="register"),
    path("logout", views.logout_view, name="logout"),
    path("login", views.login_view, name="login"),
    path("csv", views.csv),
    path("new_trade", views.new_trade, name="new_trade"),
    path("load_trades", views.load_trades),
    path("update_profit", views.update_profit),
]