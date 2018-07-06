import React from 'react';
import PropTypes from 'prop-types';
import { Nothing } from 'base_styles';
import { Container } from './styles';
import { Cell } from './';

const Header = (props) => {
  const { error, testStarted, testData, small } = props;
  const show = !error && testStarted && testData;

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
  testStarted: PropTypes.bool.isRequired,
  small: PropTypes.bool,
};

Header.defaultProps = {
  small: false,
};
export default Header;
