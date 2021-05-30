import React, { useState } from 'react';
import styled from "styled-components";
import { Item, ItemProps } from '../atoms/Item';
import { EmptyItem } from '../atoms/EmptyItem';
import { useDispatch } from "react-redux";

const ItemsGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  h1 {
    font-size: 2rem;
  }
`

type ItemsGridProps = {
    items: ItemProps[];
    onItemSelected?: (index: number) => void;
    category: string;
    required: boolean;
    multiple: boolean;
};
export const ItemsGrid: React.FC<ItemsGridProps> = props => {
    const [selected, setSelected] = useState<number[]>([])
    const dispatch = useDispatch()

    const handleClick = (index: number): void => {
        const item = props.items[index]

        if (index > props.items.length) {
            selected.forEach(_index => dispatch({type: 'items/remove', payload: props.items[_index]}))
            setSelected([props.items.length + 1])
            props.onItemSelected?.(index);
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
                    props.onItemSelected?.(index);
                }
            }
        } else if (props.multiple) {
            setSelected(selected => selected.filter(_index => _index !== index))
            dispatch({type: 'items/remove', payload: item})
        }
    }

    return (<ItemsGridWrapper>
        {props.items.map((item, index) =>
            <div key={index} onClick={() => handleClick(index)}>
                <Item {...item} isSelected={selected.includes(index)} />
            </div>
        )}
        {!props.required && <EmptyItem
            isSelected={selected.includes(props.items.length + 1)}
            onClick={() => handleClick(props.items.length + 1)} />}
    </ItemsGridWrapper>)
};
