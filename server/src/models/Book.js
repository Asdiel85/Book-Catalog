const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [20, "Please enter more than 20 characters"],
      maxLength: [1000, "Description max length is 1000 characters"],
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Book = new mongoose.model("Book", bookSchema);
module.exports = Book;
