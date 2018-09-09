import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

class ProjectsPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={12}>
                Hang on..
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

ProjectsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectsPage);
