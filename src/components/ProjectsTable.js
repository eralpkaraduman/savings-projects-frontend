import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { darken } from '@material-ui/core/styles/colorManipulator';

import styles from '../styles';
import {
  renderText,
  renderCurrency,
  renderDate,
  renderNumber,
  sortProjectsBy
} from './helpers'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    whiteSpace: 'nowrap'
  },
  body: {
    fontSize: 14,
    whiteSpace: 'nowrap'
  },
}))(TableCell);

const StyledTableSortLabel = withStyles(theme => ({
  root: {
    '&:hover': {
      color: darken(theme.palette.common.white, 0.5)
    },
    '&:focus': {
      color: darken(theme.palette.common.white, 0.5)
    },
  },
  icon: {
    opacity: 1
  }
}))(TableSortLabel);

function SortableColumnLabel({id, onSortRequested, children, active, descending}) {
  return(
    <Tooltip
      title={`Sort By: ${id}`}
      placement={'bottom-start'}
      enterDelay={200}
    >
      <StyledTableSortLabel
        active={false}
        direction={descending ? 'desc' : 'asc'}
        onClick={() => onSortRequested(id, !descending)}
      >
        {children}
      </StyledTableSortLabel>
    </Tooltip>
  );
}

class ProjectsTable extends Component {
  state = {
    sortedById: 'project',
    sortedDescending: true
  }

  handleOnSortByProject(id, descending) {
    this.setState({
      sortedById: id,
      sortedDescending: descending
    })
  }

  render() {
    const {classes, projects} = this.props;
    const {sortedById, sortedDescending} = this.state;
    const sortedProjects = sortProjectsBy(sortedById, projects, sortedDescending);
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Responsible</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell numeric>
              <SortableColumnLabel
                id='project'
                active={sortedById === 'project'}
                descending={sortedDescending}
                onSortRequested={(...args) => this.handleOnSortByProject(...args)}
              >
                Project
              </SortableColumnLabel>
            </StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Start Date</StyledTableCell>
            <StyledTableCell numeric>Savings Amount</StyledTableCell>
            <StyledTableCell>Currency</StyledTableCell>
            <StyledTableCell>Complexity</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedProjects.map((project, index) => (
            <TableRow className={classes.tableRow} key={index}>

              <StyledTableCell component='th' scope='row'>
                {renderText(project.responsible)}
              </StyledTableCell>

              <StyledTableCell>
                {renderText(project.category)}
              </StyledTableCell>

              <StyledTableCell numeric>
                {renderNumber(project.project)}
              </StyledTableCell>

              <StyledTableCell>
                {renderText(project.description)}
              </StyledTableCell>

              <StyledTableCell>
                {renderDate(project['start date'])}
              </StyledTableCell>

              <StyledTableCell numeric>
                {renderCurrency(project['savings amount'])}
              </StyledTableCell>

              <StyledTableCell>
                {renderText(project.currency)}
              </StyledTableCell>

              <StyledTableCell>
                {renderText(project.complexity)}
              </StyledTableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

ProjectsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(ProjectsTable);