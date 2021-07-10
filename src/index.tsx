import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './store'
import axios from "axios";

axios.defaults.baseURL = '/notion-api/';
axios.defaults.headers.common['Authorization'] = 'Bearer secret_y6Yp9rOrhtaeUYuxoN1AS5vUKi1W08pmfEus3O5i4PG';
axios.defaults.headers.common['Notion-Version'] = '2021-05-13';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
