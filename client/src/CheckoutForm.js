
import React from 'react';
import {injectStripe} from 'react-stripe-elements';

import CardSection from './CardSection';

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error:"", processing:false};
    }

    handleSubmit = (ev) => {
        // We don't want to let default form submission happen here, which would refresh the page.
        ev.preventDefault();

        this.setState({error:"", processing:true});

        // See our confirmCardPayment documentation for more:
        // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
        this.props.stripe.confirmCardPayment(this.props.clientSecret, {
            payment_method: {
                card: this.props.elements.getElement('card'),
                billing_details: {
                    name: this.props.name,
                },
            }
        }).then(result => {
            this.setState({error:"", processing:false});
            if(result.error) {
                this.setState({error:result.error.message, processing:false});
            }
            else if(result.paymentIntent) {
                this.props.history.push('/success');
            }
        });
    };

    render() {

        if(!this.props.amount)
            this.props.history.push('/');

        return (
            <div style={{ width: 500 }}>
                <form onSubmit={this.handleSubmit}>
                    <CardSection />
                    <button disabled={this.state.processing}>Confirm payment of ${this.props.amount}</button>
                </form>
                <p>{this.state.error}</p>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);