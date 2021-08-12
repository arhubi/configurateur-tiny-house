import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { Button } from '../atoms/Button'
import { device } from '../../theme/device'
import { SummaryItem } from '../molecules/SummaryItem'
import { groupBy } from '../../utils'
import { ItemProps } from '../atoms/Item'
import { Icon } from "../atoms/Icon";

export type SummaryProps = {};

const SummaryWrapper = styled.div<{isSummaryOpen: boolean}>`
  position: fixed;
  width: 100vw;
  ${({isSummaryOpen}) => isSummaryOpen && 'height: calc(95vh - var(--header-height-mobile));'};
  margin-top: 5rem;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: var(--pure-white);
  padding: 2rem 0 1rem;
  border-radius: 1rem 1rem 0 0;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.2) 0 0 0 1px;
  z-index: ${({isSummaryOpen}) => isSummaryOpen ? 30 : 10};

  @media screen and ${device.laptop} {
    position: relative;
    width: 20rem;
    margin-top: 0;
    height: calc(80vh - var(--configurator-banner-height) - var(--header-height));
    padding: 0.4rem;
    border-radius: 0.6rem;
  }

  h2, h3 {
    padding: 0.4rem 0;
    margin: 0;
  }
`

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 26rem;
  align-items: start;
  gap: 0.4rem;
  
  > h3 {
    position: sticky;
    top: 0;
    text-align: left;
    background: white;
    padding-bottom: 0.4rem;
    width: 100%;
  }
`

const SummaryStart = styled.div`
  width: 90%;
  margin: 0 1rem;
`

const SummaryHeader = styled.div`
  position: relative;
`

const CloseIcon = styled(Icon)`
  position: absolute;
  top: 0;
  right: 0;
`

export const Summary: React.FC<SummaryProps> = () => {
  const [summaryOpen, setSummaryOpen] = useState(false)
  const selectedItems = useSelector((state: RootState) => state.items)
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0)

  const sortedItems = groupBy(selectedItems, 'category')

  const isLaptop = useMediaQuery('laptop')

  const showSummary = isLaptop || summaryOpen
  return (
    <SummaryWrapper isSummaryOpen={summaryOpen}>
      {showSummary && <SummaryStart>
        <SummaryHeader>
          <h2>Vos sélections</h2>
          <div onClick={() => setSummaryOpen(false)}>
          {!isLaptop && <CloseIcon kind={'plus'} color="var(--text-color)" rotation={45} width="40" height="40"/>}
          </div>
        </SummaryHeader>
        <ItemsWrapper>
          {selectedItems.length > 0 && Object.keys(sortedItems).map(category =>
            <>
              <h3>{category} ({sortedItems[category].length})</h3>
              {sortedItems[category].map((item: ItemProps) => <SummaryItem {...item} />)}
            </>)}
        {!selectedItems.length && <p>Sélectionnez des items pour compléter votre sélection.</p>}
        </ItemsWrapper>
      </SummaryStart>}
      <div>
        <h2>{totalPrice}€ TTC</h2>
        {!isLaptop && <Button text="Détails" onClick={() => setSummaryOpen(!summaryOpen)} outlined textColor="var(--primary)" icon="cottage"/>}
      </div>
    </SummaryWrapper>)
}
