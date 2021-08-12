import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { cssVar, rgba } from 'polished'
import { device } from '../../theme/device'
import { useVisibility } from '../../hooks/useVisibility'
import { Image} from './Image'

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
  width: 89.4vw;
  max-height: 50vh;
  margin: 0.2rem;
  border-radius: 0.4rem;
  background-color: ${({isSelected}) => isSelected 
    ? () => rgba(cssVar('--primary'), 0.4) 
    : 'var(--pure-white)'};
  box-shadow: ${({isSelected}) => isSelected 
    ? 'rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.1) 0 0 0 1px'
    : `rgba(0, 0, 0, 0.05) 0 6px 24px 0, ${rgba(cssVar('--primary'), 0.03)} 0 0 0 1px`};
  transition: all 100ms ease-in;
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
      color: var(--bg-color);
      font-size: 1.2rem;
    }

    > div:nth-child(2) {
      position: absolute;
      bottom: 0;
      right: 0;
      color: var(--bg-color);
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
      background: ${({isSelected}) => () => rgba(cssVar('--primary'), isSelected ? 0.6 : 0.3)};
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
  background: ${() => rgba(cssVar('--primary'), 0.6)};

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 0.3rem;
  }

  @media screen and ${device.laptop} {
    height: 8rem;
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
        <Image src={image} alt="item" fallbackIconSize={"40"} />
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
