import React, { useEffect, useState } from 'react'
import Tour from 'reactour'
import { Header } from './components/organisms/Header'
import styled from 'styled-components'
import { device } from './theme/device'
import { AppConfigurator } from './components/organisms/AppConfigurator'
import { IntroModal, ModalAction } from './components/molecules/IntroModal'
import { steps } from './app-tour/config'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { Button } from './components/atoms/Button'
import { useMediaQuery } from './hooks/useMediaQuery'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 100%;
  
  @media screen and ${device.laptop} {
    height: var(--body-height);
  }
`

const QuickActions = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  gap: 0.4rem;
  bottom: calc(1rem + env(safe-area-inset-bottom));
  right: 1rem;
  z-index: 10;

  @media screen and ${device.laptop} {
    flex-direction: row;
    bottom: 2rem;
    right: 2rem; 
  }
`

const App = () => {
  const [isTourOpen, setIsTourOpen] = useState(false)

  const isConfiguratorLoaded = useSelector((state: RootState) => state.configurator.isLoaded)
  const showIntroModal = useSelector((state: RootState) => state.configurator.showIntroModal)
  const dispatch = useDispatch()

  const isLaptop = useMediaQuery('laptop')

  useEffect(() => {
    isConfiguratorLoaded && showIntroModal && dispatch({ type: 'configurator/is-loaded'})
    // eslint-disable-next-line
  }, [isConfiguratorLoaded, showIntroModal])

  const handleModalAction = (action: ModalAction) => {
    switch (action) {
      case ModalAction.START_TOUR:
        dispatch({ type: 'configurator/hide-intro-modal' })
        setIsTourOpen(true)
        break;
      case ModalAction.CLOSE_MODAL:
        dispatch({ type: 'configurator/hide-intro-modal' })
        break;
    }
  }

  return (
    <>
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
        rounded={10}
        accentColor="var(--primary)"
      />
      <AppWrapper>
          <Header />
          <AppBody>
              <AppConfigurator />
          </AppBody>
        {isConfiguratorLoaded && showIntroModal && <IntroModal onModalAction={(action) => handleModalAction(action)} />}
      </AppWrapper>
      <QuickActions>
        <Button text={isLaptop ? "Besoin d'aide" : undefined } icon="help" textColor="var(--primary)" bgColor="var(--pure-white)" onClick={() => setIsTourOpen(true)} />
        <Button icon="reset" textColor="orange" bgColor="var(--pure-white)" onClick={() => dispatch({ type: 'configurator/reset' })} />
      </QuickActions>
  </>
    );
}

export default App;
