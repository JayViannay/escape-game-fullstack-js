import { useEffect } from "react";

import './game.css';

const GameStart = ({ setGameIsStarted }) => {
    useEffect(() => {
        const handleEnter = e => {
            if (e.key === "Enter") {
                setGameIsStarted(true);
            }
        };
        window.addEventListener("keydown", handleEnter);
        return () => {
            window.removeEventListener("keydown", handleEnter);
        };
    }, []);

    return (
        <section id="game_home">
            <p>$ You are all set</p>
            <p>$ Press Enter to begin</p>
            <p>$ A timer will start and you will have 60 minutes to resolve all challenges to escape the room</p>
        </section>
    );
}

export default GameStart;