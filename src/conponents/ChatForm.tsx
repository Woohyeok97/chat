import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { io } from 'socket.io-client';
import { chatStateFamily } from '../recoil/atom';
// components
import { Button } from './shared/Button';
import { Flex } from './shared/Flex';
import { Header } from './shared/Header';
import { Spacing } from './shared/Spacing';
import { TextField } from './shared/TextField';

const socket = io('http://localhost:4000/chat');

interface ChatFormProps {
  currentRoomId: string;
  currentUser: string;
  targetUser: string;
}
interface Re {
  name: string;
  text: string;
  roomId: string;
}
export default function ChatForm({ currentRoomId, currentUser, targetUser }: ChatFormProps) {
  const [message, setMessage] = useState('');
  const chat = useRecoilValue(chatStateFamily(currentRoomId));

  const setChat = useRecoilCallback(({ set }) => (value: Re) => {
    set(chatStateFamily(value.roomId), prev => [...prev, { name: value.name, text: value.text }]);
  });

  useEffect(() => {
    // 유저풀 등록
    socket.emit('register', { name: currentUser, roomId: currentRoomId });

    // 특정 룸에 조인 (user: currentUser는 확인용)
    if (currentRoomId) {
      socket.emit('joinRoom', { roomId: currentRoomId, name: currentUser });
    }

    socket.on('message', msg => {
      console.log('웹소켓 메시지 받음!', msg);
      setChat(msg);
    });

    return () => {
      socket.off('message');
    };
  }, [currentRoomId, currentUser, setChat]);

  const sendMessage = () => {
    socket.emit('message', {
      roomId: currentRoomId,
      message,
      name: currentUser,
      target: targetUser,
    });
    setMessage('');
  };

  if (!currentRoomId) {
    return (
      <div>
        <h2>채팅방을 선택하세요</h2>
      </div>
    );
  }

  return (
    <Flex direction="column" flex="auto" justify="space-between">
      <div>
        <Header>{currentRoomId} 님과의 대화</Header>
        <Spacing size={20} />
        {chat.map((item, i) => (
          <div key={i}>
            <span>{item.name} :</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <div>
        <TextField
          value={message}
          placeholder="메시지를 입력해주세요"
          onChange={e => setMessage(e.target.value)}
        />
        <Flex direction="row-reverse">
          <Button onClick={sendMessage}>전송</Button>
        </Flex>
      </div>
    </Flex>
  );
}
