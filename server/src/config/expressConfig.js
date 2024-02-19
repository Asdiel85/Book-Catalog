const express = require('express');
const {errorHandler} = require('../middlewares/errorMiddleware')
const cors = require('cors')


function expressConfig(app) {
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(errorHandler)
    app.use(cors())
}

module.exports = expressConfig;