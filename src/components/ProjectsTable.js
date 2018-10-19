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

  componentDidUpdate(prevProps, prevState) {
    const { projects: nextProjects } = this.props;
    const { projects: prevProjects } = prevProps;
    const projectsChanged = nextProjects !== prevProjects;

    const { sortOrder: nextSortOrder } = this.state;
    const { sortOrder: prevSortOrder } = prevState;
    const sortOrderChanged = String(nextSortOrder) !== String(prevSortOrder);

    const [firstKeyInSortOrder] = nextSortOrder;
    const { stateDirectionKey: firstDirectionKey } = SortableProjectKeys[firstKeyInSortOrder];

    const { [firstDirectionKey]: isDescending } = this.state;
    const { [firstDirectionKey]: wasDescending } = prevState;

    const sortDirectionChanged = isDescending !== wasDescending;

    // deciding if table needs to be sorted
    if (projectsChanged || sortOrderChanged || sortDirectionChanged) {
      const sortComperators = nextSortOrder.map((key) => {
        const { stateDirectionKey, comperator } = SortableProjectKeys[key];
        const { [stateDirectionKey]: descending } = this.state;
        return comperator(key, descending);
      });

      // sorting happens here
      const newSortedProjects = sortListByComparators(sortComperators, nextProjects);
      // suppressing eslint warning, safe to update only when sorting was necessary
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ sortedProjects: newSortedProjects });
    }
  }

  handleOnSortById(projectDataKey, descending) {
    const { sortOrder: newSortOrder } = this.state;
    const { stateDirectionKey } = SortableProjectKeys[projectDataKey];
    // moving last clicked sort column property to begining of the sorting order list
    newSortOrder.sort(key => key !== projectDataKey);
    this.setState({
      sortOrder: newSortOrder,
      [stateDirectionKey]: descending,
    });
  }

  handleRowClick(rowIndex) {
    const { sortedProjects } = this.state;
    const { onRowClick } = this.props;
    const projectData = sortedProjects[rowIndex];
    onRowClick(projectData);
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
            // project items do not have any unique identifiers so we'll have to use map index
            // eslint-disable-next-line react/no-array-index-key
            <TableRow className={classes.tableRow} key={index} onClick={() => this.handleRowClick(index)}>

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
  onRowClick: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(ProjectsTable);
