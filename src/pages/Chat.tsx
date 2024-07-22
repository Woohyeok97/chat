import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    <Flex gap={20} height="100%">
      <Suspense>
        <ChatList onClick={handleRoomSelection} currentUser={currentUser!} />
      </Suspense>
      <ChatForm currentRoomId={currentRoomId} currentUser={currentUser!} />
    </Flex>
  );
}
