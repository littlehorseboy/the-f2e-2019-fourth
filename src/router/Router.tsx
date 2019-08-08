import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PaymentRouter from './PaymentRouter/PaymentRouter';
import PaymentCreditCard from '../pages/PaymentCreditCard/PaymentCreditCard';
import PaymentCreditCardSuccessful from '../pages/PaymentCreditCardSuccessful/PaymentCreditCardSuccessful';

const useStyles = makeStyles({
  page: {
    fontFamily: 'system-ui, -apple-system, "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function Router(): JSX.Element {
  const classes = useStyles();

  return (
    <HashRouter>
      <div className={classes.page}>
        <Route exact path="/" component={PaymentCreditCard} />
        <Route path="/successful/payment/creditCard" component={PaymentCreditCardSuccessful} />
        <Route path="/payment" component={PaymentRouter} />
      </div>
    </HashRouter>
  );
}
