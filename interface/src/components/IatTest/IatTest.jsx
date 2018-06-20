import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Footer, Container, Inner, Header } from './styles';
import TestKeyLabel from './TestKeyLabel';
import { TestContents } from './TestContents';

const IatTest = (props) => {
  const { testStarted, error, testData, taskNumber } = props;

  const isTesting = !error && testStarted;
  let footer;
  // if (isTesting) {
  //   footer = <Footer>{`Part ${taskNumber + 1} of ${testData.tasks.length}`}</Footer>;
  // }

  const header = (
    <Header>
      <TestKeyLabel left keyVal="e" groups={['Harry Potter']} />,
      <TestKeyLabel keyVal="i" groups={['Star Wars', 'Good']} />,
    </Header>
  );

  return (
    <Container>
      <Inner started={testStarted}>
        { isTesting ? header : undefined }
        <TestContents />
        { footer }
      </Inner>
    </Container>
  );
};

IatTest.propTypes = {
  testStarted: PropTypes.bool.isRequired,
};

IatTest.defaultProps = {
};

export default withRouter(IatTest);
