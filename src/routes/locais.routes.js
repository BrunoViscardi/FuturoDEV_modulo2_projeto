const  {Router} = require('express')
const LocalController = require('../controllers/LocalController')

const locaisRoutes = new Router()


locaisRoutes.post('/', LocalController.criar)
locaisRoutes.get('/', LocalController.listarTodos)
locaisRoutes.get('/:local_id', LocalController.listarUm)


module.exports = locaisRoutes