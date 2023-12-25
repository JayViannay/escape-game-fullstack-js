import { useState, useEffect } from "react";

import { getChallengeById } from "../../../services/challenge";

import InputSolution from "./InputSolution";

import './challenge.css';

const ChallengeShow = ({ id, setShowChallenge }) => {
    const [challenge, setChallenge] = useState({});
    const [userSolution, setUserSolution] = useState('');

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
            console.log('Good answer!');
            // edit usergameChallenge to is_accomplished = 1
            // setShowChallenge(0);
        }
    };

    return (
        <div id="challenge_show">
            {challenge ? (
                <>
                    <p>$ {challenge.title} | Press ESC to exit</p>
                    <p>$ Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cum incidunt suscipit aperiam sed quam nostrum quisquam corrupti optio molestiae omnis debitis. Veniam ratione alias enim laudantium aspernatur dolorum a!</p>
                    <InputSolution handleUserSolution={handleUserSolution} setUserSolution={setUserSolution} />
                </>
            ) : "...Loading..."}
        </div>
    );
};

export default ChallengeShow;