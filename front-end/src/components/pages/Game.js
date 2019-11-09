import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Board from '../game/Board';
import Preview from '../Preview';
import Actions from '../Actions';
import GameNavigation from '../game/Navigation';

function Game() {
  return (
    <GameNavigation>
      <Board />

      <Preview />

      <Actions />
    </GameNavigation>
  );
}

export default Game;
