import React, { useState } from 'react';
import Dice from './Dice';
import axios from 'axios';
import './Game.css';

const Game = () => {
  const [player1, setPlayer1] = useState(1);
  const [player2, setPlayer2] = useState(1);
  const [winner, setWinner] = useState('');
  const [round, setRound] = useState(1);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const rollDice = async () => {
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    setPlayer1(roll1);
    setPlayer2(roll2);

    // Update scores based on the dice rolls
    if (roll1 > roll2) {
      setScore1(score1 + roll1);
    } else if (roll2 > roll1) {
      setScore2(score2 + roll2);
    }

    // Save the game result to the backend
    try {
      await axios.post('http://localhost:5000/api/save', {
        player1: roll1,
        player2: roll2,
        winner: roll1 > roll2 ? 'Player 1 Wins!' : roll2 > roll1 ? 'Player 2 Wins!' : 'It\'s a Tie!'
      });
    } catch (error) {
      console.error('Error saving the game result:', error);
    }

    if (round < 4) {
      setRound(round + 1);
    } else {
      // Determine the overall winner after three rounds
      setWinner(score1 > score2 ? 'Player 1 is the overall winner!' : score2 > score1 ? 'Player 2 is the overall winner!' : 'It\'s an overall tie!');
    }
  };

  const startNewGame = () => {
    setRound(1);
    setScore1(0);
    setScore2(0);
    setWinner('');
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
      {winner ? (
        <>
          <h2>{winner}</h2>
          <button onClick={startNewGame}>Start New Game</button>
        </>
      ) : (
        <>
          <button onClick={rollDice}>Roll Dice</button>
          <h2>Round: {round}</h2>
          <h2>Player 1 Score: {score1}</h2>
          <h2>Player 2 Score: {score2}</h2>
        </>
      )}
    </div>
  );
};

export default Game;
