const { Router } = require('express')
const usuariosRoutes = require('./usuarios.routes')
const LoginController = require('../controllers/LoginController')
const locaisRoutes = require('./locais.routes')
const validaToken = require('../middlewares/validaToken')


const routes = new Router()

//Rotas Públicas
routes.use('/usuario', usuariosRoutes)
routes.use('/login', LoginController.login)


//Rotas Privadas
routes.use('/local', validaToken, locaisRoutes)



module.exports = routes