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
  numberValueComparator,
  dateValueComparator,
  sortListByComparators
} from './helpers'

const sortComperatorsForProps = {
  'project': numberValueComparator,
  'start date': dateValueComparator
}

const sortDirectionsForProps = {
  'project': 'sortedByProjectDescending',
  'start date': 'sortedByStartDateDescending'
}

class ProjectsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sortedProjects: [],
      sortOrder: ['project', 'start date'],
      sortedByProjectDescending: true,
      sortedByStartDateDescending: true
    }
  }

  handleOnSortById(prop, descending) {
    // moving last clicked sort column property to begining of the sorting order list
    const sortOrder = [...this.state.sortOrder]; // needs to be mutated
    sortOrder.sort(a => a !== prop);

    this.setState({
      sortOrder,
      [sortDirectionsForProps[prop]]: descending
    });
  }

  componentWillUpdate(nextProps, nextState) {
    const projectsChanged = nextProps.projects !== this.props.projects;

    const sortOrderChanged = String(nextState.sortOrder) !== String(this.state.sortOrder);

    const [firstSortOrderProp] = nextState.sortOrder;
    const wasFirstOrderDescending = this.state[sortDirectionsForProps[firstSortOrderProp]];
    const isFirstOrderDescending = nextState[sortDirectionsForProps[firstSortOrderProp]];
    const sortDirectionChanged = isFirstOrderDescending !== wasFirstOrderDescending;

    if (projectsChanged || sortOrderChanged || sortDirectionChanged) {
      // sorting happens here
      const sortComperators = nextState.sortOrder.map(prop => {
        const descending = nextState[sortDirectionsForProps[prop]];
        const comperator = sortComperatorsForProps[prop];
        return comperator(prop, descending);
      });

      this.setState({
        sortedProjects: sortListByComparators(sortComperators, nextProps.projects)
      });
    }
  }

  render() {
    const {classes} = this.props;
    const {
      sortedByProjectDescending,
      sortedByStartDateDescending,
      sortedProjects
    } = this.state;

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>

            <StyledTableCell numeric>
              <SortableColumnLabel
                id='project'
                active
                descending={ sortedByProjectDescending }
                onSortRequested={ (id, descending) => this.handleOnSortById(id, descending)}
              >
                Project
              </SortableColumnLabel>
            </StyledTableCell>

            <StyledTableCell>
              <SortableColumnLabel
                id='start date'
                active
                descending={ sortedByStartDateDescending }
                onSortRequested={ (id, descending) => this.handleOnSortById(id, descending) }
              >
                Start Date
              </SortableColumnLabel>
            </StyledTableCell>

            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Responsible</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell numeric>Savings Amount</StyledTableCell>
            <StyledTableCell>Currency</StyledTableCell>
            <StyledTableCell>Complexity</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedProjects.map((project, index) => (
            <TableRow className={classes.tableRow} key={index}>

              <StyledTableCell numeric>
                {renderNumber(project.project)}
              </StyledTableCell>

              <StyledTableCell>
                {renderDate(project['start date'])}
              </StyledTableCell>

              <StyledTableCell>
                {renderText(project.description)}
              </StyledTableCell>

              <StyledTableCell>
                {renderText(project.responsible)}
              </StyledTableCell>

              <StyledTableCell>
                {renderText(project.category)}
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
