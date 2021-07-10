import React from "react";
import logo from "../assets/logo-transparent.png";
import styled from "styled-components";
import { device } from "../theme/device";

const HeaderWrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 3fr 1fr;
    height: var(--header-height);

    > :nth-child(1) { 
      grid-column-start: 2; 
    }
`;

const LogoIntroWrapper = styled.header`
  background-color: #F8F9F9;
  display: flex;
    position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  gap: 1rem;

  .app-logo {
    height: 3rem;
  }

.app-title {
  display: flex;
  flex-direction: column;
}

.app-title h1 {
  margin-bottom: 0;
  margin-top: 0;
}
`;

const LinkWrapper = styled.div`
    display: flex;
    align-items: center;
  
    > p {
      margin-right: 0.4rem;
    }
`;

const AppIntro = styled.p`
  display: none;
  
  @media screen and ${device.tablet} {
    display: block;
    margin-top: 0;
  }
`;

export const Header: React.FC = () => (
  <HeaderWrapper>
    <LogoIntroWrapper>
        <LogoWrapper>
            <img src={logo} className="app-logo" alt="logo"/>
            <div className="app-title">
                <h1>Le Configurateur</h1>
            </div>
        </LogoWrapper>
        <AppIntro>Configurez votre tiny house et estimez son prix en quelques clics !</AppIntro>
    </LogoIntroWrapper>
      <LinkWrapper>
        <p>proposé par</p>
        <a href="https://www.guide-tinyhouse.com" target="_blank">Guide Tiny House</a>
      </LinkWrapper>
  </HeaderWrapper>
)


