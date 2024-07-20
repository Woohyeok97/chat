import { io, Socket } from 'socket.io-client';

// 서버 URL 설정
const URL = 'http://localhost:4000';

// 타입 정의
interface ServerToClientEvents {
  message: (content: string) => void;
}

interface ClientToServerEvents {
  sendMessage: (content: string) => void;
}

// Socket 초기화
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, {
  autoConnect: false,
});
