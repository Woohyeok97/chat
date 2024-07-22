/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MessageType } from '../remotes/remotes';
import Avatar from './shared/Avatar';
import { Flex } from './shared/Flex';
import { Spacing } from './shared/Spacing';

interface MessageBoxProps {
  message: MessageType;
  currentUser: string;
}

export default function MessageBox({ message, currentUser }: MessageBoxProps) {
  return (
    <>
      <Flex
        gap={10}
        direction={`${currentUser !== message.name ? 'row' : 'row-reverse'}`}
        justify="flex-start"
      >
        <Avatar />
        <Flex
          direction="column"
          align={`${currentUser !== message.name ? 'flex-start' : 'flex-end'}`}
        >
          <div css={nameStyle}>{message.name}</div>
          <div
            css={css`
              background-color: ${currentUser !== message.name ? '#d5cee8' : '#d0f9ed'};
              border-radius: 10px;
              padding: 10px 15px;
              font-size: 1rem;
            `}
          >
            {message.text}
          </div>
        </Flex>
      </Flex>
      <Spacing size={30} />
    </>
  );
}

// 스타일 정의
const nameStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  font-weight: 600;
  color: black;
  margin-top: 5px;
`;

const avatarStyle = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  @media (max-width: 768px) {
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

// const nameStyle = css`
//   font-weight: bold;
//   text-align: center;
//   @media (max-width: 768px) {
//     text-align: left;
//   }
// `;
