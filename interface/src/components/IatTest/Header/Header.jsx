import React from 'react';
import PropTypes from 'prop-types';
import { Nothing } from 'base_styles';
import { Container } from './styles';
import { Cell } from './';

const Header = (props) => {
  const { error, testStarted, testData } = props;
  const show = !error && testStarted && testData;

  if (!show) {
    return <Nothing />;
  }

  return (
    <Container>
      <Cell left />
      <Cell />
    </Container>
  );
};

Header.propTypes = {
  testStarted: PropTypes.bool.isRequired,
};

export default Header;
