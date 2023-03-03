const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const {
  validateCreateMovie, validateDeleteMovie,
} = require('../middlewares/validate');

router.get('/movies', auth, getMovies);

router.post('/movies', auth, validateCreateMovie, createMovie);

router.delete('/movies/:movieId', auth, validateDeleteMovie, deleteMovie);

module.exports = router;
