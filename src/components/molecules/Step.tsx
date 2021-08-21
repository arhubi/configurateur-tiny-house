import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { ItemProps } from '../atoms/Item'
import { getDbItems } from '../../utils/notion'
import { useVisibility } from '../../hooks/useVisibility'
import { device } from '../../theme/device'

import { ItemsGrid } from './ItemsGrid'
import { Button } from '../atoms/Button'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { Dots } from './Dots'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'

const StepWrapper = styled.div<Partial<StepProps>>`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: var(--body-height-mobile);
  gap: 1rem;
  opacity: ${props => props.isEnabled ? 1 : 0.2};
  border-radius: 0.4rem;
  cursor: ${props => !props.isEnabled && 'not-allowed'};
  scroll-snap-align: start;

  @media screen and ${device.laptop} {
    flex-direction: row;
    min-height: auto;
    gap: 3rem;
  }

  * {
    cursor: ${props => !props.isEnabled && 'not-allowed'};
  }

  h1 {
    margin-bottom: 0;
  }
`

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 1rem 0.2rem 0;

  @media screen and ${device.laptop} {
    justify-content: flex-start;
  }
`

const StepProperties = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 0.2rem;
  font-size: 0.8rem;
  margin: 0.2rem 0.2rem 0.2rem 0;

  > span {
    background: var(--pure-white);
    color: black;
    margin: 0.2rem 0.4rem 0.2rem 0;
    padding: 0.2rem 0.4rem;
    border-radius: 0.2rem;
  }
`

const StepDescription = styled.div`
  text-align: center;
  width: 100%;

  p {
    margin: 0;
  }

  @media screen and ${device.laptop} {
    width: 16rem;
    text-align: left;
  }

  > h2 {
    margin: 0;
  }
`

const DotsWrapper = styled.div`
  position: absolute;
  bottom: 10rem;
  width: 100%;
  text-align: center;
`

export type StepProps = {
  title: string;
  notionDbId: string;
  itemsCount: number;
  isActive?: boolean;
  isEnabled?: boolean;
  isValidated?: boolean;
  isRequired?: boolean;
  isMultiple?: boolean;
  onStepDone?: () => void;
  onVisibilityChange?: (status: boolean) => void;
};
export const Step: React.FC<StepProps> = (
  {
    title,
    notionDbId,
    isEnabled = false,
    isActive = false,
    isValidated= false,
    isRequired = true,
    isMultiple = false,
    onStepDone,
    onVisibilityChange = () => {},
  }) => {
  const [items, setItems] = useState<ItemProps[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [isValidatable, setIsValidatable] = useState(false)
  const [visibleItems, setVisibleItems] = useState([0])
  const reference = useRef()

  const dispatch = useDispatch()

  const reset = useSelector((state: RootState) => state.configurator.isReset)

  const isLaptop = useMediaQuery('laptop')
  const isVisible = useVisibility(reference, '#steps', `0px 0px 0px 0px`)

  const handleClick = (e: React.MouseEvent) => !isEnabled && e.stopPropagation()

  const handleValidation = (validate?: boolean) => {
    if (isEnabled && (!isMultiple || validate)) {
      onStepDone?.()
      dispatch({ type: 'steps/set-validated', payload: title })
    }
    setIsValidatable(true)
  }

  const handleSelectedItems = (items: number[]) => {
    setSelectedItems(items)
  }

  useEffect(() => {
    isActive && (reference?.current as any).scrollIntoView()
  }, [isActive, reference])

  useEffect(() => {
    onVisibilityChange(isVisible)
    // eslint-disable-next-line
  }, [isVisible])

  const handleVisibleItemsChange = (newVisibleItems: number[]) => {
    setVisibleItems(newVisibleItems.length ? [newVisibleItems[newVisibleItems.length - 1]] : [0])
  }

  useEffect(() => {
    (async () => {
      const items: ItemProps[] = await getDbItems(title, notionDbId)
      setItems(items)
    })()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (reset) {
      setSelectedItems([])
    }
  }, [reset])

  return (
    <StepWrapper isEnabled={isEnabled} onClickCapture={e => handleClick(e)} ref={reference as any}>
      <StepDescription>
        {isLaptop &&
        <>
          <h2>{title}</h2>
          <StepProperties>
            {isRequired ? <span>Requis</span> : <span>Optionnel</span>}
            {isMultiple && <span>Choix multiples</span>}
          </StepProperties>
          <ActionsWrapper>
            {!isRequired && !selectedItems.length && !isValidated &&
            <Button text="Passer" icon="skip" textColor="var(--text-color)"
                    onClick={() => handleValidation(true)}/>}
            {isMultiple && selectedItems.length > 0 && isValidatable && !isValidated &&
            <Button text="Suivant" icon="arrow" textColor="var(--primary)" onClick={() => handleValidation(true)}/>
            }
          </ActionsWrapper>
        </>}
      </StepDescription>
      {items.length > 0 &&
      <ItemsGrid
        items={items}
        category={title}
        multiple={isMultiple}
        onValidation={handleValidation}
        onSelected={handleSelectedItems}
        onVisibleItemsChange={handleVisibleItemsChange}
        required={isRequired}
        validated={isValidated}
        />
      }
      {!isLaptop &&
      <>
        <DotsWrapper>
          <Dots itemsCount={items.length} selected={selectedItems} active={visibleItems}/>
        </DotsWrapper>
        <ActionsWrapper>
          {!isRequired && !selectedItems.length && !isValidated &&
          <Button text="Passer" icon="skip" textColor="var(--text-color)"
                  onClick={() => handleValidation(true)}/>
          }
          {isMultiple && selectedItems.length > 0 && isValidatable && !isValidated &&
          <Button text="Suivant" icon="arrow" textColor="var(--primary)"
                  onClick={() => handleValidation(true)}/>
          }
        </ActionsWrapper>
      </>
      }
    </StepWrapper>
  );
}
