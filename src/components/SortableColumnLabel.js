import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { darken } from '@material-ui/core/styles/colorManipulator';

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

export default SortableColumnLabel;