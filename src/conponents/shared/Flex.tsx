import styled from '@emotion/styled';
import { CSSProperties } from 'react';

interface FlexProps {
  direction?: CSSProperties['flexDirection'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  gap?: CSSProperties['gap'];
  height?: '100%' | 'auto';
  flex?: 'none' | 'auto';
}
export const Flex = styled.div<FlexProps>(
  ({ direction, justify, align, gap, height = 'auto', flex = 'none' }) => ({
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    gap: gap,
    height: height,
    flex: flex,
  }),
);
