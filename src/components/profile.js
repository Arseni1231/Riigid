import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      <div className="profile-card">
        <img
          src={user.avatar || "https://i.imgur.com/6VBx3io.png"}
          alt="avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          <p><b>Username:</b> {user.username}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Score:</b> {user.score ?? 0}</p>
        </div>
      </div>

      <div className="profile-actions">
        <button onClick={() => navigate("/leaderboard")}>Таблица лидеров</button>
        <button onClick={handleLogout}>Выйти</button>
      </div>
    </div>
  );
}