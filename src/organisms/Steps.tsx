import { Step, StepProps } from "../molecules/Step";
import React, {useRef, useState} from "react";
import styled from "styled-components";

const StepWrapper = styled.div<Partial<StepProps>>`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  scroll-snap-type: y mandatory;
  overflow: scroll;
  height: 45rem;
  scroll-behavior: smooth;
`;

type StepsProps = {
    steps: StepProps[];
    ref?: React.Ref<HTMLDivElement>;
}

export const Steps: React.FC<StepsProps> = ({ steps }) => {
    const [activeSteps, setActiveSteps] = useState([0]);
    const reference = useRef<HTMLDivElement>(null);

    const handleStepDone = (index: number) => {
        if (reference.current) {
            reference.current.scrollTop += 300;
        }
        if (index + 1 < steps.length) {
            setActiveSteps((activeSteps) => [...activeSteps, index + 1]);
        }
    };

    return (<StepWrapper ref={reference}>
        {steps.map((step, index) =>
            <Step {...step}
                  key={index}
                  onStepDone={() => handleStepDone(index)}
                  isActive={activeSteps.includes(index)}
            />)
        }
    </StepWrapper>)
};

