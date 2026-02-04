const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;
const USERS_FILE = "users.json";

// Create users.json if not exists
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// Signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));

  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.json({ message: "User already exists" });
  }

  users.push({ username, password });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users));
  res.json({ message: "Signup successful" });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));

  const validUser = users.find(
    u => u.username === username && u.password === password
  );

  if (validUser) {
    res.json({ message: "Login successful" });
  } else {
    res.json({ message: "Invalid credentials" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
