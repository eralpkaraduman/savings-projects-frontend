import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import styles from '../styles';
import ProjectsTable from './ProjectsTable';
import SearchField from './SearchField';
import ProjectDataDialog from './ProjectDataDialog';

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
      selectedProjectDataForDialogDisplay: null,
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

    if (projectsUpdated) {
      this.fuse = new Fuse(nextState.projects, fuseOptions);
    }

    const { pending: isPending } = nextState;
    const { pending: wasPending } = this.state;
    const pendingChanged = wasPending !== isPending;

    const { error: currentError } = nextState;
    const { error: prevError } = this.state;
    const errorChanged = prevError !== currentError;

    const { onStatusChanged } = nextProps;
    if (pendingChanged || errorChanged) {
      if (isPending) {
        onStatusChanged('pending');
      } else if (currentError) {
        onStatusChanged('failed');
      } else {
        onStatusChanged('ready');
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { projectSearchQuery: nextProjectSearchQuery } = this.state;
    const { projectSearchQuery: prevProjectSearchQuery } = prevState;
    const queryChanged = nextProjectSearchQuery !== prevProjectSearchQuery;

    if (queryChanged) {
      const newFilteredProjects = this.fuse.search(nextProjectSearchQuery);
      const { filteredProjects: currentFilteredProjects } = this.state;
      if (currentFilteredProjects !== newFilteredProjects) {
        // suppressing eslint warning, safe to update only when query & result changes
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ filteredProjects: newFilteredProjects });
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

  handleOnTableRowClick(rowData) {
    this.setState(() => ({ selectedProjectDataForDialogDisplay: rowData }));
  }

  render() {
    const { classes } = this.props;
    const {
      projects, projectSearchQuery,
      filteredProjects, pending,
      selectedProjectDataForDialogDisplay,
    } = this.state;
    const shouldDisplayfilteredProjects = projectSearchQuery.length >= 2;
    return (
      <Grid container className={classes.pageRoot} justify="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <SearchField
            disabled={pending}
            onValueChanged={value => this.handleOnSearchValueChanged(value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.tableRoot}>
            <ProjectsTable
              onRowClick={rowData => this.handleOnTableRowClick(rowData)}
              projects={shouldDisplayfilteredProjects ? filteredProjects : projects}
            />
          </Paper>
        </Grid>
        <ProjectDataDialog
          data={selectedProjectDataForDialogDisplay}
        />
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
