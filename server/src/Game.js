export default class Game {
  constructor(room, cards, tiles, special1, special2, settings) {
    this.room = room;
    this.isGameStarted = false;
    this.isGameFinished = false;
    this.currentPlayer = null;
    this.actions = ['roll']

    this.cards = cards;
    this.tiles = tiles;
    this.special1 = special1;
    this.special2 = special2;
    this.players = [];
    this.settings = settings;
  }

  get isReady() {
    const ready = this.players.filter(player => !player.isReady);

    return ready.length === 0;
  }

  addPlayer(player, socket) {
    player.id = socket.id;
    player.connected = true;
    this.players.push(player);
  }

  removePlayer(player) {
    this.players = this.players.filter(p => p.id !== player.id);
  }

  start() {
    const currentPlayer = this.players[0]; // TODO: randomize or something.
    this.currentPlayer = currentPlayer;

    return this._getGameInfo();
  }

  updateLobby(player, status) {
    if (player) {
      this.players.forEach(p => {
        if (p.id === player.id) p.isReady = status;
      });
    }

    return { ...this._getGameInfo(), players: this.players, room: this.room };
  }

  updateRoll() {
    const dice1 = Math.random();
    const dice2 = Math.random();
    const total = dice1 + dice2;

    const result = this._getDiceResult(total);
    this._executeEvents(result.events);
    this.actions = result.actions;

    return { ...this._getGameInfo(), dice1, dice2 };
  }

  updateGame(action) {
    const message = 'action completed'
    
    switch (action.type) {
      case 'buy':
        this.currentPlayer.transaction(-100);
        break;
      default:
        break;
    }

    return { ...this._getGameInfo(), message}
  }

  _getDiceResult(diceTotal) {
    // events happen when rolling the dice and
    // cannot be influenced by the player.
    const events = [];

    // actions can be initiated by the currentPlayer
    // after the dice is rolled.
    const actions = [];
    if (this.currentPlayer.cards > 0) {
      actions.append('trade-deal');
      actions.append('buy-houses'); // TODO: check if can build houses
      actions.append('mortgage');
    }

    // calculate next position.
    let nextPosition = this.currentPlayer.position + diceTotal;
    if (nextPosition > 39) {
      nextPosition -= 39;
      events.push({ type: 'start' }); // passed start
    }

    this.currentPlayer.position = nextPosition;

    // check cards
    this.cards.forEach(card => {
      if (card.position === nextPosition) {
        if (card.owner === null) {
          actions.push('buy');
        } else if (card.owner !== this.currentPlayer) {
          events.push({ type: 'pay', card });
        }
      }
    });

    // check tiles
    this.tiles.forEach(tile => {
      if (tile.position === nextPosition) {
        switch (tile.type) {
          case 'start':
            events.push({ type: 'start' });
            break;
          case 'tax1':
            events.push({ type: 'tax1' });
            break;
          case 'tax2':
            events.push({ type: 'tax2' });
            break;
          case 'special1':
            events.push({ type: 'special1', tile });
            break;
          case 'special2':
            events.push({ type: 'special2', tile });
            break;
          case 'park':
            if (this.settings.isParkRule) events.push({ type: 'park' });
            break;
          case 'jail':
            events.push({ type: 'jail' });
            actions.push({ type: 'jail' });
            break;
          default:
            break;
        }
      }
    });
  }

  _executeEvents(events) {
    events.forEach(event => {
      switch (event.type) {
        case 'start':
          this.currentPlayer.transaction(this.settings.start);
          break;
        case 'tax1':
          this.currentPlayer.transaction(-this.settings.tax1);
          break;
        case 'tax2':
          this.currentPlayer.transaction(-this.settings.tax2);
          break;
        case 'special1':
          // events.append({ type: 'special1', tile });
          break;
        case 'special2':
          // events.append({ type: 'special2', tile });
          break;
        case 'park':
          if (this.isParkRule) event.append({ type: 'park' });
          break;
        case 'jail':
          this.currentPlayer.position = 19;
          this.currentPlayer.isJailed = true;
          break;
        default:
          break;
      }
    });
  }

  _getGameInfo() {
    const { currentPlayer, players, isGameFinished, actions, cards } = this;
    
    return { currentPlayer, players, isGameFinished, actions, cards }
  }
}
