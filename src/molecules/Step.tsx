import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components"

import { ItemProps } from "../atoms/Item"
import { getDbItems } from "../utils/notion"
import { useVisibility } from "../hooks/useVisibility"
import { device } from "../theme/device"
import '../app.css'

import { ItemsGrid } from "./ItemsGrid"
import { Button } from "../atoms/Button";

const StepWrapper = styled.div<Partial<StepProps>>`
  display: flex;
  flex-direction: column;
  min-height: var(--body-height-mobile);
  gap: 3rem;
  opacity: ${props => props.isEnabled ? 1 : 0.2};
  border-radius: 0.4rem;
  padding: 1rem;
  cursor: ${props => !props.isEnabled && 'not-allowed'};
  
  @media screen and ${device.laptop} {
    flex-direction: row;
    min-height: auto;
}

  * {
    cursor: ${props => !props.isEnabled && 'not-allowed'};
  }
  
  scroll-snap-align: start;
  animation: fade-in 1000ms ease;
  
  h1 {
    margin-bottom: 0;
  }
  
  .step-description {
    text-align: center;
    width: 100%;
    
    p {
      margin: 0;
    }
    
    @media screen and ${device.laptop} {
      width: 30%;
      text-align: left;
    }
    
    > h2 {
      margin: 0;
    }
  }
  
  @keyframes fade-in {
    0% { 
      opacity: 0;
    }
  }
`

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  
  @media screen and ${device.laptop} {
    justify-content: flex-start;
  }
`

export type StepProps = {
    title: string;
    notionDbId: string;
    itemsCount: number;
    isActive?: boolean;
    isEnabled?: boolean;
    required?: boolean;
    multiple?: boolean;
    showTitle?: boolean;
    onStepDone?: () => void;
    onVisibilityChange?: (status: boolean) => void;
};
export const Step: React.FC<StepProps> = (
    {
        title,
        notionDbId,
        isEnabled = false,
        isActive = false,
        required = true,
        onStepDone,
        onVisibilityChange,
        multiple = false,
        showTitle= true
    }) => {
    const [items, setItems] = useState<ItemProps[]>([])
    const [isValidated, setIsValidated] = useState(false)
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const reference = useRef()
    const isVisible = useVisibility(reference, '0px 0px 0px 0px')

    const handleClick = (e: React.MouseEvent) => !isEnabled && e.stopPropagation()

    const handleValidation = () => {
        if (isEnabled) {
          onStepDone?.()
          setIsValidated(true)
        }
    }

    const handleSelectedItems = (items: number[]) => {
      setSelectedItems(items)
    }

    useEffect(() => {
        isActive && (reference?.current as any).scrollIntoView()
    }, [isActive, reference])

    useEffect(() => {
      onVisibilityChange?.(isVisible)
      // eslint-disable-next-line
    }, [isVisible])

    useEffect(() => {
        (async () => {
            const items: ItemProps[] = await getDbItems(title, notionDbId)
            setItems(items)
        })()
    // eslint-disable-next-line
    }, [])

    return (
        <StepWrapper isEnabled={isEnabled} onClickCapture={e => handleClick(e)} ref={reference as any}>
            <div className="step-description">
                {showTitle && <h2>{ title } { required && '*'}</h2>}
                {multiple
                    ? <p>Plusieurs choix possibles</p>
                    : <p>Un choix possible</p>}
              <ActionsWrapper>
                {!required && !selectedItems.length &&
                  <Button text="Passer" icon="skip" bgColor="var(--primary)" onClick={() => handleValidation()} />}
                {multiple && selectedItems.length > 0 && !isValidated &&
                  <Button text="Suivant" icon="arrow" bgColor="orange" onClick={() => handleValidation()} />
                }
              </ActionsWrapper>
            </div>
            {items.length > 0 &&
              <ItemsGrid
                items={items}
                category={title}
                multiple={multiple}
                onValidation={handleValidation}
                onSelected={handleSelectedItems}
                required={required}
                isValidated={isValidated}/>
            }
        </StepWrapper>
    );
}
