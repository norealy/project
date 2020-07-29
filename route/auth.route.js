const express = require('express')
const route = express.Router()
const controllerAuth = require('../controller/auth.controller')

route.get('/login', controllerAuth.getAccount);
route.post('/login', controllerAuth.postAccount);

route.get('/register',controllerAuth.getRegister)
route.post('/register',controllerAuth.postRegister)

module.exports = route