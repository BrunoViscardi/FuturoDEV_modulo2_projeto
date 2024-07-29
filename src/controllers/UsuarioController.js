const connection = require('../database/connection')
const Endereco = require('../models/Endereco');
const Usuario = require('../models/Usuario')
const padraoEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
const cpfPattern = new RegExp(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
const cepPattern = new RegExp(/^\d{5}-\d{3}$/)
const estadosBRvalidos = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];



class UsuarioController {

    async criarConta(request, response) {
        const t = await connection.transaction();
        try {
            const dados = request.body

            //Validação: dados obrigatórios
            if (!dados.nome || !dados.email || !dados.password || !dados.cpf || !dados.endereco) {
                return response
                    .status(400)
                    .json({ mensagem: 'O nome, email, senha, cpf e endereço são obrigatórios' })
            }



            //Validação: email no formato xxx@xxx.xxx
            if (!padraoEmail.test(dados.email)) {
                return response
                    .status(400)
                    .json({ mensagem: 'O email não está no formato válido xxx@xxx.xxx' })
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
            if (!(dados.password?.length >= 8 && dados.password?.length <= 16)) {
                return response
                    .status(400)
                    .json({ mensagem: 'A senha deve possuir entre 8 e 16 dígitos' })
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
            if (dados.sexo && (dados.sexo !== 'masculino' && dados.sexo !== 'feminino' && dados.sexo !== 'outro')) {
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


            //Validação: dados obrigatórios
            if (!dados.endereco.logradouro ||
                !dados.endereco.numero ||
                !dados.endereco.bairro ||
                !dados.endereco.cidade ||
                !dados.endereco.estado ||
                !dados.endereco.cep) {
                return response
                    .status(400)
                    .json({ mensagem: 'O logradouro, numero, bairro, cidade, estado e CEP são obrigatórios para o cadastro do enderço.' })
            }



            //Validação: esatado com sigla válida
            if (!estadosBRvalidos.includes(dados.endereco.estado)) {
                return response
                    .status(400)
                    .json({ mensagem: 'A sigla do estado stado brasileiro não é válida (eg., MS)' });
            }



            //Validação: CEP no formato adequado xxxxx-xxx
            if (!cepPattern.test(dados.endereco.cep)) {
                return response
                    .status(400)
                    .json({ mensagem: 'O CEP não está no formato válido xxxxx-xxx' });
            }




            const usuario = await Usuario.create({
                nome: dados.nome,
                email: dados.email,
                password_hash: dados.password,
                cpf: dados.cpf,
                sexo: dados.sexo,
                data_nascimento: dados.data_nascimento
            }, { transaction: t })

            const endereco = await Endereco.create({
                usuarioId: usuario.id,
                logradouro: dados.endereco.logradouro,
                numero: dados.endereco.numero,
                complemento: dados.endereco.complemento,
                bairro: dados.endereco.bairro,
                cidade: dados.endereco.cidade,
                estado: dados.endereco.estado,
                cep: dados.endereco.cep
            }, { transaction: t })


            await t.commit();


            response.status(201).json({
                nome: usuario.nome,
                email: usuario.email,
                createdAt: usuario.createdAt
            })

        } catch (error) {
            await t.rollback();
            //console.log(error)
            if (error.name === 'SequelizeDatabaseError' && error.parent && error.parent.message === 'sintaxe de entrada é inválida para tipo timestamp with time zone: "Invalid date"') {
                return response
                    .status(400)
                    .json({ mensagem: 'A data de nascimento é inválida' });
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