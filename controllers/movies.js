const Movie = require('../models/movies');
// Bad request
const ERROR_CODE_400 = require('../errors/error400');
// Forbidden
const ERROR_CODE_403 = require('../errors/error403');
// Not Found
const ERROR_CODE_404 = require('../errors/error404');
const { ERROR_MESSAGE_403, ERROR_MESSAGE_400, ERROR_MESSAGE_404 } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = { _id: req.user._id };
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ERROR_CODE_400(ERROR_MESSAGE_400));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new ERROR_CODE_404(ERROR_MESSAGE_404);
      }
      const owner = movie.owner.toString();
      if (req.user._id !== owner) {
        throw new ERROR_CODE_403(ERROR_MESSAGE_403);
      }
      return Movie.deleteOne(movie);
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ERROR_CODE_400(ERROR_MESSAGE_400));
      } else {
        next(err);
      }
    });
};
