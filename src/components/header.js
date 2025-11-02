import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../css/App.css";

function Header() {
    const [theme, setTheme] = useState("light");
    const navigate = useNavigate();
    
    useEffect(() => {
        if(theme == "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggle = () => {
        setTheme(theme == "light" ? "dark" : "light");
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
                    <button onClick={() => navigate("/login")} className="nav-btn">Login</button>
                    <button onClick={toggle} className="nav-btn">
                        {theme == "light" ? "Night" : "Light"}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;