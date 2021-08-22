import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { cssVar, rgba } from 'polished'
import { StepProps } from './Step'
import { Icon } from '../atoms/Icon'
import { RootState } from '../../store'
import { device } from '../../theme/device'
import { useMediaQuery } from '../../hooks/useMediaQuery'

type ArrowProps = {
  horizRotation?: boolean;
  visible?: boolean;
}

const ConfiguratorBannerWrapper = styled.div<ArrowProps>`
  display: flex;
  position: fixed;
  bottom: calc(6rem + env(safe-area-inset-bottom));
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem;
  overflow: scroll hidden;
  background-color: ${() => rgba(cssVar('--primary'), 1)};
  backdrop-filter: blur(10px);
  color: var(--bg-color);
  border-radius: 0.6rem;
  z-index: 20;
  height: var(--configurator-banner-height-mobile);
  width: 80vw;
  margin-top: 0.2rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.2) 0 0 0 1px;

  h2 {
    margin: 0;
  }

  @media screen and ${device.laptop} {
    position: sticky;
    top: 0;
    bottom: 0;
    width: 80vw;
    height: var(--configurator-banner-height);
    padding: 1.8rem 0.6rem;
    box-sizing: border-box;
    border-radius: 0.4rem;
    justify-content: flex-start;
    gap: 1rem;
  }
`;

const CustomArrow = styled.div<ArrowProps>`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  width: 1.5rem;
  background-color: var(--bg-color);
  stroke: var(--primary);
  border-radius: 50%;
  transform: ${(props) => props.horizRotation ? 'rotate(180deg)' : 'rotate(0deg)'};
  visibility: ${(props) => props.visible ? 'visible' : 'hidden'};
`;

const BannerStep = styled.div<{ isActive: boolean, isEnabled: boolean }>`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  align-items: center;
  justify-content: center;
  cursor: ${({isEnabled}) => isEnabled ? 'pointer' : 'not-allowed'};
  color: ${({isEnabled}) => isEnabled ? 'var(--bg-color)' : 'var(--text-color)'};
  padding: 0.4rem;

  ${({isActive}) => isActive && `
     color: var(--primary);
     background-color: var(--pure-white);
     border-radius: 0.2rem;
     font-weight: bold;
     box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.03) 0 0 0 1px;
  `}
`

const StepInfos = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const StepTitle = styled.div`
  h1 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
  }
`

const StepProperties = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.6rem;

  > span {
    background: var(--pure-white);
    color: black;
    margin: 0 0.4rem 0 0;
    padding: 0.2rem 0.4rem;
    border-radius: 0.2rem;
  }
`

export const ConfiguratorBanner: React.FC = () => {
  const steps: any = useSelector((state: RootState) => state.steps)
  const activeStepIndex: any = (useSelector((state: RootState) => state.steps) as any)
    .findIndex((step: any) => step.isActive)
  const dispatch = useDispatch()

  const isLaptop = useMediaQuery('laptop');

  const handleStepActivation = (step: StepProps) => {
    if (step.isEnabled && !step.isActive) {
      dispatch({type: 'scroll-selection/lock'})
      dispatch({type: 'steps/set-active', payload: step.title})
    }
  }

  return <ConfiguratorBannerWrapper>
    {isLaptop && steps.filter((step: any) => step.isEnabled).map((step: any, index: number) =>
      <React.Fragment key={step.title}>
        <BannerStep isActive={step.isActive} isEnabled={step.isEnabled} key={step.title}
                    onClick={() => handleStepActivation(step)}>{step.title}</BannerStep>
        {index < steps.length - 1 &&
        <Icon kind="chevron-right" color={steps[index + 1]?.isEnabled ? "var(--bg-color)" : "var(--text-color)"}/>}
      </React.Fragment>
    )}
    {!isLaptop && steps[activeStepIndex] && (<>
      <CustomArrow horizRotation
                   visible={activeStepIndex > 0 && steps[activeStepIndex - 1].isEnabled}
                   onClick={() => handleStepActivation(steps[activeStepIndex - 1])}>
        <Icon kind="chevron-right" color="var(--text-color)"/>
      </CustomArrow>
      <StepInfos>
        <StepTitle><h1>{steps[activeStepIndex].title}</h1></StepTitle>
        <StepProperties>
          {steps[activeStepIndex].required ? <span>Requis</span> : <span>Optionnel</span>}
          {steps[activeStepIndex].multiple && <span>Choix multiples</span>}
        </StepProperties>
      </StepInfos>
      <CustomArrow
        visible={activeStepIndex < steps.length - 1 && steps[activeStepIndex + 1].isEnabled}
        onClick={() => handleStepActivation(steps[activeStepIndex + 1])}>
        <Icon kind="chevron-right" color="var(--primary)"/>
      </CustomArrow>
    </>)
    }
  </ConfiguratorBannerWrapper>
}

