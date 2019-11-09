import { streets } from '../themes';

export default class Game {
  constructor(room, cards, tiles, special1, special2, settings) {
    this.room = room;
    this.isGameStarted = false;
    this.isGameFinished = false;
    this.currentPlayer = null;
    this.actions = ['roll'];

    this.cards = this.getCards(cards);
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

  /**
   * Set Card owner to null
   * @param {*} cards
   */
  getCards(cards) {
    cards.forEach(card => {
      card.owner = null;
      if (!card.type.special) card.level = 0;
    });

    return cards;
  }

  /**
   * Add player to game.
   * @param {*} player
   * @param {*} socket
   */
  addPlayer(player, socket) {
    player.id = socket.id;
    player.connected = true;
    player.position = 0;
    player.money = 100000;
    player.cards = [];
    this.players.push(player);
  }

  /**
   * Removes player from the game
   * @param {socket} player
   */
  removePlayer(player) {
    this.players = this.players.filter(p => p.id !== player.id);
  }

  /**
   * Initialize the game
   */
  start() {
    const currentPlayer = this.players[0]; // TODO: randomize or something.
    this.currentPlayer = currentPlayer;

    return this._getGameInfo();
  }

  /**
   * Update the lobby
   * @param {socket} player changing socket
   * @param {boolean} status
   */
  updateLobby(player, status) {
    if (player) {
      this.players.forEach(p => {
        if (p.id === player.id) p.isReady = status;
      });
    }

    return {
      ...this._getGameInfo(),
      players: this.players,
      room: this.room,
      id: player.id
    };
  }

  updateBuild(player, positions) {
    // check if houses can be placed in this position
    let cost = 0;
    let message = '';

    positions.forEach(i => {
      i.forEach(y => {
        if (this.cards[y].type.special || this.cards[y].owner.id !== player.id)
          return null;

        const send = JSON.stringify(y);

        for (let x = 0; x < streets.length; x += 1) {
          const local = JSON.stringify(streets[x]);

          if (send === local) {
            streets.forEach(cardIndex => {
              cost += this.cards[cardIndex].upgrade;
            });
          }
        }
      });
    });

    // remove money from player.
    this.players.forEach(p => {
      if (player.id === p.id) {
        p.money -= cost;
      }
    });

    return { ...this._getGameInfo(), message };
  }

  /**
   * currentPlayer send a roll command.
   */
  updateRoll() {
    const dice1 = Math.ceil(Math.random() * 6);
    const dice2 = Math.ceil(Math.random() * 6);
    const total = dice1 + dice2;

    const result = this._getDiceResult(total);
    this._executeEvents(result.events);
    this.actions = result.actions;

    return { ...this._getGameInfo(), dice1, dice2 };
  }

  /**
   * Action is send by currentplayer and processed
   * @param {*} action
   */
  updateGame(action) {
    let message = 'action completed';

    // check if action type is allowed
    if (!this.actions.includes(action.type)) {
      message = 'action not allowed';
      return {
        ...this._getGameInfo(),
        message
      };
    }

    switch (action.type) {
      case 'buy':
        this.cards.forEach(card => {
          if (this.currentPlayer.position === card.position) {
            const balance = this.currentPlayer.money - card.type.money;

            if (balance < 0) {
              message = 'not enough money';
              return {
                ...this._getGameInfo(),
                message
              };
            }

            if (card.owner === this.currentPlayer) {
              message = 'you already own this card';
              return {
                ...this._getGameInfo(),
                message
              };
            }

            this.currentPlayer.money = balance;
            card.owner = this.currentPlayer;
            this.actions = this.actions.filter(item => item !== action.type);
          }
        });

        break;
      default:
        break;
    }

    return { ...this._getGameInfo(), message };
  }

  /**
   * Update the turn
   */
  updateTurn() {
    for (let i = 0; i < this.players.length; i += 1) {
      const player = this.players[i];

      if (player.id === this.currentPlayer.id) {
        const index = this.players.indexOf(player);

        if (index === this.players.length - 1) {
          this.currentPlayer = this.players[0];
        } else {
          this.currentPlayer = this.players[index + 1];
        }

        this.actions = ['roll'];

        return this._getGameInfo();
      }
    }
  }

  _getDiceResult(diceTotal) {
    this.currentPlayer.position = this._calculatePosition(diceTotal);

    let events = this._getEvents();
    let actions = this._getActions();

    return { events, actions };
  }

  _getActions() {
    const { position } = this.currentPlayer;
    const actions = ['next'];

    this.cards.forEach(card => {
      if (card.position === position) {
        if (card.owner === null && card.type.name === 'buy') {
          actions.push('buy');
        }
      }
    });

    return actions;
  }

  _getEvents() {
    const { position } = this.currentPlayer;
    const events = [];

    // player is on start and will get payed.
    if (position === 0) {
      events.push({ type: 'start' });
    }

    // check all the card for events.
    this.cards.forEach(card => {
      if (card.position === position) {
        if (card.type.name === 'tax')
          events.push({ type: card.type.name, money: card.type.money });
        if (card.type.name === 'card')
          events.push({ type: card.type.name, card: this._getRandomCard() });
      }
    });

    return events;
  }

  _calculatePosition(diceTotal) {
    let nextPosition = this.currentPlayer.position + diceTotal;

    if (nextPosition > 35) {
      nextPosition -= 36;
    }

    return nextPosition;
  }

  _executeEvents(events) {
    events.forEach(event => {
      switch (event.type) {
        case 'start':
          // this.currentPlayer.transaction(this.settings.start);
          break;
        case 'tax1':
          // this.currentPlayer.transaction(-this.settings.tax1);
          break;
        case 'tax2':
          // this.currentPlayer.transaction(-this.settings.tax2);
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

  _getRandomCard(type) {
    if (type === 0)
      return this.special1[Math.floor(Math.random() * this.special1.length)];
    else return this.special2[Math.floor(Math.random() * this.special2.length)];
  }

  _getGameInfo() {
    const { currentPlayer, players, isGameFinished, actions, cards } = this;

    return {
      currentPlayer,
      players,
      isGameFinished,
      actions,
      cards
    };
  }
}
