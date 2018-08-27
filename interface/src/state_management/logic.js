import { createLogic } from 'redux-logic';
import constants from 'app_constants';
import getNow from './utils';
import { sendResults } from './actions/test';

const dispatchResults = (state, dispatch) => dispatch(
  sendResults(
    state.testData.id,
    {
      results: state.results,
      answers: state.answers,
    },
  ),
);

const consentGiven = createLogic({
  type: 'GIVE_CONSENT',
  latest: true,
  processOptions: {
    dispatchReturn: false,
    // dispatchMultiple: true,
  },
  process({ getState }, dispatch, done) {
    const testData = getState().testReducer.testData;

    if (testData.questionnaire && testData.questionnaire.start) {
      dispatch({ type: 'START_QUESTIONNAIRE_1' });
    } else {
      dispatch({ type: 'START_TEST' });
    }
    done();
  },
});

const changeQuestion = createLogic({
  type: 'CHANGE_QUESTION_CLICK',
  latest: true,
  processOptions: {
    dispatchReturn: false,
  },
  process({ getState, action }, dispatch, done) {
    const testState = getState().testReducer;

    if (!testState.testData.questionnaire || !testState.questionnaireId) {
      dispatch({ type: 'START_TEST' });
      done();
      return;
    }

    const questionnaire = testState.testData.questionnaire[testState.questionnaireId];
    const activeQuestion = testState.activeQuestion;
    const newQuestion = activeQuestion + action.value;
    if (newQuestion >= questionnaire.length) {
      if (testState.questionnaireId === 'start') {
        dispatch({ type: 'START_TEST' });
      } else if (testState.questionnaireId === 'end') {
        dispatchResults(testState, dispatch);
      }
    } else if (newQuestion >= 0) {
      dispatch({
        type: 'CHANGE_QUESTION',
        value: action.value,
        discardAnswer: action.discardAnswer,
      });
    }

    done();
  },
});

const categorizeItem = createLogic({
  type: 'CATEGORIZE_ITEM',
  latest: true,
  processOptions: { dispatchReturn: false },
  process({ getState, action }, dispatch, done) {
    const state = getState().testReducer;
    const isTesting = state.testState === constants.testStates.tasks;

    if (!state.testData || state.showInstructions || !isTesting) {
      dispatch({ type: 'CATEGORIZE_ITEM_FAIL', error: true });
      done();
      return;
    }
    const task = state.testData.tasks[state.taskNumber];
    const item = task.items[state.itemNumber];
    const finishedTask = state.itemNumber >= task.items.length - 1;
    const lastTask = state.taskNumber >= state.testData.tasks.length - 1;
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

        dispatch({ type: 'NEXT_TASK', newResult });

        if (lastTask) {
          if (state.testData.questionnaire && state.testData.questionnaire.start) {
            dispatch({ type: 'NEXT_TASK', newResult });
            dispatch({ type: 'START_QUESTIONNAIRE_2' });
          } else if (!state.pendingReq) {
            dispatchResults(state, dispatch);
          }
        }
      } else {
        dispatch({ type: 'HIDE_ITEM', side, duration });
        dispatch(d => (
          window.setTimeout(
            () => d({ type: 'NEXT_ITEM' }),
            constants.wordSwitchDelay,
          )
        ));
      }
    }

    done();
  },
});

export default [
  categorizeItem,
  consentGiven,
  changeQuestion,
];
