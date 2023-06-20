import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import { NetworkStatus } from 'src/components/atoms';
import { store } from 'src/redux/store';
import Toastify from 'src/utils/ToastifyConfig';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <NetworkStatus>
          <App />
          <Toastify />
        </NetworkStatus>
      </BrowserRouter>
    </Provider>
  </>
);
