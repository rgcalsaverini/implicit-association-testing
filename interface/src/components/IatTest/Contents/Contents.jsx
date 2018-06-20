import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect, Route } from 'react-router-dom';
import Introduction from './Introduction';
import Task from './Task';
import Result from './Result';


const Contents = (props) => {
  const { testStarted, obtainedConsent, gotResults } = props;
  const templateId = props.match.params.templateId;
  let introRedirect;
  let taskRoute;
  let resultRoute;
  let resultRedirect;

  if (gotResults) {
    introRedirect = <Redirect to={`/test/${templateId}/result`} />;
    resultRoute = <Route path="/test/:templateId/result" component={Result} />;
  } else if (!testStarted && !obtainedConsent) {
    resultRedirect = <Redirect to={`/test/${templateId}/consent`} />;
  }
  if (obtainedConsent) {
    taskRoute = <Route path="/test/:templateId" component={Task} />;
  }

  return (
    <Switch>
      <Route path="/test/:templateId/consent" component={Introduction} />
      {resultRoute}
      {resultRedirect}
      {introRedirect}
      {taskRoute}
      Error
    </Switch>
  );
};

Contents.defaultProps = {
  match: { params: { templateId: null } },
};

Contents.propTypes = {
  gotResults: PropTypes.bool.isRequired,
  testStarted: PropTypes.bool.isRequired,
  obtainedConsent: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      templateId: PropTypes.string,
    }),
  }),
};

export default Contents;
