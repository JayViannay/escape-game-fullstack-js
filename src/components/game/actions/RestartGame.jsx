import './restart_game.css';

const RestartGame = () => {
    return (
        <button id="game_restart" className="btn-danger" onClick={() => {
            localStorage.clear();
            window.location.reload()
        }}>Restart Game</button>
    );
}

export default RestartGame;