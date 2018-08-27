import React from 'react';
import PropTypes from 'prop-types';
import constants from 'app_constants';

import { Nothing } from 'base_styles';
import { Container } from './styles';
import { Cell } from './';

const Header = (props) => {
  const { error, testState, small } = props;
  const show = !error && testState === constants.testStates.tasks;

  if (!show) {
    return <Nothing />;
  }

  return (
    <Container>
      <Cell left small={small} />
      <Cell small={small} />
    </Container>
  );
};

Header.propTypes = {
  testState: PropTypes.number.isRequired,
  small: PropTypes.bool,
};

Header.defaultProps = {
  small: false,
};
export default Header;
