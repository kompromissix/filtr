const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRoutes')

router.use('/tovars', deviceRouter)

module.exports = router