import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from '@reach/router';
import { useSelector } from 'react-redux';
import { Avatar, Chip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  appbar: {
    marginBottom: theme.spacing(0),
    flexGrow: 1
  },
  title: {
    margin: theme.spacing(1.5, 1, 1.5, 1)
  },
  link: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit'
  }
}));

export default function GameNavigation({ children }) {
  const classes = useStyles();
  const players = useSelector(state => state.game.players);

  return (
    <div>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Link className={classes.link} to="/">
            <Typography className={classes.title} variant="h6">
              Capitalist
            </Typography>
          </Link>

          {players.map(player => (
            <Chip
              key={player.id}
              className={classes.title}
              avatar={<Avatar>{player.username}</Avatar>}
              label={player.money}
            />
          ))}
        </Toolbar>
      </AppBar>

      {children}
    </div>
  );
}
