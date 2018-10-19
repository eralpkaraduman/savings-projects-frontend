import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';

class ProjectDataDialog extends Component {
  render() {
    const {data} = this.props;
    const closed = !data;

    return (
      <Dialog
        open={!closed}
      >
        <pre>
          {
            JSON.stringify(data, null, 2)
          }
        </pre>
      </Dialog>
    );
  }
}

ProjectDataDialog.propTypes = {
  data: PropTypes.object,
};

export default ProjectDataDialog;
