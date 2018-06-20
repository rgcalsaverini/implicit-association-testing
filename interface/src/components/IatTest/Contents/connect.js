import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Contents from './Contents';

const states = state => ({
  obtainedConsent: state.testReducer.obtainedConsent,
  testStarted: state.testReducer.testStarted,
  gotResults: state.testReducer.gotResults,
  error: state.testReducer.error,
});

const dispatches = {};

export default withRouter(connect(
  states,
  dispatches,
)(Contents));
