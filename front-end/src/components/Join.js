import {
  TextField,
  Card,
  CardContent,
  CardHeader,
  Button,
  Avatar
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import { navigate } from '@reach/router';
import { startConnection, sendMessage } from '../actions/socketActions';

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: 30,
    width: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  avatar: {
    backgroundColor: red[500]
  },
  joinButton: {
    marginTop: 20
  }
}));

export default function Join() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    username: '',
    game_code: ''
  });

  const joinButtonState = () => {
    if (values.game_code.length > 3) return false;
    return true;
  };

  const joinGame = () => {
    dispatch(startConnection());

    dispatch(
      sendMessage('join', {
        player: { username: values.username },
        room: values.game_code
      })
    );

    navigate('/lobby');
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            {values.username[0]}
          </Avatar>
        }
        title={values.username ? values.username : 'Anonymous User'}
        subheader="Login for customization"
      />

      <CardContent>
        <TextField
          id="game_code"
          label="game code"
          className={classes.textField}
          value={values.game_code}
          onChange={handleChange('game_code')}
          fullWidth
          variant="outlined"
        />

        <TextField
          id="username"
          label="username"
          className={classes.textField}
          value={values.username}
          onChange={handleChange('username')}
          margin="normal"
          fullWidth
          variant="outlined"
        />

        <Button
          color="secondary"
          variant="contained"
          disabled={joinButtonState()}
          size="large"
          fullWidth
          onClick={() => joinGame()}
          className={classes.joinButton}
        >
          Join
        </Button>
      </CardContent>
    </Card>
  );
}
