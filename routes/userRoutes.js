const mongoose  = require('../config/database.js');
const express = require('express');
const router = express.Router();

const {getLog,getRegistro,logIn, registro, getData} = require('../controllers/userC.js')

router.get('/', getLog);
router.get('/registro',getRegistro);
router.get('/index',getData)

router.post('/log', logIn)
router.post('/registro', registro)


module.exports = router;