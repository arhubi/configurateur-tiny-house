import { Step, StepProps } from "../molecules/Step"
import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { LoadingScreen } from "../molecules/LoadingScreen"
import { RootState } from "../store";
import { device } from "../theme/device";

const StepWrapper = styled.div<Partial<StepProps>>`
  display: flex;
  flex-direction: column;
  gap: 10vw;
  padding-bottom: 2rem;
  scroll-snap-type: y mandatory;
  overflow: scroll;
  height: 40rem;
  scroll-behavior: smooth;
    
  @media screen and ${device.laptop} {
      gap: 3rem;
  }
`;

type StepsProps = {
    steps: StepProps[];
    isLoading: boolean;
    ref?: React.Ref<HTMLDivElement>;
}

export const Steps: React.FC<StepsProps> = ({ steps, isLoading }) => {
    const [enabledSteps, setEnabledSteps] = useState([steps?.[0]?.title] || [])
    const [visibleSteps, setVisibleSteps] = useState<number[]>([])
    const [activeStep, setActiveStep] = useState<StepProps | undefined>(steps[0])

    const isLaptop = useMediaQuery('laptop')

    const dispatch = useDispatch()
    const selectionByScroll = useSelector((state: RootState) => state.selectionByScroll)

    useEffect(() => {
        !isLoading && setEnabledSteps(enabledSteps => [...enabledSteps, steps?.[0]?.title])
        // eslint-disable-next-line
    }, [isLoading])

    useEffect(() => {
        dispatch({type: 'scroll-selection/lock'})
        dispatch({type: 'steps/set-active', payload: activeStep})
    }, [activeStep, dispatch])

    useEffect(() => {
        dispatch({type: 'steps/set-enabled-all', payload: enabledSteps})
    }, [enabledSteps, dispatch])

    useEffect(() => {
        console.log(visibleSteps)
        const firstVisibleIndex = isFinite(Math.min(...visibleSteps)) && Math.min(...visibleSteps)
        if (!selectionByScroll && firstVisibleIndex && steps[firstVisibleIndex] === steps.find(step => step.isActive)) {
            dispatch({type: 'scroll-selection/unlock'})
        }
        // eslint-disable-next-line
    }, [steps, activeStep, visibleSteps, dispatch])

    const handleStepDone = (index: number) => {
        if (index + 1 < steps.length) {
            setEnabledSteps((enabledSteps) => [...enabledSteps, steps[index + 1].title]);
            setActiveStep(steps[index + 1])
        }
    }

    const handleVisibilityChange = (index: number, visible: boolean) => {
        setVisibleSteps(_visibleSteps => visible
          ? [..._visibleSteps, index]
          : _visibleSteps.filter(stepIndex => stepIndex !== index))
    }

    const handleScroll = () => {
        if (!selectionByScroll) return
        const activeStepIndex = Math.min(...visibleSteps)
        if (activeStepIndex > - 1 && steps[activeStepIndex].isEnabled) {
            dispatch({type: 'steps/set-active', payload: steps[activeStepIndex]})
        }
    }

    return (<StepWrapper id="steps" onScroll={() => handleScroll()}>
        {!isLoading && steps.map((step, index) =>
            <Step {...step}
                  key={index}
                  onStepDone={() => handleStepDone(index)}
                  onVisibilityChange={(newVisibilityStatus) =>
                    handleVisibilityChange(index, newVisibilityStatus)}
                  isEnabled={enabledSteps.includes(step.title)}
                  showTitle={isLaptop}
            />)
        }
        {isLoading && <LoadingScreen />}
    </StepWrapper>)
};

