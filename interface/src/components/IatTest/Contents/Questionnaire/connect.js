import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAnswer, changeQuestion, getTest, closePopup } from 'state_management/actions/test';
import Questionnaire from './Questionnaire';

const states = state => ({
  activeQuestion: state.testReducer.activeQuestion,
  answers: state.testReducer.answers,
  closedPopups: state.testReducer.closedPopups,
  pendingReq: state.testReducer.pendingReq,
  questionnaireId: state.testReducer.questionnaireId,
  questionReady: state.testReducer.questionReady,
  testData: state.testReducer.testData,
  testState: state.testReducer.testState,
  small: state.uiReducer.small,
});

const dispatches = {
  setAnswer,
  changeQuestion,
  getTest,
  closePopup,
};

export default withRouter(connect(
  states,
  dispatches,
)(Questionnaire));
