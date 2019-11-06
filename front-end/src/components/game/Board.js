import React, { useRef } from 'react';
import {
  Paper,
  makeStyles,
  Card,
  CardHeader,
  Typography,
  CardMedia,
  Chip
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { setPreview } from '../../actions/uiActions';

const useStyles = makeStyles(() => ({
  boardPaper: {
    width: 2100,
    height: 2100,
    backgroundColor: 'darkgreen',
    position: 'absolute',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  tile1: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 250,
    width: 250,
    backgroundColor: 'white'
  },
  tile2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 250,
    width: 250,
    backgroundColor: 'white'
  },
  tile3: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 250,
    width: 250,
    backgroundColor: 'white'
  },
  tile4: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 250,
    width: 250,
    backgroundColor: 'white'
  },
  north: {
    position: 'absolute',
    background: 'gray',
    width: 200,
    height: 250,
    transform: 'rotate(-180deg)'
  },
  east: {
    position: 'absolute',
    background: 'darkgray',
    width: 200,
    height: 250,
    transform: 'rotate(-90deg)'
  },
  south: {
    position: 'absolute',
    background: 'gray',
    width: 200,
    height: 250
  },
  west: {
    position: 'absolute',
    background: 'darkgray',
    width: 200,
    height: 250,
    transform: 'rotate(90deg)'
  },
  cardTitle: {
    margin: 4,
    fontSize: 10
  },
  media: {
    height: 125,
    width: '100%'
  }
}));

function Board() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cards = useSelector(state => state.game.cards);
  const currentPlayer = useSelector(state => state.game.currentPlayer);
  const players = useSelector(state => state.game.players);

  const getCardPosition = index => {
    if (index < 9) return { right: 200 * index + 50, bottom: 0 };
    if (index < 18) return { bottom: 200 * (index - 9) + 25, left: 25 };
    if (index < 27) return { left: 200 * (index - 18) + 50, top: 0 };
    if (index < 36) return { top: 200 * (index - 27) + 25, right: 25 };
  };

  const getCardClass = index => {
    if (index < 9) return 'south';
    if (index < 18) return 'west';
    if (index < 27) return 'north';
    if (index < 36) return 'east';
  };

  const getCardPlayers = position => {
    const returnPlayers = [];

    for (let i = 0; i < players.length; i += 1) {
      const player = players[i];
      if (player.position === position) {
        returnPlayers.push(player);
      }
    }

    return returnPlayers;
  };

  const cardClicked = card => {
    dispatch(setPreview(card));
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
      style={{ scale: 0.3 }}
    >
      <div className={classes.boardPaper}>
        <div className={classes.tile1} />
        <div className={classes.tile2} />
        <div className={classes.tile3} />
        <div className={classes.tile4} />

        {cards.map(card => {
          const style = getCardPosition(card.position);
          const name = getCardClass(card.position);
          const renderPlayers = getCardPlayers(card.position);

          return (
            <div
              key={card.position}
              elevation={1}
              style={style}
              className={classes[name]}
              onMouseEnter={() => cardClicked(card)}
            >
              <img
                className={classes.media}
                src="https://images2.minutemediacdn.com/image/upload/c_crop,h_1123,w_2000,x_0,y_104/f_auto,q_auto,w_1100/v1554742535/shape/mentalfloss/558576-seangallup-gettyimages-901462836.jpg"
                alt="Contemplative Reptile"
              />

              <Typography variant="subtitle1">{card.name}</Typography>

              {renderPlayers.map(player => (
                <Chip
                  key={player.id}
                  size="large"
                  label={player.username}
                  className={classes.playerTitle}
                  color={
                    player.id === currentPlayer.id ? 'secondary' : 'default'
                  }
                />
              ))}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Board;
