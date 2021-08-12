import React from 'react'
import { Header } from './components/organisms/Header'
import styled from 'styled-components'
import { device } from './theme/device'
import { AppConfigurator } from './components/organisms/AppConfigurator'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Raleway', sans-serif;
  background-color: var(--bg-color);
  max-width: 100vw;

  h1, h2 {
    text-transform: uppercase;
  }
  
  h1 {
    font-size: 1.2rem;
    
    @media screen and ${device.laptop} {
      font-size: 2rem;
    }
  }
  
  a {
    color: var(--primary);
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
  }
`;

const AppBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  height: var(--body-height-mobile);
  width: 100%;
  
  @media screen and ${device.laptop} {
    height: var(--body-height);
  }
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
