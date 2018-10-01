import { connect } from 'react-redux';
import { getTestList, setTestEdit } from 'state_management/actions/admin';
import TestList from './TestList';

const stateToProps = state => ({
  testList: state.adminReducer.testList,
  pendingReq: state.adminReducer.pendingReq,
});

const dispatchToProps = {
  getTestList,
  setTestEdit,
};

const ConnectedComponent = connect(
  stateToProps,
  dispatchToProps,
)(TestList);

export default ConnectedComponent;
