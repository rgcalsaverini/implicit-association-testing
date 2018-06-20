import { connect } from 'react-redux';
import IatTest from './IatTest';
// import { getConsent } from '../../actions';

const stateToProps = state => ({
  testStarted: state.testReducer.testStarted,
  obtainedConsent: state.testReducer.consentData,
});

const dispatchToProps = {
  // getConsent,
};

const ConnectedComponent = connect(
  stateToProps,
  dispatchToProps,
)(IatTest);

export default ConnectedComponent;
