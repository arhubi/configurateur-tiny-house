import React from 'react'
import styled from 'styled-components'
import { Icon, IconProps } from './Icon'

const buttonSize = {
  small:
    `padding: 0.2rem 0.3rem;
     font-size: 0.8rem;
    `,
  default:
    `padding: 0.3rem 0.6rem;
     font-size: 1rem;`
}


const ButtonWrapper = styled.button<Partial<ButtonProps> & {hasText: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  background-color: ${({bgColor, outlined }) => !outlined ? bgColor : 'transparent'};
  border: none;
  border-radius: 0.2rem;
  color: ${({textColor}) => textColor};
  ${({ size }) => buttonSize[size || 'default']};
  cursor: pointer;
  box-shadow: ${({outlined }) => !outlined ? 'rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.03) 0 0 0 1px' : 'none'};
  transition: box-shadow 100ms ease-in;
  position: relative;
  
  ${({hasText}) => hasText && `
    span:nth-child(1)::after {
      content: " ";
      white-space: pre;
   };
 `}
  
  :hover {
    box-shadow: ${({outlined }) => !outlined 
            ? 'rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.3) 0 0 0 1px' 
            : 'none'};
  }
`

type ButtonProps = {
  text?: string;
  textColor?: string;
  bgColor?: string;
  icon?: IconProps['kind'];
  onClick?: () => void;
  outlined?: boolean;
  size?: 'small' | 'default'
}

export const Button: React.FC<ButtonProps> = props =>
  <ButtonWrapper {...props} onClick={props?.onClick} hasText={Boolean(props.text)}>
    <span>{props.text}</span>
    {props.icon && <Icon kind={props.icon} color={props.textColor} width="1rem" height="1rem" />}
  </ButtonWrapper>

Button.defaultProps = {
  bgColor: 'var(--pure-white)',
  textColor: 'var(--text-color)',
  outlined: false,
  size: 'default'
}
