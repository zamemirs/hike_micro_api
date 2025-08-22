const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "database-1.cdeuaqecq135.ap-south-1.rds.amazonaws.com",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "password12345",
  database: process.env.DB_NAME || "database-1"
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL!");
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
