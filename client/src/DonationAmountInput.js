import React from 'react'
import Client from './Client'

const DonationAmountInput = ({ setAmount, setName, setClientSecret, history }) => {

    let amount = 0;
    let name = "";

    const handleInsertAmount = event => {
        amount = event.target.value;
    }

    const handleInsertName = event => {
        name = event.target.value;
    }

    const handleSubmit = ev => {
        // We don't want to let default form submission happen here, which would refresh the page.
        ev.preventDefault();

        if(amount && name && amount > 0 && amount <= 10000) {
            setAmount(amount);
            setName(name);
            Client.fetchClientSecret(amount).then(cs => setClientSecret(cs.client_secret));

            history.push('/checkout');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Save Australian Wildlife</h1>
            <p>Enter the amount you would like to donate to help animals impacted by bush fires in Australia (AUD)</p>
            <input
                type='number'
                min={0}
                max={10000}
                onChange={handleInsertAmount}
            />
            <p>Your name:</p>
            <input type='text' onChange={handleInsertName}/>
            <br />
            <input
                type='submit' onClick={handleSubmit}
            />
        </form>
    );
}

export default DonationAmountInput