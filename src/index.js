import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { MoralisProvider } from "react-moralis";
import '../node_modules/normalize.css/normalize.css';


ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
     <MoralisProvider serverUrl="https://izouiqbqnesg.usemoralis.com:2053/server" appId="COXoyfiiO3HN7G11aOrqoZuGgvro0LwY2sfZm7u4">
      <App />
      </MoralisProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
