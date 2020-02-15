
import React from 'react';
import {injectStripe} from 'react-stripe-elements';

import CardSection from './CardSection';

class CheckoutForm extends React.Component {
    handleSubmit = (ev) => {
        // We don't want to let default form submission happen here, which would refresh the page.
        ev.preventDefault();

        // See our confirmCardPayment documentation for more:
        // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
        this.props.stripe.confirmCardPayment(this.props.clientSecret, {
            payment_method: {
                card: this.props.elements.getElement('card'),
                billing_details: {
                    name: this.props.name,
                },
            }
        });

        this.props.history.push('/success');
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <CardSection />
                <button>Confirm payment of ${this.props.amount}</button>
            </form>
        );
    }
}

export default injectStripe(CheckoutForm);