import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './app.css'
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './store'
import axios from "axios";

axios.defaults.baseURL = '/notion-api/';
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.NOTION_SECRET}`;
axios.defaults.headers.common['Notion-Version'] = process.env.NOTION_VERSION;

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
