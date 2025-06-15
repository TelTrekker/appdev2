const express = require('express');
const { signUpSchema, signInSchema } = require('../middleware/authValidator');
const { signUp, signIn } = require('../controllers/authController');
const parseForm = require('../middleware/formparser');

const router = express.Router();

router.post('/signup', parseForm, signUpSchema, signUp);
router.post('/signin', parseForm, signInSchema, signIn);

module.exports = router;
