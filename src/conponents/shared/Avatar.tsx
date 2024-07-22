/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function Avatar() {
  return <img src="/사용자.png" css={avatarStyle} />;
}

const avatarStyle = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-bottom: 5px;
  @media (max-width: 768px) {
    margin-bottom: 0;
    margin-right: 10px;
  }
`;
