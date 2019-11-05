import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Join from '../Join';
import Create from '../Create';
import { closeConnection } from '../../actions/socketActions';
import Navigation from '../Navigation';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeConnection());
  });

  return (
    <Navigation>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Join />
          </Grid>

          <Grid item xs={12} md={6}>
            <Create />
          </Grid>
        </Grid>
      </Container>
    </Navigation>
  );
};

export default Home;
