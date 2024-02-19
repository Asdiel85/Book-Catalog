const Book = require("../models/Book");

exports.getBooks = () => {
  const result = Book.find().sort({ createdAt: -1 });
  return result;
};

exports.create = async (bookData) => {
  const book = new Book(bookData);
  await book.save();
  return book;
};

exports.getUserBooks = (userId) => {
  const books = Book.find({ owner: userId });
  return books;
};

exports.getById = (bookId) => Book.findById(bookId);

exports.updateBook = (bookId, data) =>
  Book.findByIdAndUpdate(bookId, data, { runValidators: true, new: true });

exports.deleteBook = (bookId) => Book.findByIdAndDelete(bookId);
