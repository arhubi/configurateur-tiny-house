import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { device } from "../theme/device";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Button } from "../atoms/Button";

export type SummaryProps = {

};

const SummaryWrapper = styled.div`
  position: fixed;
  bottom: 0;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  flex-direction: column;
  background-color: white;
  padding: 4rem 1rem 3rem;
  border-radius: 1rem 1rem 0 0;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.08) 0 0 0 1px;

  h1, h2 {
    margin: 0;
  }
  `;

export const Summary: React.FC<SummaryProps> = () => {
    const itemsState = useSelector((state: RootState) => state.items)
    const totalPrice = itemsState.reduce((acc, item) => acc + item.price, 0)

    const isDesktop = useMediaQuery('desktop')

    return (
        <SummaryWrapper>
          {isDesktop && <h2>Bilan des courses</h2>}
            <h2>Total : {totalPrice}€ TTC</h2>
          {!isDesktop && <Button text="Détails" outlined textColor="orange" icon="cottage"/>}
        </SummaryWrapper>)
};
