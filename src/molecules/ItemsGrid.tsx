import React, { useState } from 'react';
import styled from "styled-components";
import { Item, ItemProps } from '../atoms/Item';
import { EmptyItem } from '../atoms/EmptyItem';
import { useDispatch } from "react-redux";
import { device } from "../theme/device";

const ItemsGridWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  overflow-x: scroll;
  grid-auto-flow: column;

  @media screen and ${device.laptop} {  
    grid-auto-rows: minmax(150px, 1fr);
    grid-auto-flow: initial;
 }
`

const Button = styled.button`
  display: flex;
  align-items: center;
  appearance: none;
  background-color: orange;
  border: none;
  border-radius: 0.4rem;
  color: white;
  padding: 0.4rem;
  margin-top: 0.2rem;
  cursor: pointer;
  font-size: 1rem;
  
  svg {
    margin-left: 0.4rem;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
    
  .keyboard-hint {
      display: none;
      
      @media screen and ${device.laptop} {
        display: block;  
        font-size: 0.8rem;
      }
  }
`

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
`


type ItemsGridProps = {
    items: ItemProps[];
    onValidation?: () => void;
    isValidated?: boolean;
    category: string;
    required: boolean;
    multiple: boolean;
};
export const ItemsGrid: React.FC<ItemsGridProps> = (props) => {
    const [selected, setSelected] = useState<number[]>([])
    const dispatch = useDispatch()

    const handleClick = (index: number): void => {
        const item = props.items[index]

        if (index > props.items.length) {
            selected.forEach(_index => dispatch({type: 'items/remove', payload: props.items[_index]}))
            setSelected([props.items.length + 1])
            !props.multiple && props.onValidation?.();
        } else if (!selected.includes(index)) {
            setSelected(selected => selected.filter(index => index !== (props.items.length + 1)))
            if (item) {
                if (props.multiple) {
                    dispatch({type: 'items/add', payload: item})
                    setSelected(selected => [...selected, index])
                } else {
                    selected.length && dispatch({type: 'items/remove', payload: props.items[selected[0]]})
                    dispatch({type: 'items/add', payload: item})
                    setSelected([index])
                    props.onValidation?.();
                }
            }
        } else {
            if (!props.required || (props.required && selected.length > 1)) {
                setSelected(selected => selected.filter(_index => _index !== index))
                dispatch({type: 'items/remove', payload: item})
            }
        }
    }

    return (<ItemsGridWrapper>
        {props.items.map((item, index) =>
            <div key={index} onClick={() => handleClick(index)}>
                <Item {...item} isSelected={selected.includes(index)} />
            </div>
        )}
        <ActionsWrapper>
        {!props.required && selected.length === 0 &&
            <EmptyItem
                isSelected={selected.includes(props.items.length + 1)}
                onClick={() => props.onValidation?.()}
            />}
        {props.multiple && selected.length > 0 && !props.isValidated &&
            <ButtonWrapper onClick={() => props.onValidation?.()}>
                <Button>Suivant
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right"
                         width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <line x1="15" y1="16" x2="19" y2="12"/>
                        <line x1="15" y1="8" x2="19" y2="12"/>
                    </svg>
                </Button>
            </ButtonWrapper>
        }</ActionsWrapper>

    </ItemsGridWrapper>)
};
