import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import MenuIcon from '@material-ui/icons/Menu';

import './App.css';
import styles from './styles';
import config from './config';
import ProjectsPage from './components/ProjectsPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.currentPage = null;
    this.state = {
      contentPending: false,
    };
  }

  setCurrentPageInstance(currentPage) {
    this.currentPage = currentPage;
  }

  handleOnProjectsPageStatusChanged(status) {
    const contentPending = status === 'pending';
    this.setState({ contentPending });
  }

  handleOnRefreshClicked() {
    // Using react refs to call actions on children, for the sake of simplicity,
    // if project more pages it would make sense to use redux, mobx etc.
    if (this.currentPage) {
      this.currentPage.refresh();
    }
  }

  render() {
    const { contentPending } = this.state;
    const { classes } = this.props;
    return (
      <div className="App">
        <AppBar position="sticky">
          <Toolbar>
            <IconButton color="inherit" className={classes.leftToolbarItem}>
              <MenuIcon className={classes.toolbarButtonIcon} />
            </IconButton>
            <Typography align="left" variant="title" color="inherit" className={classes.grow}>
              Savings Projects
            </Typography>
            { contentPending ? (
              <CircularProgress
                color="inherit"
                size={30}
                thickness={5}
                className={classes.rightToolbarItem}
              />) : (
                <IconButton
                  color="inherit"
                  onClick={() => this.handleOnRefreshClicked()}
                  className={classes.rightToolbarItem}
                >
                  <RefreshIcon className={classes.toolbarButtonIcon} />
                </IconButton>)
            }
          </Toolbar>
        </AppBar>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <ProjectsPage
              innerRef={currentPage => this.setCurrentPageInstance(currentPage)}
              apiRoot={config.apiRoot}
              onStatusChanged={status => this.handleOnProjectsPageStatusChanged(status)}
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
