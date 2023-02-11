const { Router } = require('express')
const injectionsRoutes  = require('./payloads/injectionsRoutes')

const routes = Router()

routes.use('/payloads', injectionsRoutes)

module.exports = routes