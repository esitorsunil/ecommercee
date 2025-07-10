import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CombinedProviders from './context/CombineProviders';
import { Provider } from 'react-redux';
import store, { persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { finishLoading } from './Redux/authSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
  
  <CombinedProviders>
   
  <BrowserRouter>
    <PersistGate
    loading={null}
    persistor={persistor}
    onBeforeLift={() => {
      store.dispatch(finishLoading()); // ✅ Notify that rehydration is done
    }}
  >
    <App />
     </PersistGate>
  </BrowserRouter>
     
  </CombinedProviders>
  </Provider>
);
