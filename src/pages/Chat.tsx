/** @jsxImportSource @emotion/react */
import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import ChatForm from '../conponents/ChatForm';
import ChatList from '../conponents/ChatList';
import { Flex } from '../conponents/shared/Flex';

export default function Chat() {
  const { id: currentUser } = useParams();
  const [currentRoomId, setCurrentRoomId] = useState('');

  const handleRoomSelection = (roomId: string) => {
    setCurrentRoomId(roomId);
  };

  return (
    <Flex
      css={css`
        display: flex;
        height: 100%;
        width: 100%;
        gap: 30px;
        box-sizing: border-box;
      `}
    >
      <Suspense>
        <ChatList onClick={handleRoomSelection} currentUser={currentUser!} />
      </Suspense>
      <ChatForm currentRoomId={currentRoomId} currentUser={currentUser!} />
    </Flex>
  );
}
