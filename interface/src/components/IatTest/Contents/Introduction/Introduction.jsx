import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import constants from 'app_constants';
import RaisedButton from 'material-ui/RaisedButton';
import breaks from 'remark-breaks';
import CircularProgress from 'material-ui/CircularProgress';
import ReactMarkdown from 'react-markdown';
import { Container, Text } from './styles';


const Introduction = (props) => {
  const { testData, testState, introData, pendingReq} = props;
  const { getIntro, error, getTest, giveConsent, small } = props;

  const templateId = props.match.params.templateId;
  if (testState !== constants.testStates.intro) {
    return (<Redirect to={`/test/${templateId}`} />);
  }
  if (testData) {
    giveConsent();
  }

  if (error) {
    return <div> Error {JSON.stringify(error)}</div>;
  }

  if (!introData || pendingReq) {
    if (!pendingReq) {
      getIntro(templateId);
    }

    return <CircularProgress size={80} thickness={5} />;
  }

  return (
    <Container>
      <Text>
        <ReactMarkdown
          plugins={[breaks]}
          source={introData.text}
        />
      </Text>
      <div>
        <RaisedButton
          label={introData.button}
          onClick={() => getTest(templateId, small)}
          primary
        />
      </div>
    </Container>
  );
};

Introduction.propTypes = {
  testState: PropTypes.number.isRequired,
  introData: PropTypes.shape({
    text: PropTypes.string,
    button: PropTypes.string,
  }),
  pendingReq: PropTypes.bool.isRequired,
  getIntro: PropTypes.func.isRequired,
  getTest: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      templateId: PropTypes.string,
    }),
  }),
};

Introduction.defaultProps = {
  introData: null,
  match: { params: { templateId: null } },
};

export default Introduction;
