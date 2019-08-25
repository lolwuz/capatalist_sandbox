import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Join from '../Join';
import Create from '../Create';
import { closeConnection } from '../../actions/socketActions';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeConnection());
  });

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        <Grid item md={6}>
          <Join />
        </Grid>

        <Grid item md={6}>
          <Create />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
