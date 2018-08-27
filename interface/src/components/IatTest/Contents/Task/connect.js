import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTest, categorizeItem, startTask } from 'state_management/actions/test';
import Task from './Task';

const states = state => ({
  pendingReq: state.testReducer.pendingReq,
  testData: state.testReducer.testData,
  taskNumber: state.testReducer.taskNumber,
  itemNumber: state.testReducer.itemNumber,
  error: state.testReducer.error,
  mistake: state.testReducer.mistake,
  hideSide: state.testReducer.hideSide,
  showInstructions: state.testReducer.showInstructions,
  small: state.uiReducer.small,
});

const dispatches = {
  getTest,
  categorizeItem,
  startTask,
};

export default withRouter(connect(
  states,
  dispatches,
)(Task));
