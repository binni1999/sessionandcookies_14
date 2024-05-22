const express = require('express')
const router = express.Router()
const authcontroller = require('./../controllers/authcontroller')
router.get('/login', authcontroller.getLogin)
router.post('/login', authcontroller.postLogin)
module.exports = router;