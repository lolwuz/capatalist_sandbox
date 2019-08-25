const defaultState = {
  id: null,
  room: '',
  isStarted: false,
  players: [],
  chat: []
};

function lobbyReducer(state = defaultState, action) {
  switch (action.type) {
    case 'connect':
      return { ...state, id: action.socket.id };
    case 'join':
      return { ...state, players: [...state.players, action.player] };
    case 'lobby':
      return { ...state, players: action.players, room: action.room };
    case 'chat':
      return { ...state, chat: [...state.chat, action.message] };
    case 'next':
      return { ...state, isStarted: true };
    // RESET
    case 'CLOSE_SOCKET':
      return defaultState;
    default:
      return state;
  }
}

export default lobbyReducer;
