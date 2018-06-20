import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Footer,
  Container,
  Inner,
  TitleContainer,
  Subtitle,
  LowerCell,
  ImgBg,
  LogoIff,
  TopContainer,
} from './styles';
import Contents from './Contents';
import Header from './Header';

const IatTest = (props) => {
  const { testStarted, error, testData, taskNumber, introData } = props;

  const isTesting = !error && testStarted && testData;
  let footer;

  if (isTesting) {
    footer = <Footer>{`Part ${taskNumber + 1} of ${testData.tasks.length}`}</Footer>;
  }

  return (
    <Container>
      <ImgBg />
      <TopContainer>
        <LogoIff src="/iff.svg" />
        <TitleContainer>
          <Subtitle> Implicit Association Testing </Subtitle>
          <div> {introData && introData.name} </div>
        </TitleContainer>
      </TopContainer>
      <LowerCell>
        <Inner started={testStarted}>
          <Header />
          <Contents />
          { footer }
        </Inner>
      </LowerCell>
    </Container>
  );
};

IatTest.propTypes = {
  testStarted: PropTypes.bool.isRequired,
};

IatTest.defaultProps = {
};

export default withRouter(IatTest);
