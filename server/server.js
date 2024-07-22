const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // JSON 요청 본문 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL 인코딩된 요청 본문 파싱
const server = http.createServer(app);

// HTTP 요청
const dataFilePath = path.join(__dirname, '../data.json');

// 유저 채팅 목록
app.get('/api/data', (req, res) => {
  res.sendFile(dataFilePath);
});

// 룸 메시지 목록
app.get('/api/messages', (req, res) => {
  res.sendFile(dataFilePath);
});

// JSON 데이터 업데이트 (DB 업데이트)
app.put('/api/messages', (req, res) => {
  const { roomId, message } = req.body;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }

    try {
      let chatList = JSON.parse(data); // JSON 파싱

      if (!Array.isArray(chatList)) {
        throw new Error('데이터가 배열이 아닙니다.'); // 배열인지 확인
      }

      // roomId에 해당하는 데이터 찾기
      const updateIndex = chatList.findIndex(chat => chat.roomId === roomId);

      // 기존 roomId의 messageList에 요소 추가
      chatList[updateIndex].messageList.push(message);
      console.log(chatList[updateIndex]);

      // 수정된 데이터를 JSON 파일에 쓰기
      fs.writeFile(dataFilePath, JSON.stringify(chatList, null, 2), 'utf8', () => {
        res.send(`roomId: ${roomId} JSON 데이터 업데이트 (DB 업데이트)`);
      });
    } catch (parseError) {
      res.status(500).send('JSON 데이터 업데이트 실패');
    }
  });
});

// Websocket 요청
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
const chat = io.of('/chat');

// 'chat' 네임스페이스 유저 목록
const userList = {};

// 네임스페이스 웹소켓 연결
chat.on('connection', socket => {
  // 유저 등록
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
    // 타겟 유저가 룸에 조인하지 않았다면 초대 (메시지 전송 시, 현재 두 유저의 룸 아이디가 다르면 target 유저의 룸 아이디 수정)
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
