import ChallengeLi from "./ChallengeLi";
import ChallengeShow from "./ChallengeShow";
import RestartGame from "../actions/RestartGame";

const ChallengeUl = ({challenges, usergameChallenge, indexOfCurrentChallenge, setShowChallenge, showChallenge}) => {
    return (
        <>
            {challenges.length > 0 ?
                <ul id="challenge_list">
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
                : <p>...Loading...</p>
            }
            {showChallenge !== 0 && <ChallengeShow id={showChallenge} setShowChallenge={setShowChallenge} />}
            <RestartGame />
        </>
    )
};

export default ChallengeUl;