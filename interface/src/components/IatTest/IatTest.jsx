import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import constants from 'app_constants';

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
  const { error, testState, testData, taskNumber, introData, small } = props;
  const isTesting = !error && testState === constants.tasks;
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
          <Subtitle> {introData && introData.main_title} </Subtitle>
          <div> {introData && introData.name} </div>
        </TitleContainer>
      </TopContainer>
      <LowerCell small={small}>
        <Inner small={small} started={isTesting}>
          <LogoIffHeader src="/iff_lightbg.svg" hide={!small || isTesting} />
          <Header />
          <Contents />
          { footer }
        </Inner>
      </LowerCell>
    </Container>
  );
};

IatTest.propTypes = {
  testState: PropTypes.number.isRequired,
};

IatTest.defaultProps = {
};

export default withRouter(IatTest);
