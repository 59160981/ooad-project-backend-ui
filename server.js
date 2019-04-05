const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://boat:boat1234@ds131137.mlab.com:31137/ooad');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//router req
const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const buildRouter  = require('./routes/buildRouter')
const roomRouter  = require('./routes/roomRouter')
//router
app.use('/home', loginRouter);
app.use('/home/users', userRouter);
app.use('/home/build', buildRouter)
app.use('/home/room', roomRouter)

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'public', '/home/index'));
});

app.listen(port, function(){
  console.log('start port http://localhost:'+port+"/home");
});