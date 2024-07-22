/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getChatList } from '../remotes/remotes';
import Avatar from './shared/Avatar';
import { Flex } from './shared/Flex';
import { Header } from './shared/Header';
import { Spacing } from './shared/Spacing';

interface ChatListProps {
  currentUser: string;
  onClick: (roomId: string) => void;
}

export default function ChatList({ currentUser, onClick }: ChatListProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['usersChatList'],
    queryFn: () => getChatList(currentUser),
  });

  const chatList = data.map(item => item.roomId.split('-').join('').split(currentUser).join(''));

  return (
    <div
      css={css`
        padding-right: 40px;
        border-right: 1px solid gray;
        @media (max-width: 768px) {
          display: none;
        }
      `}
    >
      <Header>{currentUser}</Header>
      <Spacing size={20} />
      <Flex direction="column" gap={10}>
        {chatList.map(item => (
          <div
            key={item}
            onClick={() => onClick([currentUser, item].sort().join('-'))}
            css={css`
              display: flex;
              align-items: center;
              cursor: pointer;
              gap: 5px;
            `}
          >
            <Avatar />
            <div css={css``}>{item}님</div>
          </div>
        ))}
      </Flex>
    </div>
  );
}
