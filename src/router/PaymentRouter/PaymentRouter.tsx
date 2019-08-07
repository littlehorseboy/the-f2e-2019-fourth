import React from 'react';
import {
  HashRouter,
  Route,
  Link,
  RouteComponentProps,
} from 'react-router-dom';
import classNames from 'classnames';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { CSSTransition } from 'react-transition-group';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PaymentCreditCard from '../../pages/PaymentCreditCard/PaymentCreditCard';
import PaymentAtm from '../../pages/PaymentAtm/PaymentAtm';

const bannerImg = require('../../assets/images/Photo by Xianjuan HU on Unsplash.png'); // eslint-disable-line @typescript-eslint/no-var-requires
const brandImg = require('../../assets/images/Group 167.png'); // eslint-disable-line @typescript-eslint/no-var-requires

const routes = [
  { path: '/payment/creditCard', name: 'paymentCreditCard', Component: PaymentCreditCard },
  { path: '/payment/atm', name: 'PaymentAtm', Component: PaymentAtm },
];

const useStyles = makeStyles((theme): Record<'fade' | 'root' | 'leftPanel' | 'leftPanelWrapper'
| 'bannerImg' | 'titleContent' | 'fieldName' | 'fieldValue' | 'paymentAmountContainer' | 'paymentAmount'
| 'paymentTypeContainer' | 'paymentType' | 'imgContainer', CSSProperties | (() => CSSProperties)> => createStyles({
  fade: {
    transition: 'opacity 0.5s ease-in',
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
  paymentAmountContainer: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  paymentAmount: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 64,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
    },
    '& > span:nth-child(1)': {
      fontSize: 36,
      fontWeight: 'bold',
      paddingRight: 16,
    },
    '& > span:nth-child(2)': {
      fontSize: 24,
    },
  },
  paymentTypeContainer: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  paymentType: {
    '& > div': {
      height: 90,
      marginBottom: 16,
      marginRight: 48,
      paddingLeft: 32,
      backgroundColor: '#F0F0F0',
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
      },
      '&.active': {
        marginRight: 0,
        backgroundColor: '#343434',
        '& > a': {
          color: '#FFFFFF',
        },
      },
      '& > a': {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        color: '#707070',
        textDecoration: 'none',
      },
      '& > a:hover': {
        textDecoration: 'underline',
      },
      '& > a > span:nth-child(1)': {
        fontSize: 28,
      },
      '& > a > span:nth-child(2)': {
        paddingLeft: 16,
        fontSize: 12,
      },
    },
  },
  imgContainer: {
    paddingTop: 48,
    paddingLeft: 48,
    paddingBottom: 24,
  },
}));

export default function Router(props: RouteComponentProps): JSX.Element {
  const classes = useStyles();

  return (
    <HashRouter>
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

                <div className={classes.paymentAmountContainer}>
                  <div className={classes.fieldName}>本筆訂單將支付</div>
                  <div className={classes.paymentAmount}>
                    <span>{(1250).toLocaleString()}</span>
                    <span>元</span>
                  </div>
                </div>

                <div className={classes.paymentTypeContainer}>
                  <div className={classes.fieldName}>支付方式</div>
                  <div className={classes.paymentType}>
                    <div className={classNames({ active: props.location.pathname === '/payment/creditCard' })}>
                      <Link to="/payment/creditCard">
                        <span>信用卡</span>
                      </Link>
                    </div>
                    <div className={classNames({ active: props.location.pathname === '/payment/atm' })}>
                      <Link to="/payment/atm">
                        <span>網路ATM</span>
                        <span>(晶片讀卡機轉帳)</span>
                      </Link>
                    </div>
                    <div className={classNames({ active: props.location.pathname === '/payment/entity' })}>
                      <Link to="/payment/entity">
                        <span>ATM櫃員機</span>
                        <span>(實體ATM及網銀)</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.imgContainer}>
                <img src={brandImg} alt="payment" />
              </div>
            </Grid>

            <Grid item xs={12} sm={7}>
              {routes.map(({ path, Component }): JSX.Element => (
                <Route key={path} exact path={path}>
                  {({ match }): JSX.Element => (
                    <CSSTransition
                      in={match !== null}
                      timeout={{
                        enter: 300,
                        exit: 100,
                      }}
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
    </HashRouter>
  );
}
