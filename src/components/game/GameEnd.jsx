import { useEffect, useState } from "react";
import { getGame } from "../../services/game";

import RestartGame from "./actions/RestartGame";
import ShowClassment from "../classment/actions/ShowClassment";
import Classment from "../classment/Classment";

const GameEnd = ({ game }) => {
    const playerId = localStorage.getItem('playerId');
    const playerName = JSON.parse(localStorage.getItem('playerName'));
    const gameOver = JSON.parse(localStorage.getItem('gameOver'));
    const [userGame, setUserGame] = useState({});
    const [showClassment, setShowClassment] = useState(false);

    useEffect(() => {
        getUserGame(game);
    }, [game]);

    const getUserGame = async (gameId) => {
        const userGame = await getGame(gameId);
        setUserGame(userGame);
    };

    return (
        <>
            {showClassment === true ? <Classment setShowClassment={setShowClassment} showClassment={showClassment} /> : (
                <div id="game_zone_off">
                    <p>Game is {gameOver === false ? 'win' : 'over : Out of Time !'}</p>
                    <p>GameId : {game}</p>
                    <p>PlayerId : {playerId}</p>
                    <p>UserName : {playerName}</p>
                    <p>Realisation Time : {60 - userGame.minutes} min {60 - userGame.secondes} s</p>
                    <RestartGame />
                    <ShowClassment setShowClassment={setShowClassment} showClassment={showClassment} />
                </div >
            )}
        </>
    );
};

export default GameEnd;