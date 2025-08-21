const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "mysql",       // service name from docker-compose
  user: "root",
  password: "rootpassword",
  database: "customerdb"
});

db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL");
});

// Routes
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

app.post("/customers", (req, res) => {
  const { name, email } = req.body;
  db.query("INSERT INTO customers (name, email) VALUES (?, ?)", [name, email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error inserting customer");
    } else {
      res.send("Customer added successfully");
    }
  });
});

app.get("/customers", (req, res) => {
  db.query("SELECT * FROM customers", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching customers");
    } else {
      res.json(results);
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
