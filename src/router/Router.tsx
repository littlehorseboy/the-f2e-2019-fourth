import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CSSTransition } from 'react-transition-group';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PaymentPage from '../pages/PaymentPage/PaymentPage';

const bannerImg = require('../assets/images/Photo by Xianjuan HU on Unsplash.png'); // eslint-disable-line @typescript-eslint/no-var-requires
const brandImg = require('../assets/images/Group 167.png'); // eslint-disable-line @typescript-eslint/no-var-requires

const routes = [
  { path: '/', name: 'Home', Component: PaymentPage },
  { path: '/payment/:type', name: 'paymentType', Component: PaymentPage },
  { path: '/payment', name: 'payment', Component: PaymentPage },
];

const useStyles = makeStyles({
  page: {
    fontFamily: 'system-ui, -apple-system, "Roboto", "Helvetica", "Arial", sans-serif',
  },
  root: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#343434',
  },
  leftPanel: {
    backgroundColor: '#A8D574',
  },
  leftPanelWrapper: {
    paddingTop: 56,
    paddingLeft: 136,
  },
  bannerImg: {
    width: '100%',
  },
  titleContent: {
    fontSize: 40,
    paddingBottom: 24,
  },
  fieldName: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 8,
    paddingBottom: 8,
  },
  fieldValue: {
    fontSize: 24,
    fontWeight: 'lighter',
    paddingBottom: 16,
  },
  fade: {
    transition: 'opacity 0.7s ease-in',
    '&-enter': {
      opacity: 0,
    },
    '&-enter-done': {
      opacity: 1,
    },
    '&-exit': {
      opacity: 1,
    },
    '&-exit-done': {
      opacity: 0,
    },
  },
});

export default function Router(): JSX.Element {
  const classes = useStyles();

  return (
    <HashRouter>
      <div className={classes.page}>
        <div className={classes.root}>
          <Container>
            <Grid container>
              <Grid item xs={12} sm={5} className={classes.leftPanel}>
                <img src={bannerImg} alt="payment" className={classes.bannerImg} />

                <div className={classes.leftPanelWrapper}>
                  <div className={classes.titleContent}>訂單資訊</div>
                  <div className={classes.fieldName}>商店名稱</div>
                  <div className={classes.fieldValue}>Amazing 3C online Shop</div>
                  <div className={classes.fieldName}>訂單編號</div>
                  <div className={classes.fieldValue}>239234dwnd321</div>
                  <div>本筆訂單將支付</div>
                  <div>239234dwnd321</div>
                  <div>
                    {(1250).toLocaleString()}
                    <span>元</span>
                  </div>
                  <div>支付方式</div>
                  <div>信用卡</div>
                  <div>
                    <span>網路ATM</span>
                    <span>(晶片讀卡機轉帳)</span>
                  </div>
                  <div>
                    <span>ATM櫃員機</span>
                    <span>(實體ATM及網銀)</span>
                  </div>
                  <div>信用卡</div>
                </div>

                <img src={brandImg} alt="payment" />
              </Grid>

              <Grid item xs={12} sm={7}>
                {routes.map(({ path, Component }): JSX.Element => (
                  <Route key={path} exact path={path}>
                    {({ match }): JSX.Element => (
                      <CSSTransition
                        in={match ? match.params.type === 'creditCard' : false}
                        timeout={300}
                        classNames={classes.fade}
                        unmountOnExit
                      >
                        <div className={classes.fade}>
                          <Component />
                        </div>
                      </CSSTransition>
                    )}
                  </Route>
                ))}
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </HashRouter>
  );
}
