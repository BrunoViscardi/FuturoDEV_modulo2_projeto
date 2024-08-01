const axios = require('axios');
const linkCepApi = 'https://cep.awesomeapi.com.br/json/'

async function getByCep(cep) {
    try {
        const response = await axios.get(`${linkCepApi}${cep}`)

        const data = response.data;

        const dados = {
            logradouro: `${data.address_type} ${data.address_name}`,
            bairro: data.district,
            cidade: data.city,
            estado: data.state,
            latitude: data.lat,
            longitude: data.lng
        }
        return dados


    } catch (error) {
        if (error.response && error.response.data) {
            const data = error.response.data;
            if (data.code === 'not_found') {
                throw new Error(data.message);
            }
            if (data.code === 'invalid') {
                throw new Error('CEP inválido');
            }
        }
        throw new Error(`Erro ao requisitar informações a partir do CEP: ${error.message}`)
    }
}

module.exports = getByCep
