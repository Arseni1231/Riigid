import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Game from "./pages/game";
import Login from "./components/login";
import Leaderboard from "./components/leaderboard";
import Profile from "./components/profile";
import Header from "./components/header";
import Register from "./components/registration";
import Quiz from "./components/quizGame";
import GuessCapital from "./components/guesscapital";
import FactMode from "./components/factMode";
import RevealField from "./components/revealField";

import "./css/App.css";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/game/flag" element={<Quiz />} />
          <Route path="/game/capital" element={<GuessCapital />} />
          <Route path="/game/region" element={<FactMode />} />
          <Route path="/game/population" element={<RevealField />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

