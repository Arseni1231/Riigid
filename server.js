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

app.use("/flags", express.static("public/flags"));


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
                console.log("Регистрация:", req.body);

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

        app.post("/leaderboard", async (req, res) => {
            try {
                const { user_id, score } = req.body;
                if (!user_id || score === undefined) 
                    return res.status(400).json({ success: false }
                );

                await db.query(
                `INSERT INTO users (user_id, total_score)
                VALUES (?, ?)
                ON DUPLICATE KEY UPDATE total_score = total_score + ?`,
                [user_id, score, score]
                );

                res.json({ success: true });
            } catch (err) {
                console.error("Ошибка при сохранении очков:", err.message);
                res.status(500).json({ success: false, message: err.message });
            }
});



        app.get("/", (req, res) => {
            res.json({
                message: "Сервер работает!",
                endpoints: {
                    register: "POST /register",
                    login: "POST /login",
                    users: "GET /users",
                    flags: "GET /flags"
                }
            });
        });

        app.get("/flags", async (req, res) => {
            try {
                const [rows] = await db.query("SELECT id, country_name, flag_url, capital, region FROM countries");
                res.json(rows);
            } catch (err) {
                console.error("Ошибка при получении флагов:", err.message);
                res.status(500).json({ success: false, message: "Ошибка получения данных" });
            }
        });

        app.get("/quiz/random", async (req, res) => {
            try {
                const [allCountries] = await db.query(
                    "SELECT id, country_name, flag_url FROM countries"
                );

                if (allCountries.length < 4) {
                    return res.status(400).json({ success: false, message: "Недостаточно стран для квиза" });
                }

                const correctIndex = Math.floor(Math.random() * allCountries.length);
                const correct = allCountries[correctIndex];


                const wrongOptions = allCountries
                    .filter((_, idx) => idx !== correctIndex)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);

                const options = [correct, ...wrongOptions].sort(() => 0.5 - Math.random());

                res.json({
                    correct,
                    options
                });
            } catch (err) {
                console.error("Ошибка при генерации квиза:", err.message);
                res.status(500).json({ success: false, message: "Ошибка генерации квиза" });
            }
        });

        app.get("/facts", async (req, res) => {
            try {
                const [rows] = await db.query(
                "SELECT id, country_id, fact FROM facts"
            );

            const [factsWithCountry] = await db.query(
            `SELECT f.id, f.fact, c.country_name, c.id AS country_id
            FROM facts f
            JOIN countries c ON f.country_id = c.id`
            );
            res.json(factsWithCountry);
        } catch (err) {
            console.error("Ошибка при получении фактов:", err.message);
            res.status(500).json({ success: false, message: "Ошибка получения фактов" });
        }
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