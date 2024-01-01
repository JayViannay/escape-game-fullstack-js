import db from './_index.js';

const findAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM challenge', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const find = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM challenge WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

const createUserGameChallenge = (userGameChallenge) => {
    const { userId, gameId, challengeId } = userGameChallenge;
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usergame_challenge (user_id, game_id, challenge_id) VALUES (?, ?, ?)',
            [userId, gameId, challengeId],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
    });
};

const findUserGameChallenges = (infos) => {
    const { game_id, user_id } = infos;
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usergame_challenge WHERE game_id = ? AND user_id = ?',
            [game_id, user_id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });
};

const updateUserGameChallenge = (userGameChallenge) => {
    const { gameId, playerId, challengeId } = userGameChallenge;
    return new Promise((resolve, reject) => {
        db.query('UPDATE usergame_challenge SET is_accomplished = ? WHERE user_id = ? AND game_id = ? AND challenge_id = ?',
            [true, playerId, gameId, challengeId],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });
};

export default { find, findAll, createUserGameChallenge, findUserGameChallenges, updateUserGameChallenge };