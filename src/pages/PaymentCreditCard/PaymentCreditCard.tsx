import React, { useState, useEffect } from 'react';
import MaskedInput from 'react-text-mask';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import TextField from '@material-ui/core/TextField';

interface TextMaskProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

function CreditCardNumberTextMask(props: TextMaskProps): JSX.Element {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any): void => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /[1-9]/, /\d/, /\d/, /\d/, ' ', '-', ' ',
        /\d/, /\d/, /\d/, /\d/, ' ', '-', ' ',
        /\d/, /\d/, /\d/, /\d/, ' ', '-', ' ',
        /\d/, /\d/, /\d/, /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

function MMYYTextMask(props: TextMaskProps): JSX.Element {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any): void => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-1]/, /\d/, ' ', '/', ' ', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

const useStyles = makeStyles({
  root: {
    paddingTop: 144,
    paddingLeft: 88,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'lighter',
    paddingBottom: 24,
  },
  iconContainer: {
    '& > svg': {
      fontSize: '8rem',
      marginRight: 24,
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  formContainer: {
    '& > div': {
      paddingBottom: 16,
    },
  },
  textField: {
    '&:not(.MuiFormControl-fullWidth)': {
      width: 244,
    },
    '& .MuiInputBase-root': {
      fontFamily: 'system-ui, -apple-system, "Roboto", "Helvetica", "Arial", sans-serif',
      color: '#A8D574',
      fontSize: 22,
    },
    '& .MuiInputLabel-root': {
      fontFamily: 'system-ui, -apple-system, "Roboto", "Helvetica", "Arial", sans-serif',
      color: '#A8D574',
      fontSize: 18,
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid rgb(117, 149, 81)',
    },
    '& .MuiFormHelperText-root': {
      fontFamily: 'system-ui, -apple-system, "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14,
      lineHeight: '32px',
    },
  },
  textFieldTwoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cellPhoneNumberHelperText: {
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

interface FormField {
  name: string;
  creditCardNumber: string;
  MMYY: string;
  securityCode: string;
  cellPhoneNumber: string;
}

interface FormFieldsErrorMessage {
  name: string[];
  creditCardNumber: string[];
  MMYY: string[];
  securityCode: string[];
  cellPhoneNumber: string[];
}

export default function PaymentCreditCard(): JSX.Element {
  const classes = useStyles();

  // 信用卡開頭號碼 0 不代表任何信用卡 就是一個預設值
  const [creditCardType, setCreditCardType] = useState<number>(0);

  // 如果點擊按鈕來驗證過 啟動 input change 驗證
  const [checkStatus, setCheckStatus] = useState(false);

  const [formFields, setFormFields] = useState<FormField>({
    name: '',
    creditCardNumber: '     -      -      -     ',
    MMYY: '   /   ',
    securityCode: '',
    cellPhoneNumber: '',
  });

  const [formFieldsErrorMessage, setFormFieldsErrorMessage] = useState<FormFieldsErrorMessage>({
    name: [],
    creditCardNumber: [],
    MMYY: [],
    securityCode: [],
    cellPhoneNumber: [],
  });

  const handleFormSubmit = (): void => {
    let name: string[] = [];
    if (formFields.name === '') {
      name = [...name, '必填欄位'];
    }
    let creditCardNumber: string[] = [];
    if (formFields.creditCardNumber.replace(/ /g, '').replace(/-/g, '').trim().length === 0) {
      creditCardNumber = [...creditCardNumber, '必填欄位'];
    }
    if (!formFields.creditCardNumber.replace(/ /g, '').replace(/-/g, '').match(/^\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d$/g)) {
      creditCardNumber = [...creditCardNumber, '信用卡卡號填寫格式錯誤，需有 16 碼'];
    }
    let MMYY: string[] = [];
    if (formFields.MMYY.replace(/ /g, '').replace(/\//g, '').trim().length === 0) {
      MMYY = [...MMYY, '必填欄位'];
    }
    if (!formFields.MMYY.replace(/ /g, '').replace(/\//g, '').match(/^\d\d\d\d$/g)) {
      MMYY = [...MMYY, '有效月年填寫格式錯誤，需有 4 碼'];
    }
    if (!formFields.MMYY.replace(/ /g, '').split('/')[0].match(/^01|02|03|04|05|06|07|08|09|10|11|12$/g)) {
      MMYY = [...MMYY, '月填寫格式錯誤，範圍為 01 ~ 12'];
    }
    let securityCode: string[] = [];
    if (formFields.securityCode.length === 0) {
      securityCode = [...securityCode, '必填欄位'];
    }
    if (!formFields.securityCode.match(/^\d\d\d$/g)) {
      securityCode = [...securityCode, '信用卡背面末三碼填寫格式錯誤，需有 3 個數字'];
    }
    let cellPhoneNumber: string[] = [];
    if (formFields.cellPhoneNumber.length === 0) {
      cellPhoneNumber = [...cellPhoneNumber, '必填欄位'];
    }
    if (!formFields.cellPhoneNumber.match(/^\d\d\d\d\d\d\d\d\d\d$/g)) {
      cellPhoneNumber = [...cellPhoneNumber, '手機號碼填寫格式錯誤，需有 10 個數字'];
    }

    setFormFieldsErrorMessage({
      name,
      creditCardNumber,
      MMYY,
      securityCode,
      cellPhoneNumber,
    });

    if (!checkStatus) {
      setCheckStatus(true);
    }
  };

  useEffect((): void => {
    // 如果點擊按鈕來驗證過 啟動 input change 驗證
    if (checkStatus) {
      handleFormSubmit();
    }
  }, [formFields]);

  const handleChange = (name: keyof FormField):
  (event: React.ChangeEvent<HTMLInputElement>) =>
  void => (event: React.ChangeEvent<HTMLInputElement>): void => {
    switch (name) {
      case 'creditCardNumber':
        if (Number(event.target.value.slice(0, 1))) {
          setCreditCardType(Number(event.target.value.slice(0, 1)));
        } else {
          setCreditCardType(0);
        }
        setFormFields({ ...formFields, [name]: event.target.value });
        break;
      case 'securityCode':
        setFormFields({ ...formFields, [name]: event.target.value.slice(0, 3) });
        break;
      default:
        setFormFields({ ...formFields, [name]: event.target.value });
    }
  };

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>信用卡付款</h3>

      <div className={classes.iconContainer}>
        <SvgIcon viewBox="0 0 576 512" color={creditCardType === 4 ? 'primary' : 'disabled'}>
          <path fill="currentColor" d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43.5 16-43.5-.2.3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135h42.5zm94.4.2L272.1 176h-40.2l-25.1 155.4h40.1zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2.2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2.1 69.7-20.8 70-53zM528 331.4L495.6 176h-31.1c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5H426s6.9-19.2 8.4-23.3H486c1.2 5.5 4.8 23.3 4.8 23.3H528z"></path>
        </SvgIcon>
        <SvgIcon viewBox="0 0 576 512" color={creditCardType === 5 ? 'primary' : 'disabled'}>
          <path fill="currentColor" d="M482.9 410.3c0 6.8-4.6 11.7-11.2 11.7-6.8 0-11.2-5.2-11.2-11.7 0-6.5 4.4-11.7 11.2-11.7 6.6 0 11.2 5.2 11.2 11.7zm-310.8-11.7c-7.1 0-11.2 5.2-11.2 11.7 0 6.5 4.1 11.7 11.2 11.7 6.5 0 10.9-4.9 10.9-11.7-.1-6.5-4.4-11.7-10.9-11.7zm117.5-.3c-5.4 0-8.7 3.5-9.5 8.7h19.1c-.9-5.7-4.4-8.7-9.6-8.7zm107.8.3c-6.8 0-10.9 5.2-10.9 11.7 0 6.5 4.1 11.7 10.9 11.7 6.8 0 11.2-4.9 11.2-11.7 0-6.5-4.4-11.7-11.2-11.7zm105.9 26.1c0 .3.3.5.3 1.1 0 .3-.3.5-.3 1.1-.3.3-.3.5-.5.8-.3.3-.5.5-1.1.5-.3.3-.5.3-1.1.3-.3 0-.5 0-1.1-.3-.3 0-.5-.3-.8-.5-.3-.3-.5-.5-.5-.8-.3-.5-.3-.8-.3-1.1 0-.5 0-.8.3-1.1 0-.5.3-.8.5-1.1.3-.3.5-.3.8-.5.5-.3.8-.3 1.1-.3.5 0 .8 0 1.1.3.5.3.8.3 1.1.5s.2.6.5 1.1zm-2.2 1.4c.5 0 .5-.3.8-.3.3-.3.3-.5.3-.8 0-.3 0-.5-.3-.8-.3 0-.5-.3-1.1-.3h-1.6v3.5h.8V426h.3l1.1 1.4h.8l-1.1-1.3zM576 81v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V81c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM64 220.6c0 76.5 62.1 138.5 138.5 138.5 27.2 0 53.9-8.2 76.5-23.1-72.9-59.3-72.4-171.2 0-230.5-22.6-15-49.3-23.1-76.5-23.1-76.4-.1-138.5 62-138.5 138.2zm224 108.8c70.5-55 70.2-162.2 0-217.5-70.2 55.3-70.5 162.6 0 217.5zm-142.3 76.3c0-8.7-5.7-14.4-14.7-14.7-4.6 0-9.5 1.4-12.8 6.5-2.4-4.1-6.5-6.5-12.2-6.5-3.8 0-7.6 1.4-10.6 5.4V392h-8.2v36.7h8.2c0-18.9-2.5-30.2 9-30.2 10.2 0 8.2 10.2 8.2 30.2h7.9c0-18.3-2.5-30.2 9-30.2 10.2 0 8.2 10 8.2 30.2h8.2v-23zm44.9-13.7h-7.9v4.4c-2.7-3.3-6.5-5.4-11.7-5.4-10.3 0-18.2 8.2-18.2 19.3 0 11.2 7.9 19.3 18.2 19.3 5.2 0 9-1.9 11.7-5.4v4.6h7.9V392zm40.5 25.6c0-15-22.9-8.2-22.9-15.2 0-5.7 11.9-4.8 18.5-1.1l3.3-6.5c-9.4-6.1-30.2-6-30.2 8.2 0 14.3 22.9 8.3 22.9 15 0 6.3-13.5 5.8-20.7.8l-3.5 6.3c11.2 7.6 32.6 6 32.6-7.5zm35.4 9.3l-2.2-6.8c-3.8 2.1-12.2 4.4-12.2-4.1v-16.6h13.1V392h-13.1v-11.2h-8.2V392h-7.6v7.3h7.6V416c0 17.6 17.3 14.4 22.6 10.9zm13.3-13.4h27.5c0-16.2-7.4-22.6-17.4-22.6-10.6 0-18.2 7.9-18.2 19.3 0 20.5 22.6 23.9 33.8 14.2l-3.8-6c-7.8 6.4-19.6 5.8-21.9-4.9zm59.1-21.5c-4.6-2-11.6-1.8-15.2 4.4V392h-8.2v36.7h8.2V408c0-11.6 9.5-10.1 12.8-8.4l2.4-7.6zm10.6 18.3c0-11.4 11.6-15.1 20.7-8.4l3.8-6.5c-11.6-9.1-32.7-4.1-32.7 15 0 19.8 22.4 23.8 32.7 15l-3.8-6.5c-9.2 6.5-20.7 2.6-20.7-8.6zm66.7-18.3H408v4.4c-8.3-11-29.9-4.8-29.9 13.9 0 19.2 22.4 24.7 29.9 13.9v4.6h8.2V392zm33.7 0c-2.4-1.2-11-2.9-15.2 4.4V392h-7.9v36.7h7.9V408c0-11 9-10.3 12.8-8.4l2.4-7.6zm40.3-14.9h-7.9v19.3c-8.2-10.9-29.9-5.1-29.9 13.9 0 19.4 22.5 24.6 29.9 13.9v4.6h7.9v-51.7zm7.6-75.1v4.6h.8V302h1.9v-.8h-4.6v.8h1.9zm6.6 123.8c0-.5 0-1.1-.3-1.6-.3-.3-.5-.8-.8-1.1-.3-.3-.8-.5-1.1-.8-.5 0-1.1-.3-1.6-.3-.3 0-.8.3-1.4.3-.5.3-.8.5-1.1.8-.5.3-.8.8-.8 1.1-.3.5-.3 1.1-.3 1.6 0 .3 0 .8.3 1.4 0 .3.3.8.8 1.1.3.3.5.5 1.1.8.5.3 1.1.3 1.4.3.5 0 1.1 0 1.6-.3.3-.3.8-.5 1.1-.8.3-.3.5-.8.8-1.1.3-.6.3-1.1.3-1.4zm3.2-124.7h-1.4l-1.6 3.5-1.6-3.5h-1.4v5.4h.8v-4.1l1.6 3.5h1.1l1.4-3.5v4.1h1.1v-5.4zm4.4-80.5c0-76.2-62.1-138.3-138.5-138.3-27.2 0-53.9 8.2-76.5 23.1 72.1 59.3 73.2 171.5 0 230.5 22.6 15 49.5 23.1 76.5 23.1 76.4.1 138.5-61.9 138.5-138.4z"></path>
        </SvgIcon>
        <SvgIcon viewBox="0 0 576 512" color={creditCardType === 3 ? 'primary' : 'disabled'}>
          <path fill="currentColor" d="M431.5 244.3V212c41.2 0 38.5.2 38.5.2 7.3 1.3 13.3 7.3 13.3 16 0 8.8-6 14.5-13.3 15.8-1.2.4-3.3.3-38.5.3zm42.8 20.2c-2.8-.7-3.3-.5-42.8-.5v35c39.6 0 40 .2 42.8-.5 7.5-1.5 13.5-8 13.5-17 0-8.7-6-15.5-13.5-17zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM182 192.3h-57c0 67.1 10.7 109.7-35.8 109.7-19.5 0-38.8-5.7-57.2-14.8v28c30 8.3 68 8.3 68 8.3 97.9 0 82-47.7 82-131.2zm178.5 4.5c-63.4-16-165-14.9-165 59.3 0 77.1 108.2 73.6 165 59.2V287C312.9 311.7 253 309 253 256s59.8-55.6 107.5-31.2v-28zM544 286.5c0-18.5-16.5-30.5-38-32v-.8c19.5-2.7 30.3-15.5 30.3-30.2 0-19-15.7-30-37-31 0 0 6.3-.3-120.3-.3v127.5h122.7c24.3.1 42.3-12.9 42.3-33.2z"></path>
        </SvgIcon>
        <SvgIcon viewBox="0 0 576 512" color={[1, 2, 6, 7, 8, 9].includes(creditCardType) ? 'primary' : 'disabled'}>
          <path fill="currentColor" d="M302.2 218.4c0 17.2-10.5 27.1-29 27.1h-24.3v-54.2h24.4c18.4 0 28.9 9.8 28.9 27.1zm47.5 62.6c0 8.3 7.2 13.7 18.5 13.7 14.4 0 25.2-9.1 25.2-21.9v-7.7l-23.5 1.5c-13.3.9-20.2 5.8-20.2 14.4zM576 79v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM127.8 197.2c8.4.7 16.8-4.2 22.1-10.4 5.2-6.4 8.6-15 7.7-23.7-7.4.3-16.6 4.9-21.9 11.3-4.8 5.5-8.9 14.4-7.9 22.8zm60.6 74.5c-.2-.2-19.6-7.6-19.8-30-.2-18.7 15.3-27.7 16-28.2-8.8-13-22.4-14.4-27.1-14.7-12.2-.7-22.6 6.9-28.4 6.9-5.9 0-14.7-6.6-24.3-6.4-12.5.2-24.2 7.3-30.5 18.6-13.1 22.6-3.4 56 9.3 74.4 6.2 9.1 13.7 19.1 23.5 18.7 9.3-.4 13-6 24.2-6 11.3 0 14.5 6 24.3 5.9 10.2-.2 16.5-9.1 22.8-18.2 6.9-10.4 9.8-20.4 10-21zm135.4-53.4c0-26.6-18.5-44.8-44.9-44.8h-51.2v136.4h21.2v-46.6h29.3c26.8 0 45.6-18.4 45.6-45zm90 23.7c0-19.7-15.8-32.4-40-32.4-22.5 0-39.1 12.9-39.7 30.5h19.1c1.6-8.4 9.4-13.9 20-13.9 13 0 20.2 6 20.2 17.2v7.5l-26.4 1.6c-24.6 1.5-37.9 11.6-37.9 29.1 0 17.7 13.7 29.4 33.4 29.4 13.3 0 25.6-6.7 31.2-17.4h.4V310h19.6v-68zM516 210.9h-21.5l-24.9 80.6h-.4l-24.9-80.6H422l35.9 99.3-1.9 6c-3.2 10.2-8.5 14.2-17.9 14.2-1.7 0-4.9-.2-6.2-.3v16.4c1.2.4 6.5.5 8.1.5 20.7 0 30.4-7.9 38.9-31.8L516 210.9z"></path>
        </SvgIcon>
      </div>

      <div className={classes.formContainer}>
        <div>
          <TextField
            label={((): JSX.Element => (
              <><span style={{ color: '#FF521A' }}>*</span><span>持卡人</span></>
            ))()}
            className={classes.textField}
            placeholder="請輸入持卡人姓名"
            value={formFields.name}
            onChange={handleChange('name')}
            margin="normal"
            helperText={formFieldsErrorMessage.name.map((errorMessage): JSX.Element => (
              <div key={errorMessage}>{errorMessage}</div>
            ))}
            error={formFieldsErrorMessage.name.length > 0}
          />
        </div>

        <div>
          <TextField
            label={((): JSX.Element => (
              <><span style={{ color: '#FF521A' }}>*</span><span>信用卡號</span></>
            ))()}
            className={classes.textField}
            value={formFields.creditCardNumber}
            onChange={handleChange('creditCardNumber')}
            margin="normal"
            InputProps={{
              inputComponent: CreditCardNumberTextMask,
            }}
            helperText={formFieldsErrorMessage.creditCardNumber.map((errorMessage): JSX.Element => (
              <div key={errorMessage}>{errorMessage}</div>
            ))}
            error={formFieldsErrorMessage.creditCardNumber.length > 0}
          />
        </div>

        <div className={classes.textFieldTwoContainer}>
          <TextField
            label={((): JSX.Element => (
              <><span style={{ color: '#FF521A' }}>*</span><span>有效月年</span></>
            ))()}
            className={classes.textField}
            placeholder="MMYY"
            value={formFields.MMYY}
            onChange={handleChange('MMYY')}
            margin="normal"
            InputProps={{
              inputComponent: MMYYTextMask,
            }}
            helperText={formFieldsErrorMessage.MMYY.map((errorMessage): JSX.Element => (
              <div key={errorMessage}>{errorMessage}</div>
            ))}
            error={formFieldsErrorMessage.MMYY.length > 0}
          />

          <TextField
            label={((): JSX.Element => (
              <><span style={{ color: '#FF521A' }}>*</span><span>信用卡背面末三碼</span></>
            ))()}
            className={classes.textField}
            placeholder="***"
            value={formFields.securityCode}
            onChange={handleChange('securityCode')}
            margin="normal"
            helperText={formFieldsErrorMessage.securityCode.map((errorMessage): JSX.Element => (
              <div key={errorMessage}>{errorMessage}</div>
            ))}
            error={formFieldsErrorMessage.securityCode.length > 0}
          />
        </div>

        <div>
          <TextField
            label={((): JSX.Element => (
              <><span style={{ color: '#FF521A' }}>*</span><span>手機號碼</span></>
            ))()}
            className={classes.textField}
            value={formFields.cellPhoneNumber}
            onChange={handleChange('cellPhoneNumber')}
            margin="normal"
            fullWidth
            helperText={formFieldsErrorMessage.cellPhoneNumber.map((errorMessage): JSX.Element => (
              <div key={errorMessage}>{errorMessage}</div>
            ))}
            error={formFieldsErrorMessage.cellPhoneNumber.length > 0}
          />
        </div>

        <div className={classes.cellPhoneNumberHelperText}>
          如非台灣手機號碼請加國碼，如香港為852，則輸入852123456789。 若刷卡驗證採簡訊驗證，簡訊將發送至您於發卡銀行留存的手機號碼。
        </div>

        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleFormSubmit}
          >
            確認付款
          </Button>
        </div>
      </div>
    </div>
  );
}
