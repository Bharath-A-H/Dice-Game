
import React, { useState } from 'react';
import Dice from './Dice';
import axios from 'axios';
import './Game.css';

const Game = () => {
  const [player1, setPlayer1] = useState(1);
  const [player2, setPlayer2] = useState(1);
  const [winner, setWinner] = useState('');

  const rollDice = async () => {
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    setPlayer1(roll1);
    setPlayer2(roll2);
    determineWinner(roll1, roll2);

    // Save the game result to the backend
    try {
      await axios.post('http://localhost:5000/api/save', {
        player1: roll1,
        player2: roll2,
        winner: determineWinner(roll1, roll2)
      });
    } catch (error) {
      console.error('Error saving the game result:', error);
    }
  };

  const determineWinner = (roll1, roll2) => {
    let result = '';
    if (roll1 > roll2) {
      result = 'Player 1 Wins!';
    } else if (roll2 > roll1) {
      result = 'Player 2 Wins!';
    } else {
      result = 'It\'s a Tie!';
    }
    setWinner(result);
    return result;
  };

  return (
    <div className="game">
      <h1>Dice Game</h1>
      <div className="dice-container">
        <div>
          <h2>Player 1</h2>
          <Dice number={player1} />
        </div>
        <div>
          <h2>Player 2</h2>
          <Dice number={player2} />
        </div>
      </div>
      <button onClick={rollDice}>Roll Dice</button>
      <h2>{winner}</h2>
    </div>
  );
};

export default Game;
