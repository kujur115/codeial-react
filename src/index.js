import React from 'react';
import ReactDOM from 'react-dom/client';
//  todo: in place of react -toast- notification.. use react-hot-toast
// import toast, { Toaster } from 'react-hot-toast';

import './styles/index.css';
import { App } from './components/index';
import { AuthProvider } from './providers/AuthProvider';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
