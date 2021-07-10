import React from 'react'
import './app.css'
import { Header } from "./organisms/Header"
import styled from "styled-components"
import { device } from "./theme/device"
import { AppConfigurator } from "./organisms/AppConfigurator"

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Raleway', sans-serif;
  background-color: #F8F9F9;
  max-width: 100vw;

  h1, h2 {
    text-transform: uppercase;
  }
  
  h1 {
    font-size: 1.5rem;
    
    @media screen and ${device.laptop} {
      font-size: 2rem;
    }
  }
  
  a {
    color: orange;
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
  }

  p {
    font-size: 1rem;
  }
`;

const AppBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  height: var(--body-height);
  width: 100%;
`;


const App = () => {
    return (
        <AppWrapper>
            <Header />
            <AppBody>
                <AppConfigurator />
            </AppBody>
        </AppWrapper>
    );
}

export default App;
