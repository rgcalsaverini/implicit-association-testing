import React from 'react';
import PropTypes from 'prop-types';
// import { Footer, Container, Inner, Header } from './styles';

const Test = (props) => {
  const { pendingReq, testStarted, testData, startTest, error } = props;
  const templateId = props.match.params.templateId;

  if (error) {
    return <div> Error {JSON.stringify(error)}</div>;
  }

  if (!testStarted) {
    if (!pendingReq) {
      startTest(templateId);
    }
    return <div> Waiting Test start </div>;
  }
  return (
    <div>
      Test
    </div>
  );
};

Test.propTypes = {
  pendingReq: PropTypes.bool.isRequired,
  testStarted: PropTypes.bool.isRequired,
  startTest: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      templateId: PropTypes.string,
    }),
  }),
};

Test.defaultProps = {
  match: { params: { templateId: null } },
};

export default Test;
