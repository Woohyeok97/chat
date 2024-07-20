// // 서버 설정 파일 (예: index.js)

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

io.on('connection', socket => {
  console.log('클라이언트-서버 웹소켓 연결!!');

  socket.on('message', message => {
    console.log(`${message}를 클라이언트한테 전달!`);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
