import { connect } from 'react-redux';
import IatTest from './IatTest';

const stateToProps = state => ({
  testStarted: state.testReducer.testStarted,
  introData: state.testReducer.introData,
  obtainedConsent: state.testReducer.obtainedConsent,
  testData: state.testReducer.testData,
  taskNumber: state.testReducer.taskNumber,
});

const dispatchToProps = {
};

const ConnectedComponent = connect(
  stateToProps,
  dispatchToProps,
)(IatTest);

export default ConnectedComponent;
