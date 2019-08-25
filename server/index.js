/* eslint-disable consistent-return */
import Game from './src/Game';
import themes from './themes';

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
const getGame = socket => {
  for (let i = 0; i < clients.length; i += 1) {
    if (clients[i].socket.id === socket.id)
      return { game: clients[i].game, player: clients[i].socket };
  }
};

const checkTurn = (game, player) => {
  const isCurrentPlayer = player === game.currentPlayer;
  const isNotStarted = player === null;

  return isCurrentPlayer && isNotStarted;
};

/** client connected to the server */
io.on('connection', socket => {
  socket.on('create', data => {
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
  });

  socket.on('join', data => {
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
  });

  socket.on('lobby', data => {
    const { status } = data;
    const { game, player } = getGame(socket);

    io.to(game.room).emit('lobby', game.updateLobby(player, status));
  });

  socket.on('start', () => {
    const { game } = getGame(socket);

    console.log('start')

    if (game.isReady) {
      io.to(game.room).emit('next', game.start());
    } else {
      io.to(socket).emit('error', 'Not everyone is ready');
    }
  });

  socket.on('chat', data => {
    const { message } = data;
    const { game } = getGame(socket);

    const response = game.updateChat(message);
    io.to(game.room).emit('chat', response);
  });

  socket.on('roll', () => {
    const { game, player } = getGame(socket);

    console.log('roll')

    if (checkTurn(game, player)) {
      io.to(game.room).emit('roll', game.updateRoll());
    }
  });

  socket.on('move', action => {
    const { game, player } = getGame(socket);

    if (checkTurn(game, player)) {
      io.to(game.room).emit('move', game.updateGame(action));
    }
  });

  socket.on('next', data => {
    const { game, player } = getGame(socket);

    console.log('next')

    if (checkTurn(game, player)) {
      const response = game.nextTurn('next', player, data);
      io.to(game.room).emit('next', response);
    }
  });

  socket.on('disconnect', () => {
    const { game, player } = getGame(socket);

    game.removePlayer(player);

    io.to(game.room).emit('lobby', game.updateLobby());
  });
});

http.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
