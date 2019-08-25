import { combineReducers } from 'redux';
import lobbyReducer from './lobbyReducer';
import homeReducer from './homeReducer';
import gameReducer from './gameReducer';
import uiReducer from './uiReducer';

export default combineReducers({
  lobby: lobbyReducer,
  home: homeReducer,
  game: gameReducer,
  ui: uiReducer
});
