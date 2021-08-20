import { Step, StepProps } from '../molecules/Step'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
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
    const [visibleSteps, setVisibleSteps] = useState<number[]>([])

    const dispatch = useDispatch()

    const selectionByScroll = useSelector((state: RootState) => state.selectionByScroll)
    const activeStep = useSelector((state: RootState) => state.steps.find((step: any) => step.isActive))

    useEffect(() => {
        !isLoading && dispatch({
            type: 'steps/set-enabled',
            payload: steps?.[0]
        })
        // eslint-disable-next-line
    }, [isLoading])

    useEffect(() => {
        dispatch({type: 'scroll-selection/lock'})
    }, [activeStep, dispatch])

    useEffect(() => {
        const firstVisibleIndex = isFinite(Math.min(...visibleSteps)) && Math.min(...visibleSteps)
        if (!selectionByScroll && firstVisibleIndex > - 1 && steps[firstVisibleIndex || 0] === activeStep) {
            dispatch({type: 'scroll-selection/unlock'})
        }
    }, [selectionByScroll, steps, activeStep, visibleSteps, dispatch])

    const handleStepDone = (index: number) => {
        if (index + 1 < steps.length) {
            dispatch({ type: 'steps/set-enabled', payload: steps[index + 1]})
            dispatch({ type: 'steps/set-active', payload: steps[index + 1]})
        }
    }

    const handleVisibilityChange = (index: number, visible: boolean) => {
        setVisibleSteps(_visibleSteps => visible
          ? [..._visibleSteps, index]
          : _visibleSteps.filter(stepIndex => stepIndex !== index))
    }

    const handleScroll = () => {
        const firstVisibleIndex = isFinite(Math.min(...visibleSteps)) ? Math.min(...visibleSteps) : 0
        if (!selectionByScroll) {
            return
        }
        if (firstVisibleIndex > -1 && steps[firstVisibleIndex]?.isEnabled && activeStep !== steps[firstVisibleIndex]) {
            dispatch({type: 'steps/set-active', payload: steps[firstVisibleIndex]})
        }
    }

    return (<StepsWrapper id="steps" onScroll={() => handleScroll()}>
        {!isLoading && steps.map((step, index) =>
            <Step {...step}
                  key={index}
                  onStepDone={() => handleStepDone(index)}
                  onVisibilityChange={(newVisibilityStatus) =>
                    handleVisibilityChange(index, newVisibilityStatus)}
            />)})
        {isLoading && <LoadingScreen />}
    </StepsWrapper>)
}
