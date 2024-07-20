import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', msg => {
      console.log('socket 수신!');
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
    <main>
      <h1>Flower Chat</h1>
      <div>
        <h2>Chat List</h2>
        {chat.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
      <div>
        <h2>Write</h2>
        <input value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </main>
  );
}
// import React, { SetStateAction, useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// const socket = io('http://localhost:4000');

// export default function App(): JSX.Element {
//   // 채팅 페이지 방문
//   const [room, setRoom] = useState('');

//   const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setRoom(e.target.value);
//   };

//   // 메세지 정보들
//   const [message, setMessage] = useState('');
//   const [messageReceived, setMessageReceived] = useState('');

//   const joinRoom = () => {
//     if (room !== '') {
//       socket.emit('join_room', room);
//       alert(`${room} 방에 입장하였습니다.`);
//     }
//   };

//   const sendMessage = () => {
//     socket.emit('send_message', { message, room });
//     alert('메세지를 보냈습니다.');
//   };

//   useEffect(() => {
//     socket.on('receive_message', (data: { message: SetStateAction<string> }) => {
//       setMessageReceived(data.message);
//     });
//   }, []);

//   return (
//     <div className="App">
//       <h1>Socket.io + React</h1>
//       <div className="card">
//         <div>
//           <input placeholder="방 제목을 입력하세요" onChange={InputChange} />
//           <button onClick={joinRoom}> Join Room</button>
//         </div>
//         <div>
//           <input
//             placeholder="메세지를 입력해주세요."
//             onChange={e => {
//               setMessage(e.target.value);
//             }}
//           />
//           <button onClick={sendMessage}> Send Message</button>
//         </div>
//         <h2>{room} 메세지:</h2>
//         {messageReceived}
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import { ConnectionManager } from '../conponents/ConnectionManager';
// import { ConnectionState } from '../conponents/ConnectionState';
// import { Events } from '../conponents/Events';
// import { MyForm } from '../conponents/MyForm';
// import { socket } from '../socket';

// export default function Chat() {
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [messages, setMessages] = useState<string[]>([]);

//   useEffect(() => {
//     socket.connect();

//     const onConnect = () => setIsConnected(true);
//     const onDisconnect = () => setIsConnected(false);
//     const onMessage = (message: string) => setMessages(prev => [...prev, message]);

//     socket.on('connect', onConnect);
//     socket.on('disconnect', onDisconnect);
//     socket.on('message', onMessage);

//     return () => {
//       socket.off('connect', onConnect);
//       socket.off('disconnect', onDisconnect);
//       socket.off('message', onMessage);
//     };
//   }, []);

//   return (
//     <div className="App">
//       <ConnectionState isConnected={isConnected} />
//       <Events events={messages} />
//       <ConnectionManager />
//       <MyForm />
//     </div>
//   );
// }
