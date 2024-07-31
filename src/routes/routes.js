const { Router } = require('express')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./doc.swagger.json')


const usuariosRoutes = require('./usuarios.routes')
const LoginController = require('../controllers/LoginController')
const locaisRoutes = require('./locais.routes')

const validaToken = require('../middlewares/validaToken')


const routes = new Router()


routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


//Rotas Públicas
routes.use('/usuario', usuariosRoutes)
routes.use('/login', LoginController.login)


//Rotas Privadas
routes.use('/local', validaToken, locaisRoutes)



module.exports = routes