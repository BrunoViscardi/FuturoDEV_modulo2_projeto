const  {Router} = require('express')
const LocalController = require('../controllers/LocalController')

const locaisRoutes = new Router()


locaisRoutes.post('/', LocalController.criar)
locaisRoutes.get('/', LocalController.listarTodos)
locaisRoutes.get('/:local_id', LocalController.listarUm)
locaisRoutes.delete('/:local_id', LocalController.deletar)
locaisRoutes.put('/:local_id', LocalController.atualizar)


module.exports = locaisRoutes