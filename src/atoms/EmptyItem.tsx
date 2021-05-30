import React from 'react';
import styled from "styled-components";

export type EmptyItemProps = {
    isSelected?: boolean;
    onClick: () => void;
}

const EmptyItemCard = styled.div<Partial<EmptyItemProps>>`
  height: 15rem;
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  background-color: white;
  box-shadow: ${({isSelected}) => isSelected 
          ? '0 0 0px 3px orange' 
          : 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px' };
  
  :hover {
    cursor: pointer;
  }
  
  div {
    padding: 0.4rem;
  }
`;

export const EmptyItem: React.FC<EmptyItemProps> = ({ isSelected, onClick }) => {
    return <EmptyItemCard isSelected={isSelected} onClick={onClick}>
        <div>Aucun</div>
    </EmptyItemCard>
};
