import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
export default function Home() {
  const navigate = useNavigate();

  const modes = [
    {
      title: "Угадай страну по флагу",
      description: "Посмотри на флаг и выбери правильную страну.",
     
    },
    {
      title: "Угадай столицу страны",
      description: "Угадай страну по её столице.",
      
    },
    {
      title: "Угадай факт о стране",
      description: "Угадай страну по интересному факту о ней.",
     
    },
    {
      title: "Угадай по сетке страну",
      description: "Используй карту-сетку, чтобы найти страну.",
      
    },
  ];


  return (
<div className="home">
      
      <p className="description">
        Это игра, где вы можете проверить свои знания о странах мира! 
        Соревнуйтесь сами с собой или с друзьями, выбирая один из 4 увлекательных режимов игры
      </p>


    <div className="game-modes">
        {modes.map((mode, index) => (
          <div key={index} className="mode-card">
            <h2>{mode.title}</h2>
            <p>{mode.description}</p>
            
          </div>
        ))}
      </div>
    </div>


  );
}