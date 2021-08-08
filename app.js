//import module
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const gameRouter = require('./game-router.js');

//module express active
const app = express();

//initiation port to 8000
const port = 8000;

// use view engine ejs
app.set('view engine', 'ejs');

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//built in middleware
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());

//run server
app.listen(port, (req, res) => {
  console.log(`Berhasil terhubung ke server ${port}`);
});

//data user static
const userData = {
  username: 'dede',
  password: '292929',
  hobby: 'futsal',
  address: 'Karawang',
};

// routing endpoint
app.get('/', (req, res) => {
  res.render('login');
});

// page Game ejs
app.use('/game', gameRouter);

//Internal Server Error Handler
app.use((err, req, res, next) => {
  console.log('Ada error');
  console.log(typeof err);
  if (err) {
    console.log(err);
  }
  res.status(500).json({
    status: 'error',
    error: err,
  });
  next();
});

app.get('/main', (req, res) => {
  res.render('main');
});

app.post('/main', (req, res) => {
  const loginReq = req.body;
  if (loginReq.username !== userData.username) {
    res.status(400).send({
      message: 'Username is not registered',
    });
  } else if (loginReq.password !== userData.password) {
    res.status(400).send({ message: 'Password is incorrect' });
  }
  res.status(200).send({
    message: 'Login Successful',
    data: userData,
  });
});

//404 handler
app.use((req, res, next) => {
  res.status(404).render('./404.ejs');
  next();
});
