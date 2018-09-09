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
  renderText,
  renderCurrency,
  renderDate,
  renderNumber
} from './helpers'

const HeaderTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14
  },
}))(TableCell);

const BodyTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    whiteSpace: 'nowrap'
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
            <HeaderTableCell numeric>Project</HeaderTableCell>
            <HeaderTableCell>Description</HeaderTableCell>
            <HeaderTableCell>Start Date</HeaderTableCell>
            <HeaderTableCell numeric>Savings Amount</HeaderTableCell>
            <HeaderTableCell>Currency</HeaderTableCell>
            <HeaderTableCell>Complexity</HeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project, index) => (
            <TableRow className={classes.tableRow} key={index}>

              <BodyTableCell component='th' scope='row'>
                {renderText(project.responsible)}
              </BodyTableCell>

              <BodyTableCell>
                {renderText(project.category)}
              </BodyTableCell>

              <BodyTableCell numeric>
                {renderNumber(project.project)}
              </BodyTableCell>

              <BodyTableCell>
                {renderText(project.description)}
              </BodyTableCell>

              <BodyTableCell>
                {renderDate(project['start date'])}
              </BodyTableCell>

              <BodyTableCell numeric>
                {renderCurrency(project['savings amount'])}
              </BodyTableCell>

              <BodyTableCell>
                {renderText(project.currency)}
              </BodyTableCell>

              <BodyTableCell>
                {renderText(project.complexity)}
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