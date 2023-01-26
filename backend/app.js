const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth')

const { PORT = 3001 } = process.env;
const app = express();
app.use(cors());
app.options('*', cors());

mongoose.connect('mongodb://127.0.0.1/aroundb');

app.use(express.json({ extended: true })); // para parsear application/json
app.use(express.urlencoded({ extended: true })); // para el formato de datos tradicional GET form

app.use('/cards', auth, cardsRouter);
app.use('/users', auth, usersRouter);

app.post('/signin', login); //Aquí no pasa nada, no se activan mis console.log
app.post('/signup', createUser); //en esta tampoco

app.get('*', (req, res) => {
  res.status(404);
  res.send({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`Link to port: ${PORT}`);
});
