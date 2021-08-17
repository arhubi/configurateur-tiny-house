import React from 'react'
import styled from 'styled-components'

import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg'
import { ReactComponent as Skip } from '../../assets/icons/skip.svg'
import { ReactComponent as Plus } from '../../assets/icons/plus.svg'
import { ReactComponent as Cottage } from '../../assets/icons/cottage.svg'
import { ReactComponent as CameraOff } from '../../assets/icons/camera-off.svg'
import { ReactComponent as ChevronRight } from '../../assets/icons/chevron-right.svg'
import { ReactComponent as Link } from '../../assets/icons/link.svg'
import { ReactComponent as Help } from '../../assets/icons/help.svg'
import { ReactComponent as Reset } from '../../assets/icons/reset.svg'

const icons = {
  arrow: <Arrow />,
  skip: <Skip />,
  plus: <Plus />,
  cottage: <Cottage />,
  'camera-off': <CameraOff />,
  'chevron-right': <ChevronRight />,
  link: <Link />,
  help: <Help />,
  reset: <Reset />,
}

const IconWrapper = styled.div<IconProps>`
  display: flex;
  justify-content: center;
  
  > svg {
    stroke: ${({ color }) => color};
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    stroke-width: ${({ strokeWidth }) => strokeWidth};
    transform: rotateZ(${({ rotation }) => rotation}deg);
  }
`

export type IconProps = {
  kind: keyof typeof icons,
  color?: string;
  width?: string;
  height?: string;
  strokeWidth?: number;
  rotation?: number;
}

export const Icon: React.FC<IconProps> = props =>
  <IconWrapper {...props}>{icons[props.kind]}</IconWrapper>

Icon.defaultProps = {
  color: 'var(--bg-color)',
  strokeWidth: 1.5,
  width: '20px',
  height: '20px',
  rotation: 0
}
