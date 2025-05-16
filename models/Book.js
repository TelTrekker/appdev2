const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: [true, 'Please enter book title'] },
  author: { type: String, required: true, trim: [true, 'Please enter book title'] }
}, { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
