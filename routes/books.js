const express = require("express");
const booksService = require("../services/books");
const router = express.Router();

router.post("/addBook", booksService.addBook);
router.delete("/deleteBook", booksService.deleteBook);
router.put("/editBook", booksService.editBook);
router.get("/allBooks", booksService.allBooks);
router.get("/availableBooks", booksService.availableBooks);
module.exports = router;
