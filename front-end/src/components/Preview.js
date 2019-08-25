import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Modal
} from '@material-ui/core';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  preview: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 200
  }
}));

function Preview() {
  const classes = useStyles();
  const preview = useSelector(state => state.ui.previewCard);

  return (
    <Card className={classes.preview}>
      <CardHeader title={preview.name} />
      <CardContent>{preview.type.money}</CardContent>
    </Card>
  );
}

export default Preview;
