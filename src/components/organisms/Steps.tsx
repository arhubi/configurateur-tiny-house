import { Step, StepProps } from '../molecules/Step'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { LoadingScreen } from '../molecules/LoadingScreen'
import { RootState } from '../../store'
import { device } from '../../theme/device'

const StepsWrapper = styled.div<Partial<StepProps>>`
    display: flex;
    flex-direction: column;
    gap: 10vw;
    scroll-snap-type: y mandatory;
    overflow: scroll;
    scroll-behavior: smooth;
    width: 90vw;
    height: calc(90vh - var(--header-height-mobile) - var(--configurator-banner-height-mobile));
    
    > div:nth-last-child(1) {
        margin-bottom: calc(40rem);
    }

    @media screen and ${device.laptop} {
        height: calc(80vh - var(--header-height) - var(--configurator-banner-height));
        width: 100%;
        gap: 3rem;
    }
`

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
        const firstVisibleIndex = isFinite(Math.min(...visibleSteps)) && Math.min(...visibleSteps)
        if (!selectionByScroll && firstVisibleIndex && steps[firstVisibleIndex] === steps.find(step => step.isActive)) {
            dispatch({type: 'scroll-selection/unlock'})
        }
    }, [selectionByScroll, steps, activeStep, visibleSteps, dispatch])

    const handleStepDone = (index: number) => {
        if (index + 1 < steps.length) {
            setEnabledSteps((enabledSteps) => [...enabledSteps, steps[index + 1].title])
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
        if (activeStepIndex > -1 && steps[activeStepIndex]?.isEnabled) {
            dispatch({type: 'steps/set-active', payload: steps[activeStepIndex]})
        }
    }

    return (<StepsWrapper id="steps" onScroll={() => handleScroll()}>
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
    </StepsWrapper>)
}
