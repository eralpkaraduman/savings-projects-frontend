import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ProjectsTable from './ProjectsTable';
import SearchField from './SearchField';

class ProjectsPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      pending: false,
      error: null,
      projectSearchQuery: '',
      projects: []
    }
  }

  refresh() {
    this.updateProjects();
  }

  componentDidMount() {
    this.updateProjects();
  }
  
  componentDidUpdate(prevProps, prevState) {
    const {pending, error} = this.state;
    const {onStatusChanged} = this.props;
    const pendingChanged = pending !== prevState.pending;
    const errorChanged = error !== prevState.error;
    if (pendingChanged || errorChanged) {
      if (pending) {
        onStatusChanged('pending');
      }
      else if (error) {
        onStatusChanged('failed');
      }
      else {
        onStatusChanged('ready');
      }
    }
  }

  async updateProjects() {
    const { apiRoot } = this.props;
    this.setState({pending: true})
    const response = await fetch(`${apiRoot}/data`)
    if (response.ok) {
      try {
        const projects = await response.json();
        if (!projects || !Array.isArray(projects)) {
          throw new Error('Received invalid response');
        }
        this.setState({
          projects,
          pending: false,
          error: null
        });
      } catch(err) {
          this.setState({
            pending: false,
            error: `Failed to parse response`
          });
      }
    }
    else {
      this.setState({
        pending: false,
        error: 'Failed to fetch projects'
      });
    }
  }

  handleOnSearchValueChanged(value) {
    this.setState({ projectSearchQuery: value});
  }

  render() {
    const { classes } = this.props;
    const { projects } = this.state;
    return (
      <Grid container className={classes.pageRoot}>
        <Grid item xs={12}>
          <SearchField
            onValueChanged={(value) => this.handleOnSearchValueChanged(value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.tableRoot}>
            <ProjectsTable
              projects={projects}
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
  onStatusChanged: PropTypes.func.isRequired
};

export default withStyles(styles)(ProjectsPage);
