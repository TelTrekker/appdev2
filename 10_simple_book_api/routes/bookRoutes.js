const express = require('express');
const router = express.Router();

// Import the controller functions
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController'); 

const { verifyToken } = require('../middleware/middlewareToken');

// Routes
router.get('/', verifyToken, getAllBooks);
router.get('/:id', verifyToken, getBookById);
router.post('/', verifyToken, createBook);
router.patch('/:id', verifyToken, updateBook);
router.delete('/:id', verifyToken, deleteBook);

module.exports = router;
