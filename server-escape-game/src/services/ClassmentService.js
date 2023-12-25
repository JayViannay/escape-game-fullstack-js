const handleClassment = async (games, players) => {
    const results = [];
    games.forEach(async game => {
        const player = await players.filter(player => player.id === game.user_id);
        let time = parseFloat(60 - game.minutes) + '.' + (60 - game.secondes);
        results.push({
            player: player[0].username,
            time: time
        });
    });
    return results;
};

const sortResults = async (results) => {
    const sortedResults = await results.sort((a, b) => {
        return parseFloat(a.time) - parseFloat(b.time);
    });
    return sortedResults;
};

export default { handleClassment, sortResults };