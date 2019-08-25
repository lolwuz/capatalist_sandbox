const defaultTheme = {
  name: 'Dutch',
  cards: [],
  tiles: [],
  special1: [],
  special2: []
};

const defaultState = {
  theme: defaultTheme,
  themes: [],
  loading: false
};

function homeReducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    case 'GET_THEME_START':
      return { ...state, loading: true };
    case 'GET_THEME_SUCCESS':
      return { ...state, themes: action.themes, loading: false };
    default:
      return state;
  }
}

export default homeReducer;
