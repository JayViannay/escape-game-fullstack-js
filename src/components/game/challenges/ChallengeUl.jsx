import ChallengeLi from "./ChallengeLi";
import ChallengeShow from "./ChallengeShow";
import RestartGame from "../actions/RestartGame";

import './challenge.css';

const ChallengeUl = ({challenges, usergameChallenge, indexOfCurrentChallenge, setShowChallenge, showChallenge}) => {
    return (
        <>
            {challenges.length > 0 ?
            <div id="challenge_list">
                <ul>
                    {usergameChallenge.map((challenge, index) => {
                        return (
                            <ChallengeLi
                                key={index}
                                challenges={challenges}
                                challenge={challenge}
                                index={index}
                                indexOfCurrentChallenge={indexOfCurrentChallenge}
                                setShowChallenge={setShowChallenge}
                            />
                        )
                    })}
                </ul>
            </div>
                : <p>...Loading...</p>
            }
            {showChallenge !== 0 && <ChallengeShow id={showChallenge} setShowChallenge={setShowChallenge} />}
            <div id="actions"><RestartGame /></div>
        </>
    )
};

export default ChallengeUl;