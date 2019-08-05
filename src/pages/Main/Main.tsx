import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const bannerImg = require('../../assets/images/Photo by Xianjuan HU on Unsplash.png'); // eslint-disable-line @typescript-eslint/no-var-requires
const brandImg = require('../../assets/images/Group 167.png'); // eslint-disable-line @typescript-eslint/no-var-requires

const useStyles = makeStyles({
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
});

interface TParams {
  type?: string;
}

// interface PropsI extends RouteComponentProps<TParams> { }

export default function Main(props: RouteComponentProps<TParams>): JSX.Element {
  const classes = useStyles();

  return (
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
            {props.match.params.type === 'creditCard' && 123}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
