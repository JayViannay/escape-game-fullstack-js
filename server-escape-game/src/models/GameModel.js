import db from './_index.js';

const findAllComplete = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM game WHERE is_complete = 1', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const find = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM game WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

const add = (game) => {
    const { playerId, minutes, secondes } = game;
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO game (user_id, minutes, secondes) VALUES (?, ?, ?)',
            [playerId, minutes, secondes],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
    });
};

const edit = (game) => {
    const { minutes, secondes, id } = game;
    return new Promise((resolve, reject) => {
        db.query('UPDATE game SET minutes = ?, secondes = ? WHERE id = ?;',
            [minutes, secondes, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });
};

const end = (id) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE game SET is_complete = 1 WHERE id = ?;',
            [id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });
};

export default { find, add, edit, end, findAllComplete };