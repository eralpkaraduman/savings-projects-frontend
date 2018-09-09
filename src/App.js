import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ProjectsPage from './components/ProjectsPage'

class App extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className="App">
        <AppBar position='static'>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.grow}>
              Savings Projects
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <ProjectsPage/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
