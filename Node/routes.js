const express = require('express')
const router = express.Router()
const {home,homePost} = require('./src/controllers/Home')

router.get('/', home)
router.post('/',homePost)

module.exports = router
