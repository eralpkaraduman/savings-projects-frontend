import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import styles from '../styles';
import ProjectsTable from './ProjectsTable';
import SearchField from './SearchField';

const fuseOptions = {
  shouldSort: true,
  threshold: 0.5,
  location: 0,
  distance: 100,
  maxPatternLength: 64,
  minMatchCharLength: 1,
  keys: ['description'],
};

class ProjectsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: false,
      error: null,
      projectSearchQuery: '',
      projects: [],
      filteredProjects: [],
    };
    this.fuse = new Fuse([], fuseOptions);
  }


  componentDidMount() {
    this.updateProjects();
  }

  componentWillUpdate(nextProps, nextState) {
    const { projects: nextProjects } = nextState;
    const { projects: prevProjects } = this.state;
    const projectsUpdated = nextProjects !== prevProjects;

    const { projectSearchQuery: nextProjectSearchQuery } = nextState;
    const { projectSearchQuery: prevProjectSearchQuery } = this.state;
    const queryChanged = nextProjectSearchQuery !== prevProjectSearchQuery;

    if (projectsUpdated) {
      this.fuse = new Fuse(nextState.projects, fuseOptions);
    }

    if (queryChanged) {
      this.setState({
        filteredProjects: this.fuse.search(nextProjectSearchQuery),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { pending, error } = this.state;
    const { onStatusChanged } = this.props;
    const pendingChanged = pending !== prevState.pending;
    const errorChanged = error !== prevState.error;
    if (pendingChanged || errorChanged) {
      if (pending) {
        onStatusChanged('pending');
      } else if (error) {
        onStatusChanged('failed');
      } else {
        onStatusChanged('ready');
      }
    }
  }

  refresh() {
    this.updateProjects();
  }

  async updateProjects() {
    const { apiRoot } = this.props;
    this.setState({ pending: true });
    const response = await fetch(`${apiRoot}/data`);
    if (response.ok) {
      try {
        const projects = await response.json();
        if (!projects || !Array.isArray(projects)) {
          throw new Error('Received invalid response');
        }
        this.setState({
          projects,
          pending: false,
          error: null,
        });
      } catch (err) {
        this.setState({
          pending: false,
          error: 'Failed to parse response',
        });
      }
    } else {
      this.setState({
        pending: false,
        error: 'Failed to fetch projects',
      });
    }
  }

  handleOnSearchValueChanged(value) {
    this.setState({
      projectSearchQuery: value.trim(),
    });
  }

  render() {
    const { classes } = this.props;
    const { projects, projectSearchQuery, filteredProjects } = this.state;
    const shouldDisplayfilteredProjects = projectSearchQuery.length >= 2;
    return (
      <Grid container className={classes.pageRoot}>
        <Grid item xs={12}>
          <SearchField
            onValueChanged={value => this.handleOnSearchValueChanged(value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.tableRoot}>
            <ProjectsTable
              projects={shouldDisplayfilteredProjects ? filteredProjects : projects}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

ProjectsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  apiRoot: PropTypes.string.isRequired,
  onStatusChanged: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProjectsPage);
