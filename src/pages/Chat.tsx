import ChatForm from '../conponents/ChatForm';
import ChatList from '../conponents/ChatList';
import { Flex } from '../conponents/shared/Flex';

export default function Chat() {
  return (
    <Flex gap={20} height="100%">
      <ChatList />
      <ChatForm />
    </Flex>
  );
}

// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { Button } from '../conponents/shared/Button';
// import { Flex } from '../conponents/shared/Flex';
// import { Header } from '../conponents/shared/Header';
// import { Spacing } from '../conponents/shared/Spacing';
// import { TextField } from '../conponents/shared/TextField';

// const socket = io('http://localhost:4000');

// export default function Chat() {
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState<string[]>([]);

//   useEffect(() => {
//     socket.on('message', msg => {
//       console.log('socket 수신!');
//       setChat(prev => [...prev, msg]);
//     });

//     return () => {
//       socket.off('message');
//     };
//   }, []);

//   const sendMessage = () => {
//     socket.emit('message', message);
//     setMessage('');
//   };

//   return (
//     <Flex direction="column" justify="space-between">
//       <h1>Flower Chat</h1>
//       <div>
//         <Header>000님과의 대화</Header>
//         <Spacing size={20} />
//         {chat.map((item, i) => (
//           <div key={i}>{item}</div>
//         ))}
//       </div>
//       <div>
//         <TextField
//           value={message}
//           placeholder="메시지를 입력해주세요"
//           onChange={e => setMessage(e.target.value)}
//         />
//         <Flex direction="row-reverse">
//           <Button onClick={sendMessage}>전송</Button>
//         </Flex>
//       </div>
//     </Flex>
//   );
// }
