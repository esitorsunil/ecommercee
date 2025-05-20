import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CombinedProviders from './context/CombineProviders';
import { Provider } from 'react-redux';
import store from './Redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
  <CombinedProviders>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </CombinedProviders>
  </Provider>
);
