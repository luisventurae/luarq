'use strict'

/**
 * Controlador TestController
 */
const TestServices = require('App/Services/Test/TestServices')

class TestController {

    async getTestMessage(request, response) {
        const result = await TestServices.formatMessage('Hola mundo!')
        return response.json(result)
    }

    async getTestMessageProtected(request, response) {
        const result = await TestServices.formatMessage('Ha accedido a la ruta protegida, mediante el método GET')
        return response.json(result)
    }

    async getTestSession(request, response) {
        try {
            const session = request.session
            console.log('session',session)
            return response.status(200).send()
            
        } catch (error) {
            return response.status(500).send()            
        }
    }
}

module.exports = new TestController