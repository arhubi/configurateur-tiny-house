import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Button } from "../atoms/Button";
import { device } from "../theme/device";

export type SummaryProps = {

};

const SummaryWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 4rem;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  padding: 4rem 1rem 3rem;
  border-radius: 1rem 1rem 0 0;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.08) 0 0 0 1px;
  
  @media screen and ${device.laptop} {
    position: relative;
    width: auto;
    height: auto;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    margin: 2rem;
    padding: 1rem;
    border-radius: 1rem;
  }

  h1, h2 {
    margin: 0;
  }
  `;

export const Summary: React.FC<SummaryProps> = () => {
    const itemsState = useSelector((state: RootState) => state.items)
    const totalPrice = itemsState.reduce((acc, item) => acc + item.price, 0)

    const isLaptop = useMediaQuery('laptop')

    return (
        <SummaryWrapper>
          {isLaptop && <h2>Bilan des courses</h2>}
            <h2>Total : {totalPrice}€ TTC</h2>
          {!isLaptop && <Button text="Détails" outlined textColor="orange" icon="cottage"/>}
        </SummaryWrapper>)
};
