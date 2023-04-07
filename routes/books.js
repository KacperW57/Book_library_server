const express = require("express");
const booksService = require("../services/books");
const router = express.Router();

router.post("/addBook", booksService.addBook);
router.delete("/deleteBook", booksService.deleteBook);
router.put("/editBook", booksService.editBook);
router.get("/allBooks", booksService.allBooks);
router.get("/availableBooks", booksService.availableBooks);
router.put("/rentBook", booksService.rentBook);
router.put("/returnBook", booksService.returnBook);
module.exports = router;
