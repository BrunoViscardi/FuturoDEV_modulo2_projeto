const  {Router} = require('express')
const LocalController = require('../controllers/LocalController')

const locaisRoutes = new Router()


locaisRoutes.post('/', LocalController.criar)
locaisRoutes.get('/', LocalController.listarTodos)


module.exports = locaisRoutes