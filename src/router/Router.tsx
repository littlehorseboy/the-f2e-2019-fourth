import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PaymentPage from '../pages/PaymentPage/PaymentPage';

const useStyles = makeStyles({
  page: {
    fontFamily: 'system-ui, -apple-system, "Roboto", "Helvetica", "Arial", sans-serif',
    transition: 'opacity 250ms ease-in',
    '&-enter': {
      opacity: 0.5,
    },
    '&-enter-done': {
      opacity: 1,
    },
    '&-exit': {
      opacity: 1,
    },
    '&-exit-done': {
      opacity: 0.5,
    },
  },
});

export default function Router(): JSX.Element {
  const classes = useStyles();

  return (
    <HashRouter>
      <div className={classes.page}>
        <Route path='/' exact component={PaymentPage} />
        <Route path='/payment/:type' component={PaymentPage} />
        <Route path='/payment' exact component={PaymentPage} />
      </div>
    </HashRouter>
  );
}
