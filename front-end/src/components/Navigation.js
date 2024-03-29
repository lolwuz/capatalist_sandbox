import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { Link } from '@reach/router';

const useStyles = makeStyles(theme => ({
  appbar: {
    marginBottom: theme.spacing(0)
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

export default function Navigation({ children }) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Link className={classes.link} to="/">
            <Typography className={classes.title} variant="h6">
              Capitalist
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      {children}
    </div>
  );
}
