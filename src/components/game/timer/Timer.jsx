import { useEffect, useState } from "react";
import { getGame } from "../../../services/game";
import { updateGame } from "../../../services/game";

import './timer.css';

const Timer = ({ gameId, gameIsFinished }) => {
    const [minutes, setMinutes] = useState(0);
    const [secondes, setSecondes] = useState(0);
    
    useEffect(() => {
        getGameInfos(gameId);
    }, [gameId]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (secondes > 0) {
                setSecondes(secondes - 1);
            }
            if (secondes === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                } else {
                    setMinutes(minutes - 1);
                    setSecondes(59);
                }
            }
        }, 1000);
        updateTimeLocal();
        return () => clearInterval(timer);
        
    }, [minutes, secondes]);

    const getGameInfos = async (gameId) => {
        const game = await getGame(gameId);
        setMinutes(game.minutes);
        setSecondes(game.secondes);
    };

    const updateTimeLocal = () => {
        localStorage.setItem('minutes', JSON.stringify(minutes));
        localStorage.setItem('secondes', JSON.stringify(secondes));
        updateTimeServer();
    };

    const updateTimeServer = async () => {
        await updateGame(gameId, minutes, secondes);
    };

    return (
        <div id="timer">
            <p className="timer_text">{minutes} : {secondes}</p>
        </div>
    );
};

export default Timer;