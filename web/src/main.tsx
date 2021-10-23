import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import { AuthProvider } from './context/auth';

import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
