import React, { useEffect, useState } from "react";
import "../css/leaderboard.css"

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();


      const sortedUsers = data.sort((a, b) => (b.score || 0) - (a.score || 0));
      setUsers(sortedUsers);
      setLoading(false);
    } catch (err) {
      console.error("Ошибка при загрузке лидеров:", err);
      setLoading(false);
    }
    

  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Загрузка таблицы лидеров...</p>;

  return (
    <div className="leaderboard-container">
      <h2>Таблица лидеров</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Место</th>
            <th>Имя пользователя</th>
            <th>Очки</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
