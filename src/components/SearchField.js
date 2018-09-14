import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';

import styles from '../styles';

class SearchField extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={ classes.searchContainer }>
          <div className={ classes.search }>
            <div className={ classes.searchIcon }>
              <SearchIcon />
            </div>
            <Input
              fullWidth
              placeholder="Search…"
              disableUnderline
              classes={ {
                root: classes.searchInputRoot,
                input: classes.searchInputInput,
              } }
            />
          </div>
      </Paper>
    );
  }
}

SearchField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchField);
