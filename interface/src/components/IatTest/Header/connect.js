import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CellUnconnected from './Cell';
import HeaderUnconnected from './Header';

const cellStates = state => ({
  testData: state.testReducer.testData,
  taskNumber: state.testReducer.taskNumber,
});

const headerStates = state => ({
  testData: state.testReducer.testData,
  testStarted: state.testReducer.testStarted,
  error: state.testReducer.error,
});


export default withRouter(connect(
  headerStates,
  {},
)(HeaderUnconnected));

export const Cell = withRouter(connect(
  cellStates,
  {},
)(CellUnconnected));
