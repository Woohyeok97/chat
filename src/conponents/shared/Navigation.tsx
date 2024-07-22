/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigation = useNavigate();

  return (
    <div css={navigationStyle} onClick={() => navigation('/')}>
      <div>FLOWER 119</div>
    </div>
  );
}

const navigationStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: black;
  padding: 20px 30px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
`;
