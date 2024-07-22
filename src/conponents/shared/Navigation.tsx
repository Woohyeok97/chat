/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const USERLIST = ['플라워1', '플라워2', '플라워3'];

export default function Navigation() {
  // const [user, setUser] = useRecoilState(userState);
  const navigation = useNavigate();

  return (
    <div css={navigationStyle}>
      <div>FLOWER 119</div>
      <div
        css={css`
          display: flex;
          gap: 20px;
          font-size: 1rem;
          cursor: pointer;
        `}
      >
        {USERLIST.map(item => (
          <span key={item} onClick={() => navigation(`/${item}`)}>
            {item}
          </span>
        ))}
      </div>
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
`;
