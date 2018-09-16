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

const SortableProjectKeys = {
  project: {
    stateDirectionKey: 'sortedByProjectDescending',
    comperator: numberValueComparator,
  },
  'start date': {
    stateDirectionKey: 'sortedByStartDateDescending',
    comperator: dateValueComparator,
  },
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

    const [firstKeyInSortOrder] = nextState.sortOrder;
    const { stateDirectionKey: firstDirectionKey } = SortableProjectKeys[firstKeyInSortOrder];

    const { [firstDirectionKey]: isDescending } = nextState;
    const { [firstDirectionKey]: wasDescending } = this.state;

    const sortDirectionChanged = isDescending !== wasDescending;

    if (projectsChanged || sortOrderChanged || sortDirectionChanged) {
      // sorting happens here
      const sortComperators = nextState.sortOrder.map((key) => {
        const { stateDirectionKey, comperator } = SortableProjectKeys[key];
        const descending = nextState[stateDirectionKey];
        return comperator(key, descending);
      });

      this.setState({
        sortedProjects: sortListByComparators(sortComperators, nextProps.projects),
      });
    }
  }

  handleOnSortById(projectDataKey, descending) {
    const { sortOrder: newSortOrder } = this.state;
    const { stateDirectionKey } = SortableProjectKeys[projectDataKey];
    // moving last clicked sort column property to begining of the sorting order list
    // moving last clicked sort column property to begining of the sorting order list
    newSortOrder.sort(key => key !== projectDataKey);
    this.setState({
      sortOrder: newSortOrder,
      [stateDirectionKey]: descending,
    });
  }

  render() {
    const { classes } = this.props;
    const {
      sortedByProjectDescending,
      sortedByStartDateDescending,
      sortedProjects,
      sortOrder,
    } = this.state;

    const [firstSortOrderKey] = sortOrder;

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>

            <StyledTableCell numeric>
              <SortableColumnLabel
                id="project"
                active={firstSortOrderKey === 'project'}
                descending={sortedByProjectDescending}
                onSortRequested={(id, descending) => this.handleOnSortById(id, descending)}
              >
                Project
              </SortableColumnLabel>
            </StyledTableCell>

            <StyledTableCell>
              <SortableColumnLabel
                id="start date"
                active={firstSortOrderKey === 'start date'}
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
