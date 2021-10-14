var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');
const port = 5000;
const app = express();
app.use(cors());

var indexRouter = require('./routes/index');

// 클라이언트 객체(connect/connection, disconnect/disconnecting)
const server = http.createServer(app);
// 서버 객체
// socketIO 생성후 서버 인스턴스 사용
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['*'],
    credentials: true,
  },
});

// on <--
// emit -->

// 방 개설
io.on('connection', (socket) => {
  // join : 채팅 참여 이벤트
  socket.on('join', ({ roomName: room, userName: user }) => {
    socket.join(room);
    io.to(room).emit('onConnect', `${user} 님이 입장했습니다.`);
    // 사용자간 채팅 메시지 전송
    // send : 클라이언트가 메시지 보내는 이벤트
    // send : 클라이언트가 메시지 보내는 이벤트
    // item: {name: String, msg: String, timeStamp: String}
    socket.on('onSend', (messageItem) => {
      io.to(room).emit('onReceive', messageItem);
      console.log('서버 msg', messageItem);
    });
    // 방 나갈때 이벤트
    socket.on('disconnect', () => {
      socket.leave(room);
      io.to(room).emit('onDisconnect', `${user} 님이 퇴장하셨습니다.`);
    });
  });
});

server.listen(port, () => console.log(`connected on socket port ${port}`));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
