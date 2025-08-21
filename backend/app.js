const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "userpassword",
  database: process.env.DB_NAME || "customerdb",
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

app.post("/customers", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO customers (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, email });
  });
});

app.get("/customers", (req, res) => {
  db.query("SELECT * FROM customers", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
