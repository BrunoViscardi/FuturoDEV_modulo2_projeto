const Usuario = require('../models/Usuario')


class UsuarioController {

    async criarConta(request, response) {
        try {
            const dados = request.body


            const usuario = await Usuario.create({
                nome: dados.nome,
                email: dados.email,
                password_hash: dados.password,
                cpf: dados.cpf,
                sexo: dados.sexo,
                data_nascimento: dados.data_nascimento,
                endereco: dados.endereco
            })

            response.status(201).json({
                nome: usuario.nome,
                email: usuario.email,
                createdAt: usuario.createdAt
            })


        } catch (error) {
            //console.log(error)
            response
            .status(500)
            .json({
                mensagem: 'Não foi possível criar a conta'
            })
        }
    }
}

module.exports = new UsuarioController()