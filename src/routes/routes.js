const { Router } = require('express')
const usuariosRoutes = require('./usuarios.routes')


const routes = new Router()

//Rotas Públicas
routes.use('/usuarios', usuariosRoutes)



//Rotas Privadas


module.exports = routes