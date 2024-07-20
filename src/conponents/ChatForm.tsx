import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Button } from './shared/Button';
import { Flex } from './shared/Flex';
import { Header } from './shared/Header';
import { Spacing } from './shared/Spacing';
import { TextField } from './shared/TextField';

const socket = io('http://localhost:4000');

interface ChatFormProps {}
export default function ChatForm() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', msg => {
      console.log('웹소켓 메시지 받음!', msg);
      setChat(prev => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <Flex direction="column" flex="auto" justify="space-between">
      <div>
        <Header>플라워 1 님과의 대화</Header>
        <Spacing size={20} />
        {chat.map((item, i) => (
          <div key={i}>{item}</div>
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
