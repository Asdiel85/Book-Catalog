const router = require('express').Router();
const bookController = require('./controlers/bookControler')

router.use('/books', bookController)

module.exports = router