const express = require('express');
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController'); 

const { verifyToken } = require('../middleware/middlewareToken');
const sendBookNotification = require('../middleware/sendEmailMiddleware');
const parseForm = require('../middleware/formparser');
const Book = require('../models/Book');
// Routes
router.get('/', verifyToken, getAllBooks);
router.get('/:id', verifyToken, getBookById);

router.post('/', verifyToken, parseForm, async (req, res) => {
  try {
    console.log('BODY:', req.body); 
    const book = new Book(req.body);
    const savedBook = await book.save();

    await sendBookNotification(savedBook);

    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id', verifyToken, updateBook);
router.delete('/:id', verifyToken, deleteBook);

module.exports = router;
