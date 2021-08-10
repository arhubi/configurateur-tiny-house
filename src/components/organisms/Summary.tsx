import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { Button } from '../atoms/Button'
import { device } from '../../theme/device'
import { SummaryItem } from '../molecules/SummaryItem'

export type SummaryProps = {};

const SummaryWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 4rem;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--pure-white);
  padding: 2rem 0 1rem;
  border-radius: 1rem 1rem 0 0;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.03) 0 0 0 1px;
  z-index: 10;

  @media screen and ${device.laptop} {
    position: relative;
    width: auto;
    height: calc(80vh - var(--configurator-banner-height) - var(--header-height));
    justify-content: space-between;
    margin: 0 2rem 2rem 2rem;
    padding: 0.4rem;
    border-radius: 0.6rem;
  }

  h1, h2 {
    margin: 0;
  }
`

const ItemsWrapper = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  align-items: start;
  gap: 0.4rem;
`

export const Summary: React.FC<SummaryProps> = () => {
  const selectedItems = useSelector((state: RootState) => state.items)
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0)

  const isLaptop = useMediaQuery('laptop')

  return (
    <SummaryWrapper>
      <ItemsWrapper>
      {selectedItems.map(item => <SummaryItem {...item} />)}
      </ItemsWrapper>
      {isLaptop && <h2>Bilan des courses</h2>}
      <h2>{totalPrice}€ TTC</h2>
      {!isLaptop && <Button text="Détails" outlined textColor="var(--primary)" icon="cottage"/>}
    </SummaryWrapper>)
};
