import React, { useRef } from 'react';
import {
  Paper,
  makeStyles,
  Card,
  CardHeader,
  Typography,
  CardMedia
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { setPreview } from '../../actions/uiActions';

const useStyles = makeStyles(() => ({
  tile1: {
    width: '14%',
    height: '14%',
    bottom: '0%',
    right: '0%',
    position: 'absolute',
    background: 'white'
  },
  tile2: {
    width: '14%',
    height: '14%',
    background: 'white',
    bottom: '0%',
    left: '0%',
    position: 'absolute'
  },
  tile3: {
    width: '14%',
    height: '14%',
    top: '0%',
    left: '0%',
    background: 'white',
    position: 'absolute'
  },
  tile4: {
    width: '14%',
    height: '14%',
    top: '0%',
    right: '0%',
    background: 'white',
    position: 'absolute'
  },
  north: {
    position: 'absolute',
    background: 'gray',
    width: '8%',
    height: '13%',
    transform: 'rotate(-180deg)'
  },
  east: {
    position: 'absolute',
    background: 'darkgray',
    width: '8%',
    height: '13%',
    transform: 'rotate(-90deg)'
  },
  south: {
    position: 'absolute',
    background: 'gray',
    width: '8%',
    height: '13%'
  },
  west: {
    position: 'absolute',
    background: 'darkgray',
    width: '8%',
    height: '13%',
    transform: 'rotate(90deg)'
  },
  cardTitle: {
    margin: 4,
    fontSize: 10
  },
  media: {
    height: 40
  }
}));

function Board() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cards = useSelector(state => state.game.cards);

  const getCardPosition = index => {
    if (index < 9) {
      return { bottom: '0%', right: `${(14 + 8 * index).toString()}%` };
    }
    if (index < 18) {
      return {
        bottom: `${(83.5 - 8 * (index - 8)).toString()}%`,
        left: '2.5%'
      };
    }
    if (index < 27) {
      return { top: '0%', left: `${(14 + 8 * (index - 18)).toString()}%` };
    }
    if (index < 36) {
      return { top: `${(11.5 + 8 * (index - 27)).toString()}%`, right: '2.5%' };
    }
  };

  const getCardClass = index => {
    if (index < 9) {
      return 'south';
    }
    if (index < 18) {
      return 'west';
    }
    if (index < 27) {
      return 'north';
    }
    if (index < 36) {
      return 'east';
    }
  };

  const cardClicked = card => {
    dispatch(setPreview(card));
  };

  return (
    <motion.div
      className={classes.board}
      drag
      dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
    >
      <Paper className="square">
        <div className="content">
          <Paper elevation={8} className={classes.tile1} />
          <Paper elevation={8} className={classes.tile2} />
          <Paper elevation={8} className={classes.tile3} />
          <Paper elevation={8} className={classes.tile4} />

          {cards.map(card => {
            const style = getCardPosition(card.position);
            const name = getCardClass(card.position);

            return (
              <Card
                key={card.position}
                elevation={1}
                style={style}
                className={classes[name]}
                onMouseEnter={() => cardClicked(card)}
              >
                <CardMedia
                  className={classes.media}
                  image="https://images2.minutemediacdn.com/image/upload/c_crop,h_1123,w_2000,x_0,y_104/f_auto,q_auto,w_1100/v1554742535/shape/mentalfloss/558576-seangallup-gettyimages-901462836.jpg"
                  title="Contemplative Reptile"
                />
                <Typography className={classes.cardTitle}>
                  {card.name}
                </Typography>
              </Card>
            );
          })}
        </div>
      </Paper>
    </motion.div>
  );
}

export default Board;
