# Bush fire donation app

## Installation
After cloning the git repo, simply run
### `npm install`

## Run app locally
To run app locally, run
### `npm start`
That will boot up a node express server on port 4242 and a react app on port 3000

## Testing the payment
Once both server and client apps are running, in your browser go to:
### `localhost:3000`
On the first page you are asked to insert and amount and your name.
On the second page, you complete the payment by providing card details.

## Testing the webhook
The webhook to acknowledge successful payment is located at
### `localhost:3000/webhook`
It has been tested using Stripe CLI.

## Build production deployment
### `npm run build`

## Transactions log
Completed transactions are being stored in `transactions.log`. To view all completed transactions simply run:
### `cat transactions.log`