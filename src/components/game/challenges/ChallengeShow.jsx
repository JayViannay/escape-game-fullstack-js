import { useState, useEffect } from "react";

import { getChallengeById } from "../../../services/challenge";
import { finishChallenge } from "../../../services/challenge";

import InputSolution from "./InputSolution";

import unlockSolutionEffect from '../../../assets/sounds/unlock-solution.mp3';

import './challenge.css';

const ChallengeShow = ({ id, setShowChallenge }) => {
    const [challenge, setChallenge] = useState({});
    const [userSolution, setUserSolution] = useState('');

    const unlockSolutionSound = new Audio(unlockSolutionEffect);

    useEffect(() => {
        getChallenge();
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                setShowChallenge(0);
            }
        }, []);
    });

    const getChallenge = async () => {
        const challenge = await getChallengeById(id);
        setChallenge(challenge);
    };

    const handleUserSolution = (e) => {
        e.preventDefault();
        if (!userSolution) return;
        if (userSolution === challenge.solution) {
            if (challenge.solution === userSolution) {
                unlockSolutionSound.play();
                document.getElementById('result').innerHTML = '$ ...Processing...';
                document.getElementById('userInput').setAttribute('disabled', 'disabled');
                setTimeout(() => {
                    const gameId = localStorage.getItem('gameId');
                    const playerId = localStorage.getItem('playerId');
                    const usergameChallenge = { gameId, playerId, id };
                    finishChallenge(usergameChallenge);
                    document.getElementById('result').innerHTML = '$ Correct!';
                    document.getElementById('result').classList.add('txt-green');
                    setTimeout(() => {
                        setShowChallenge(0);
                    }, 1000);
                }, 1000);
            }
        }
    };

    return (
        <div id="challenge_show">
            {challenge ? (
                <>
                    <p>$ {challenge.title} | Press ESC to exit</p>
                    <p>$ Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cum incidunt suscipit aperiam sed quam nostrum quisquam corrupti optio molestiae omnis debitis. Veniam ratione alias enim laudantium aspernatur dolorum a!</p>
                    <InputSolution handleUserSolution={handleUserSolution} setUserSolution={setUserSolution} />
                    <p id="result"></p>
                </>
            ) : "...Loading..."}
        </div>
    );
};

export default ChallengeShow;