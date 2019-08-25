const defaultState = {
  isGameFinished: false,
  dice1: null,
  dice2: null,
  currentPlayer: null,
  cards: [
    { position: 0, name: 'Zeeman', type: { name: 'buy', money: 10.0 } },
    { position: 1, name: 'Kist', type: { name: 'buy', money: 2000 } },
    { position: 2, name: 'Kist', type: { name: 'buy', money: 2000 } },
    { position: 3, name: 'Action', type: { name: 'buy', money: 2000 } },
    { position: 4, name: 'Belasting', type: { name: 'tax', money: 2.0 } },
    {
      position: 5,
      name: 'Winkel Centrum Zuid',
      type: { name: 'action', money: 2000 }
    },
    { position: 6, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 7, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 8, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 9, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 10, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 11, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 12, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 13, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 14, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 15, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 16, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 17, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 18, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 19, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 20, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 21, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 22, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 23, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 24, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 25, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 26, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 27, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 28, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 29, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 30, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 31, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 32, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 33, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 34, name: 'Lidle', type: { name: 'buy', money: 2000 } },
    { position: 35, name: 'Lidle', type: { name: 'buy', money: 2000 } }
  ]
};

function gameReducer(state = defaultState, action) {
  switch (action.type) {
    case 'roll':
      return {
        ...state,
        dice1: action.dice1,
        dice2: action.dice2,
        players: action.players
      };
    case 'move':
      return { ...state };
    case 'next': {
      const { currentPlayer, actions, players, cards } = action;

      return {
        ...state,
        currentPlayer,
        actions,
        players,
        cards
      };
    }
    default:
      return state;
  }
}

export default gameReducer;
