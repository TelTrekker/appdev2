const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Please enter book title'], trim: true },
  author: { type: String, required: [true, 'Please enter book title'], trim: true },
  year: { type: Number, required: true }
}, { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
