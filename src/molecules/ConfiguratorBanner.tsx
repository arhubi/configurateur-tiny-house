import React from "react"
import {useDispatch, useSelector} from "react-redux"
import { RootState } from "../store"
import styled from "styled-components"
import { StepProps } from "./Step"
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'
import { device } from "../theme/device"
import { useMediaQuery } from "../hooks/useMediaQuery"

type ArrowProps = {
    hRotation?: boolean;
    visible?: boolean;
}

const ConfiguratorBannerWrapper = styled.div<ArrowProps>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 0.5rem;
  overflow: scroll;
  background-color: rgba(255, 165, 0, 0.6);
    backdrop-filter: blur(10px);
    color: white;
  border-radius: 0.4rem;
  z-index: 20;
  height: 3rem;
  
  h1 {
    margin: 0;
  }

  @media screen and ${device.laptop} {
    width: 80vw;
    height: 3rem;
    justify-content: flex-start;
  }
`;

const CustomArrow = styled(ArrowIcon)<ArrowProps>`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  width: 1.5rem;
  background-color: white;
  stroke: orange;
  border-radius: 50%;
  transform: ${(props) =>  props.hRotation ? 'rotate(180deg)' : 'rotate(0deg)'};
  visibility: ${(props) => props.visible ? 'visible' : 'hidden'};
`;

const BannerStep = styled.div<{ isActive: boolean, isEnabled: boolean}>`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  align-items: center;
  justify-content: center;
  cursor: ${({isEnabled}) => isEnabled ? 'pointer' : 'not-allowed'};
  color: ${({isEnabled}) => isEnabled ? 'var(--primary)': 'white'};
  padding: 0.4rem;
  
  ${({isActive}) => isActive && `
     background-color: white;
     border-radius: 0.2rem;
     font-weight: bold;
  `}
`

export const ConfiguratorBanner: React.FC = () => {

    const steps: any = useSelector((state: RootState) => state.steps)
    const activeStepIndex: any = (useSelector((state: RootState) => state.steps) as any)
      .findIndex((step: any) => step.isCurrent)

    const dispatch = useDispatch()

    const isLaptop = useMediaQuery('laptop');

    const setStepActive = (step: StepProps) => {
        step.isEnabled && dispatch({type: 'steps/set-active', payload: step.title})
    }

  return <ConfiguratorBannerWrapper>
    {isLaptop && steps.map((step: any, index: number) =>
      <>
        <BannerStep isActive={step.isActive} isEnabled={step.isEnabled}
                    onClick={() => setStepActive(step)}>{step.title}</BannerStep>
        {index < steps.length - 1 && <CustomArrow visible/>}
      </>
    )}
    {!isLaptop && steps[activeStepIndex] && (<>
      <CustomArrow
        hRotation
        visible={activeStepIndex > 0 && steps[activeStepIndex - 1].isEnabled}
        onClick={() => setStepActive(steps[activeStepIndex - 1])}/>
      <h1>{steps[activeStepIndex].title}</h1>
      <CustomArrow
        visible={activeStepIndex < steps.length - 1 && steps[activeStepIndex + 1].isEnabled}
        onClick={() => setStepActive(steps[activeStepIndex + 1])}/>
    </>)
    }

  </ConfiguratorBannerWrapper>
}

