# CS50W 2021 Capstone - Tradking

A web-app to keep track of profit/loss of your trades with filtering options.

## Video Demo:
https://youtu.be/KrrgXq2E3HA

## TO RUN THIS APPLICATION:

Make sure to be in root directory of the project where manage.py is located. Then run these commands:

python3 manage.py migrate

python3 manage.py runserver


## Distinctiveness and Complexity:

It is distinct from the other projects created during this course. This web-app has an autocomplete for input of user from a big list of stocks in Indian stock market using python and jquery. In python, the csv file is returned to the browser where it is processed into an array using javascript and autocomplete is implemented using jquery.

This web-app is sufficiently complex as the status of trades is updated using fetch in javascript and the data and css on the front end is updated simuntaniously as if the page is reloaded wihtout actually reloading the page. It makes this web-app fast and responsive and the user doesn't have to scroll back or filter the trades again because the page reload is avoided and javascript is used instead to update the page.

The filter option for trades can either be last n trades (selected in dropdown) or the trades can be filtered using date range in the calender input. By default, last 10 trades are displayed without filtering.
The net profit or net loss is displayed for all the trades which are currently on the page.


## What’s contained in each file:

### static:

#### equity.csv:
This file contains all the stocks and their symbols in NSE and BSE equity in INDIA.

#### index.js:
This file is loaded in index.html exclusively because it's code is used only when the user is logged-in and index.html is rendered. This contains all the javascript and jquery used in this web-app. It handles autocomplete for 'Add New Trade' option from a list generated from equity.csv file.
It also contains the event handlers for buttons of newly added trades and update the database and page based on the click from the user.

### templates:

#### index.html:
This file contains the 'Add New Trade' form and is rendered when the user is logged in. It also contains the options for filtering the trades shown on the page which is then rendered on this page dynamically using index.js file.

#### layout.html:
This is the base layout for the entire web-app and it is extended in every other template. It contains a basic navbar in its body tag and all the required scripts and css links in its head tag.

#### login.html:
This is very simple login form with error rendering if authentication fails.

#### register.html:
Again very simple registration form for new users.

### python:

#### models.py:
It contains the User model and Trade model which stored all the information about users and their trades in the database.

#### views.py:
Finally this is the file where all the views for template rendering and javascript are contained.
