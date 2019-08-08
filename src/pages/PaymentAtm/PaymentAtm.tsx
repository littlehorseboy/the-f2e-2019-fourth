import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import H from 'history';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    paddingTop: 144,
    paddingLeft: 88,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'lighter',
  },
  subTitle: {
    color: '#A8D574',
    fontSize: 18,
    paddingBottom: 40,
  },
  bankButton: {
    fontFamily: 'system-ui, -apple-system, "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 0,
    '&:not(.MuiButton-outlinedPrimary)': {
      color: '#707070',
      borderColor: '#707070',
    },
  },
  bankHelperText: {
    paddingTop: 40,
    color: '#FFD065',
    fontSize: 14,
    lineHeight: '32px',
  },
  buttonContainer: {
    paddingTop: 56,
    textAlign: 'center',
  },
  button: {
    fontFamily: 'system-ui, -apple-system, "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 18,
    fontWeight: 'bold',
    width: 257,
  },
});

interface PropsI {
  history: H.History;
}

function PaymentAtm(props: PropsI): JSX.Element {
  const classes = useStyles();

  const [selectedBank, setSelectedBank] = useState('');

  const handleFormSubmit = (): void => {
    if (selectedBank) {
      props.history.push('/successful/payment/creditCard');
    }
  };

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>網路 ATM</h3>

      <div className={classes.subTitle}>請選擇以下網路銀行付款</div>

      <Grid container spacing={2}>
        {[
          '兆豐國際商銀', '台灣土地銀行', '永豐銀行', '台灣銀行',
          '國泰世華銀行', '中國信託', '玉山銀行', '第一銀行',
          '台北富邦', '台新銀行', '其他金融機構',
        ].map((bank): JSX.Element => (
          <Grid key={bank} item xs={12} sm={6}>
            <Button
              onClick={(): void => setSelectedBank(bank)}
              className={classes.bankButton}
              variant="outlined"
              color={selectedBank === bank ? 'primary' : 'default'}
              fullWidth
            >
              {bank}
            </Button>
          </Grid>
        ))}
      </Grid>

      <div className={classes.bankHelperText}>
        1. 選擇以上任一銀行之金融卡並使用同銀行WebATM進行轉帳享0元手續費；使用他行WebATM，則需支付跨行手續費15元。
        <br />
        2. 若無以上任一家銀行之金融卡，可任意選擇或點選其他金融機構進行付款，需支付跨行手續費15元。
        <br />
        例：玉山金融卡在玉山WebATM轉帳享0元手續費；玉山金融卡在非玉山 WebATM轉帳收取15元手續費。
      </div>

      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleFormSubmit}
        >
          確認送出
        </Button>
      </div>
    </div>
  );
}

export default withRouter(PaymentAtm);
