import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

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

export default StyledTableCell;