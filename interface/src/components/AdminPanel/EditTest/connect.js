import { connect } from 'react-redux';
import { setTestEdit, getTestConfigs, saveTestConfigs } from 'state_management/actions/admin';
import EditTest from './EditTest';

const stateToProps = state => ({
  testConfig: state.adminReducer.testConfig,
  editingTest: state.adminReducer.editingTest,
  pendingReq: state.adminReducer.pendingReq,
});

const dispatchToProps = {
  setTestEdit,
  getTestConfigs,
  saveTestConfigs,
};

const ConnectedComponent = connect(
  stateToProps,
  dispatchToProps,
)(EditTest);

export default ConnectedComponent;
