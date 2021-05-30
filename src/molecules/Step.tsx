import React from 'react';
import '../app.css';
import styled from "styled-components";
import { ItemsGrid } from "./ItemsGrid";

const StepWrapper = styled.div<Partial<StepProps>>`
  display: flex;
  gap: 3rem;
  opacity: ${props => props.isActive ? 1 : 0.2};
  cursor: ${props => !props.isActive && 'not-allowed'};

  * {
    cursor: ${props => !props.isActive && 'not-allowed'};
  }
  
  padding: 0.3rem;
  scroll-snap-align: start;
  animation: fade-in 1000ms ease;
  
  h1 {
    margin-bottom: 0;
  }
  
  .step-description {
    text-align: left;
    width: 30%;
  }
  
  @keyframes fade-in {
    0% { 
      opacity: 0;
    }
  }

`


const SubCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  
  div {
    box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.08) 0 0 0 1px;
    background-color: white;
    padding: 0.4rem;
    border-radius: 0.2rem;
    font-size: 1.5rem;
  }
  `;

export type StepProps = {
    title: string;
    isActive?: boolean;
    required?: boolean;
    multiple?: boolean;
    onStepDone?: (index: number) => void;
};
export const Step: React.FC<StepProps> = (
    {
        title,
        isActive = false,
        required = false,
        onStepDone,
        multiple = false
    }) => {
    const items = [
        { name: 'Remorque', category: title, price: 200, image: 'https://maison-monde.com/wp-content/uploads/2019/08/remorque-plateau-tiny-house.jpg'},
        { name: 'Remorque 2', category: title, price: 200, image: 'https://maison-monde.com/wp-content/uploads/2019/08/remorque-tiny-house-plateau.jpg'},
        { name: 'Remorque 3', category: title, price: 200, image: 'https://maison-monde.com/wp-content/uploads/2019/08/remorque-plateau-tiny-house.jpg'},
        { name: 'Remorque 4', category: title, price: 200, image: 'https://maison-monde.com/wp-content/uploads/2019/08/remorque-plateau-tiny-house.jpg'},
        { name: 'Remorque 5', category: title, price: 200, image: 'https://maison-monde.com/wp-content/uploads/2019/08/remorque-plateau-tiny-house.jpg'},
    ]

    const handleClick = (e: React.MouseEvent) => !isActive && e.stopPropagation()

    const handleSelectedItem = (index: number) => !multiple && onStepDone?.(index)


    return (
        <StepWrapper isActive={isActive} onClickCapture={e => handleClick(e)}>
            <div className="step-description">
                {multiple
                    ? <p>Plusieurs choix possibles</p>
                    : <p>Un choix possible</p>}
                <h1>{ title } { required && '*'}</h1>
            </div>
            <ItemsGrid items={items} category={title} multiple={multiple} onItemSelected={handleSelectedItem} required={required} />
        </StepWrapper>
    );
}
