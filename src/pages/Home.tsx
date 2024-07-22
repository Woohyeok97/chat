/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../conponents/shared/Button';
import { Flex } from '../conponents/shared/Flex';
import { USERLIST } from '../constants/userList';

export default function Home() {
  const navigation = useNavigate();

  return (
    <main
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 10%;
        padding: 10%;
        padding-top: 0px;
        box-sizing: border-box;
      `}
    >
      <h1
        css={css`
          color: black;
          @media (min-width: 1024px) {
            /* 데스크탑 */
            font-size: 2rem;
          }

          @media (max-width: 767px) {
            /* 모바일 */
            font-size: 1.5rem;
          }
        `}
      >
        사용자를 선택해주세요.
      </h1>
      <Flex justify="space-between" gap={20}>
        {USERLIST.map(item => (
          <Button key={item} onClick={() => navigation(`/${item}`)}>
            {item}
          </Button>
        ))}
      </Flex>
    </main>
  );
}
