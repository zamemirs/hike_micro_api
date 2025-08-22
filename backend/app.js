const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const AWS = require("aws-sdk");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize AWS Secrets Manager client
const client = new AWS.SecretsManager({
  region: "ap-south-1" // Change to your RDS region
});

let db; // MySQL connection

// Get DB credentials from AWS Secrets Manager
async function initDB() {
  try {
    const data = await client.getSecretValue({
      SecretId: "rds!db-dd179980-5742-4638-995a-a6a377a7d971" // Replace with your secret name
    }).promise();

    const secret = JSON.parse(data.SecretString);

    db = mysql.createConnection({
      host: "mysql-db.cdeuaqecq135.ap-south-1.rds.amazonaws.com", // your RDS endpoint
      user: secret.username, // from secrets manager
      password: secret.password,
      database: "mysql-db", // make sure this DB exists in RDS
      port: 3306
    });

    db.connect(err => {
      if (err) throw err;
      console.log("✅ Connected to AWS RDS MySQL using Secrets Manager!");
    });

  } catch (err) {
    console.error("❌ Error fetching DB credentials:", err);
    process.exit(1); // exit if DB connection fails
  }
}

// API: Add customer
app.post("/customers", (req, res) => {
  const { name, email } = req.body;
  if (!db) return res.status(500).json({ error: "DB not connected yet" });

  const sql = "INSERT INTO customers (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, name, email });
  });
});

// API: Get all customers
app.get("/customers", (req, res) => {
  if (!db) return res.status(500).json({ error: "DB not connected yet" });

  db.query("SELECT * FROM customers", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Start Express server AFTER DB init
initDB().then(() => {
  app.listen(5000, () => console.log("🚀 Backend running on port 5000"));
});
