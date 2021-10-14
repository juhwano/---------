var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const port = 5000;
const app = express();
app.use(cors());

var indexRouter = require('./routes/index');

//socket서버 세팅
const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
}); //cors 오류로 인한 설정

io.on('connection', (socket) => {
  console.log('connection');
  socket.on('init', (payload) => {
    console.log(payload);
  });
  socket.on('send message', (item) => {
    //send message
    console.log(item.name + ' : ' + item.message + ' : ' + item.timeStamp);
    //클라이언트로 이벤트 보내기
    io.emit('receive message', {
      name: item.name,
      message: item.message,
      timeStamp: item.timeStamp,
    });
  });
});

httpServer.listen(port, () => console.log(`connected on socket port ${port}`));

// on <--
// emit -->

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
