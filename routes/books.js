const express = require("express");
const booksService = require("../services/books");
const router = express.Router();

router.post("/addBook", booksService.addBook);
router.delete("/deleteBook", booksService.deleteBook);
router.put("/editBook", booksService.editBook);
module.exports = router;
