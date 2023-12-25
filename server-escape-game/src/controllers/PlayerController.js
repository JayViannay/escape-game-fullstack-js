import express from 'express';
import PlayerModel from '../models/PlayerModel.js';

const router = express.Router();

router
    .post('/', async (req, res) => {
        if (req.body.username && req.body.ip) {
            const newUser = req.body;
            try {
                const user = await PlayerModel.findByUsername(newUser.username);
                if (user) res.json({ errors: 'User already exist !' }).status(409);
                else {
                    const userId = await PlayerModel.add(newUser);
                    res.json({ success: 'User created successfully !', new_user_id: userId }).status(201);
                }
            } catch (err) {
                res.json({ errors: err }).status(500);
            }
        } else res.json({ errors: 'All fields are required' }).status(409);
    })

    .get('/:username', async (req, res) => {
        try {
            const user = await PlayerModel.findByUsername(req.params.username);
            if (user) res.json(user).status(200);
            else res.json({ errors: 'User not found !' }).status(404);
        } catch (err) {
            res.json({ errors: err }).status(500);
        }
    });

export default router;