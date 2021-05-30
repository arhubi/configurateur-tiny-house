import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../store";

export type SummaryProps = {

};

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  margin: 2rem;
  width: 20vw;
  padding: 1rem;
  border-radius: 1rem;
  bottom: 0;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.08) 0 0 0 1px;
  
  h1, h2 {
    margin: 0;
  }
  `;

export const Summary: React.FC<SummaryProps> = () => {
    const store = useSelector((state: RootState) => state.items);
    const totalPrice = store.items.reduce((acc, item) => acc + item.price, 0);

    return (
        <SummaryWrapper>
            <h2>Bilan des courses</h2>
            <h2>Total : {totalPrice}€ TTC</h2>
        </SummaryWrapper>)
};
