const fs = require('fs');
const app = require('express')();

const stripe = require('stripe')('sk_test_uoyIxzmpbJ0MvMNCLlLBWezA00zpq573hB');

const endpointSecret = 'whsec_iHpYqTJfSqzhFtEXhCvOTTidRZSXIZRO';

const bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 4242));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const getClientSecret = (async (amount) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount*100,
        currency: 'aud',
    });
    return paymentIntent.client_secret;
});

app.get('/create-intent', (request, response) => {
    const amount = request.query.amount;

    if (!amount) {
        response.json({
            error: 'Missing required parameter `amount`',
        });
        return;
    }

    getClientSecret(amount).then(c =>
        response.json({
            client_secret: c,
        })
    );
});

function logSuccessfulPaymentToFile(event) {
    let log = 'Customer ' + event.data.object.customer + ' paid ' + event.data.object.amount/100 + ' ' + event.data.object.currency;
    log = log + ' at timestamp ' + event.data.object.created + '\n';

    fs.appendFileSync('transactions.log', log);
}

// Match the raw body to content type application/json
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    }
    catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent was successful!');
            logSuccessfulPaymentToFile(event);
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            console.log('PaymentMethod was attached to a Customer!')
            break;
        case 'payment_intent.created':
            console.log('PaymentIntent created');
            break;
        case 'charge.succeeded':
            console.log('Charge succeeded');
            break;
        // ... handle other event types
        default:
            // Unexpected event type
            return response.status(400).end();
    }

    // Return a response to acknowledge receipt of the event
    response.json({received: true});
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
