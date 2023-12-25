import { useEffect, useState } from "react";
import { getUsergameChallenge } from "../../services/challenge";
import { getAllChallenge } from "../../services/challenge";
import { finishGame } from "../../services/game";

import Header from "./layouts/Header";
import ChallengeUl from "./challenges/ChallengeUl";
import GameEnd from "./GameEnd";

import './game.css';

const GameZone = ({ playerName }) => {
    const [game, setGame] = useState(0);
    const [player, setPlayer] = useState(0);
    const [challenges, setChallenges] = useState([]);
    const [usergameChallenge, setUsergameChallenge] = useState([]);
    const [currentChallenge, setCurrentChallenge] = useState({});
    const [indexOfCurrentChallenge, setIndexOfCurrentChallenge] = useState(0);
    const [showChallenge, setShowChallenge] = useState(0);
    const [gameIsFinished, setGameIsFinished] = useState(false);

    useEffect(() => {
        const gameId = localStorage.getItem('gameId');
        const playerId = localStorage.getItem('playerId');
        if (gameId !== 'undefined' && playerId !== 'undefined') {
            setGame(gameId);
            setPlayer(playerId);
        } 
    }, [showChallenge]);

    useEffect(() => {
        getChallenges();
        getUsergameChallenges(game, player);
    }, [game, player, showChallenge]);

    useEffect(() => {
        if (usergameChallenge.filter(challenge => challenge.is_accomplished === 1).length < 5) {
            getCurrentChallenge();
        }
    }, [usergameChallenge, showChallenge]);

    useEffect(() => {
        if (usergameChallenge.filter(challenge => challenge.is_accomplished === 1).length < 5) {
            getIndexOfCurrentChallenge();
        }
    }, [currentChallenge, showChallenge]);

    const getChallenges = async () => {
        const challenges = await getAllChallenge();
        setChallenges(challenges);
    };

    const getUsergameChallenges = async (game, player) => {
        const usergameChallenge = await getUsergameChallenge(game, player);
        setUsergameChallenge(usergameChallenge);
        if (usergameChallenge.filter(challenge => challenge.is_accomplished === 1).length === 5) {
            handleFinishGame();
        }
    };

    const getCurrentChallenge = () => {
        const currentChallenge = usergameChallenge.filter(challenge => challenge.is_accomplished === 0)[0];
        setCurrentChallenge(currentChallenge);
    };

    const getIndexOfCurrentChallenge = () => {
        const indexOfCurrentChallenge = challenges.findIndex(challenge => challenge.id === currentChallenge.challenge_id);
        setIndexOfCurrentChallenge(indexOfCurrentChallenge);
    };

    const handleFinishGame = () => {
        const minutes = localStorage.getItem('minutes');
        const secondes = localStorage.getItem('secondes');
        if (minutes !== 'undefined' && secondes !== 'undefined') {
            if (minutes > 0 || secondes > 0) {
                finishGame(game);
                localStorage.setItem('gameOver', JSON.stringify(false));
            } else {
                finishGame(game);
                localStorage.setItem('gameOver', JSON.stringify(true));
            }
            localStorage.setItem('gameIsFinished', JSON.stringify(true));
        }
        setGameIsFinished(true);
    };

    return (
        <section id="game_zone">
            { gameIsFinished ?
                <GameEnd game={game} />
                :
                <div id="game_zone_on">
                    <Header playerName={playerName} player={player} game={game} />
                    <ChallengeUl
                        challenges={challenges}
                        usergameChallenge={usergameChallenge}
                        indexOfCurrentChallenge={indexOfCurrentChallenge}
                        setShowChallenge={setShowChallenge}
                        showChallenge={showChallenge} />
                </div>
            }
        </section>
    );
}

export default GameZone;