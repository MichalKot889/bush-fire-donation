import React, { useState } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Checkout from './Checkout'
import DonationAmountInput from './DonationAmountInput'
const history = createBrowserHistory()

const App = () => {
  const [amount, setAmount] = useState(null);
  const [name, setName] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  return (
      <Router history={history}>
        <Switch>
          <Route
              exact
              path="/"
              render={() => (
                  <DonationAmountInput
                      setAmount={setAmount}
                      setName={setName}
                      setClientSecret={setClientSecret}
                      history={history}
                  />
                  /*<Products
                      products={products}
                      selectProduct={setSelectedProduct}
                      history={history}


                  />*/
              )}
          />
          <Route
              path="/checkout"
              render={() => (
                  <Checkout
                      amount={amount}
                      name={name}
                      clientSecret={clientSecret}
                      history={history}
                  />
              )}
          />
          <Route
                path="/success"
                render={() => (
                    <p>Your payment was successful!</p>
                )}
            />
        </Switch>
      </Router>
  )
}


/*

import React from 'react';
import logo from './logo.svg';
import './App.css';
import CardSection from "./CardSection";

import {StripeProvider} from 'react-stripe-elements';

import MyStoreCheckout from './MyStoreCheckout';

function App() {
  return (
      <StripeProvider apiKey="pk_test_JOx2oDY3vCuUyCA3MyBDZi4100ur57D1lc" >
        <MyStoreCheckout />
      </StripeProvider>

      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit wow <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {CardSection}
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
