import express from 'express';
import GameModel from '../models/GameModel.js';
import ChallengeModel from '../models/ChallengeModel.js';
import PlayerModel from '../models/PlayerModel.js';
import ClassmentService from '../services/ClassmentService.js';

const router = express.Router();

router
    .post('/', async (req, res) => {
        const newGame = req.body;
        try {
            const gameId = await GameModel.add(newGame);
            const challenges = await ChallengeModel.findAll();
            challenges.forEach(challenge => {
                const userGameChallenge = {
                    userId: newGame.playerId,
                    gameId: gameId,
                    challengeId: challenge.id
                };
                ChallengeModel.createUserGameChallenge(userGameChallenge);
            });
            res.json({ success: 'Game started successfully !', new_game_id: gameId }).status(201);
        } catch (err) {
            res.json({ errors: err }).status(500);
        }

    })

    .get('/find/:id', async (req, res) => {
        try {
            const game = await GameModel.find(req.params.id);
            if (game) res.json(game).status(200);
            else res.json({ errors: 'Game not found !' }).status(404);
        } catch (err) {
            res.json({ errors: err }).status(500);
        }
    })

    .put('/edit/:id', async (req, res) => {
        if (req.body.minutes && req.body.secondes && req.params.id) {
            try {
                const game = await GameModel.find(req.params.id);
                if (!game) res.json({ error: 'Game not found !' }).status(404);
                else {
                    const editGame = {
                        minutes: req.body.minutes,
                        secondes: req.body.secondes,
                        id: req.params.id
                    };
                    await GameModel.edit(editGame);
                    res.json({ success: 'Game updated successfully !' }).status(200);
                }
            } catch (err) {
                res.json({ errors: err }).status(500);
            }
        } else res.json({ errors: 'All fields are required : minutes, secondes' }).status(409);
    })

    .put('/end/:id', async (req, res) => {
        if (req.params.id) {
            try {
                const game = await GameModel.find(req.params.id);
                if (!game) res.json({ error: 'Game not found !' }).status(404);
                else {
                    await GameModel.end(req.params.id);
                    res.json({ success: 'Game ended successfully !' }).status(200);
                }
            } catch (err) {
                res.json({ errors: err }).status(500);
            }
        } else res.json({ errors: 'All fields are required : minutes, secondes' }).status(409);
    })

    .get('/usergame/challenge/:game_id/:user_id', async (req, res) => {
        if (req.params.game_id && req.params.user_id) {
            const infos = req.params;
            try {
                const usergameChallenges = await ChallengeModel.findUserGameChallenges(infos);
                res.json(usergameChallenges).status(201);
            } catch (err) {
                res.json({ errors: err }).status(500);
            }
        } else res.json({ errors: 'All fields are required' }).status(409);
    })

    .get('/challenges', async (req, res) => {
        try {
            const challenges = await ChallengeModel.findAll();
            res.json(challenges).status(200);
        } catch (err) {
            res.json({ errors: err }).status(500);
        }
    })

    .get('/challenges/:id', async (req, res) => {
        try {
            const challenge = await ChallengeModel.find(req.params.id);
            if (challenge) res.json(challenge).status(200);
            else res.json({ errors: 'Challenge not found !' }).status(404);
        } catch (err) {
            res.json({ errors: err }).status(500);
        }
    })

    .put('/challenges/', async (req, res) => {
        try {
            const userGameChallenge = {
                gameId: req.body.gameId,
                playerId: req.body.playerId,
                challengeId: req.body.id
            };
            const userGameChallengeUpdated = await ChallengeModel.updateUserGameChallenge(userGameChallenge);
            res.json(userGameChallengeUpdated).status(200);
        } catch (err) {
            res.json({ errors: err }).status(500);
        }

    })

    .get('/classment', async (req, res) => {
        try {
            const games = await GameModel.findAllComplete();
            const players = await PlayerModel.findAll();
            const results = await ClassmentService.handleClassment(games, players);
            const finalClassment = await ClassmentService.sortResults(results);
            res.json(finalClassment).status(200);
        } catch (err) {
            res.json({ errors: err }).status(500);
        }
    });

export default router;