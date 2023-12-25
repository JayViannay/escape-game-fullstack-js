import PlayerController from '../controllers/PlayerController.js';
import GameController from '../controllers/GameController.js';

/**
 * Déclaration de toutes les entrées disponibles du serveur (url)
 */
export default (app) => {
    app.use('/api/players', PlayerController);
    app.use('/api/games', GameController);
};