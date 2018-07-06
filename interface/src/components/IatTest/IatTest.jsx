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
  LogoIffHeader,
  TopContainer,
} from './styles';
import Contents from './Contents';
import Header from './Header';


const IatTest = (props) => {
  const { testStarted, error, testData, taskNumber, introData, small } = props;
  const isTesting = !error && testStarted && testData;
  let footer;

  if (isTesting) {
    footer = <Footer>{`Part ${taskNumber + 1} of ${testData.tasks.length}`}</Footer>;
  }

  return (
    <Container>
      <ImgBg />
      <TopContainer small={small}>
        <LogoIff src="/iff.svg" />
        <TitleContainer>
          <Subtitle> Implicit Association Testing </Subtitle>
          <div> {introData && introData.name} </div>
        </TitleContainer>
      </TopContainer>
      <LowerCell small={small}>
        <Inner small={small} started={testStarted}>
          <LogoIffHeader src="/iff_lightbg.svg" hide={!small || testStarted} />
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
