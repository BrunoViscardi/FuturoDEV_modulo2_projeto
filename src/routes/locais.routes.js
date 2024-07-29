const  {Router} = require('express')
const LocalController = require('../controllers/LocalController')

const locaisRoutes = new Router()


locaisRoutes.post('/', LocalController.criar)


module.exports = locaisRoutes