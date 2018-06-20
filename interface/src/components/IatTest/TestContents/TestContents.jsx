import React from 'react';
import PropTypes from 'prop-types';
// import { Footer, Container, Inner, Header } from './styles';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Consent, Test } from './';

const TestContents = (props) => {
  const { testStarted, obtainedConsent } = props;
  const templateId = props.match.params.templateId;

  return (
    <Switch>
      <Route path="/test/:templateId/consent" component={Consent} />
      {(!testStarted && !obtainedConsent &&
        <Redirect to={`/test/${templateId}/consent`} />
      ) || undefined}
      {(obtainedConsent &&
        <Route path="/test/:templateId" component={Test} />
      ) || undefined}
        Error
    </Switch>
  );
};

TestContents.defaultProps = {
  match: { params: { templateId: null } },
};

TestContents.propTypes = {
  testStarted: PropTypes.bool.isRequired,
  obtainedConsent: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      templateId: PropTypes.string,
    }),
  }),
};

export default TestContents;
