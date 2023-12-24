const Header = ({playerName, player, game}) => {
    return (
        <div className="header">
            <h1>Game Zone</h1>
            <h2>Welcome {playerName}</h2>
            <p>PlayerId : {player} - GameId : {game}</p>
        </div>
    )
};

export default Header;