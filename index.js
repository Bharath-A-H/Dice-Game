const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/dice-game', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const gameSchema = new mongoose.Schema({
  player1: Number,
  player2: Number,
  winner: String,
  date: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', gameSchema);


app.post('/api/save', async (req, res) => {
  const { player1, player2, winner } = req.body;
  const newGame = new Game({ player1, player2, winner });
  await newGame.save();
  res.status(201).send(newGame);
});


app.get('/api/results', async (req, res) => {
  const games = await Game.find();
  res.status(200).send(games);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
