import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect, Route } from 'react-router-dom';
import constants from 'app_constants';
import Introduction from './Introduction';
import Task from './Task';
import Result from './Result';
import Questionnaire from './Questionnaire';


const Contents = (props) => {
  const { testState } = props;
  const templateId = props.match.params.templateId;
  let stateRoute;
  let stateRedirect;

  if (testState === constants.testStates.result) {
    stateRedirect = <Redirect to={`/test/${templateId}/result`} />;
    stateRoute = <Route path="/test/:templateId/result" component={Result} />;
  } else if (testState === constants.testStates.quest_1 || testState === constants.testStates.quest_2) {
    stateRedirect = <Redirect to={`/test/${templateId}/questionnaire`} />;
    stateRoute = <Route path="/test/:templateId/questionnaire" component={Questionnaire} />;
  } else if (testState === constants.testStates.tasks) {
    stateRoute = <Route path="/test/:templateId" component={Task} />;
  } else {
    stateRedirect = <Redirect to={`/test/${templateId}/consent`} />;
    stateRoute = <Route path="/test/:templateId/consent" component={Introduction} />;
  }

  return (
    <Switch>
      {stateRoute}
      {stateRedirect}
      Error
    </Switch>
  );
};

Contents.defaultProps = {
  match: { params: { templateId: null } },
};

Contents.propTypes = {
  testState: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      templateId: PropTypes.string,
    }),
  }),
};

export default Contents;
