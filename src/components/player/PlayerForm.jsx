import { useState } from 'react';

import './playerForm.css';

const PlayerForm = ({ handleNewPlayer }) => {
    const [value, setValue] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        handleNewPlayer(value);
    };

    return (
        <section id="playerForm">
            <form onSubmit={handleSubmit}>
                <label>$ Enter a Username</label>
                <div>
                    $ _ <input
                        type="text"
                        className="input"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </div>
            </form>
            <p>Press Enter to Confirm</p>
        </section>
    );
};

export default PlayerForm;