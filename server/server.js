const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const chat = io.of('/chat');

const userList = {};

chat.on('connection', socket => {
  // 유저풀 등록
  socket.on('register', ({ name, roomId }) => {
    userList[name] = {
      id: socket.id,
      roomId: roomId,
    };
    console.log(`${name}님이 등록되었습니다.:`, userList);
  });

  // 룸 조인 요청시, 룸에 집어넣음
  socket.on('joinRoom', ({ roomId, name }) => {
    socket.join(roomId);
    console.log(`${name}님이 ${roomId} 룸에 입장했습니다.`);
  });

  // 메시지 처리
  socket.on('message', ({ roomId, message, name, target }) => {
    console.log(`${name}: ${message} (룸: ${roomId}, target: ${target})`);
    // 타겟 유저가 룸에 조인하지 않았다면 초대
    // if (!userList[target].roomId) {
    if (userList[target].roomId !== userList[name].roomId) {
      chat.sockets.get(userList[target].id).join(roomId);
      console.log(`${target}님이 ${roomId} 룸에 초대되었습니다.`);
    }
    // 룸에 메시지 보냄
    chat.to(roomId).emit('message', { name, text: message, roomId });
  });

  socket.on('disconnect', () => {
    // socket.leave(roomId)
    console.log('chat 네임스페이스 접속 해제');
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//   },
// });

// const room = io.of('/room');
// const chat = io.of('/chat');

// io.on('connection', socket => {
//   console.log('클라이언트-서버 웹소켓 연결!!');

//   socket.on('message', message => {
//     console.log(`${message}를 클라이언트한테 전달!`);
//     io.emit('message', message);
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`listening on *:${PORT}`);
// });
