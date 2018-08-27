import { connect } from 'react-redux';
import IatTest from './IatTest';

const stateToProps = state => ({
  introData: state.testReducer.introData,
  obtainedConsent: state.testReducer.obtainedConsent,
  testData: state.testReducer.testData,
  taskNumber: state.testReducer.taskNumber,
  testState: state.testReducer.testState,
  small: state.uiReducer.small,
});

const dispatchToProps = {
};

const ConnectedComponent = connect(
  stateToProps,
  dispatchToProps,
)(IatTest);

export default ConnectedComponent;
