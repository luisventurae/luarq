'use strict'

/**
 * Iniciar el marco de la aplicación web 
 */

const session = require('express-session')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT
const SESSION_SECRET = process.env.SESSION_SECRET

const cors_options = require('Start/config/cors')

// Setting Middlewares
app.use(express.json())
app.use(cors(cors_options))
app.use(session({ secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true } 
}))
require('Start/config/database') // Set DB
require('Start/routes')(app) // Set Routes

// Start Server
app.listen(PORT, () => {console.log(`Running on Port ${PORT}`)})