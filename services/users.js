const mysql = require("mysql");

const db = mysql.createConnection({
  host: "db4free.net",
  user: "kacperw57",
  password: "kacperw57",
  database: "apitestkacperw",
});

exports.register = (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const login = req.body.login;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  const isAdmin = req.body.isAdmin;

  db.query(
    "SELECT login FROM libraryUsers WHERE login = ?",
    [login],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        console.log("User with this login already exists!");
        return res.sendStatus(403);
      } else if (password != passwordConfirm) {
        console.log("Passwords do not match!");
        return res.sendStatus(403);
      }

      db.query(
        "INSERT INTO libraryUsers SET ?",
        {
          name: req.body.name,
          login: req.body.login,
          password: req.body.password,
          isAdmin: req.body.isAdmin,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(results);
            console.log("User registered!");
            return res.sendStatus(201);
          }
        }
      );
    }
  );
};

exports.login = (req, res) => {
  console.log(req.body);
  const login = req.body.login;
  const password = req.body.password;

  db.query(
    "SELECT login FROM libraryUsers WHERE login = ?",
    [login],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length == 0) {
        console.log("There is no user with such login!");
        return res.sendStatus(403);
      }

      db.query(
        "SELECT password FROM libraryUsers WHERE login = ?",
        [login],
        async (error, results) => {
          if (error) {
            console.log(error);
          }
          if (req.body.password != results[0].password) {
            console.log("Passwords do not match!");
            res.sendStatus(403);
          } else {
            console.log("Logged in succesfully!");
            res.sendStatus(202);
          }
        }
      );
    }
  );
};
