const Local = require("../models/Local")
const getByCep = require('../services/cep.services')
const cepPattern = new RegExp(/^\d{5}-\d{3}$/)
const latitudePattern = RegExp(/^-?\d{1,2}\.\d{5}$/);
const longitudePattern = RegExp(/^-?\d{1,3}\.\d{5}$/);





class LocalController {

    async criar(request, response) {
        try {
            const dados = request.body
            const userId = request.userId;

            //Validação: dados obrigatórios
            if (!dados.nome ||
                !dados.pratica_esportiva ||
                !dados.localidade ||
                !dados.cep) {
                return response
                    .status(400)
                    .json({ mensagem: 'Nome, prática esportiva, localidade e CEP são obrigatórios' })
            }

            //Validação: CEP no formato adequado xxxxx-xxx
            if (!cepPattern.test(dados.cep)) {
                return response
                    .status(400)
                    .json({ mensagem: 'O CEP não está no formato válido xxxxx-xxx' });
            }



            // Obter informações do CEP
            let cepInfo;
            try {
                cepInfo = await getByCep(dados.cep)
            } catch (error) {
                return response
                .status(404)
                .json({ mensagem: error.message });
            }



            const local = await Local.create({
                usuarioId: userId,
                nome: dados.nome,
                pratica_esportiva: dados.pratica_esportiva,
                descricao: dados.descricao,
                localidade: dados.localidade,
                latitude: cepInfo.latitude,
                longitude: cepInfo.longitude
            })

            response.status(201).json({
                nome: local.nome,
                createdAt: local.createdAt
            })

        } catch (error) {
            console.log(error)
            response
                .status(500)
                .json({ mensagem: 'Não foi possível cadastrar novo local de treino' })
        }
    }



    async listarTodos(request, response) {
        try {
            const userId = request.userId;
            const locais = await Local.findAll({
                where: {
                    usuarioId: userId,
                },
                attributes: ['id', 'nome', 'pratica_esportiva', 'localidade']
            })

            if (locais.length == 0) {
                return response.status(200).json({
                    mensagem: 'O usuário ainda não possui locais de treino cadastrados.'
                })

            }

            response.status(200).json(locais)

        } catch (error) {
            //console.log(error)
            response.status(500).json({
                mensagem: 'Houve um erro ao listar os locais de treino'
            })
        }
    }


    async listarUm(request, response) {
        try {
            const id = request.params.local_id
            const userId = request.userId

            const local = await Local.findByPk(id)

            if (!local) {
                return response
                    .status(404)
                    .json({ mensagem: 'Não foi encontrado o local de treino com esse ID.' })
            }

            //Validação: garante que apenas o usuário que cadastrou o local possa realizar essa operação
            if (local.usuarioId != userId) {
                return response
                    .status(401)
                    .json({ mensagem: 'Usuário não autorizado.' })
            }

            response.json(local)

        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao listar o local de treino.'
            })
        }
    }


    async deletar(request, response) {
        try {
            const id = request.params.local_id
            const local = await Local.findByPk(id)
            const userId = request.userId

            if (!local) {
                response.status(404).json({ mensagem: 'Não foi encontrado o local de treino com esse ID.' })
            }

            //Validação: garante que apenas o usuário que cadastrou o local possa realizar essa operação
            if (local.usuarioId != userId) {
                return response
                    .status(401)
                    .json({ mensagem: 'Usuário não autorizado.' })
            }

            await local.destroy()

            response.status(204).json()

        } catch (error) {
            console.log(error)
            response.status(500).json({
                mensagem: 'Houve um erro ao deletar o local de treino.'
            })
        }
    }



    async atualizar(request, response) {
        try {
            const id = request.params.local_id
            const dados = request.body
            const userId = request.userId;

            const local = await Local.findByPk(id)

            if (!local) {
                response.status(404).json({ mensagem: 'Não foi encontrado o local' })
            }


            //Validação: garante que apenas o usuário que cadastrou o local possa realizar essa operação
            if (local.usuarioId != userId) {
                return response
                    .status(401)
                    .json({ mensagem: 'Usuário não autorizado.' })
            }



            // Validação: impede atualização com dados nulos ou strings vazias
            const camposObrigatorios = ['nome', 'pratica_esportiva', 'localidade', 'latitude', 'longitude'];
            for (let i = 0; i < camposObrigatorios.length; i++) {
                const campo = camposObrigatorios[i];
                if (dados[campo] === null || dados[campo] === '') {
                    return response
                        .status(400)
                        .json({ mensagem: `O campo ${campo} não pode ser nulo ou vazio.` });
                }
            }



            //Validação latitude
            if (dados.latitude && !latitudePattern.test(dados.latitude)) {
                return response
                    .status(400)
                    .json({ mensagem: 'Latitude inválida. Use 5 casas decimais (eg., -22.95192 ou 38.89700).' });
            }
            const latitudeNum = parseFloat(dados.latitude);
            if (dados.latitude && !(latitudeNum >= -90 && latitudeNum <= 90)) {
                return response
                    .status(400)
                    .json({ mensagem: 'A latitude deve estar entre -90 e 90.' });
            }



            //Validação longitude
            if (dados.longitude && !longitudePattern.test(dados.longitude)) {
                return response
                    .status(400) 
                    .json({ mensagem: 'Longitude inválida. Use 5 casas decimais (eg., -43.21047 e 116.57000).' });
            }
            const longitudeNum = parseFloat(dados.longitude);
            if (dados.longitude && !(longitudeNum >= -180 && longitudeNum <= 180)) {
                return response
                    .status(400)
                    .json({ mensagem: 'A longitude deve estar entre -180 e 180.' });
            }



            // Remove dados id e usuarioId do objeto dados para impedir atualização
            delete dados.id;
            delete dados.usuarioId;


            await local.update(dados);

            response.status(200).json({ mensagem: 'Atualizado com sucesso' })

        } catch (error) {
            console.log(error)
            response.
                status(500).
                json({ mensagem: 'Houve um erro ao atualizar o local de treino.' })
        }
    }

}

module.exports = new LocalController()