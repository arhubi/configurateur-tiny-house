import React from 'react';
import styled from "styled-components";

export type EmptyItemProps = {
    isSelected?: boolean;
    onClick: () => void;
}

const Button = styled.button<EmptyItemProps>`
  display: flex;
  align-items: center;
  appearance: none;
  background-color: gray;
  border: none;
  border-radius: 0.4rem;
  color: white;
  padding: 0.4rem;
  margin-top: 0.2rem;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0.15rem 0.15rem lightgray;
  
  svg {
    margin-left: 0.4rem;
  }
`


export const EmptyItem: React.FC<EmptyItemProps> = ({ isSelected, onClick }) => {
    return <Button isSelected={isSelected} onClick={onClick}>Passer
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-skip-forward"
                 width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none"
                 strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 5v14l12 -7z"/>
                <line x1="20" y1="5" x2="20" y2="19"/>
            </svg>
        </Button>
};
