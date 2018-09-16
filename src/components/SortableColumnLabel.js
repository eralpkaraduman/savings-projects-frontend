import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { darken } from '@material-ui/core/styles/colorManipulator';

const StyledTableSortLabel = withStyles(theme => ({
  active: {
    color: 'inherit',
    opacity: 1,
  },
  root: {
    '&:hover': {
      color: darken(theme.palette.common.white, 0.5),
    },
    '&:focus': {
      color: darken(theme.palette.common.white, 0.5),
    },
  },
  icon: {
    opacity: 0,
  },
}))(TableSortLabel);

function SortableColumnLabel(props) {
  const {
    id,
    onSortRequested,
    children,
    active,
    descending,
  } = props;

  return (
    <Tooltip
      title={`Sort By: ${id}`}
      placement="bottom-start"
      enterDelay={200}
    >
      <StyledTableSortLabel
        active={active}
        direction={descending ? 'desc' : 'asc'}
        onClick={() => onSortRequested(id, !descending)}
      >
        {children}
      </StyledTableSortLabel>
    </Tooltip>
  );
}

SortableColumnLabel.propTypes = {
  id: PropTypes.string.isRequired,
  onSortRequested: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  descending: PropTypes.bool.isRequired,
};

export default SortableColumnLabel;
