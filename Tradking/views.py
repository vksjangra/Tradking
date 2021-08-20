from django.contrib.staticfiles.storage import staticfiles_storage
from builtins import open
from django.http.response import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from .models import User, Trade


# Create your views here.


# Index View
def index(request):
    if request.user.is_authenticated:
        return render(request, "Tradking/index.html")
    else:
        return HttpResponseRedirect(reverse('login'))


# Register view
def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        password  = request.POST['password']
        confirm_password = request.POST['confirm-password']

        if password != confirm_password:
            return render(request, "Tradking/register.html", {
                'error' : "Password doesn't match!" 
            })
        
        try:
            user = User.objects.create_user(username=username, password=password)
            user.save()
        except IntegrityError:
            return render(request, "Tradking/register.html", {
                'error' : "Username isn't available!"
            })

        login(request, user)
        return HttpResponseRedirect(reverse("index") + '?registration=successful')
    
    else:
        return render(request, "Tradking/register.html")


# Logout view
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))


# Login view
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('index'))
        else:
            return render(request, "Tradking/login.html", {
                "error" : "Invalid username and/or password."
            })

    else:
        return render(request, "Tradking/login.html")


# Return equity.csv to jquery request
def csv(request):
    data = open(staticfiles_storage.path('Tradking/equity.csv'), 'r').read()
    response = HttpResponse(data, content_type='application/x-download')
    response['Content-Disposition']= 'attachment; filename="EQUITY_NSE.csv"'
    return response


# Create new trade based on form input
def new_trade(request):
    if request.method != 'POST':
        return HttpResponse("POST method required")

    stock_name = request.POST['stock_name']
    entry = request.POST['entry']
    quantity = request.POST['quantity']
    target = request.POST['target']
    stoploss = request.POST['stoploss']

    Trade.objects.create(user=request.user, stock_name=stock_name, entry=entry, 
                            quantity=quantity, target=target, stoploss=stoploss)

    return HttpResponseRedirect(reverse('index'))


# Returns trades to javascript fetch call based on filters
def load_trades(request):
    number = request.GET.get('number')
    startdate = request.GET.get('startdate')
    enddate = request.GET.get('enddate')
    if not startdate:
        if not number:
            number = 10
        if int(number) == 10000:
            trades = Trade.objects.filter(user=request.user).order_by('-timestamp').values()
        else:
            trades = Trade.objects.filter(user=request.user).order_by('-timestamp')[:int(number)].values()
    else:
        trades = Trade.objects.filter(user=request.user, timestamp__date__range=[startdate, enddate]).order_by('-timestamp').values()

    for i in trades:
        i['timestamp'] = i['timestamp'].date()
    return JsonResponse(list(trades), safe=False)


# Update if trade is profit or loss
def update_profit(request):
    action = request.GET.get('action')
    id = request.GET.get('id')

    trade = Trade.objects.filter(id=id)
    if action == 'success':
        trade.update(profit=True)
    else:
        trade.update(profit=False)

    return JsonResponse("Updated!", safe=False)

    