import { fade } from '@material-ui/core/styles/colorManipulator';

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
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    margin: 0,
    marginLeft: -2,
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
    overflowX: 'auto',
  },
  searchInputRoot: {
    color: 'inherit',
    width: '100%',
  },
  searchInputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: 30,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  }
});

export default styles;
