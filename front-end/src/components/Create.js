import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { startConnection, sendMessage } from '../actions/socketActions';

const useStyles = makeStyles(() => ({
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
  changeButton: {
    float: 'right'
  },
  createButton: {
    marginTop: 20
  }
}));

export default function Join() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    freePark: false,
    jailRule: false,
    username: ''
  });

  const handleChange = name => event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setState({ ...state, [name]: value });
  };

  const handleCreate = () => {
    dispatch(startConnection());

    dispatch(sendMessage('create', { player: { username: state.username } }));

    navigate('lobby');
  };

  const { freePark, jailRule, username } = state;

  return (
    <Card className={classes.card}>
      <CardHeader title="Create game" />

      <Divider variant="middle" />

      <CardContent>
        <Chip
          color="default"
          label="Dutch theme"
          avatar={<Avatar src="/static/images/avatar/1.jpg" />}
        />
        <Button
          variant="outlined"
          size="small"
          className={classes.changeButton}
        >
          change
        </Button>
      </CardContent>

      <Divider variant="middle" />

      <CardContent>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Game settings</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={freePark}
                  onChange={handleChange('freePark')}
                  value="freePark"
                />
              }
              label="Free park"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={jailRule}
                  onChange={handleChange('jailRule')}
                  value="jailRule"
                />
              }
              label="Jail rule"
            />
          </FormGroup>
        </FormControl>

        <TextField
          id="username"
          label="username"
          className={classes.textField}
          value={username}
          onChange={handleChange('username')}
          margin="normal"
          fullWidth
          variant="outlined"
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => handleCreate()}
          className={classes.createButton}
        >
          Create game
        </Button>
      </CardContent>
    </Card>
  );
}
