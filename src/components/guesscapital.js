import React, { useEffect, useState } from "react";
import "../css/guesscapital.css";

export default function GuessCapital() {
  const TOTAL_QUESTIONS = 30;

  const [options, setOptions] = useState([]);
  const [correct, setCorrect] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [allCountries, setAllCountries] = useState([]);

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  const fetchAllCountries = async () => {
    try {
      const res = await fetch("http://localhost:5000/flags"); 
      const data = await res.json();
      setAllCountries(data);
    } catch (err) {
      console.error("Ошибка загрузки стран:", err);
    }
  };

  const fetchQuiz = () => {
    if (allCountries.length === 0) return;

    const correctIndex = Math.floor(Math.random() * allCountries.length);
    const correctCountry = allCountries[correctIndex];

    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const randIndex = Math.floor(Math.random() * allCountries.length);
      const country = allCountries[randIndex];
      if (country.capital !== correctCountry.capital && !wrongOptions.find(c => c.capital === country.capital)) {
        wrongOptions.push(country);
      }
    }

    const allOptions = [correctCountry, ...wrongOptions];
    shuffleArray(allOptions);

    setCorrect(correctCountry);
    setOptions(allOptions);
    setResult("");
  };

  const checkAnswer = (choice) => {
    if (!correct || !choice) return;

    if (choice === correct.capital) setScore(prev => prev + 1);
    setResult(choice === correct.capital ? "Верно!" : `Неверно! Правильный ответ: ${correct.capital}`);

    setTimeout(() => {
      if (questionIndex + 1 >= TOTAL_QUESTIONS) setQuizOver(true);
      else {
        setQuestionIndex(prev => prev + 1);
        fetchQuiz();
      }
    }, 1500);
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  useEffect(() => {
    if (allCountries.length > 0 && !quizOver) fetchQuiz();
  }, [questionIndex, allCountries]);

  if (quizOver) {
    return (
      <div className="quiz-container">
        <h2>Квиз завершён!</h2>
        <p>Ваш результат: {score} из {TOTAL_QUESTIONS}</p>
        <button onClick={() => {
          setScore(0);
          setQuestionIndex(0);
          setQuizOver(false);
          fetchQuiz();
        }}>Пройти заново</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Угадайте столицу ({questionIndex + 1}/{TOTAL_QUESTIONS})</h2>
      {correct && <p className="question">Страна: {correct.country_name}</p>}
      <div className="options">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => checkAnswer(options[i]?.capital)}
            disabled={!options[i]}
          >
            {options[i]?.capital || "..."}
          </button>
        ))}
      </div>
      <p className="result">{result}</p>
      <button className="skip-btn" onClick={() => {
        if (questionIndex + 1 >= TOTAL_QUESTIONS) setQuizOver(true);
        else setQuestionIndex(prev => prev + 1);
      }}>Пропустить</button>
    </div>
  );
}

