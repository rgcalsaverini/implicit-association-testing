import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Result from './Result';

const states = state => ({
  resultData: state.testReducer.resultData,
});

const dispatches = {
};

export default withRouter(connect(
  states,
  dispatches,
)(Result));
