const Card = require('../models/card');

function orFailCards() {
  const error = new Error('Tarjeta no encontrada');
  error.statusCode = 404;
  throw error;
}

function errorMessagesCards(err, res) {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Datos inválidos' });
  } else if (err.name === 'CastError') {
    res.status(400).send({ message: 'ID de tarjeta no válido' });
  } else if (err.statusCode === 404) {
    res.status(404).send({ message: 'ID de tarjeta no encontrado' });
  } else {
    res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
  }
}

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => errorMessagesCards(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessagesCards(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(orFailCards)
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessagesCards(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // agrega _id al array si aún no está ahí
    { new: true },
  )
    .orFail(orFailCards)
    .populate('likes')
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessagesCards(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // elimina _id del array
    { new: true },
  )
    .orFail(orFailCards)
    .populate('likes')
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessagesCards(err, res));
};
