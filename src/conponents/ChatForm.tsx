/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getMessageListByRoomId, MessageType, updateMessageListByRoomId } from '../remotes/remotes';
import MessageBox from './MessageBox';
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
}
interface MessageResponse {
  name: string;
  text: string;
  roomId: string;
}
export default function ChatForm({ currentRoomId, currentUser }: ChatFormProps) {
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const { data: messageList } = useQuery({
    queryKey: ['messageList', currentRoomId],
    queryFn: () => getMessageListByRoomId(currentRoomId),
    enabled: !!currentRoomId,
  });

  // 웹소켓 메시지 응답 핸들러
  const { mutate } = useMutation({
    onMutate: (response: MessageResponse) => {
      // 웹소켓 메시지의 룸을 보고 있을때만 캐시 데이터 선 업데이트(리렌더링 최소화)
      if (currentRoomId === response.roomId) {
        console.log('change');
        queryClient.setQueryData(['messageList', response.roomId], (prev: MessageType[]) => [
          ...prev,
          { name: response.name, text: response.text },
        ]);
      }
    },
    // 웹소켓 메시지를 보낼때만 JSON 데이터 업데이트(DB 업데이트) -> 중복 업데이트 방지
    mutationFn: async (response: MessageResponse) => {
      if (response.name === currentUser) {
        await updateMessageListByRoomId({
          roomId: response.roomId,
          message: { name: response.name, text: response.text },
        });
      }
    },
  });

  // 웹소켓 메시지 서브밋 핸들러
  const handleSubmit = () => {
    socket.emit('message', {
      roomId: currentRoomId,
      message,
      name: currentUser,
      target: currentRoomId.split('-').join('').split(currentUser).join(''),
    });
    setMessage('');
  };

  useEffect(() => {
    socket.emit('register', { name: currentUser, roomId: currentRoomId }); // 유저풀 등록

    // 특정 룸에 조인 (user: currentUser는 확인용)
    if (currentRoomId) {
      socket.emit('joinRoom', { roomId: currentRoomId, name: currentUser });
    }

    // 웹소켓 메시지 응답
    socket.on('message', response => {
      console.log('웹소켓 메시지 받음!', response);
      mutate(response);
    });

    // 웹소켓 연결 해제
    return () => {
      socket.off('message');
    };
  }, [currentRoomId, currentUser, mutate]);

  if (!currentRoomId) {
    return (
      <div
        css={css`
          display: flex;
          flex: 1;
          gap: 20px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        `}
      >
        <Header>FLOWER 119</Header>
        <div>다른 회원님들과 채팅을 시작해보세요.</div>
      </div>
    );
  }

  return (
    <Flex direction="column" flex="auto" justify="space-between">
      <div>
        <div
          css={css`
            font-size: 1.2rem;
            margin-bottom: 20px;
          `}
        >
          {currentRoomId.split('-').join('').split(currentUser).join('')}님
        </div>
        <Spacing size={20} />
        {messageList?.map((item, i) => (
          <MessageBox key={i} message={item} currentUser={currentUser} />
        ))}
      </div>
      <div>
        <TextField
          value={message}
          placeholder="메시지를 입력해주세요"
          onChange={e => setMessage(e.target.value)}
        />
        <Flex direction="row-reverse">
          <Button onClick={handleSubmit}>전송</Button>
        </Flex>
      </div>
    </Flex>
  );
}
