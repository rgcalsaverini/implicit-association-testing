import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { categorizeItem } from 'state_management/actions/test';
import CellUnconnected from './Cell';
import HeaderUnconnected from './Header';

const cellStates = state => ({
  testData: state.testReducer.testData,
  taskNumber: state.testReducer.taskNumber,
  small: state.uiReducer.small,
});

const headerStates = state => ({
  testState: state.testReducer.testState,
  error: state.testReducer.error,
});


export default withRouter(connect(
  headerStates,
  {},
)(HeaderUnconnected));

export const Cell = withRouter(connect(
  cellStates,
  { categorizeItem },
)(CellUnconnected));
