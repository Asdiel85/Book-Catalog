const Book = require('../models/Book');

exports.getPosts = () => {
    const result = Book.find().sort({createdAt: -1})
    return result;
}