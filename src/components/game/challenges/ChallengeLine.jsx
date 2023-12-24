/* eslint-disable jsx-a11y/anchor-is-valid */
import { GiPadlock } from "react-icons/gi";
import { GiPadlockOpen } from "react-icons/gi";

const ChallengeLine = ({ challenges, challenge, index, indexOfCurrentChallenge, setShowChallenge }) => {
    return (
        <li key={index}>
            {indexOfCurrentChallenge === index && <span>>_</span>}
            <a href="#"
                onClick={() => {
                    (indexOfCurrentChallenge === index || challenge.is_accomplished === 1) && setShowChallenge(challenge.challenge_id)  
                }}
            >$_ {challenges[index].title}
                {challenge.is_accomplished === 1 || indexOfCurrentChallenge === index ?
                    <GiPadlockOpen />
                    : <GiPadlock />
                }
            </a>
        </li>
    )
};

export default ChallengeLine;