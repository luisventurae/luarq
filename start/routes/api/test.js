'use strict'

/**
 * Rutas de pruebas, para test
 */

const { Router } = require('express')
const router = Router()

const { auth } = require('Start/middleware/auth')
const TestController = require('Ctrl/Test/TestController')

router.get('/', TestController.getTestMessage )
router.get('/bearer', auth, TestController.getTestMessageProtected )
router.get('/session', auth, TestController.getTestSession )


module.exports = router