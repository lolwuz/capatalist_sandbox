import React from 'react';
import Board from '../game/Board';
import Preview from '../Preview';
import Actions from '../Actions';

function Game() {
  return (
    <div>
      <Board />

      <Preview />

      <Actions />
    </div>
  );
}

export default Game;
