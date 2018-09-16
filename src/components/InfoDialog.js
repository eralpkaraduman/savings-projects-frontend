import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class InfoDialog extends React.Component {
  render() {
    const { fullScreen, open, onCloseRequested } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => onCloseRequested()}
      >
        <DialogTitle id="responsive-dialog-title">About this site</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Hi!</p>
            <p>
              This project was made by Eralp Karaduman as a coding assignment on September 2016.
              Visit&nbsp;
              <a
                href="http://eralpkaraduman.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                eralpkaraduman.com
              </a>
              &nbsp;to learn about me.
            </p>
            <p>
              Open source at&nbsp;
              <a
                href="https://github.com/eralpkaraduman/savings-projects-frontend"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/eralpkaraduman/savings-projects-frontend
              </a>
            </p>
            <p>
              Built using create-react-app &amp; material-ui.
            </p>
            <p>
              Click the dismiss button below to close this message.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose()} color="primary">
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

InfoDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCloseRequested: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(InfoDialog);
