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
    margin: 0,
    padding: theme.spacing.unit * 2,
    paddingTop: 0,
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
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  toolbarButtonIcon: {
    fontSize: 30,
  },
  leftToolbarItem: {
    marginLeft: -20,
    marginRight: 0,
  },
  rightToolbarItem: {
    marginLeft: 20,
    marginRight: -14,
  },
  search: {
    position: 'relative',
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: theme.spacing.unit * 2,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
  },
  searchInputRoot: {
    color: 'inherit',
    width: '100%',
  },
  searchInputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 2 + 30,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2 + 30,
    width: '100%',
  },
  clearSearchButton: {
    marginLeft: 'auto',
    width: 30,
    height: 30,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 2,
    top: 2,
  },
  clearSearchButtonIcon: {
    fontSize: 20,
  },
});

export default styles;
