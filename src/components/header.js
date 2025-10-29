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

        <header className = 'header'>
            <div className="header_1">
                <h1>Добро пожаловать в <b>Guess The Country!</b></h1>
               

            <nav className="nav">
                <button onClick={() => navigate("/")} className="toggle">Home</button>
                <button onClick={() => navigate("/login")} className="toggle">Login</button>
                <button onClick={() => navigate("/leaderboard")} className="toggle">Leaderboard</button>
                <button onClick={() => navigate("/game")} className="toggle">Game</button>
        <button onClick = {toggle} className="toggle">
            {theme == "light" ? "Night" : "Light"}
        </button>
      </nav>
     </div>
    </header>
    );
}

export default Header;