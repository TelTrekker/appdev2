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

// Routes
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
