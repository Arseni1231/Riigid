import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/App.css";

function Header() {
    const [theme, setTheme] = useState("light");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
    }, [location]);

  
    useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
    

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };


    return (
        <header className="header">
            <div className="nav">
                <div className="nav-main">
                    <h1>Добро пожаловать в <b>Guess The Country!</b></h1>
                    <div className="nav-menu">
                        <button onClick={() => navigate("/")} className="nav-butn">Home</button>
                        <button onClick={() => navigate("/game")} className="nav-butn">Game</button>
                        <button onClick={() => navigate("/leaderboard")} className="nav-butn">Leaderboard</button>
                    </div>
                </div>
                
                <div className="nav-controls">
                    {user ? (
                        
                        <>
                            <button onClick={() => navigate("/profile")} className="nav-btn">
                                Профиль
                            </button>
                            <button onClick={handleLogout} className="nav-btn">
                                Выйти
                            </button>
                        </>
                    ) : (// Показываем когда пользователь не авторизован
                        <button onClick={() => navigate("/login")} className="nav-btn">
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;