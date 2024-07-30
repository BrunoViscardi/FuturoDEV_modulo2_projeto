const Local = require("../models/Local")
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
                !dados.latitude ||
                !dados.longitude) {
                return response
                    .status(400)
                    .json({ mensagem: 'Nome, prática esportiva, localidade, latitude e longitude são obrigatórios' })
            }



            //Validação latitude
            if (!latitudePattern.test(dados.latitude)) {
                return response
                    .status(400)
                    .json({ mensagem: 'A latitude não está no formato válido (eg., -22.95192 ou 38.89769).' });
            }
            const latitudeNum = parseFloat(dados.latitude);
            if (!(latitudeNum >= -90 && latitudeNum <= 90)) {
                return response
                    .status(400)
                    .json({ mensagem: 'A latitude deve estar entre -90 e 90.' });
            }



            //Validação longitude
            if (!longitudePattern.test(dados.longitude)) {
                return response
                    .status(400)
                    .json({ mensagem: 'A longitude não está no formato válido (eg., -43.21047 ou 116.57036).' });
            }
            const longitudeNum = parseFloat(dados.longitude);
            if (!(longitudeNum >= -180 && longitudeNum <= 180)) {
                return response
                    .status(400)
                    .json({ mensagem: 'A longitude deve estar entre -180 e 180.' });
            }



            const local = await Local.create({
                usuarioId: userId,
                nome: dados.nome,
                pratica_esportiva: dados.pratica_esportiva,
                descricao: dados.descricao,
                localidade: dados.localidade,
                latitude: dados.latitude,
                longitude: dados.longitude
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

}

module.exports = new LocalController()