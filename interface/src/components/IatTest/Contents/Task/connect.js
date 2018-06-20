import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { startTest, categorizeItem, startTask } from 'state_management/actions';
import Task from './Task';

const states = state => ({
  testStarted: state.testReducer.testStarted,
  pendingReq: state.testReducer.pendingReq,
  testData: state.testReducer.testData,
  taskNumber: state.testReducer.taskNumber,
  itemNumber: state.testReducer.itemNumber,
  error: state.testReducer.error,
  mistake: state.testReducer.mistake,
  hideSide: state.testReducer.hideSide,
  showInstructions: state.testReducer.showInstructions,
});

const dispatches = {
  startTest,
  categorizeItem,
  startTask,
};

export default withRouter(connect(
  states,
  dispatches,
)(Task));
