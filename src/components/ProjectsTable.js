import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import styles from '../styles';
import {
  renderCurrency
} from './helpers'

const HeaderTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const BodyTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class ProjectsTable extends Component {
  render() {
    const {classes, projects} = this.props;
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <HeaderTableCell>Responsible</HeaderTableCell>
            <HeaderTableCell>Category</HeaderTableCell>
            <HeaderTableCell>Project</HeaderTableCell>
            <HeaderTableCell>Description</HeaderTableCell>
            <HeaderTableCell>Start Date</HeaderTableCell>
            <HeaderTableCell>Savings Amount</HeaderTableCell>
            <HeaderTableCell>Currency</HeaderTableCell>
            <HeaderTableCell>Complexity</HeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project, index) => (
            <TableRow className={classes.row} key={index}>

              <BodyTableCell component='th' scope='row'>
                {project.responsible}
              </BodyTableCell>

              <BodyTableCell>
                {project.category}
              </BodyTableCell>

              <BodyTableCell numeric>
                {project.project}
              </BodyTableCell>

              <BodyTableCell>
                {project.description}
              </BodyTableCell>

              <BodyTableCell>
                {project['start date']}
              </BodyTableCell>

              <BodyTableCell numeric>
                {project['savings amount']}
              </BodyTableCell>

              <BodyTableCell>
                {renderCurrency(project.currency)}
              </BodyTableCell>

              <BodyTableCell>
                {project.complexity}
              </BodyTableCell>

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