const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
const db = mysql.createConnection({
  host: "db4free.net",
  user: "kacperw57",
  password: "kacperw57",
  database: "apitestkacperw",
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MYSQL Connected...");
  }
});

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
/* Users routing */
app.use("/users", require("./routes/users"));
/* Books routing */
app.use("/books", require("./routes/books"));

/* Error handling middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).send();
  return;
});

app.listen(port, () => {
  console.log(`Library app listening at http://localhost:${port}`);
});
