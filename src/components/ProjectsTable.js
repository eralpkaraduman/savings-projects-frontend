import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import styles from '../styles';
import StyledTableCell from './StyledTableCell';
import SortableColumnLabel from './SortableColumnLabel';
import {
  renderText,
  renderCurrency,
  renderDate,
  renderNumber,
  sortProjectsBy
} from './helpers'

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
            <StyledTableCell>Category</StyledTableCell>
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

              <StyledTableCell>
                {renderText(project.responsible)}
              </StyledTableCell>

              <StyledTableCell numeric>
                {renderNumber(project.project)}
              </StyledTableCell>

              <StyledTableCell>
                {renderText(project.category)}
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