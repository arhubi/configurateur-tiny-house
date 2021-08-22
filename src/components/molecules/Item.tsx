import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { cssVar, rgba } from 'polished'
import { device } from '../../theme/device'
import { useVisibility } from '../../hooks/useVisibility'
import { Image} from '../atoms/Image'
import { Button } from '../atoms/Button'

type Detail = {
  name: string;
  value: string;
}

const ItemCard = styled.div<Partial<ItemProps>>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 89.4vw;
  max-height: 50vh;
  margin: 0.2rem;
  border-radius: 0.6rem;
  background-color: ${({isSelected}) => isSelected
          ? () => rgba(cssVar('--primary-light'), 0.05)
          : 'var(--pure-white)'};
  border: ${({isSelected}) => isSelected
    ? '1px solid var(--primary-light);'
    : '1px solid rgba(0, 0, 0, 0.2)'};
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

export type SupplierProps = {
  id: string;
  name: string;
  url?: string;
}

export type ItemProps = {
  name: string;
  price: number;
  image?: string;
  supplier?: SupplierProps;
  url: string;
  details?: Detail[];
  category?: string;
  isSelected?: boolean;
  onClick?: () => void;
  onVisibilityChange?: (status: boolean) => void;
}

const ItemTopBlock = styled.div<Partial<ItemProps>>`
  display: flex;
  position: relative;
  margin: 0.4rem;
  border-radius: 0.4rem;
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

    > div:nth-child(2) {
      position: absolute;
      bottom: 0;
      right: 0;
      color: var(--bg-color);
      font-size: 1.2rem;
    }
    
    > Button {
      position: absolute;
      right: 0;
    }
  }
`

const MainInfosLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: var(--bg-color);
  font-size: 1.2rem;
  text-align: left;

  > div:nth-child(2) {
    font-size: 0.8rem;
  }
`

const ItemComplInfos = styled.div<Partial<ItemProps>>`
  display: grid;
  scroll-snap-type: y mandatory;
  overflow: scroll;
  transition: color 100ms ease-in;
  margin-bottom: 0.4rem;
  border-radius: 0 0 0.4rem 0.4rem;
  padding: 0 0.4rem 0.4rem;
  grid-auto-rows: minmax(min-content, max-content);

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.4rem;
    padding: 0.3rem;
    flex-shrink: 1;

    > p {
      margin: 0;
    }

    :hover {
      transition: background 200ms ease-in;
      background: ${({isSelected}) => () => 
              rgba(cssVar(isSelected ? '--pure-white' : '--primary-light'), isSelected ? 1 : 0.2)};
    }
  }
`

const ItemImage = styled.div<Partial<ItemProps>>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.4rem;
  height: 12rem;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.05) 0 0 0 1px;
  background: ${({isSelected}) => () => isSelected 
          ? rgba(cssVar('--primary-light'), 0.4)
          : rgba(cssVar('--primary-light'), 0.2)};

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 0.4rem;
  }

  @media screen and ${device.laptop} {
    height: 8rem;
  }
`

const ItemSupplier = styled.div<Partial<ItemProps>>`
  font-size: 0.8rem;
  padding: 0 0.4rem 0.4rem;
  
  a:hover {
    text-decoration: underline;
  }
`

export const Item: React.FC<ItemProps> = (
  {
    name,
    price,
    image,
    details,
    isSelected = false,
    onVisibilityChange,
    url,
    supplier
  }) => {
  const reference = useRef()
  const isVisible = useVisibility(reference, null, '0px')

  const supplierClick = (e: MouseEvent) => {
    e.stopPropagation()
    // window.open('')
  }

  useEffect(() => {
    onVisibilityChange?.(isVisible)
    // eslint-disable-next-line
  }, [isVisible])

  return <ItemCard ref={reference as any} isSelected={isSelected}>
    <ItemTopBlock isSelected={isSelected}>
      <ItemImage isSelected={isSelected}>
        <Image src={image} alt="item" fallbackIconSize={"40"} />
      </ItemImage>
      <ItemMainInfos>
        <div>
          <MainInfosLeft>
            <div>{name}</div>
          </MainInfosLeft>
          <div>{price} €</div>
          {url && <Button icon="link" size="small" onClick={() => window.open(url, "_blank")} />}
        </div>
      </ItemMainInfos>
    </ItemTopBlock>
    {supplier && <ItemSupplier isSelected={isSelected}>
      <a onClick={(event) => supplierClick(event as any)}
         href={supplier.url && `https://${supplier.url}`} target="_blank" rel="noreferrer">{supplier.name}</a>
    </ItemSupplier>}
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
