const Book = require('../models/Book');

// GET all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
};

// CREATE a book
const createBook = async (req, res, silent = false) => {
  try {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
      if (!silent) res.status(400).json({ message: 'Title, author, and year are required' });
      throw new Error('Missing required fields');
  }
  
  const newBook = new Book({ title, author, year });
  const savedBook = await newBook.save();
  if (!silent) res.status(201).json(savedBook);
  return savedBook;
} catch (err) {
  if (!silent) res.status(400).json({ message: err.message });
  throw err;
}
};

// UPDATE a book
const updateBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Book not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a book
const deleteBook = async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};