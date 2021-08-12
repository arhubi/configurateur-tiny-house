import { Icon } from './Icon'
import React from 'react'

type ImageProps = {
  src?: string;
  alt?: string;
  fallbackIconColor?: string;
  fallbackIconSize?: string;
  [key: string]: string | number | undefined;
}

export const Image: React.FC<ImageProps> = ({
                                              src,
                                              alt,
                                              fallbackIconColor,
                                              fallbackIconSize,
                                              ...props }) => {
  return src
    ? <img src={src} alt={alt} {...props} />
    : <Icon kind="camera-off" color={fallbackIconColor} strokeWidth={1} width={fallbackIconSize}
            height={fallbackIconSize}/>
}

Image.defaultProps = {
  fallbackIconColor: 'var(--bg-color)',
  fallbackIconSize: '30px'
}
