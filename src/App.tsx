import React from 'react';
import { Steps } from './organisms/Steps';
import { Summary } from './organisms/Summary';
import './app.css';
import logo from './assets/logo-transparent.png';
import { useSelector } from "react-redux";
import { RootState } from './store'
import axios from "axios";

const App = () => {
    const SECTION_ID = '873f2a66-4551-4cf8-8ca1-5b04e71d46d2'
    const SECRET = 'secret_y6Yp9rOrhtaeUYuxoN1AS5vUKi1W08pmfEus3O5i4PG'

    axios.get(`https://api.notion.com/v1/block/${SECTION_ID}/children`, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${SECRET}`,
            'Notion-Version': '2021-05-13',
        }
    }).then(res => console.log(res)).catch(err => console.log(err))


    /* const headers = new Headers()
    headers.append('Notion-Version', '2021-05-13')
    headers.append('Authorization', `Bearer ${SECRET}`)
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    headers.append('Content-Type', 'multipart/form-data')
    headers.append('Content-Type', 'text/plain')

    const options: RequestInit = {
        method: 'GET',
        mode: 'cors',
        headers,
    };
   fetch(`https://api.notion.com/v1/block/${SECTION_ID}/children`, options)
       .then(res => res.json().then(data => console.log("data", data)).catch(e => console.warn(e)))
       .catch(err => console.warn(err)) */

    // TODO : get pages titles from notion
  const steps = useSelector((state: RootState) => state.items.steps)

    return (
        <div className="app">
          <header className="app-header">
              <div className="app-logo-wrapper">
            <img src={logo} className="app-logo" alt="logo" />
            <div className="app-title">
                  <h1>Le Configurateur</h1>
            <p>
              Configurez votre tiny et estimez son prix en quelques clics !
            </p>
                  </div>
            </div>
          </header>
        <div className="app-body">
            <div className="configurator">
                <div className="configurator-intro">
                    <h2>Choisissez étape par étape les composants de votre tiny house</h2>
                </div>
                <Steps steps={steps} />
            </div>
            <Summary />
        </div>
        </div>
    );
}

export default App;
