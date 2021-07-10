import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { device } from "../theme/device";

export type SummaryProps = {

};

const SummaryWrapper = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  margin: 2rem;
  padding: 1rem;
  border-radius: 1rem;
  bottom: 0;
  
  @media screen and ${device.laptop} {
    display: flex;
  }
  
  h1, h2 {
    margin: 0;
  }
  `;

export const Summary: React.FC<SummaryProps> = () => {
    const itemsState = useSelector((state: RootState) => state.items);
    const totalPrice = itemsState.reduce((acc, item) => acc + item.price, 0);

    return (
        <SummaryWrapper>
            <h2>Bilan des courses</h2>
            <h2>Total : {totalPrice}€ TTC</h2>
        </SummaryWrapper>)
};
