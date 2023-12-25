import db from './_index.js';

const findAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM player', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const add = (player) => {
    const { username, ip } = player;
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO player (username, ip) VALUES (?, ?)',
            [username, ip],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
    });
};

const findByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM player WHERE username = ?', username, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

export default { findAll, add, findByUsername };