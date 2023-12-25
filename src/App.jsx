import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

import Home from './components/home/Home.jsx';
import PlayerForm from './components/player/PlayerForm.jsx';
import GameStart from './components/game/GameStart.jsx';
import GameZone from './components/game/GameZone.jsx';

import { getPlayerByUsername } from './services/player';
import { newPlayer } from './services/player';
import { newGame } from './services/game';

import tabEffect from './assets/sounds/select-effect.mp3';
import enterEffect from './assets/sounds/space-effect.mp3';
import keyEffect from './assets/sounds/mouse-click-effect.mp3';

const App = () => {
  const [ip, setIP] = useState('');
  const [enterIsPressed, setEnterIsPressed] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [gameIsStarted, setGameIsStarted] = useState(false);
  const [playerId, setPlayerId] = useState(0);
  const [gameId, setGameId] = useState(0);

  const tabSound = new Audio(tabEffect);
  const enterSound = new Audio(enterEffect);
  const keySound = new Audio(keyEffect);

  useEffect(() => {
    const playerIsSet = JSON.parse(localStorage.getItem('playerName'));
    if (playerIsSet !== null) {
      setPlayerName(playerIsSet);
      setEnterIsPressed(true);
      const playerId = localStorage.getItem('playerId');
      if (playerId !== 'undefined') {
        setPlayerId(playerId);
      }
      const gameId = localStorage.getItem('gameId');
      if (gameId !== 'undefined') {
        setGameId(gameId);
      }
    }
  }, [playerName]);

  useEffect(() => {
    getIPClient();
  }, []);

  useEffect(() => {
    const keyIsPressed = (event) => {
      if (event.code === 'Enter') {
        enterSound.play();
      }
      if (event.code === 'Tab') {
        tabSound.play();
      }
      else {
        keySound.play();
      }
    };
    const mouseIsClicked = (event) => {
      if (event.type === 'click') {
        keySound.play();
      }
    };
    document.addEventListener('keydown', keyIsPressed);
    document.addEventListener('click', mouseIsClicked);
  }, []);

  const getIPClient = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
    localStorage.setItem('ip', res.data.ip);
  };

  const handleNewPlayer = async (username) => {
    const usernameIsFree = await getPlayerByUsername(username);
    if (!usernameIsFree.errors) {
      alert('Username is already taken');
      return;
    } else {
      handlePlayer(username);
    }
  };

  const handlePlayer = async (username) => {
    const currentPlayer = await newPlayer(username.trim(), ip);
    setPlayerId(currentPlayer.new_user_id);
    setPlayerName(username);
    handleNewGame(currentPlayer.new_user_id);
    localStorage.setItem('playerName', JSON.stringify(username));
    localStorage.setItem('playerId', JSON.stringify(currentPlayer.new_user_id));
  }

  const handleNewGame = async (playerId) => {
    const currentGame = await newGame(playerId, 60, 0);
    setGameId(currentGame.new_game_id);
    localStorage.setItem('gameId', JSON.stringify(currentGame.new_game_id));
  };

  return (
    <main id="main-container">
      {/* PreGame */}
      {enterIsPressed === false && <Home setEnterIsPressed={setEnterIsPressed} />}
      {enterIsPressed === true && playerName === '' && <PlayerForm handleNewPlayer={handleNewPlayer} />}
      {enterIsPressed === true && playerName !== '' && gameIsStarted === false && <GameStart setGameIsStarted={setGameIsStarted} />}
      {/* GameZone */}
      {enterIsPressed === true && playerId !== 0 && gameIsStarted === true && <GameZone playerName={playerName} />}
    </main>
  );
}

export default App;
