const router = require('express').Router();
const authController = require('./controlers/authController')
const bookController = require('./controlers/bookControler')

router.use('/auth', authController)
router.use('/books', bookController)

module.exports = router