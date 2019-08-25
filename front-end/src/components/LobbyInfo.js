import React, { useState } from 'react';
import {
  Button,
  Card,
  TextField,
  CardActions,
  CardContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { sendMessage } from '../actions/socketActions';

const useStyles = makeStyles(() => ({
  card: {
    marginTop: 30,
    display: 'flex'
  }
}));

const LobbyInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const room = useSelector(state => state.lobby.room);
  const [isReady, setReady] = useState(false);

  const readyClicked = () => {
    dispatch(sendMessage('lobby', { status: !isReady }));
    setReady(!isReady); // TODO: listen to server event to switch button.
  };

  const startClicked = () => {
    dispatch(sendMessage('start'));
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <TextField
          id="game_code"
          label="game code"
          value={room}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
      </CardContent>
      <CardActions>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button onClick={() => readyClicked()} variant="contained">
            Ready
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button onClick={() => startClicked()} variant="contained">
            Start
          </Button>
        </motion.div>
      </CardActions>
    </Card>
  );
};

export default LobbyInfo;
