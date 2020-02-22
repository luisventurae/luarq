'use strict'

/**
 * Conexión a la base de datos
 */

const mongoose = require('mongoose')

const mongo_url = process.env.URL_MONGODB

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then( response => console.log(`bd conectada satisfactoriamente`) )
.catch( error => console.error(error) )