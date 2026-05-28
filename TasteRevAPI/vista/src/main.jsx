import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './utilidades/redux/store';
import App from './App';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

ModuleRegistry.registerModules([AllCommunityModule]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Container>
        <App />
      </Container>
    </PersistGate>
  </Provider>
);