import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo-transparent.png'
import { Image } from '../atoms/Image'
import { cssVar, rgba } from 'polished'
import { Button } from '../atoms/Button'

export enum ModalAction {
  START_TOUR= 'GUIDE',
  CLOSE_MODAL= 'CLOSE_MODAL',
}

type IntroModalProps = {
  onClose?: () => void;
  onModalAction: (action: ModalAction) => void
}

const IntroModalWrapper = styled.div`
  text-align: center;
  background: var(--pure-white);
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.03) 0 0 0 1px;
  padding: 2rem;
  border-radius: 0.6rem;
  width: 30rem;

  h2 {
    margin: 0;
  }
`

const ModalMask = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  opacity: 0;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(5px);
  background-color: ${() => rgba(cssVar('--bg-color'), 0.6)};
  animation: fade-in 500ms forwards;
`

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  
  > * {
    margin: 0 1rem;
  }
`

export const IntroModal: React.FC<IntroModalProps> = ({ onModalAction }) => {
  return<ModalMask>
      <IntroModalWrapper>
        <Image src={logo} width={80} />
        <h2>Bienvenue sur le Configurateur, par guide-tinyhouse.com</h2>
        <p>Ce site vous permet, de la remorque aux finitions, de vous donner un ordre d'idée du prix de votre future mini-maison,
          mais aussi de vous rediriger vers nos partenaires qui sauront vous aiguiller ensuite.

          Ce service est entièrement gratuit et vos données ne sont pas conservées (nous n'avons pas de base de données ;)).
        </p>
        <ActionsWrapper>
          <Button text={"Guidez-moi"} bgColor="var(--primary)" textColor="white" icon="help"
                  onClick={() => onModalAction?.(ModalAction.START_TOUR)}/>
          <Button text={"Compris !"} bgColor="var(--bg-color)"
                  onClick={() => onModalAction?.(ModalAction.CLOSE_MODAL)}/>
        </ActionsWrapper>
      </IntroModalWrapper>
    </ModalMask>
}
