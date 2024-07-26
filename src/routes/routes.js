const { Router } = require('express')
const usuariosRoutes = require('./usuarios.routes')
const LoginController = require('../controllers/LoginController')
const validaToken = require('../middlewares/validaToken')


const routes = new Router()

//Rotas Públicas
routes.use('/usuarios', usuariosRoutes)
routes.use('/login',LoginController.login)


//Rotas Privadas
routes.get('/', validaToken, (request, response) => {
    response.send("Bem vindo")
})


module.exports = routes