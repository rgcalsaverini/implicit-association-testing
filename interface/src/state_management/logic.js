import { createLogic } from 'redux-logic';
import getNow from './utils';
import { sendResults } from './actions';

const categorizeItem = createLogic({
  type: 'CATEGORIZE_ITEM',
  latest: true,
  processOptions: {
    dispatchReturn: false,
  },
  process({ getState, action }, dispatch, done) {
    const state = getState().testReducer;

    if (!state.testData) {
      dispatch({ type: 'CATEGORIZE_ITEM_FAIL', error: true });
    }

    const task = state.testData.tasks[state.taskNumber];
    const item = task.items[state.itemNumber];
    const finishedTask = state.itemNumber >= task.items.length - 1;
    const finishedTest = state.taskNumber >= state.testData.tasks.length - 1;
    const side = action.side;

    if (item.side !== side) {
      if (!state.mistake) {
        dispatch({ type: 'CATEGORY_MISTAKE' });
      } else {
        dispatch();
      }
    } else {
      const duration = getNow() - state.lastWordChange;
      if (finishedTask) {
        const newResult = {
          duration: state.curentDuration + duration,
          mistakes: state.curentMistakes,
        };

        if (finishedTest) {
          if (state.pendingReq) {
            dispatch(
              sendResults(
                state.testData.id,
                { results: [...state.results, newResult] },
              ),
            );
          }
        } else {
          dispatch({ type: 'NEXT_TASK', newResult });
        }
      } else {
        dispatch({ type: 'HIDE_ITEM', side, duration });
        dispatch(d => (
          window.setTimeout(
            () => d({ type: 'NEXT_ITEM' }),
            350,
          )
        ));
      }
    }

    done();
  },
});

export default [
  categorizeItem,
];
