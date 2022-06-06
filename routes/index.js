const express = require('express');
const { auth } = require('../auth-midware/auth');
const router = express.Router();
const { reg, log, gen, restric } = require('../controller/routeCont')

router.post('/register', reg);

router.post("/login", log);

router.get('/general', gen);

router.get('/restricted', auth, restric);

module.exports = router;