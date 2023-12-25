import { useEffect, useState } from "react";
import { getUsergameChallenge } from "../../services/challenge";
import { getAllChallenge } from "../../services/challenge";

import ChallengeUl from "./challenges/ChallengeUl";
import Header from "./layouts/Header";

import './game.css';

const GameZone = ({ playerName }) => {
    const [game, setGame] = useState(0);
    const [player, setPlayer] = useState(0);

    const [challenges, setChallenges] = useState([]);
    const [usergameChallenge, setUsergameChallenge] = useState([]);
    const [currentChallenge, setCurrentChallenge] = useState({});
    const [indexOfCurrentChallenge, setIndexOfCurrentChallenge] = useState(0);

    const [showChallenge, setShowChallenge] = useState(0);

    useEffect(() => {
        const gameId = localStorage.getItem('gameId');
        const playerId = localStorage.getItem('playerId');
        if (gameId !== 'undefined' && playerId !== 'undefined') {
            setGame(gameId);
            setPlayer(playerId);
        } else return;
    }, []);

    useEffect(() => {
        getChallenges();
        getUsergameChallenges(game, player);
    }, [game, player]);

    useEffect(() => {
        getCurrentChallenge();
    }, [usergameChallenge]);

    useEffect(() => {
        getIndexOfCurrentChallenge();
    }, [currentChallenge]);

    const getChallenges = async () => {
        const challenges = await getAllChallenge();
        setChallenges(challenges);
    };

    const getUsergameChallenges = async (game, player) => {
        const usergameChallenge = await getUsergameChallenge(game, player);
        setUsergameChallenge(usergameChallenge);
    };

    const getCurrentChallenge = () => {
        const currentChallenge = usergameChallenge.filter(challenge => challenge.is_accomplished === 0)[0];
        setCurrentChallenge(currentChallenge);
    };

    const getIndexOfCurrentChallenge = () => {
        const indexOfCurrentChallenge = challenges.findIndex(challenge => challenge.id === currentChallenge.challenge_id);
        setIndexOfCurrentChallenge(indexOfCurrentChallenge);
    };

    return (
        <section id="game_zone">
            <Header playerName={playerName} player={player} game={game} />
            <ChallengeUl 
                challenges={challenges} 
                usergameChallenge={usergameChallenge} 
                indexOfCurrentChallenge={indexOfCurrentChallenge} 
                setShowChallenge={setShowChallenge} 
                showChallenge={showChallenge} />
        </section>
    );
}

export default GameZone;