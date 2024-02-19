const router = require('express').Router();
const homeController = require('./controlers/homeController')
const authController = require('./controlers/authController')
const bookController = require('./controlers/bookControler')

router.use(homeController)
router.use('/auth', authController)
router.use('/books', bookController)

module.exports = router