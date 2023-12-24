import { useState, useEffect } from "react";

import { getChallengeById } from "../../../services/challenge";

const ChallengeShow = ({ id }) => {
    const [challenge, setChallenge] = useState({});

    useEffect(() => {
        getChallenge();
    }, []);

    const getChallenge = async () => {
        const challenge = await getChallengeById(id);
        setChallenge(challenge);
    };

    return (
        <div id="challenge_show">
            {challenge ? (
                <>
                    <h2>{challenge.title}</h2>
                    <p>{challenge.description}</p>
                </>
            ) : "...Loading..."}
        </div>
    );
};

export default ChallengeShow;