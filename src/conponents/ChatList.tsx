/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getChatList } from '../remotes/remotes';
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
        padding: 20px 40px;
        border: 1px solid gray;
        height: 100%;
      `}
    >
      <Header>접속중 : {currentUser}</Header>
      <Spacing size={20} />
      <Flex direction="column" gap={10}>
        {chatList.map(item => (
          <div
            key={item}
            onClick={() => onClick([currentUser, item].sort().join('-'))}
            css={css`
              cursor: pointer;
              padding: 10px;
            `}
          >
            {item}님과 대화
          </div>
        ))}
      </Flex>
    </div>
  );
}
