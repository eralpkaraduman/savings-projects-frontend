import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import classNames from 'classnames';
import styles from './styles';
import config from './config';
import ProjectsPage from './components/ProjectsPage'

import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import MenuIcon from '@material-ui/icons/Menu';


class App extends Component {

  constructor(props) {
    super(props);
    this.currentPage = null;
    this.state = {
      contentPending: false
    };
  }

  handleOnRefreshClicked() {
    this.currentPage && this.currentPage.refresh();
  }

  handleOnProjectsPageStatusChanged(status) {
    if (status === 'pending') {
      this.setState({ contentDataPending: true });
    }
    else {
      this.setState({ contentDataPending: false });
    }
  }

  render() {
    const { contentPending } = this.state;
    const { classes } = this.props;
    return (
      <div className="App">
        <AppBar position='sticky'>
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon className={ classNames(classes.toolbarButtonIcon) } />
            </IconButton>
            <Typography variant="title" color="inherit" className={ classes.grow }>
              Savings Projects
            </Typography>
            { contentPending ?
              <CircularProgress
                color="inherit"
                size={ 30 }
                thickness={ 5 }
              /> :
              <IconButton color="inherit" onClick={ () => this.handleOnRefreshClicked() }>
                <RefreshIcon className={ classNames(classes.toolbarButtonIcon) } />
              </IconButton>
            }
          </Toolbar>
        </AppBar>
        <Grid container className={ classes.root }>
          <Grid item xs={ 12 }>
            <ProjectsPage
              innerRef={ currentPage => this.currentPage = currentPage }
              apiRoot={ config.apiRoot }
              onStatusChanged={ () => this.handleOnProjectsPageStatusChanged() }
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
