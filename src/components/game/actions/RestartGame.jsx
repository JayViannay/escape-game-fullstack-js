const RestartGame = () => {
    return (
        <button id="game_restart" onClick={() => {
            localStorage.clear();
            window.location.reload()
        }}>Restart Game</button>
    );
}

export default RestartGame;