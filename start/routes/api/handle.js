'use strict'

/**
 * Rutas de manipulacion de estados 404
 */

const { Router } = require('express')
const router = Router()

const msg = 'endpoint not found for method'

router.route('*')
    .get((request, response) => { return response.status(404).json({ msg }) })
    .post((request, response) => { return response.status(404).json({ msg }) })
    .put((request, response) => { return response.status(404).json({ msg }) })
    .delete((request, response) => { return response.status(404).json({ msg }) })

module.exports = router