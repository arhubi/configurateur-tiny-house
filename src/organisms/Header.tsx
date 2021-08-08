import React from "react";
import logo from "../assets/logo-transparent.png";
import styled from "styled-components";
import { device } from "../theme/device";
import { useMediaQuery } from "../hooks/useMediaQuery";

const HeaderWrapper = styled.div`
  display: grid;
  background-color: var(--pure-white);
  width: 100%;
  z-index: 10;
  grid-template-columns: 2fr 1fr;
  height: var(--header-height-mobile);
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.03) 0 0 0 1px;
  
  @media screen and ${device.laptop} {
    position: fixed;
    background-color: var(--bg-color);
    grid-template-columns: 1fr 3fr 1fr;
    height: var(--header-height);
    box-shadow: none;

    > :nth-child(1) {
      grid-column-start: 2;
    }
  }
`;

const LogoIntroWrapper = styled.header`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  z-index: 10;

  @media screen and ${device.laptop} {
    align-items: center;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  gap: 0.4rem;

  @media screen and ${device.laptop} {
    gap: 1rem;
  }

  .app-logo {
    height: 3rem;
    width: 3rem;
  }

  .app-title {
    display: flex;
    flex-direction: column;
  }

  .app-title h1 {
    margin-bottom: 0;
    margin-top: 0;
    font-size: 1rem;

    @media screen and ${device.laptop} {
      font-size: revert;
    }
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: flex-start;
  font-size: 0.6rem;

  p, a {
    margin: 0;
    font-size: 0.6rem;
  }

  p::after {
    content: " ";
    white-space: pre;
  }


  @media screen and ${device.laptop} {
    flex-direction: row;
    align-items: center;
    font-size: 1rem;
    
    p, a {
      font-size: 1rem;
    }
  }
`;

const AppIntro = styled.p`
  display: none;

  @media screen and ${device.laptop} {
    display: block;
    margin-top: 0;
  }
`;

export const Header: React.FC = () => {
  const isLaptop = useMediaQuery('laptop')

  return (<HeaderWrapper>
    <LogoIntroWrapper>
      <LogoWrapper>
        <img src={logo} className="app-logo" alt="logo"/>
        <div className="app-title">
          <h1>Le Configurateur</h1>
          {!isLaptop &&
          <LinkWrapper>
            <p>par</p>
            <a href="https://www.guide-tinyhouse.com" target="_blank" rel="noreferrer">Guide Tiny House</a>
          </LinkWrapper>
          }
        </div>
      </LogoWrapper>
      <AppIntro>Configurez votre tiny house et estimez son prix en quelques clics !</AppIntro>
    </LogoIntroWrapper>
    {isLaptop && <LinkWrapper>
      <p>par</p>
      <a href="https://www.guide-tinyhouse.com" target="_blank" rel="noreferrer">Guide Tiny House</a>
    </LinkWrapper>}
  </HeaderWrapper>)
}


