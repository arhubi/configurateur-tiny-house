import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Item, ItemProps } from '../atoms/Item'
import { useDispatch, useSelector } from 'react-redux'
import { device } from '../../theme/device'
import { RootState } from '../../store'

const ItemsGridWrapper = styled.div`
  display: flex;
  width: 100%;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  gap: 2rem;

  @media screen and ${device.laptop} {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 15rem));
    grid-auto-flow: initial;
    gap: 2rem;
    justify-items: start;
  }
`

type ItemsGridProps = {
  items: ItemProps[];
  onValidation?: () => void;
  onSelected?: (selectedItems: number[]) => void;
  onVisibleItemsChange?: (visibleItems: number[]) => void;
  category: string;
  required: boolean;
  multiple: boolean;
};
export const ItemsGrid: React.FC<ItemsGridProps> = ({ required, ...props }) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [visibleItems, setVisibleItems] = useState<number[]>([0])
  const dispatch = useDispatch()

  const storeItems: any = useSelector((state: RootState) => state.items)

  useEffect(() => {
    const defaultSelected = props?.items
      .map((item, index) => storeItems.find((storeItem: any) =>
        storeItem.name === item.name && storeItem.category === item.category) && index
      )
      .filter(item => item !== undefined)
    setSelectedItems(defaultSelected)
    // eslint-disable-next-line
  }, [])

  const reset = useSelector((state: RootState) => state.configurator.isReset)

  const handleClick = (index: number): void => {
    const item = props.items[index]

    if (!selectedItems.includes(index)) {
      if (item) {
        dispatch({type: 'items/add', payload: item})
        if (props.multiple) {
          setSelectedItems(selected => [...selected, index])
          props?.onSelected?.([...selectedItems, index])
        } else {
          selectedItems.length && dispatch({
            type: 'items/remove',
            payload: selectedItems.map((itemIndex: number) => props.items[itemIndex])
          })
          setSelectedItems([index])
          props?.onSelected?.([index])
        }
        props.onValidation?.();
      }
    } else {
      if (!required || (required && selectedItems.length > 1)) {
        setSelectedItems(selected => selected.filter(_index => _index !== index))
        props?.onSelected?.(selectedItems.filter(_index => _index !== index))
        dispatch({type: 'items/remove', payload: item})
      }
    }
  }

  const handleVisibilityChange = (itemIndex: any, status: any) => {
    setVisibleItems(visibleItems => status
      ? [...visibleItems, itemIndex]
      : visibleItems.filter(item => item !== itemIndex))
    props?.onVisibleItemsChange?.(visibleItems)
  }

  useEffect(() => {
    if (reset) {
      setSelectedItems([])
    }
  }, [reset])

  return (<ItemsGridWrapper>
    {props.items.map((item, index) =>
      <div key={index} onClick={() => handleClick(index)}>
        <Item {...item} isSelected={selectedItems.includes(index)} onVisibilityChange={(newVisibilityStatus) =>
          handleVisibilityChange(index, newVisibilityStatus)}/>
      </div>
    )}
  </ItemsGridWrapper>)
};
