// Get the stocks for autocomplete

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "csv",
        dataType: "text",
        success: function(data) {processData(data);}
    });
});


var lines = [];
var net = 0;


// Generate list of stocks for autocomplete from recieved data

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = '';
            tarr = data[1] + ' (' + data[0] + ')';
            lines.push(tarr);
        }
    }
}


// Autocomplete function for user input

$('#exchangeAuto').autocomplete({
    source: lines
});


// Display hidden form for adding new trade

document.querySelector('#trade-form-button').onclick = function () {
    this.style.display = 'none';
    document.querySelector('#trade-form').style.display = 'block';
}


// Hide the form if user cancels

document.querySelector('#trade-form-cancel').onclick = function () {
    document.querySelector('#trade-form-button').style.display = 'block';
    document.querySelector('#trade-form').style.display = 'none';
}


// Load trades based on dropdown selection

document.querySelector('#list_trades').onchange = function () {
    load_trades(this.value);
}


// Function to load trades on the page with net profit or net loss calculations for the trades

function load_trades(n, range) {
    if (n == null && range == null) {
        fetch('/load_trades')
        .then(respone => respone.json())
        .then(trades => {
            const div = document.querySelector('#load_trades')
            let element = '';
            net = 0;
            console.log(trades.length)
            if (trades.length > 0) {
                element = `
                    <table class="mt-2 table table-dark mx-1">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Stock Name</th>
                                <th scope="col">Entry</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Target</th>
                                <th scope="col">Stoploss</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>`;

                for (i in trades) {
                    let bg = 'warning';
                    let text = 'dark';
                    let buttons = `
                        <button data-action="success" data-id="${trades[i]['id']}" class="btn btn-sm btn-success">Profit</button>
                        <button data-action="danger" data-id="${trades[i]['id']}" class="btn btn-sm btn-danger">StopLoss</button>`;
                    if (trades[i]['profit'] === true) {
                        bg = 'success';
                        text = 'white';
                        buttons = '';
                    }
                    if (trades[i]['profit'] === false) {
                        bg = 'danger';
                        text = 'white';
                        buttons = '';
                    }
                    
                    element += `
                        <tr id=${trades[i]['id']} class='text-${text} bg-${bg}'>
                            <th scope="row">${parseInt(i) + 1}</th>
                            <td>${trades[i]['stock_name']}<sub>(${trades[i]['timestamp']})</sub></td>
                            <th>₹${parseFloat(trades[i]['entry'])}</th>
                            <th>${trades[i]['quantity']}</th>
                            <th>₹${parseFloat(trades[i]['target'])}</th>
                            <th>₹${parseFloat(trades[i]['stoploss'])}</th>
                            <td>${buttons}</td>
                        </tr>`;
                }
    
                for (i in trades) {
                    if (trades[i]['profit'] === true) {
                        net += Math.abs(parseFloat(trades[i]['entry']) - parseFloat(trades[i]['target'])) * trades[i]['quantity'];
                    }

                    else if (trades[i]['profit'] === false) {
                        net -= Math.abs(parseFloat(trades[i]['entry']) - parseFloat(trades[i]['stoploss'])) * trades[i]['quantity'];
                    }
                }

                if (net >= 0) {
                    element += `
                    <tr id="net">
                        <th colspan=4 class="text-center" scope="row">Net Profit</th>
                        <th colspan=3 class="text-center">₹${net}</th>
                    </tr>`;
                }

                else {
                    element += `
                    <tr id="net">
                        <th colspan=4 class="text-center" scope="row">Net Loss</th>
                        <th colspan=3 class="text-center">₹${net}</th>
                    </tr>`;
                }

                element += '</tbody></table>';
            }

            else {
                element = `<div class="mx-5 my-2 alert alert-danger"><b>No Trades!</b></div>`;
            }
            div.innerHTML = element;
        });
    }

    else if (range == null) {
        fetch('/load_trades' + `?number=${n}`)
        .then(respone => respone.json())
        .then(trades => {
            const div = document.querySelector('#load_trades')
            let element = '';
            net = 0;
            console.log(trades.length)
            if (trades.length > 0) {
                element = `
                    <table class="mt-2 table table-dark mx-1">
                        <thead>
                            <tr class="rounded-5">
                                <th scope="col">#</th>
                                <th scope="col">Stock Name</th>
                                <th scope="col">Entry</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Target</th>
                                <th scope="col">Stoploss</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>`;

                for (i in trades) {
                    let bg = 'warning';
                    let text = 'dark';
                    let buttons = `
                        <button data-action="success" data-id="${trades[i]['id']}" class="btn btn-sm btn-success">Profit</button>
                        <button data-action="danger" data-id="${trades[i]['id']}" class="btn btn-sm btn-danger">StopLoss</button>`;
                    if (trades[i]['profit'] === true) {
                        bg = 'success';
                        text = 'white';
                        buttons = '';
                    }
                    if (trades[i]['profit'] === false) {
                        bg = 'danger';
                        text = 'white';
                        buttons = '';
                    }
                    
                    element += `
                        <tr id=${trades[i]['id']} class='text-${text} bg-${bg}'>
                            <th scope="row">${parseInt(i) + 1}</th>
                            <td>${trades[i]['stock_name']}<sub>(${trades[i]['timestamp']})</sub></td>
                            <th>₹${parseFloat(trades[i]['entry'])}</th>
                            <th>${trades[i]['quantity']}</th>
                            <th>₹${parseFloat(trades[i]['target'])}</th>
                            <th>₹${parseFloat(trades[i]['stoploss'])}</th>
                            <td>${buttons}</td>
                        </tr>`;
                }
    
                for (i in trades) {
                    if (trades[i]['profit'] === true) {
                        net += Math.abs(parseFloat(trades[i]['entry']) - parseFloat(trades[i]['target'])) * trades[i]['quantity'];
                    }

                    else if (trades[i]['profit'] === false) {
                        net -= Math.abs(parseFloat(trades[i]['entry']) - parseFloat(trades[i]['stoploss'])) * trades[i]['quantity'];
                    }
                }

                if (net >= 0) {
                    element += `
                    <tr id="net">
                        <th colspan=4 class="text-center" scope="row">Net Profit</th>
                        <th colspan=3 class="text-center">₹${net}</th>
                    </tr>`;
                }

                else {
                    element += `
                    <tr id="net">
                        <th colspan=4 class="text-center" scope="row">Net Loss</th>
                        <th colspan=3 class="text-center">₹${net}</th>
                    </tr>`;
                }

                element += '</tbody></table>';
            }

            else {
                element = `<div class="mx-5 my-2 alert alert-danger"><b>No Trades!</b></div>`;
            }
            div.innerHTML = element;
        });
    }

    else if (n == null) {
        fetch('/load_trades' + `?startdate=${range[0]}&enddate=${range[1]}`)
        .then(respone => respone.json())
        .then(trades => {
            const div = document.querySelector('#load_trades')
            let element = '';
            net = 0;
            console.log(trades.length)
            if (trades.length > 0) {
                element = `
                    <table class="mt-2 table table-dark mx-1">
                        <thead>
                            <tr class="rounded-5">
                                <th scope="col">#</th>
                                <th scope="col">Stock Name</th>
                                <th scope="col">Entry</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Target</th>
                                <th scope="col">Stoploss</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>`;

                for (i in trades) {
                    let bg = 'warning';
                    let text = 'dark';
                    let buttons = `
                        <button data-action="success" data-id="${trades[i]['id']}" class="btn btn-sm btn-success">Profit</button>
                        <button data-action="danger" data-id="${trades[i]['id']}" class="btn btn-sm btn-danger">StopLoss</button>`;
                    if (trades[i]['profit'] === true) {
                        bg = 'success';
                        text = 'white';
                        buttons = '';
                    }
                    if (trades[i]['profit'] === false) {
                        bg = 'danger';
                        text = 'white';
                        buttons = '';
                    }
                    
                    element += `
                        <tr id=${trades[i]['id']} class='text-${text} bg-${bg}'>
                            <th scope="row">${parseInt(i) + 1}</th>
                            <td>${trades[i]['stock_name']}<sub>(${trades[i]['timestamp']})</sub></td>
                            <th>₹${parseFloat(trades[i]['entry'])}</th>
                            <th>${trades[i]['quantity']}</th>
                            <th>₹${parseFloat(trades[i]['target'])}</th>
                            <th>₹${parseFloat(trades[i]['stoploss'])}</th>
                            <td>${buttons}</td>
                        </tr>`;
                }
    
                for (i in trades) {
                    if (trades[i]['profit'] === true) {
                        net += Math.abs(parseFloat(trades[i]['entry']) - parseFloat(trades[i]['target'])) * trades[i]['quantity'];
                    }

                    else if (trades[i]['profit'] === false) {
                        net -= Math.abs(parseFloat(trades[i]['entry']) - parseFloat(trades[i]['stoploss'])) * trades[i]['quantity'];
                    }
                }

                if (net >= 0) {
                    element += `
                    <tr id="net">
                        <th colspan=4 class="text-center" scope="row">Net Profit</th>
                        <th colspan=3 class="text-center">₹${net}</th>
                    </tr>`;
                }

                else {
                    element += `
                    <tr id="net">
                        <th colspan=4 class="text-center" scope="row">Net Loss</th>
                        <th colspan=3 class="text-center">₹${net}</th>
                    </tr>`;
                }

                element += '</tbody></table>';
            }

            else {
                element = `<div class="mx-5 my-2 alert alert-danger"><b>No Trades!</b></div>`;
            }
            div.innerHTML = element;
        });
    }
}


// Update database and page based on button click by user

$('#load_trades').on('click', 'button', function () {
    action = this.dataset['action'];
    id = this.dataset['id'];
    var entry = parseFloat(this.parentElement.parentElement.children[2].innerText.substring(1));
    var quantity = parseFloat(this.parentElement.parentElement.children[3].innerText);
    var target = parseFloat(this.parentElement.parentElement.children[4].innerText.substring(1));
    var stoploss = parseFloat(this.parentElement.parentElement.children[5].innerText.substring(1));
    
    if (action === 'success') {
        this.parentElement.parentElement.setAttribute('class', 'bg-success text-white');
        net += Math.abs(entry - target) * quantity;
    }
    else {
        this.parentElement.parentElement.setAttribute('class', 'bg-danger text-white');
        net -= Math.abs(entry - stoploss) * quantity;
    }

    const net_row = $('#net');
    
    if (net >= 0) {
        net_row[0].children[0].innerText = 'Net Profit';
        net_row[0].children[1].innerText = `₹${parseFloat(net.toFixed(3))}`;
    }
    else {
        net_row[0].children[0].innerText = 'Net Loss';
        net_row[0].children[1].innerText = `₹${parseFloat(net.toFixed(3))}`;
    }

    this.parentElement.innerHTML = '';

    update_profit(action, id);
});


// Update database for specific trade object

function update_profit(action, id) {
    fetch(`/update_profit?action=${action}&id=${id}`)
    .then(respone => respone.json())
    .then(message => {
        console.log(message);
    });
}


// Date range picker filter for trades

$(function() {
    $('input[name="daterange"]').daterangepicker({
      opens: 'left'
    }, function(start, end, label) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
      let range = [];
      range[0] = start.format('YYYY-MM-DD');
      range[1] = end.format('YYYY-MM-DD');
      load_trades(null, range);
    });
  });