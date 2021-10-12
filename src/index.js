import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import Themes from './Themes';
import '../src/assets/Fonts/SegoeUi/Segoe UI Bold Italic.ttf';
import '../src/assets/Fonts/SegoeUi/Segoe UI Bold.ttf';
import '../src/assets/Fonts/SegoeUi/Segoe UI Italic.ttf';
import '../src/assets/Fonts/SegoeUi/Segoe UI.ttf';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/index';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={Themes.default}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
