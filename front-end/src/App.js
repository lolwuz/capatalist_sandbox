import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Router } from '@reach/router';
import React from 'react';
import { blue, green } from '@material-ui/core/colors';
import Navigation from './components/Navigation';
import Home from './components/pages/Home';
import Lobby from './components/pages/Lobby';
import Game from './components/pages/Game';
import Cards from './components/pages/Cards';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: green,
    secondary: blue
  },
  status: {},
  mixins: {
    toolbar: {}
  }
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Router>
        <Home path="/" />
        <Lobby path="/lobby" />
        <Game path="/game" />
        <Cards path="/game/cards" />
      </Router>
    </ThemeProvider>
  );
};

export default App;
