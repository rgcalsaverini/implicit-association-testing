import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTest, categorizeItem, startTask } from 'state_management/actions/test';
import Task from './Task';

const states = state => ({
  error: state.testReducer.error,
  hideSide: state.testReducer.hideSide,
  itemNumber: state.testReducer.itemNumber,
  mistake: state.testReducer.mistake,
  pendingReq: state.testReducer.pendingReq,
  showInstructions: state.testReducer.showInstructions,
  taskNumber: state.testReducer.taskNumber,
  testData: state.testReducer.testData,
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
