const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(bodyParser.json()); // in order to parse req bodies

app.post('/signup', ({ body }, res) => {
  const {
    firstname, lastname, email, password,
  } = body;
  res.status(200).send({
    firstname,
    lastname,
    email,
    password,
  });
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log('-> Listening on port', PORT);
});
