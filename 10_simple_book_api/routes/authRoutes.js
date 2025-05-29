const express = require('express');
const { signUp, signIn } = require('../controllers/authController');
const { signInSchema, signUpSchema } = require('../middleware/authValidator');
const parseForm = require('../middleware/formParser');

const router = express.Router();

// Sign-UP Route
router.post('/signup', parseForm, async (req, res, next) => {
  try {
    await signUpSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}, signUp);

router.post('/signin', parseForm, async (req, res, next) => {
  try {
    await signInSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}, signIn);

module.exports = router;
