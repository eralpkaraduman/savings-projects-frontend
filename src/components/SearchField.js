import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';

import styles from '../styles';

class SearchField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.inputValue !== this.state.inputValue) {
      this.props.onValueChanged(nextState.inputValue);
    }
  }
  
  handleOnClearClicked() {
    this.setState({ inputValue: '' });
  }

  handleOnInputChanged(event) {
    this.setState({ inputValue: event.target.value});
  }

  render() {
    const { classes } = this.props;
    const { inputValue } = this.state;
    const shouldDisplayClearButton = inputValue.length > 0;
    return (
      <Paper className={ classes.searchContainer }>
          <div className={ classes.search }>
            <div className={ classes.searchIcon }>
              <SearchIcon />
            </div>
            <Input
              fullWidth
              disableUnderline
              value={ inputValue}
              placeholder="Search…"
              onChange={ e => this.handleOnInputChanged(e)}
              classes={{
                root: classes.searchInputRoot,
                input: classes.searchInputInput,
              }}
            />
            { shouldDisplayClearButton &&
              <IconButton
                color="inherit"
                onClick={ () => this.handleOnClearClicked() }
                className={ classes.clearSearchButton }
              >
                <CancelIcon className={ classes.clearSearchButtonIcon } />
              </IconButton>
            }
          </div>
      </Paper>
    );
  }
}

SearchField.propTypes = {
  onValueChanged: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchField);
