import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    marginTop: 30,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}));

const UserList = () => {
  const classes = useStyles();

  const players = useSelector(state => state.lobby.players);

  return (
    <List component={Paper} className={classes.root}>
      {players.map(player => (
        <React.Fragment key={player.username}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="User" src={player.img} label={player.username[0]}>
                {player.username[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={player.username}
              disableTypography={player.isReady}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default UserList;
