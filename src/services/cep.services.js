const axios = require('axios');
const linkCepApi = 'https://cep.awesomeapi.com.br/json/'

async function getByCep(cep) {
    try {
        const response = await axios.get(`${linkCepApi}${cep}`)

        if (!response.data || response.data.length === 0) {
            throw new Error('CEP não encontrado');
        }

        const data = response.data;
        const busca = {
            logradouro: `${data.address_type} ${data.address_name}`,
            bairro: data.district,
            cidade: data.city,
            estado: data.state,
            latitude: data.lat,
            longitude: data.lng
        }
        return busca


    } catch (error) {
        return { erro: 'CEP não encontrado' }
    }
}

module.exports = getByCep
