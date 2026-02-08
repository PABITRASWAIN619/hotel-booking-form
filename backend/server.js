const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// Read users
function readUsers() {
    if (!fs.existsSync("users.json")) return [];
    return JSON.parse(fs.readFileSync("users.json"));
}

// Save users
function saveUsers(users) {
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
}

// Signup API
app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    const exists = users.find(u => u.username === username);
    if (exists) {
        return res.json({ message: "User already exists" });
    }

    users.push({ username, password });
    saveUsers(users);

    res.json({ message: "Signup successful" });
});

// Login API
// Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ message: "Login successful", name: user.name });
    } else {
        res.json({ message: "Invalid credentials" });
    }
});
app.get("/api/user", (req, res) => {
    res.json({ name: "Pabitra Swain" }); // later you can use session/login user
});

app.listen(PORT, () => {
    console.log("✅ Server connected successfully")
    console.log("✅ Server is running on http://localhost:5000");
});