import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatForm from '../conponents/ChatForm';
import ChatList from '../conponents/ChatList';
import { Flex } from '../conponents/shared/Flex';

export default function Chat() {
  const { id: currentUser } = useParams();
  const [roomId, setRoomId] = useState('');
  const [targetUser, setTargetUser] = useState('');

  const handleRoomSelection = (select: string) => {
    const roomId = [currentUser, select].sort().join('-');
    setTargetUser(select);
    setRoomId(roomId);
  };

  return (
    <Flex gap={20} height="100%">
      <ChatList onClick={handleRoomSelection} currentUser={currentUser!} />
      <ChatForm roomId={roomId} currentUser={currentUser!} targetUser={targetUser} />
    </Flex>
  );
}
