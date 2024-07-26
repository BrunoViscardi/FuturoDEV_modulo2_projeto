const Usuario = require('../models/Usuario')
const padraoEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;


class UsuarioController {

    async criarConta(request, response) {
        try {
            const dados = request.body

            //Validação: dados obrigatórios
            if(!dados.nome || !dados.email || !dados.password || !dados.cpf || !dados.endereco) {
                return response
                .status(400)
                .json({mensagem: 'O nome, email, senha, cpf e enderço são obrigatórios'})
            }



            //Validação: email no formato xxx@xxx.xxx
            if(!padraoEmail.test(dados.email)) {
                return response
                    .status(400)
                    .json({mensagem: 'O email não está no formato válido xxx@xxx.xxx'})
            }



            //Validação: email único
            const emailExistente = await Usuario.findOne({
                where: {
                    email: dados.email
                }
            });
            if (emailExistente) {
                return response
                .status(400)
                .json({ mensagem: 'Email já cadastrado' });
            }



            //Validação: a senha deve possuir entre 8 e 16 caracteres
            if(!(dados.password?.length >= 8 && dados.password?.length <= 16)) {
                return response
                    .status(400)
                    .json({mensagem: 'A senha deve possuir entre 8 e 16 dígitos'})
            }



            //Validação: CPF no formato adequado xxx.xxx.xxx-xx
            if (!cpfPattern.test(dados.cpf)) {
                return response
                .status(400)
                .json({ mensagem: 'O CPF não está no formato válido xxx.xxx.xxx-xx' });
            }



            //Validação: CPF único
            if (dados.cpf) {
                const cpfExistente = await Usuario.findOne({
                    where: {
                        cpf: dados.cpf
                    }
                })
                if (cpfExistente) {
                    return response.status(400).json({ mensagem: 'CPF já cadastrado' });
                }
            }



            //Validação: sexo "masculino", "feminino" ou "outros"
            if(dados.sexo && (dados.sexo !== 'masculino' && dados.sexo !== 'feminino' && dados.sexo !== 'outro')){
                return response
                .status(400)
                .json({ mensagem: 'O sexo não está no formato válido (masculino, feminino ou outro)' })
            }



            //Validação se data de nascimento está no formato adequado mm/dd/aaaa
            const data_nascimentoPattern = /^\d{2}\/\d{2}\/\d{4}$/
            if (dados.data_nascimento && !data_nascimentoPattern.test(dados.data_nascimento)) {
                return response
                .status(400)
                .json({ mensagem: 'A data de nascimento precisa estar no formato mm/dd/aaaa' });
            }



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
            console.log(error)
            if (error.name === 'SequelizeDatabaseError' && error.parent && error.parent.message === 'sintaxe de entrada é inválida para tipo timestamp with time zone: "Invalid date"') {
                return response.status(400).json({ mensagem: 'A data de nascimento é inválida' });
            }
            response
            .status(500)
            .json({
                mensagem: 'Não foi possível criar a conta'
            })
        }
    }
}

module.exports = new UsuarioController()