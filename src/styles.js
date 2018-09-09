const minPageWidth = 650;
const pagePadding = 24;
const minTableWidth = minPageWidth - pagePadding * 2;

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 0,
    padding: 0,
  },
  pageRoot: {
    flexGrow: 1,
    paddingTop: 0,
    padding: 24,
    margin: 0,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  table: {
    minWidth: minTableWidth,
  },
  tableRoot: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

export default styles;
