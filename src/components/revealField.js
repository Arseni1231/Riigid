import React, { useState, useEffect } from "react";
import "../css/revealField.css";

export default function RevealField() {
  const NUM_CELLS = 4; 
  const MAX_SCORE = 10;
  const MAX_ROUNDS = 10;

  const [countries, setCountries] = useState([]);
  const [correctCountry, setCorrectCountry] = useState(null);
  const [openedCells, setOpenedCells] = useState([]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/flags")
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (countries.length > 0) startNewRound();
  }, [countries]);

  const startNewRound = () => {
    if (round > MAX_ROUNDS) {
      endGame();
      return;
    }

    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    setCorrectCountry(randomCountry);
    setOpenedCells([]);
    setInput("");
    setMessage("");
  };

  const openCell = (index) => {
    if (!openedCells.includes(index)) {
      setOpenedCells([...openedCells, index]);
    }
  };

  const [answered, setAnswered] = useState(false);

  const checkAnswer = () => {
    if (!correctCountry || answered) return;

    if (input.trim().toLowerCase() === correctCountry.country_name.toLowerCase()) {
        const points = Math.max(MAX_SCORE - openedCells.length, 1);
        setScore(prev => prev + points);
        setMessage(`✅ Верно! Вы получили ${points} очков.`);
        setAnswered(true);
    } else {
        setMessage("❌ Неверно! Попробуйте открыть ещё клетку.");
        return;
    }

    setTimeout(() => {
        if (round < MAX_ROUNDS) {
            setRound(prev => prev + 1);
            startNewRound();
            setAnswered(false); 
        } else {
            endGame();
        }
    }, 1200);
};

  const endGame = () => {
    setGameOver(true);
    setMessage(`Игра окончена! Ваш итог: ${score} очков.`);

    
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      
      fetch("http://localhost:5000/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, score })
      })
      .then(res => res.json())
      .then(data => console.log("Очки отправлены на сервер:", data))
      .catch(err => console.error("Ошибка при сохранении очков:", err));
    }
  };

  const restartGame = () => {
    setScore(0);
    setRound(1);
    setGameOver(false);
    startNewRound();
  };

  return (
    <div className="reveal-field-container">
      <h2>Reveal Field</h2>
      {!gameOver && <p>Раунд {round} / {MAX_ROUNDS}</p>}
      <p>Очки: {score}</p>

      {!gameOver ? (
        <>
          <div className="grid">
            {Array(NUM_CELLS).fill(0).map((_, index) => (
              <div
                key={index}
                className={`cell ${openedCells.includes(index) ? "opened" : ""}`}
                onClick={() => openCell(index)}
              >
                {openedCells.includes(index) && correctCountry ? (
                  <img
                    src={correctCountry.flag_url}
                    alt="flag"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      clipPath: getClipPath(index)
                    }}
                  />
                ) : (
                  "?"
                )}
              </div>
            ))}
          </div>

          <div className="input-block">
            <input
              type="text"
              placeholder="Введите название страны"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={checkAnswer}>Угадать</button>
             <button onClick={() => {
      if (round < MAX_ROUNDS) {
        setRound(prev => prev + 1);
        startNewRound();
        setAnswered(false);
        setMessage("Раунд пропущен!");
      } else {
        endGame();
      }
    }}
    
  >Пропустить</button>
          </div>
        </>
      ) : (
        <button onClick={restartGame}>Сыграть снова</button>
      )}

      <p className="message">{message}</p>
    </div>
  );
}

function getClipPath(index) {
  switch (index) {
    case 0: return "inset(0 50% 50% 0)";
    case 1: return "inset(0 0 50% 50%)";
    case 2: return "inset(50% 50% 0 0)";
    case 3: return "inset(50% 0 0 50%)";
    default: 
      return "none";
  }
}