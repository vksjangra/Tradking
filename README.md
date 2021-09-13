# CS50W 2021 Capstone - Tradking

A web-app to keep track of profit/loss of your trades with filtering options.

## Video Demo:
https://youtu.be/KrrgXq2E3HA

## Description:

While adding a new trade, this web-app has an autocomplete input from a list of stocks in Indian stock market. In python, the csv file is returned to the browser where it is processed into an array using javascript and autocomplete is implemented using jquery.

The status of trades is updated using fetch in javascript and the database and css on the front end is updated simuntaniously wihtout reloading the page. It makes this web-app fast and responsive and the user doesn't have to scroll back or filter the trades again because the page reload is avoided and javascript is used instead to update the page.

The filter option for trades can either be last n trades (selected in dropdown) or the trades can be filtered using date range in the calender input. By default, last 10 trades are displayed without filtering.
The net profit or net loss is displayed for all the trades which are currently on the page.


#### equity.csv:
This file contains all the stocks and their symbols in NSE and BSE equity in INDIA.

#### index.js:
This file is loaded in index.html exclusively because it's code is used only when the user is logged-in and index.html is rendered. This contains all the javascript and jquery used in this web-app. It handles autocomplete for 'Add New Trade' option from a list generated from equity.csv file.
It also contains the event handlers for buttons of newly added trades and update the database and page based on the click from the user.
