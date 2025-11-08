import React, { useEffect, useState } from "react";
import "../css/factmode.css";

export default function FactMode() {
  const TOTAL_QUESTIONS = 20;
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
      const res = await fetch("http://localhost:5000/facts");
      const data = await res.json();
      setAllCountries(data);
    } catch (err) {
      console.error("Ошибка загрузки фактов:", err);
    }
  };

  const fetchQuiz = async () => {
    if (allCountries.length === 0) return;

    const correctIndex = Math.floor(Math.random() * allCountries.length);
    const correctCountry = allCountries[correctIndex];

    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const randIndex = Math.floor(Math.random() * allCountries.length);
      const country = allCountries[randIndex];
      if (
        country.country_name !== correctCountry.country_name &&
        !wrongOptions.find(c => c.country_name === country.country_name)
      ) {
        wrongOptions.push(country);
      }
    }

    const allOptions = [correctCountry, ...wrongOptions];
    shuffleArray(allOptions);

    setCorrect(correctCountry);
    setOptions(allOptions);
    setResult("");
  };

  const checkAnswer = (selectedId) => {
  if (!correct) return;
  if (selectedId === correct.country_id) setScore(prev => prev + 1);

  const correctOption = options.find(o => o.country_id === correct.country_id);
  setResult(
    selectedId === correct.country_id
      ? "Верно!"
      : `Неверно! Это была ${correctOption.country_name}.`
  );
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
  <h2>Угадай страну по факту ({questionIndex + 1}/{TOTAL_QUESTIONS})</h2>
  {correct && (
    <p className="fact-text">{correct.fact}</p>
  )}
  <div className="options">
    {options.map((option, index) => (
      <button key={index} onClick={() => checkAnswer(option.country_id)}>
        {option.country_name}
      </button>
    ))}
  </div>
  <p className="result">{result}</p>


  {result && (
    <button className="next-btn" onClick={() => {
      if (questionIndex + 1 >= TOTAL_QUESTIONS) setQuizOver(true);
      else {
        setQuestionIndex(prev => prev + 1);
        setResult("");
        fetchQuiz();
      }
    }}>
      Дальше
    </button>
  )}

  <button className="skip-btn" onClick={() => {
    if (questionIndex + 1 >= TOTAL_QUESTIONS) setQuizOver(true);
    else {
      setQuestionIndex(prev => prev + 1);
      setResult("");
      fetchQuiz();
    }
  }}>Пропустить</button>
</div>
  );
}