import React, { useEffect } from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'

const Checkout = ({ amount, name, clientSecret, history }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <StripeProvider apiKey="pk_test_JOx2oDY3vCuUyCA3MyBDZi4100ur57D1lc">
            <Elements>
                <CheckoutForm amount={amount} name={name} clientSecret={clientSecret} history={history} />
            </Elements>
        </StripeProvider>
    )
}

export default Checkout