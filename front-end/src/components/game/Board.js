import React, { useEffect, useState } from 'react';
import { makeStyles, Typography, Chip, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { setPreview } from '../../actions/uiActions';

const useStyles = makeStyles(() => ({
  boardPaper: {
    width: 1850,
    height: 1850,
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
    backgroundColor: 'white',
    borderRadius: 10
  },
  tile2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 250,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 10
  },
  tile3: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 250,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 10
  },
  tile4: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 250,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 10
  },
  north: {
    position: 'absolute',
    background: 'gray',
    width: 150,
    height: 250,
    transform: 'rotate(-180deg)'
  },
  east: {
    position: 'absolute',
    background: 'darkgray',
    width: 150,
    height: 250,
    transform: 'rotate(-90deg)'
  },
  south: {
    position: 'absolute',
    background: 'gray',
    width: 150,
    height: 250
  },
  west: {
    position: 'absolute',
    background: 'darkgray',
    width: 150,
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

function Board({ dragRef }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cards = useSelector(state => state.game.cards);
  const currentPlayer = useSelector(state => state.game.currentPlayer);
  const players = useSelector(state => state.game.players);
  const [scroll, setScroll] = useState(0.4);

  const getCardPosition = index => {
    if (index < 10) return { right: 150 * index + 100, bottom: 0 };
    if (index < 20) return { bottom: 150 * (index - 10) + 50, left: 50 };
    if (index < 30) return { left: 150 * (index - 20) + 100, top: 0 };
    if (index < 40) return { top: 150 * (index - 30) + 50, right: 50 };

    return null;
  };

  const getCardClass = index => {
    if (index < 10) return 'south';
    if (index < 20) return 'west';
    if (index < 30) return 'north';
    if (index < 40) return 'east';

    return null;
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

  const onScroll = event => {
    event.preventDefault();

    const newScroll = scroll + event.deltaY / 1000;

    if (newScroll > 0.2 && newScroll < 1.0) setScroll(newScroll);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      style={{ scale: scroll }}
    >
      <Paper className={classes.boardPaper} onWheel={onScroll}>
        <div className={classes.tile1} />
        <div className={classes.tile2} />
        <div className={classes.tile3} />
        <div className={classes.tile4} />

        {/* {cards.map(card => {
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
        })} */}
      </Paper>
    </motion.div>
  );
}

export default Board;
