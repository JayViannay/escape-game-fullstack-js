import { useEffect, useState } from "react";
import { getGame } from "../../services/game";

import RestartGame from "./actions/RestartGame";

const GameEnd = ({ gameIsWin, game }) => {
    const playerId = localStorage.getItem('playerId');
    const playerName = JSON.parse(localStorage.getItem('playerName'));
    const [userGame, setUserGame] = useState({});

    useEffect(() => {
        getUserGame(game);
    }, []);

    const getUserGame = async (gameId) => {
        const userGame = await getGame(gameId);
        setUserGame(userGame);
    };
    return (
        <div id="game_zone_off">
            <p>Game is {gameIsWin ? 'win' : 'over : Out of Time !'}</p>
            <p>GameId : {game}</p>
            <p>PlayerId : {playerId}</p>
            <p>UserName : {playerName}</p>
            <p>Realisation Time : { 60 - userGame.minutes } min {60 - userGame.secondes } s</p>
            <RestartGame />
        </div>
    )
};

export default GameEnd;