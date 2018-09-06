import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAnswer, changeQuestion, getTest } from 'state_management/actions/test';
import Questionnaire from './Questionnaire';

const states = state => ({
  testState: state.testReducer.testState,
  activeQuestion: state.testReducer.activeQuestion,
  questionnaireId: state.testReducer.questionnaireId,
  testData: state.testReducer.testData,
  answers: state.testReducer.answers,
  pendingReq: state.testReducer.pendingReq,
  questionReady: state.testReducer.questionReady,
  small: state.uiReducer.small,

});

const dispatches = {
  setAnswer,
  changeQuestion,
  getTest,
};

export default withRouter(connect(
  states,
  dispatches,
)(Questionnaire));
