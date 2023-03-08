import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Ranker from './ranker';
// import ListMaker from "./listmaker";
import App from './app';
import Axios from 'axios';
Axios.defaults.baseURL = 'http://127.0.0.1:8000';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
