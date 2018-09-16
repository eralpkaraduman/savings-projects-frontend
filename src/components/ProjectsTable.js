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
  sortListByComparators,
} from './helpers';

const sortComperatorsForProps = { // TODO: rename prop to something else
  project: numberValueComparator,
  'start date': dateValueComparator,
};

const sortDirectionsForProps = { // TODO: rename prop to something else
  project: 'sortedByProjectDescending',
  'start date': 'sortedByStartDateDescending',
};

class ProjectsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedProjects: [],
      sortOrder: ['project', 'start date'],
      sortedByProjectDescending: true,
      sortedByStartDateDescending: true,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const { projects: nextProjects } = nextProps;
    const { projects: prevProjects } = this.props;
    const projectsChanged = nextProjects !== prevProjects;

    const { sortOrder: nextSortOrder } = nextState;
    const { sortOrder: prevSortOrder } = this.state;
    const sortOrderChanged = String(nextSortOrder) !== String(prevSortOrder);

    const [firstSortOrderProp] = nextState.sortOrder; // TODO: rename prop to something else
    // TODO: rename prop to something else
    const { [sortDirectionsForProps[firstSortOrderProp]]: isDescending } = nextState;
    // TODO: rename prop to something else
    const { [sortDirectionsForProps[firstSortOrderProp]]: wasDescending } = this.state;

    const sortDirectionChanged = isDescending !== wasDescending;

    if (projectsChanged || sortOrderChanged || sortDirectionChanged) {
      // sorting happens here
      const sortComperators = nextState.sortOrder.map((prop) => {
        // TODO: rename prop to something else
        const descending = nextState[sortDirectionsForProps[prop]];
        // TODO: rename prop to something else
        const comperator = sortComperatorsForProps[prop]; // TODO: rename prop to something else
        return comperator(prop, descending); // TODO: rename prop to something else
      });

      this.setState({
        sortedProjects: sortListByComparators(sortComperators, nextProps.projects),
      });
    }
  }

  handleOnSortById(prop, descending) { // TODO: rename prop to something else
    // moving last clicked sort column property to begining of the sorting order list
    const { sortOrder: newSortOrder } = this.state;
    newSortOrder.sort(a => a !== prop); // TODO: rename prop to something else
    this.setState({
      sortOrder: newSortOrder,
      [sortDirectionsForProps[prop]]: descending, // TODO: rename prop to something else
    });
  }

  render() {
    const { classes } = this.props;
    const {
      sortedByProjectDescending,
      sortedByStartDateDescending,
      sortedProjects,
    } = this.state;

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>

            <StyledTableCell numeric>
              <SortableColumnLabel
                id="project"
                active
                descending={sortedByProjectDescending}
                onSortRequested={(id, descending) => this.handleOnSortById(id, descending)}
              >
                Project
              </SortableColumnLabel>
            </StyledTableCell>

            <StyledTableCell>
              <SortableColumnLabel
                id="start date"
                active
                descending={sortedByStartDateDescending}
                onSortRequested={(id, descending) => this.handleOnSortById(id, descending)}
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
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(ProjectsTable);
