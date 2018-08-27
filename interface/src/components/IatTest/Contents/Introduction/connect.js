import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getIntro, getTest, giveConsent } from 'state_management/actions/test';
import Introduction from './Introduction';

const states = state => ({
  introData: state.testReducer.introData,
  testData: state.testReducer.testData,
  testState: state.testReducer.testState,
  pendingReq: state.testReducer.pendingReq,
  error: state.testReducer.error,
  small: state.testReducer.small,
});

const dispatches = {
  getIntro,
  getTest,
  giveConsent,
};

export default withRouter(connect(
  states,
  dispatches,
)(Introduction));
