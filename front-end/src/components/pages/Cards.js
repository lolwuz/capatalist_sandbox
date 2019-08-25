import React from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  Card,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Modal
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  formControl: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minWidth: 120
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

function Cards() {
  const classes = useStyles();
  const cards = useSelector(state => state.game.cards);

  const [values, setValues] = React.useState({
    name: '',
    age: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className={classes.root}>
      <Container>
        <TextField
          id="outlined-name"
          label="Card name"
          className={classes.formControl}
          value={values.name}
          onChange={handleChange('name')}
          margin="normal"
          variant="outlined"
        />

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-simple">Age</InputLabel>
          <Select
            value={values.age}
            onChange={handleChange('age')}
            input={<OutlinedInput name="age" id="outlined-age-simple" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={3}>
          {cards.map(card => (
            <Grid key={card.id} item md={4}>
              <Card className={classes.paper}>{card.name}</Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Cards;
