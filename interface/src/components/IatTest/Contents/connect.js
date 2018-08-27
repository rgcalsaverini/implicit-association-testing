import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Contents from './Contents';

const states = state => ({
  testState: state.testReducer.testState,
});

const dispatches = {};

export default withRouter(connect(
  states,
  dispatches,
)(Contents));
