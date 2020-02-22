'use strict'

/**
 * Establece todos los ficheros de las rutas que existirán
 */

 const { auth } = require('Start/middleware/auth')

module.exports = (app) => {
    app.use('/api/test', require('./api/test') ) // Ruta solo para pruebas basicas de los endpoints

    app.use('*', require('./api/handle') )   
}
