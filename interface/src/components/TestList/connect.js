import { connect } from 'react-redux';
import { getTestList } from 'state_management/actions/test';
import TestList from './TestList';
import { withRouter } from 'react-router-dom';

const stateToProps = state => ({
  availableTests: state.testReducer.availableTests,
  pendingReq: state.testReducer.pendingReq,
});

const dispatchToProps = {
  getTestList,
};

const ConnectedComponent = withRouter(connect(
  stateToProps,
  dispatchToProps,
)(TestList));

export default ConnectedComponent;
