import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getFinalInfo } from 'state_management/actions/test';
import Result from './Result';

const states = state => ({
  resultData: state.testReducer.resultData,
});

const dispatches = {
  getFinalInfo,
};

export default withRouter(connect(
  states,
  dispatches,
)(Result));
