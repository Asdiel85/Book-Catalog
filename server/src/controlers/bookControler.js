const router = require("express").Router();
const bookManager = require("../managers/bookManager");
const { routeGuard } = require("../middlewares/authMiddleware");

router.post("/create", routeGuard, async (req, res) => {
  const { title, author, genre, description } = req.body;

  try {
    const book = await bookManager.create({
      title,
      author,
      genre,
      description,
      owner: req.user._id,
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(401).json(error.message);
  }
});

router.get("/:bookId", async (req, res) => {
  try {
    const book = await bookManager.getById(req.params.bookId);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.delete("/:bookId", routeGuard, async (req, res) => {
  try {
    const book = await bookManager.getById(req.params.bookId);
    if ((req.user._id = book.owner.toString())) {
      await bookManager.deleteBook(req.params.bookId);
      res.status(200).json("Book deleted");
    } else {
      throw new Error("You are not authorized");
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
});

router.put("/:bookId", routeGuard, async (req, res) => {
  try {
    const book = await bookManager.getById(req.params.bookId);
    if (req.user._id = book.owner.toString()) {
      const newBook = await bookManager.updateBook(req.params.bookId, req.body);
      res.status(200).json(newBook);
    } else {
      throw new Error("You are not authorized");
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
});

module.exports = router;
