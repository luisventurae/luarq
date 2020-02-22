'use strict'

/**
 * Control de Accesos
 */

const URL_CLIENT = process.env.URL_CLIENT

module.exports = {
    origin: (origin, callback) => {
        console.log('originHTTP',origin)
        // if (origin === URL_CLIENT) {
            return callback(null, true)
        // } else {
        //     return callback('Not allowed by CORS', false) 
        // }    
    }
}