import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/modeselector.css";

export default function GameOptions() {
  const navigate = useNavigate();

  const games = [
    { id: 1, name: "Угадай страну по флагу", path: "/game/flag" },
    { id: 2, name: "Угадай столицу страны", path: "/game/capital" },
    { id: 3, name: "Угадай факт о стране", path: "/game/region" },
    { id: 4, name: "Угадай по сетке страну", path: "/game/population" },
  ];

  return (
    <div className = "main-container">
      <h3>Выберите вид игры</h3>
    <div className = "button-container">
 
      {games.map((game) => (
        <button key={game.id} onClick={() => navigate(game.path)} className = "button" >
          {game.name}
        </button>
      ))}
    </div>
    </div>
  );
}
