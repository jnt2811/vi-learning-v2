const bookRepository = require("../repositories/book_repository");
const { db } = require("../common/functions");

function Resource() {
  this.getBooks = getBooks;
  this.addBook = addBook;
  this.editBook = editBook;
  this.deleteBook = deleteBook;
}

async function getBooks(req, res, next) {
  try {
    const result = await bookRepository.queryBooks(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function addBook(req, res, next) {
  try {
    const book_id = db.genID("BUK");

    req.body.id = book_id;

    await bookRepository.insertBook(req.body);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function editBook(req, res, next) {
  try {
    const { id } = req.body;

    if (!id) return res.status(403).json("book/id-not-found");

    await bookRepository.updateBook(req.body);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function deleteBook(req, res, next) {
  try {
    const { id } = req.body;

    if (!id) return res.status(403).json("book/id-not-found");

    await bookRepository.deleteBook(req.body);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

module.exports = new Resource();
