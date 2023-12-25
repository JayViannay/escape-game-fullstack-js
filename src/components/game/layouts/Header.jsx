import Timer from "../timer/Timer";

const Header = ({playerName, player, game}) => {
    return (
        <div className="game_zone_header">
            <h1>Game Zone</h1>
            <h2>Welcome {playerName}</h2>
            <p>PlayerId : {player} - GameId : {game}</p>
            <Timer gameId={game} />
        </div>
    )
};

export default Header;