/* eslint-disable consistent-return */
import Game from './src/Game';
import { themes } from './themes';

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const crypto = require('crypto');

const port = 3000;
const games = [];
const clients = [];

app.get('/', (req, res) => {
  res.send('<h1>Nothing to see here.</h1>');
});

/** get game and player (socket) */
const getGame = (socket, data, callback) => {
  for (let i = 0; i < clients.length; i += 1) {
    if (clients[i].socket.id === socket.id)
      callback({ game: clients[i].game, player: clients[i].socket }, data);
  }

  socket.emit('error_message', 'This game does not exist');
};

const checkTurn = (game, player) => {
  const isCurrentPlayer = player.id === game.currentPlayer.id;
  const isNotStarted = player === null;

  return isCurrentPlayer && !isNotStarted;
};

const create = (socket, data) => {
  const { player, settings } = data; // TODO: replace player with JWT

  // create new game
  const room = crypto.randomBytes(8).toString('hex');
  const game = new Game(
    room,
    themes[0].cards,
    themes[0].tiles,
    themes[0].special1,
    themes[0].special2,
    settings
  );

  clients.push({ socket, game });

  // add player to the game.
  game.addPlayer(player, socket);
  // add game to server
  games.push(game);

  socket.join(game.room);
  io.to(game.room).emit('lobby', game.updateLobby(player, false));
};

const join = (socket, data) => {
  const { room, player } = data;

  for (let i = 0; i < games.length; i += 1) {
    const game = games[i];

    if (game.room === room) {
      clients.push({ socket, game });

      game.addPlayer(player, socket);
      socket.join(room);
      io.to(game.room).emit('lobby', game.updateLobby(player, false));
    }
  }
};

const start = getGame => {
  const { game } = getGame;

  console.log('start');

  if (game.isReady) {
    io.to(game.room).emit('next', game.start());
  } else {
    io.to(socket).emit('error', 'Not everyone is ready');
  }
};

const lobby = (getGame, data) => {
  const { status } = data;
  const { game, player } = getGame;

  io.to(game.room).emit('lobby', game.updateLobby(player, status));
};

const chat = (getGame, data) => {
  const { message } = data;
  const { game } = getGame;

  const response = game.updateChat(message);
  io.to(game.room).emit('chat', response);
};

const roll = (getGame, data) => {
  const { game, player } = getGame;

  if (checkTurn(game, player)) {
    console.log('roll');
    io.to(game.room).emit('roll', game.updateRoll());
  }
};

const build = (getGame, data) => {
  const { game, player } = getGame;

  console.log('build action');

  const build = game.updateBuild(player, positions);

  if (build) io.to(game.room).emit('build', build);
};

const move = (getGame, data) => {
  const { game, player } = getGame;

  if (checkTurn(game, player)) {
    io.to(game.room).emit('move', game.updateGame(data));
  }
};

const next = getGame => {
  const { game, player } = getGame;

  console.log('next');

  if (checkTurn(game, player)) {
    io.to(game.room).emit('next', game.updateTurn());
  }
};

const disconnect = (getGame, data) => {
  const { game, player } = getGame;

  game.removePlayer(player);

  io.to(game.room).emit('lobby', game.updateLobby());
};

/** client connected to the server */
io.on('connection', socket => {
  socket.on('create', data => create(socket, data));

  socket.on('join', data => join(socket, data));

  socket.on('lobby', data => getGame(socket, data, lobby));

  socket.on('start', data => getGame(socket, data, start));

  socket.on('chat', data => getGame(socket, data, chat));

  socket.on('roll', data => getGame(socket, data, roll));

  socket.on('move', data => getGame(socket, data, move));

  socket.on('next', data => getGame(socket, data, next));

  socket.on('build', data => getGame(socket, data, build));

  socket.on('disconnect', data => getGame(socket, data, disconnect));
});

http.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
