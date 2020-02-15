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

export default App;
