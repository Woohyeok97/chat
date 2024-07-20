import styled from '@emotion/styled';
// import { CSSProperties } from 'react';
// import { ColorsType, colors, getHoverColor } from 'styles/colors';
// import { fontSizeMap, FontSizeType } from 'styles/fontSize';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  bgColor?: string;
}

// 스타일 props을 받을 스타일드 컴포넌트 생성
const StyledButton = styled.button<ButtonProps>(({ bgColor = '#9c7dec' }) => ({
  background: bgColor,
  color: 'white',
  borderRadius: '10px',
  padding: '10px 20px',
  fontWeight: '600',
}));

// 로직, 옵션을 받을 컴포넌트 생성
export function Button({ children, onClick, ...styledProps }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} {...styledProps}>
      {children}
    </StyledButton>
  );
}
