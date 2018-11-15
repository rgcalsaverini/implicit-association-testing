import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FinalInfo from './FinalInfo';

const states = state => ({
  finalInfo: state.testReducer.finalInfo,
});

const dispatches = {
};

export default withRouter(connect(
  states,
  dispatches,
)(FinalInfo));
