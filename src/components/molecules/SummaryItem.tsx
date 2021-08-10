import React from 'react'
import styled from 'styled-components'
import { ItemProps } from '../atoms/Item'
import { Image } from '../atoms/Image'

const SummaryItemWrapper = styled.div`
  display: flex;
  padding: 0.2rem;
  background: var(--bg-color);
  border-radius: 0.4rem;
  height: 3rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.03) 0 0 0 1px;
`

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;

  > img, svg {
    border-radius: 0.4rem;
    width: 4rem;
    object-fit: cover;
  }

  > img {
    align-self: stretch;
  }
`

const ItemInfos = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  
  > :last-child {
    font-weight: bold;
  }
`

export const SummaryItem: React.FC<Partial<ItemProps>> = ({ name, price, image }) => {
  return <SummaryItemWrapper>
    <ImageWrapper>
      <Image src={image} alt={name} fallbackIconColor="var(--primary)" fallbackIconSize="20px"/>
    </ImageWrapper>
    <ItemInfos>
      <span>{name}</span>
      <span>{price} €</span>
    </ItemInfos>
  </SummaryItemWrapper>
}
