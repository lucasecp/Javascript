const express = require('express')
const router = express.Router()
const home = require('./src/controllers/Home')
const Register= require('./src/controllers/RegisterUser')
const{ login,logout} = require('./src/controllers/LoginUser')
const{index,register,edit,editIndex, drop} = require('./src/controllers/Contact')

router.get('/', home)
router.post('/register', Register)
router.post('/login/user', login)
router.get('/login/logout', logout)


router.get('/contato/index', index)
router.get('/contato/index/:id', editIndex)
router.get('/contato/delete/:id', drop)
router.post('/contato/edit/:id', edit)
router.post('/contato/register', register)


module.exports = router
