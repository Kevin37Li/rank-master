import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Ranker from './ranker';
import ListMaker from "./listmaker";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ListMaker />
      {/*<Ranker/>*/}
  </React.StrictMode>
);
