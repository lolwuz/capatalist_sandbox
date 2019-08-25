import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { navigate } from '@reach/router';
import NavigateUp from '@material-ui/icons/Navigation';
import NavigationIcon from '@material-ui/icons/NavigateNext';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '../actions/socketActions';
import Cards from './pages/Cards';

const useStyles = makeStyles(theme => ({
  actionMenu: {
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Actions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const actions = useSelector(state => state.game.actions);

  const getActionButton = action => {
    switch (action) {
      case 'roll':
        return (
          <Fab
            key="roll"
            color="secondary"
            aria-label="roll"
            className={classes.fab}
            onClick={() => dispatch(sendMessage('roll'))}
          >
            roll
          </Fab>
        );
      case 'buy':
        return (
          <Fab
            color="primary"
            aria-label="buy"
            className={classes.fab}
            key="buy"
          >
            buy
          </Fab>
        );
      case 'next':
        return (
          <Fab
            key="next"
            aria-label="next"
            className={classes.fab}
            onClick={() => dispatch(sendMessage('next'))}
          >
            <NavigationIcon />
          </Fab>
        );
      case 'cards':
        return (
          <Fab
            key="cards"
            variant="extended"
            aria-label="cards"
            className={classes.fab}
            onClick={() => navigate('game/cards')}
          >
            <NavigateUp className={classes.extendedIcon} />
            cards
          </Fab>
        );
      default:
        return null;
    }
  };

  return (
    <div className={classes.actionMenu}>
      {['roll', 'buy', 'cards', 'next'].map(action => getActionButton(action))}
    </div>
  );
};

export default Actions;
