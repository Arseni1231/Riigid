const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {

  const db = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "твой_пароль",
    database: "country",
  });


  app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    try {
      await db.query(
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
        [username, email, hash]
      );
      res.json({ success: true });
    } catch (e) {
      res.json({ success: false, message: e.message });
    }
  });


  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (rows.length === 0)
      return res.json({ success: false, message: "Пользователь не найден" });
    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res.json({ success: false, message: "Неверный пароль" });
    res.json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
  });

  app.listen(5000, () => console.log("Server running on port 5000"));
}


startServer().catch((err) => console.error(err));