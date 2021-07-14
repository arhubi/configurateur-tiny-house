import React, { useState } from 'react';
import styled from "styled-components";
import { Item, ItemProps } from '../atoms/Item';
import { useDispatch } from "react-redux";
import { device } from "../theme/device";

const ItemsGridWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  overflow-x: scroll;
  grid-auto-flow: column;
    align-items: center;

  @media screen and ${device.laptop} {  
    grid-auto-rows: minmax(150px, 1fr);
    grid-auto-flow: initial;
    gap: 2rem;
  }
`

type ItemsGridProps = {
    items: ItemProps[];
    onValidation?: () => void;
    onSelected?: (selectedItems: number[]) => void;
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
            props?.onSelected?.([props.items.length + 1])
            !props.multiple && props.onValidation?.();
        } else if (!selected.includes(index)) {
            setSelected(selected => selected.filter(index => index !== (props.items.length + 1)))
            if (item) {
                if (props.multiple) {
                    dispatch({type: 'items/add', payload: item})
                    setSelected(selected => [...selected, index])
                    props?.onSelected?.([...selected, index])
                } else {
                    selected.length && dispatch({type: 'items/remove', payload: props.items[selected[0]]})
                    dispatch({type: 'items/add', payload: item})
                    setSelected([index])
                    props?.onSelected?.([index])
                    props.onValidation?.();
                }
            }
        } else {
            if (!props.required || (props.required && selected.length > 1)) {
                setSelected(selected => selected.filter(_index => _index !== index))
                props?.onSelected?.(selected.filter(_index => _index !== index))
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
    </ItemsGridWrapper>)
};
