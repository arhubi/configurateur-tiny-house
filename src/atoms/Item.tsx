import React from 'react';
import styled from "styled-components";

export type ItemProps = {
    name: string;
    price: number;
    image?: string;
    category?: string;
    isSelected?: boolean;
    onClick?: () => void;
}

const ItemCard = styled.div<Partial<ItemProps>>`
  height: 15rem;
  width: 10rem;
  border-radius: 0.4rem;
  background-color: white;
  box-shadow: ${({isSelected}) => isSelected 
          ? '0 0 0px 3px orange'
: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px' };
  
  :hover {
    cursor: pointer;
  }
  
  img {
    width: 9.4rem;
    border-radius: 0.4rem;
    padding: 0.3rem;
  }
  
  .item-content {
    padding: 0.4rem; 
    
    .item-name {
      font-size: 1.2rem;
    }
  }
`;

export const Item: React.FC<ItemProps> = (
    {
        name,
        price,
        image,
        isSelected = false
    }) => {
    return <ItemCard isSelected={isSelected}>
        <img src={image} alt="item" />
        <div className="item-content">
            <div className="item-name">{ name }</div>
            <div>{ price } €</div>
        </div>
    </ItemCard>
};
