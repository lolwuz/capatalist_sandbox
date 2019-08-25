const defaultState = {
  previewCard: {
    position: '',
    name: '',
    type: { name: 'buy', money: 2000 }
  }
};

function uiReducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_PREVIEW_CARD':
      return { ...state, previewCard: action.card };
    case 'UNSET_PREVIEW_CARD':
      return { ...state, previewCard: {} };
    default:
      return state;
  }
}

export default uiReducer;
