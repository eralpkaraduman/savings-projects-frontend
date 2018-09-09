import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import styles from './styles';
import config from './config';
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
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <ProjectsPage
              apiRoot={config.apiRoot}
            />
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
