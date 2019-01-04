const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// data
const USERS = [
  {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@email.com',
    password: 'john1994',
  },
];

// middlewares
app.use(cors()); // in order to allow cors
app.use(bodyParser.json()); // in order to parse req bodies

// routes
app.post('/signup', ({ body }, res) => {
  const {
    firstname, lastname, email, password,
  } = body;
  if (!firstname || !lastname || !email || !password) {
    res.status(400).send('You need to set firstname, lastname, email, password.');
    return;
  }
  res.status(200).send({
    firstname,
    lastname,
    email,
    password,
  });
});

app.post('/signin', ({ body }, res) => {
  const { email, password } = body;
  if (!email || !password) {
    res.status(400).send('You need to send email and password.');
    return;
  }
  const user = USERS.find(user => user.email === email && user.password === password);
  if (!user) {
    res.status(401).send('User not found.');
    return;
  }

  const token = jwt.sign(
    {
      sub: user.email,
      username: user.username,
    },
    'mysupersecretkey',
    { expiresIn: '3 hours' },
  );

  res.status(200).send({
    access_token: token,
  });
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log('-> Listening on port', PORT);
});
