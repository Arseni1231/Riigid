const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], 
    credentials: true
}));
app.use(express.json());

async function startServer() {
    try {
        const db = await mysql.createPool({
            host: "localhost",
            user: "root", 
            password: "", 
            database: "country",
        });

        console.log("Подключение к базе данных установлено");

        app.post("/register", async (req, res) => {
            try {
                console.log("📨 Регистрация:", req.body);
                
                const { username, email, password } = req.body;
                
                if (!username || !email || !password) {
                    return res.json({ 
                        success: false, 
                        message: "Все поля обязательны" 
                    });
                }

                const hash = await bcrypt.hash(password, 10);
                
                await db.query(
                    "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
                    [username, email, hash]
                );
                
                console.log("Пользователь зарегистрирован:", username);
                
                res.json({ 
                    success: true, 
                    message: "Регистрация успешна! Теперь войдите." 
                });
            } catch (e) {
                console.error("Ошибка регистрации:", e.message);
                
                if (e.code === 'ER_DUP_ENTRY') {
                    res.json({ 
                        success: false, 
                        message: "Пользователь с таким именем или email уже существует" 
                    });
                } else {
                    res.json({ 
                        success: false, 
                        message: "Ошибка: " + e.message 
                    });
                }
            }
        });

        app.post("/login", async (req, res) => {
            try {
                console.log("Вход:", req.body);
                
                const { username, password } = req.body;
                
                if (!username || !password) {
                    return res.json({ 
                        success: false, 
                        message: "Введите имя пользователя и пароль" 
                    });
                }

                const [rows] = await db.query(
                    "SELECT * FROM users WHERE username = ?", 
                    [username]
                );
                
                if (rows.length === 0) {
                    console.log("Пользователь не найден:", username);
                    return res.json({ 
                        success: false, 
                        message: "Пользователь не найден" 
                    });
                }

                const user = rows[0];
                const valid = await bcrypt.compare(password, user.password_hash);
                
                if (!valid) {
                    console.log("Неверный пароль для:", username);
                    return res.json({ 
                        success: false, 
                        message: "Неверный пароль" 
                    });
                }

                console.log("Успешный вход:", username);
                
                res.json({ 
                    success: true, 
                    user: { 
                        id: user.id, 
                        username: user.username, 
                        email: user.email 
                    } 
                });
            } catch (e) {
                console.error("Ошибка входа:", e.message);
                res.json({ success: false, message: "Ошибка сервера" });
            }
        });

        app.get("/users", async (req, res) => {
            try {
                const [rows] = await db.query("SELECT id, username, email, created_at FROM users");
                console.log("👥 Пользователи в базе:", rows);
                res.json(rows);
            } catch (e) {
                res.json({ error: e.message });
            }
        });

        

        app.get("/", (req, res) => {
            res.json({ 
                message: "Сервер работает!",
                endpoints: {
                    register: "POST /register",
                    login: "POST /login", 
                    users: "GET /users"
                }
            });
        });

        app.listen(5000, () => {
            console.log("Сервер запущен на порту 5000");
            console.log("http://localhost:5000");
            console.log("Для отладки: http://localhost:5000/users");
        });

    } catch (err) {
        console.error("Ошибка запуска сервера:", err.message);
    }
}

startServer();