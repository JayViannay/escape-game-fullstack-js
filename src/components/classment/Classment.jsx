import { useEffect, useState } from 'react';
import { getClassmentGames } from '../../services/game';
import ShowClassment from './actions/ShowClassment';

import './classment.css';

const Classment = ({ setShowClassment, showClassment }) => {
    const [classment, setClassment] = useState([]);

    useEffect(() => {
        getClassment();
    }, []);

    const getClassment = async () => {
        const data = await getClassmentGames();
        setClassment(data);
    };

    return (
        <>
        <section id="classment">
            <h1>> | Classment</h1>
            <ul id="classmentUl">
                {classment ?
                    classment.length > 0 && classment.map((game, index) => {
                        return (
                            <li key={index}>
                                <p>$ {game.player} - {game.time}min</p>
                            </li>
                        )
                    })
                    : <p>...Classment Loading...</p>
                }
            </ul>
        </section>
        <section id="footerClassment">
            <ShowClassment setShowClassment={setShowClassment} showClassment={showClassment} />
        </section>
        </>
    )
};

export default Classment;