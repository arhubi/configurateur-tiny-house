import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Icon } from './Icon'
import { device } from '../theme/device'
import { useVisibility } from '../hooks/useVisibility'

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
  onVisibilityChange?: (status: boolean) => void;
}

const ItemCard = styled.div<Partial<ItemProps>>`
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 20rem;
  width: 89.6vw;
  height: 50vh;
  margin: 0.2rem;
  border-radius: 0.4rem;
  background-color: ${({isSelected}) => isSelected ? 'rgba(255, 165, 0, 0.3)' : 'white'};
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.08) 0 0 0 1px;
  transition: box-shadow 100ms ease-in, background-color 100ms ease-in;
  scroll-snap-align: start;

  @media screen and ${device.laptop} {
    max-height: 15rem;
    height: auto;
    width: 15rem;
    margin: 0.2rem;
  }

  :hover {
    cursor: pointer;
  }
`;

const ItemTopBlock = styled.div<Partial<ItemProps>>`
  display: flex;
  position: relative;
  margin: 0.3rem;
  border-radius: 0.3rem;
  z-index: 0;

  transition: box-shadow 100ms ease-in;

  &::after {
    content: '';
    display: flex;
    opacity: ${({isSelected}) => isSelected ? 1 : 0};
    position: absolute;
    left: -0.3rem;
    top: -0.3rem;
    background: orange;
    width: calc(100% + 0.6rem);
    height: calc(100% + 0.6rem);
    z-index: -1;
    border-radius: 0.4rem;
    transition: opacity 100ms ease-in;
  }
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
    
    > button {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

`

const ItemComplInfos = styled.div<Partial<ItemProps>>`
  display: grid;
  scroll-snap-type: y mandatory;
  position: relative;
  overflow: scroll;
  grid-template-columns: 1fr;
  transition: background-color 100ms ease-in;
  margin-bottom: 0.2rem;
  border-radius: 0 0 0.4rem 0.4rem;
  padding: 0.2rem;

  > div {
    display: flex;
    justify-content: space-between;
    border-radius: 0.4rem;
    padding: 0.3rem;

    > p {
      margin: 0;
    }

    :hover {
      transition: background 200ms ease-in;
      background: ${({isSelected}) => isSelected ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 165, 0, 0.3)'};
    }
  }
`

const ItemImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.3rem;
  height: 12rem;
  width: 100%;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 0.3rem;
  }

  @media screen and ${device.laptop} {
    height: 8rem;
    background: rgba(51, 51, 51, .6);
  }
`

export const Item: React.FC<ItemProps> = (
  {
    name,
    price,
    image,
    details,
    isSelected = false,
    onVisibilityChange
  }) => {
  const reference = useRef()
  const isVisible = useVisibility(reference, null, '0px')

  useEffect(() => {
    onVisibilityChange?.(isVisible)
    // eslint-disable-next-line
  }, [isVisible])

  return <ItemCard ref={reference as any} isSelected={isSelected}>
    <ItemTopBlock isSelected={isSelected}>
      <ItemImage>
        {image
          ? <img src={image} alt="item"/>
          : <Icon kind="camera-off" color="white" strokeWidth={1} width="30" height="30"/>}
      </ItemImage>
      <ItemMainInfos>
        <div>
          <div>{name}</div>
          <div>{price} €</div>
        </div>
      </ItemMainInfos>
    </ItemTopBlock>
    {details && details.length > 0 &&
      <ItemComplInfos isSelected={isSelected}>
        {details?.map(detail =>
          <div key={detail.name}>
            <p>{detail.name}</p>
            <p>{detail.value}</p>
          </div>)
        }
      </ItemComplInfos>
    }
  </ItemCard>
}
