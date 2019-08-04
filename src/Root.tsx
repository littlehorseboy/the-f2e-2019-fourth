import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Router from './router/Router';
import store from './reducers/configureStore';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#A8D574',
    },
    // secondary: {
    //   main: '#FF4384',
    // },
  },
});

export default function Root(): JSX.Element {
  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router />
        </Provider>
      </MuiThemeProvider>
    </>
  );
}
