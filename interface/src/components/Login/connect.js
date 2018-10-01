import { connect } from 'react-redux';
import { getUserId } from 'state_management/actions/admin';
import Login from './Login';

const stateToProps = state => ({
  userId: state.adminReducer.userId,
  pendingReq: state.adminReducer.pendingReq,
});

const dispatchToProps = {
  getUserId,
};

const ConnectedComponent = connect(
  stateToProps,
  dispatchToProps,
)(Login);

export default ConnectedComponent;
