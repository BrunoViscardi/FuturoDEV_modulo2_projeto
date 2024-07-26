const { Router } = require('express')
const usuariosRoutes = require('./usuarios.routes')
const LoginController = require('../controllers/LoginController')


const routes = new Router()

//Rotas Públicas
routes.use('/usuarios', usuariosRoutes)
routes.use('/login',LoginController.login)


//Rotas Privadas


module.exports = routes