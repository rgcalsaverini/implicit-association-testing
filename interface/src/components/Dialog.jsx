import React from 'react';
import PropTypes from 'prop-types';
import MUIDialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const Dialog = (props) => {
  const { open, onClose, children } = props;

  return (
    <div>
      <MUIDialog
        modal
        actions={[
          <FlatButton
            label="Continue"
            primary
            onClick={onClose}
          />,
        ]}
        style={{
          width: '130vw',
          left: '-15vw',
        }}
        contentStyle={{
          witdh: '100%',
          maxWidth: '900px',
          margin: '0 auto',
        }}
        open={open}
      >
        {children}
      </MUIDialog>
    </div>
  );
};

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
};

Dialog.defaultProps = {
  open: false,
  children: [],
};

export default Dialog;
