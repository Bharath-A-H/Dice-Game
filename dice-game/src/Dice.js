
import React from 'react';
import './Dice.css'; 

const Dice = ({ number }) => {
  const diceImages = {
    1: '/images/dice1.png',
    2: '/images/dice2.png',
    3: '/images/dice3.png',
    4: '/images/dice4.png',
    5: '/images/dice5.png',
    6: '/images/dice6.png',
  };

  return (
    <div className="dice">
      <img src={diceImages[number]} alt={`dice-${number}`} />
    </div>
  );
};

export default Dice;
