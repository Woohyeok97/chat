import axios from 'axios';

// 유저 채팅 목록 가져오기
export const getChatList = async (user: string): Promise<ChatType[]> => {
  const response = await axios.get('http://localhost:4000/api/data', { params: { user: user } });
  return [...response.data].filter(item => item.roomId.includes(user));
};

// 룸 메시지 목록 가져오기
export const getMessageListByRoomId = async (roomId: string): Promise<MessageType[]> => {
  const response = await axios.get(`http://localhost:4000/api/messages/?roomId=${roomId}`);
  return [...response.data].find(item => item.roomId === roomId).messageList;
};

// 룸 메시지 목록 업데이트
export const updateMessageListByRoomId = async ({
  roomId,
  message,
}: {
  roomId: string;
  message: MessageType;
}) => {
  console.log({ roomId, message });
  const response = await axios.put('http://localhost:4000/api/messages', { roomId, message });
  return response.data;
};

// 채팅 타입
export interface ChatType {
  roomId: string;
  messageList: MessageType[];
}

// 메시지 타입
export interface MessageType {
  name: string;
  text: string;
}
