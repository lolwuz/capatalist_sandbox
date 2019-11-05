import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Redirect } from '@reach/router';
import UserList from '../UserList';
import LobbyInfo from '../LobbyInfo';
import Navigation from '../Navigation';

const Lobby = () => {
  const isStarted = useSelector(state => state.lobby.isStarted);

  if (isStarted) return <Redirect noThrow to="/game" />;

  return (
    <Navigation>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item md={6}>
            <LobbyInfo display="flex" />
          </Grid>

          <Grid item md={6}>
            <UserList />
          </Grid>
        </Grid>
      </Container>
    </Navigation>
  );
};

export default Lobby;
