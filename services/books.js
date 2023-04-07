const mysql = require("mysql");
const { PrepareStatementInfo } = require("mysql2");

const db = mysql.createConnection({
  host: "db4free.net",
  user: "kacperw57",
  password: "kacperw57",
  database: "apitestkacperw",
});

exports.addBook = (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const ISBN = req.body.ISBN;
  const author = req.body.author;
  const rentedBy = req.body.rentedBy;
  const login = req.body.login;

  db.query(
    "SELECT isAdmin FROM libraryUsers WHERE login = ?",
    [login],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length == 0) {
        console.log("No such users!");
        return res.sendStatus(403);
      }
      if (results[0].isAdmin == 0) {
        console.log("This user is not an admin!");
        return res.sendStatus(403);
      }
      db.query(
        "INSERT INTO libraryBooks SET ?",
        {
          name: req.body.name,
          ISBN: req.body.ISBN,
          author: req.body.author,
          rentedBy: req.body.rentedBy,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Book added to the library!");
            return res.sendStatus(201);
          }
        }
      );
    }
  );
};

exports.deleteBook = (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const login = req.body.login;

  db.query(
    "SELECT isAdmin FROM libraryUsers WHERE login = ?",
    [login],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length == 0) {
        console.log("No such users!");
        return res.sendStatus(403);
      }
      if (results[0].isAdmin == 0) {
        console.log("This user is not an admin!");
        return res.sendStatus(403);
      }
      db.query(
        "DELETE FROM libraryBooks WHERE name = ?",
        [name],
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Book removed from the library!");
            return res.sendStatus(201);
          }
        }
      );
    }
  );
};

exports.editBook = (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const ISBN = req.body.ISBN;
  const author = req.body.author;
  const rentedBy = req.body.rentedBy;
  const login = req.body.login;

  db.query(
    "SELECT isAdmin FROM libraryUsers WHERE login = ?",
    [login],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length == 0) {
        console.log("No such users!");
        return res.sendStatus(403);
      }
      if (results[0].isAdmin == 0) {
        console.log("This user is not an admin!");
        return res.sendStatus(403);
      }
      db.query(
        `UPDATE libraryBooks SET name="${req.body.name}", ISBN=${req.body.ISBN},author="${req.body.author}",rentedBy="${req.body.rentedBy}" WHERE name = "${name}"`,
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`Book ${name} updated!`);
            return res.sendStatus(201);
          }
        }
      );
    }
  );
};

exports.allBooks = (req, res) => {
  db.query("SELECT * FROM libraryBooks", async (error, results) => {
    if (error) {
      console.log(error);
    }
    res.json(results);
  });
};

exports.availableBooks = (req, res) => {
  db.query(
    'SELECT * FROM libraryBooks WHERE rentedBy=""',
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      res.json(results);
    }
  );
};

exports.rentBook = (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const bookname = req.body.bookname;

  db.query(
    "SELECT isAdmin FROM libraryUsers WHERE login = ?",
    [username],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length == 0) {
        console.log("No such users!");
        return res.sendStatus(403);
      }
      if (results[0].isAdmin == 1) {
        console.log("Admins cannot rent books!");
        return res.sendStatus(403);
      }

      db.query(
        "SELECT rentedBy FROM libraryBooks WHERE name = ?",
        [bookname],
        async (error, results) => {
          if (error) {
            console.log(error);
          }
          if (results.length == 0) {
            console.log("There is no book with this name!");
            return res.sendStatus(403);
          }
          if (results[0].rentedBy != "") {
            console.log("This book is already rented!");
            return res.sendStatus(403);
          }
          db.query(
            `UPDATE libraryBooks SET rentedBy="${username}" WHERE name="${bookname}"`,
            (error, results) => {
              if (error) {
                console.log(erorr);
              } else {
                console.log(`Book ${bookname} rented to ${username}!`);
                return res.sendStatus(200);
              }
            }
          );
        }
      );
    }
  );
};

exports.returnBook = (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const bookname = req.body.bookname;

  db.query(
    "SELECT isAdmin FROM libraryUsers WHERE login = ?",
    [username],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length == 0) {
        console.log("No such users!");
        return res.sendStatus(403);
      }
      if (results[0].isAdmin == 1) {
        console.log("Admins cannot return books!");
        return res.sendStatus(403);
      }

      db.query(
        `UPDATE libraryBooks SET rentedBy="" WHERE name="${bookname}"`,
        (error, results) => {
          if (error) {
            console.log(erorr);
          } else {
            console.log(`Book ${bookname} returned by ${username}!`);
            return res.sendStatus(200);
          }
        }
      );
    }
  );
};
