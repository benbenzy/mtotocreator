import React from 'react';
import { ThemeText, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <ThemeText {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}
