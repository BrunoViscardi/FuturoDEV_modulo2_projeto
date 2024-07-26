const { verify } = require('jsonwebtoken')

function validaToken(request, response, next) {
    try {
        const token = request.headers.authorization

        //Validação: dado obrigatório
        if (!token) {
            return response
                .status(400)
                .json({ mensagem: 'Token não anexado' })
        }

        //Quebra o token para depois descartar a palavra Bearer
        const jwt = token.split(" ")

        const resultado = verify(jwt[1], process.env.JWT_SECRET)


        //Salva as variáveis do token dentro do request
        request.userId = resultado.id


        next()

    } catch (error) {
        console.log(error)
        if (error.message === "invalid signature" || error.message === "jwt malformed" || error.message === "jwt expired") {
            response
                .status(401)
                .json({ mensagem: 'O Token está inválido ou expirado' })
        } else {
            console.log(error)
            response
                .status(500)
                .json({ mensagem: 'A requisição falhou' })
        }
    }

}

module.exports = validaToken