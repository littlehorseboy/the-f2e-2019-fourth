import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const bannerImg = require('../../assets/images/Photo by Xianjuan HU on Unsplash.png'); // eslint-disable-line @typescript-eslint/no-var-requires
const brandImg = require('../../assets/images/Group 167@2x.png'); // eslint-disable-line @typescript-eslint/no-var-requires

const useStyles = makeStyles((theme): Record<'root' | 'centerPanel' | 'bannerImg'
| 'imgContainer' | 'infoContainer' | 'paymentSuccessful' | 'paymentAmountContainer'
| 'paymentInfo' | 'redirectContainer'
, CSSProperties | (() => CSSProperties)> => createStyles({
  root: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#A8D574',
  },
  centerPanel: {
    backgroundColor: '#A8D574',
  },
  bannerImg: {
    width: '100%',
    height: 339,
    backgroundImage: `url('${bannerImg}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  imgContainer: {
    width: '100%',
    paddingTop: 56,
    paddingBottom: 24,
    paddingLeft: 120,
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
      textAlign: 'center',
    },
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paymentSuccessful: {
    marginTop: 8,
    marginBottom: 48,
    fontSize: 40,
    fontWeight: 'lighter',
  },
  paymentAmountContainer: {
    paddingTop: 16,
    paddingBottom: 32,
    fontSize: 30,
    fontWeight: 'bold',
  },
  paymentInfo: {
    paddingTop: 16,
    textAlign: 'center',
    '& div:nth-child(2n + 1)': {
      paddingBottom: 8,
      fontSize: 18,
      fontWeight: 'bold',
    },
    '& div:nth-child(2n + 2)': {
      paddingBottom: 32,
      fontSize: 24,
    },
  },
  redirectContainer: {
    paddingTop: 56,
    paddingBottom: 56,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: '64px',
  },
}));

export default function Router(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={12} className={classes.centerPanel}>
            <div className={classes.bannerImg} />

            <div className={classes.infoContainer}>

              <div className={classes.imgContainer}>
                <img src={brandImg} alt="payment" />
              </div>

              <h3 className={classes.paymentSuccessful}>付款成功</h3>

              <div className={classes.paymentAmountContainer}>
                您已支付
                {(1250).toLocaleString()}
                元
              </div>

              <div className={classes.paymentInfo}>
                <div>商店名稱</div>
                <div>Amazing 3C online Shop</div>
                <div>訂單編號</div>
                <div>239234dwnd321</div>
                <div>支付方式</div>
                <div>信用卡付款</div>
              </div>

              <div className={classes.redirectContainer}>
                <div>畫面將自動轉回</div>
                <div>Amazing 3C Online Shop</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
