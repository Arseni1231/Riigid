import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Registration.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    if(username.trim() && password.trim()) {
        localStorage.setItem("user", JSON.stringify({username}))
        navigate("/profile")
    } else {
        alert("Fill in all fields!!!!!")
    }
  };

  return(
    <div className="register-container">
      <h2>Регистрация</h2>
      <form onSubmit={register} className="register-form">
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Создать аккаунт</button>
      </form>
    </div>
  );
}