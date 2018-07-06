import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getIntro, giveConsent } from 'state_management/actions/test';
import Introduction from './Introduction';

const states = state => ({
  introData: state.testReducer.introData,
  obtainedConsent: state.testReducer.obtainedConsent,
  pendingReq: state.testReducer.pendingReq,
  error: state.testReducer.error,
});

const dispatches = {
  getIntro,
  giveConsent,
};

export default withRouter(connect(
  states,
  dispatches,
)(Introduction));
