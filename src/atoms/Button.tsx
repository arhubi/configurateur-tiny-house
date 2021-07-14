import React from 'react'
import styled from "styled-components";
import { Icon, IconProps } from "./Icon"


const ButtonWrapper = styled.button<Partial<ButtonProps>>`
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  background-color: ${({bgColor, outlined }) => !outlined ? bgColor : 'transparent'};
  border: none;
  border-radius: 0.2rem;
  color: ${({textColor}) => textColor};
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: ${({outlined }) => !outlined ? 'rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.08) 0 0 0 1px' : 'none'};

  svg {
    margin-left: 0.4rem;
  }
`

type ButtonProps = {
  text?: string;
  textColor?: string;
  bgColor?: string;
  icon?: IconProps['kind'];
  onClick?: () => void;
  outlined?: boolean;
}

export const Button: React.FC<ButtonProps> = props =>
  <ButtonWrapper {...props} onClick={props?.onClick}>
    {props.text}
    {props.icon && <Icon kind={props.icon} color={props.textColor} />}
  </ButtonWrapper>

Button.defaultProps = {
  bgColor: 'darkgray',
  textColor: 'white',
  outlined: false
}
