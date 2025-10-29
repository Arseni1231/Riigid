import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
export default function Home() {
  const navigate = useNavigate();
  return (
<div className="home">
      
      <p>Выберите режим игры, чтобы начать угадывать страны.</p>

      <div className="home-buttons">
        <button
          className="home-button start-game"
          onClick={() => navigate("/gameModeSelector")} >
        
          Start game
        </button>
      </div>
    </div>
  );
}