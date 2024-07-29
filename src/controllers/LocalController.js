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
            if (!(latitudeNum >= -90 && latitudeNum <= 90)){
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
            if (!(longitudeNum >= -180 && longitudeNum <= 180)){
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

}

module.exports = new LocalController()