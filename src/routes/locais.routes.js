const  {Router} = require('express')
const LocalController = require('../controllers/LocalController')

const locaisRoutes = new Router()


locaisRoutes.post('/', LocalController.criar
    /*
    #swagger.tags = ['Locais de Treino'],
    #swagger.description = 'Endpoint para cadastrar local de treino',
    #swagger.parameters['novoLocal'] = {
        in: 'body',
        description: 'Informações do local de treino',
        required: true,
        schema: { 
            $nome: 'Álvaro Arquearia RT',
            $pratica_esportiva': 'Arco e flecha',
            $descricao':'Local de treino',
            $localidade':'Sul da ilha de Florianópolis',
            $latitude': '-43.21046',
            $longitude':'-47.21046'
        }
    },
    */
)
locaisRoutes.get('/', LocalController.listarTodos
    /*
    #swagger.tags = ['Locais de Treino'],
    #swagger.description = 'Endpoint para listar todos os locais de treino do usuário',
    */
)
locaisRoutes.get('/:local_id', LocalController.listarUm
    /*
    #swagger.tags = ['Locais de Treino'],
    #swagger.description = 'Endpoint para listar um local de treino específico',
    #swagger.parameters['local_id'] = {
        in: 'path',
        description: 'ID do local de treino',
        required: true,
        type: 'integer'
    },
    */
)
locaisRoutes.delete('/:local_id', LocalController.deletar
    /*
    #swagger.tags = ['Locais de Treino'],
    #swagger.description = 'Endpoint para deletar um local de treino específico',
    #swagger.parameters['local_id'] = {
        in: 'path',
        description: 'ID do local de treino',
        required: true,
        type: 'integer'
    },
    */
)
locaisRoutes.put('/:local_id', LocalController.atualizar
    /*
    #swagger.tags = ['Locais de Treino'],
    #swagger.description = 'Endpoint para atualizar um local de treino específico',
    #swagger.parameters['local_id'] = {
        in: 'path',
        description: 'ID do local de treino',
        required: true,
        type: 'integer'
    },
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Dados para atualizar o local de treino',
        required: true,
        schema: {
            $nome: 'Álvaro Arquearia RT',
            $pratica_esportiva: 'Arco e flecha',
            $descricao: 'Local de treino',
            $localidade: 'Sul da ilha de Florianópolis',
            $latitude: '-43.21046',
            $longitude: '-47.21046'
        }
    },
    */
)


module.exports = locaisRoutes