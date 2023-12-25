## Server for Escape Game Project

### Description
This is the server for the Escape Game Project. It is written in Javascript and uses Node/Express.js. It is connected to a MySQL database.

### Installation
1. Clone the repository
2. Install the dependencies with `npm install`
3. Create a `.env` file in the root directory and add the following variables:
```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=escape_game
```
4. Create a MySQL database named `escape_game`
5. Import the database structure from the `escape_game.sql`
6. Start the server with `npm start`
7. The server is now running on `localhost:5050`

### Routes
- `/api/games` - POST - Create A New Game
- `/api/games/find/:id` - GET - Get On Game
- `/api/games/edit/:id` - PUT - Update Timer Game
- `/api/games/end/:id` - PUT - Set Game To Completed / Ended
- `api/games/usergame/challenge/:game_id/:user_id` - GET - Get All Challenges for Player By Game ID and User ID
- `api/games/challenges` - GET - Get All Challenges
- `api/games/challenges/:id` - GET - Get One Challenge By ID
- `api/games/challenges` - PUT - Update UserGame_Challenge Status to Completed
- `api/games/classment` - GET - Get All Games completed, Players Names and Time, By Time Ascending
- `/api/players/` - POST - Create A New Player
- `/api/players/:username` - GET - Get One Player By Username
- 

