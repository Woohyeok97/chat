import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
// components
import { Button } from './shared/Button';
import { Flex } from './shared/Flex';
import { Header } from './shared/Header';
import { Spacing } from './shared/Spacing';
import { TextField } from './shared/TextField';

const socket = io('http://localhost:4000/chat');

interface ChatFormProps {
  roomId: string;
  currentUser: string;
  targetUser: string;
}
export default function ChatForm({ roomId, currentUser, targetUser }: ChatFormProps) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ user: string; text: string }[]>([]);

  useEffect(() => {
    // 유저풀 등록
    socket.emit('register', { user: currentUser, roomId });

    // 특정 룸에 조인 (user: currentUser는 확인용)
    if (roomId) {
      socket.emit('joinRoom', { roomId, user: currentUser });
    }

    socket.on('message', msg => {
      console.log('웹소켓 메시지 받음!', msg);
      setChat(prev => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, [roomId, currentUser]);

  const sendMessage = () => {
    socket.emit('message', { roomId, message, user: currentUser, target: targetUser });
    setMessage('');
  };

  if (!roomId) {
    return (
      <div>
        <h2>채팅방을 선택하세요</h2>
      </div>
    );
  }

  return (
    <Flex direction="column" flex="auto" justify="space-between">
      <div>
        <Header>{roomId} 님과의 대화</Header>
        <Spacing size={20} />
        {chat.map((item, i) => (
          <div key={i}>
            <span>{item.user} :</span>
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
