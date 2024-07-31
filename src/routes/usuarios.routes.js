const { Router } = require('express')
const UsuarioController = require('../controllers/UsuarioController')

const usuariosRoutes = new Router()

usuariosRoutes.post('/', UsuarioController.criarConta
    /*
    #swagger.tags = ['Usuário'],
    #swagger.description = 'Endpoint para criar uma conta de usuário',
    #swagger.parameters['novoUsuario'] = {
        in: 'body',
        description: 'Informações do usuario',
        required: true,
        schema: {
            $nome: 'usuarioTeste',
            $email: 'teste@email.com',
            $password: 'senha123',
            $cpf: '123.456.789-11',
            $sexo: 'outro',
            $data_nascimento: '02/28/1921',
            endereco: {
                $logradouro: 'Rua A',
                $numero: '123',
                $complemento: 'Apto 1',
                $bairro: 'Alfeneiros',
                $cidade: 'Florianópolis',
                $estado: 'SC',
                $cep: '88888-123'
            }
        }
    },
 */
)

module.exports = usuariosRoutes