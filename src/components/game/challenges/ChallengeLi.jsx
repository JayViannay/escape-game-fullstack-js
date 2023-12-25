/* eslint-disable jsx-a11y/anchor-is-valid */
import { GiPadlock } from "react-icons/gi";
import { GiPadlockOpen } from "react-icons/gi";

import './challenge.css';

const ChallengeLi = ({ challenges, challenge, index, indexOfCurrentChallenge, setShowChallenge }) => {
    return (
        <li key={index} className="challenge_list_li">
            <a href="#"
                onClick={() => {
                    (indexOfCurrentChallenge === index || challenge.is_accomplished === 1) && setShowChallenge(challenge.challenge_id)  
                }}
            >{indexOfCurrentChallenge === index ? <span>>_</span> : <span>$ </span>}
                {challenges[index].title}
                {challenge.is_accomplished === 1 || indexOfCurrentChallenge === index ?
                    <GiPadlockOpen /> : <GiPadlock />
                }
            </a>
        </li>
    )
};

export default ChallengeLi;