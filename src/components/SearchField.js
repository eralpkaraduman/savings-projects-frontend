import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

class SearchField extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.tableRoot}>
        Search Field Will Be Here
      </Paper>
    );
  }
}

SearchField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchField);