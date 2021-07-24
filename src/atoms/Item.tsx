import React from 'react'
import styled from "styled-components"
import { Icon } from "./Icon"

type Detail = {
  name: string;
  value: string;
}

export type ItemProps = {
    name: string;
    price: number;
    image?: string;
    details?: Detail[];
    category?: string;
    isSelected?: boolean;
    onClick?: () => void;
}

const ItemCard = styled.div<Partial<ItemProps>>`
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 15rem;
  width: 15rem;
  border-radius: 0.4rem;
  margin: 0.2rem;

  :hover {
    cursor: pointer;
  }
`;

const ItemTopBlock = styled.div<Partial<ItemProps>>`
  display: flex;
  position: relative;
  border-radius: 0.4rem;
  margin: 0.1rem;
  z-index: 10;
  box-shadow: ${({isSelected}) => isSelected
          ? '0 0 0px 0.25rem orange'
          : '0 0 0px 0px orange' };
  transition: box-shadow 100ms ease-in;
`

const ItemMainInfos = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0.4rem;
  box-sizing: border-box;

  > div {
    position: relative;
    height: 100%;
    
    > div:nth-child(1) {
      position: absolute;
      top: 0;
      left: 0;
      color: white;
      font-size: 1.2rem;
    }

    > div:nth-child(2) {
      position: absolute;
      bottom: 0;
      right: 0;
      color: white;
      font-size: 1.2rem;
    }
  }
  
  `

const ItemComplInfos = styled.div<Partial<ItemProps>>`
  display: grid;
  scroll-snap-type: y mandatory;
  position: relative;
  overflow: scroll;
  grid-template-columns: 1fr;
  background-color: ${({isSelected}) => isSelected ? 'rgba(255, 165, 0, 0.4)' : 'white'};
  transition: background-color 100ms ease-in;
  margin: 0 0.4rem 0;
  border-radius: 0 0.4rem 0.4rem;
  padding: 0.4rem;
  
  > div {
    display: flex;
    justify-content: space-between;
    border-radius: 0.4rem;
    padding: 0.3rem;
    
    > p {
      margin: 0;
    }

    :hover {
      background: white;
    }
  }
`

const ItemImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.4rem;
  background: rgba(51, 51, 51, .8);
  height: 7rem;
  width: 100%;

  img {
    height: 100%;
    width: 100%;
    border-radius: 0.4rem;
  }
`

export const Item: React.FC<ItemProps> = (
    {
        name,
        price,
        image,
        details,
        isSelected = false
    }) =>
      <ItemCard>
        <ItemTopBlock isSelected={isSelected}>
          <ItemImage>
            {image
              ? <img src={image} alt="item" />
              : <Icon kind="camera-off" color="white" width="30" height="30" />}
          </ItemImage>
          <ItemMainInfos>
            <div>
              <div>{ name }</div>
              <div>{ price } €</div>
            </div>
          </ItemMainInfos>
        </ItemTopBlock>
        {details && details.length > 0 && <ItemComplInfos isSelected={isSelected}>
          {details?.map(detail => <div><p>{detail.name}</p><p>{detail.value}</p></div>)}
        </ItemComplInfos>}
    </ItemCard>
