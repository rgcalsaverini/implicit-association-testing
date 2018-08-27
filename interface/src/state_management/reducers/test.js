import getNow from 'state_management/utils';
import constants from 'app_constants';


const reducer = (state = {
  testState: constants.testStates.intro,
  introData: null,
  testData: null,
  obtainedConsent: false,
  pendingReq: false,
  error: null,
  taskNumber: 0,
  itemNumber: 0,
  mistake: false,
  curentDuration: 0,
  curentMistakes: 0,
  results: [],
  lastWordChange: 0,
  hideSide: null,
  showInstructions: true,
  gotResults: false,
  resultData: null,
  activeQuestion: null,
  questionnaireId: null,
  answers: {},
}, action) => {
  const response = action.payload || {};
  const errorResponse = (action.error && action.error.response) || {};

  switch (action.type) {
    case 'GET_INTRO':
      return {
        ...state,
        pendingReq: true,
        error: null,
        introData: null,
      };
    case 'GET_INTRO_SUCCESS':
      if (response.data && response.data.text && response.data.button) {
        return {
          ...state,
          pendingReq: false,
          introData: response.data,
        };
      }
      return {
        ...state,
        pendingReq: false,
        error: true,
      };
    case 'GET_INTRO_FAIL':
      return {
        ...state,
        pendingReq: false,
        error: errorResponse,
      };
    case 'GET_TEST':
      return {
        ...state,
        pendingReq: true,
        error: null,
        testData: null,
      };
    case 'GET_TEST_SUCCESS':
      return {
        ...state,
        pendingReq: false,
        testData: response.data,
      };
    case 'START_TEST':
      return {
        ...state,
        lastWordChange: getNow(),
        testState: constants.testStates.tasks,
        questionnaireId: null,
        activeQuestion: null,
      };
    case 'START_QUESTIONNAIRE_1':
      return {
        ...state,
        testState: constants.testStates.quest_1,
        activeQuestion: 0,
        questionnaireId: 'start',
        answers: { ...state.answers, start: {} },
      };
    case 'START_QUESTIONNAIRE_2': {
      console.log('START_QUESTIONNAIRE_2');
      return {
        ...state,
        testState: constants.testStates.quest_2,
        activeQuestion: 0,
        questionnaireId: 'end',
        answers: { ...state.answers, end: {} },
      };
    }
    case 'GET_TEST_FAIL':
      return {
        ...state,
        pendingReq: false,
        error: errorResponse,
      };
    case 'CATEGORY_MISTAKE':
      return {
        ...state,
        mistake: true,
        curentMistakes: state.curentMistakes + 1,
      };
    case 'HIDE_ITEM':
      return {
        ...state,
        mistake: false,
        curentDuration: state.curentDuration + action.duration,
        hideSide: action.side,
      };
    case 'NEXT_ITEM':
      return {
        ...state,
        itemNumber: state.itemNumber + 1,
        lastWordChange: getNow(),
        hideSide: null,
      };
    case 'NEXT_TASK':
      return {
        ...state,
        mistake: false,
        results: [...state.results, action.newResult],
        itemNumber: 0,
        curentDuration: 0,
        curentMistakes: 0,
        taskNumber: state.taskNumber + 1,
        hideSide: null,
        showInstructions: true,
      };
    case 'START_TASK':
      return {
        ...state,
        lastWordChange: getNow(),
        showInstructions: false,
      };
    case 'SEND_RESULTS':
      return {
        ...state,
        pendingReq: true,
        error: null,
      };
    case 'SEND_RESULTS_SUCCESS':
      return {
        ...state,
        pendingReq: false,
        resultData: response.data,
        gotResults: true,
        testState: constants.testStates.result,
      };
    case 'SEND_RESULTS_FAIL':
      return {
        ...state,
        pendingReq: false,
        error: true,
      };
    case 'SET_ANSWER': {
      const answers = { ...state.answers };
      const qidAnswers = { ...answers[state.questionnaireId] };
      qidAnswers[state.activeQuestion] = action.answer;
      answers[state.questionnaireId] = qidAnswers;
      return {
        ...state,
        answers,
      };
    }
    case 'CHANGE_QUESTION': {
      const answers = { ...state.answers };
      if (action.discardAnswer) {
        const qidAnswers = { ...answers[state.questionnaireId] };
        delete qidAnswers[state.activeQuestion];
        answers[state.questionnaireId] = qidAnswers;
      }
      return {
        ...state,
        answers,
        activeQuestion: state.activeQuestion + action.value,
      };
    }
    default:
      return state;
  }
};

export default reducer;
