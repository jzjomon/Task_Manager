const express = require('express');
const router = express.Router();
const { signIn, signUp} = require('../controllers/auth.js')

router.post("/signIn", signIn)
router.post("/signUp", signUp);


module.exports = router