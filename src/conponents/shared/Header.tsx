/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface HeaderProps {
  children: React.ReactNode;
}
export function Header({ children }: HeaderProps) {
  return <div css={HeaderStyles}>{children}</div>;
}

const HeaderStyles = css`
  color: black;
  font-weight: 700;
  font-size: 1.2rem;
`;

// /** @jsxImportSource @emotion/react */
// import styled from "@emotion/styled";
// import { CSSProperties } from "react";
// import { ColorsType, colors } from "styles/colors";
// import { fontSizeMap, FontSizeType } from "styles/fontSize";
// interface TextProps {
//   fontSize?: FontSizeType;
//   color?: ColorsType;
//   display?: CSSProperties['display'];
// }

// export const Text = styled.span<TextProps>(({ color = 'white', display, fontSize = 'base' }) => ({
//     color: colors[color],
//     display,
//     fontSize: fontSizeMap[fontSize],
//   }),
// );
