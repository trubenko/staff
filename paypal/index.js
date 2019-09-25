const express = require('express');
const paypal = require('paypal-rest-sdk');
const ejs = require('ejs');
let app = express();

app.set('view engine', 'ejs');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'Ae3F-J19bkRJkZma_usG2F9qXdDIuBFMDHWR50XjmvuJvHAtAJI7sUQNra72wUOhlYplepU9s63IxsiB',
    'client_secret': 'EPu9_jzN4ojXr7tH8ri8zfy-qYm2GSP_6w7ntYTBKOfv8g091LNqfyXmqVYm39-wtKBibYr-1WVDwAda'
});

//Ae3F-J19bkRJkZma_usG2F9qXdDIuBFMDHWR50XjmvuJvHAtAJI7sUQNra72wUOhlYplepU9s63IxsiB
//business@ukr.net
//EPu9_jzN4ojXr7tH8ri8zfy-qYm2GSP_6w7ntYTBKOfv8g091LNqfyXmqVYm39-wtKBibYr-1WVDwAda

app.get('/', (req, res) => res.render('index'));

app.post('/pay', (req,res) => {

    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Something",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "This is the payment description."
        }]
    };


    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            for(let i=0; i< payment.links.length; i++){
                if (payment.links[i].rel == 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

});

app.get('/success',(req, res)=>{
   let {paymentId, PayerID } = req.query;
    console.log(req.query);
    var execute_payment_json = {
        "payer_id": PayerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.send('Success')
        }
    });
});

app.listen(3000,()=> console.log('Server is running'));


