import getNow from 'state_management/utils';

const reducer = (state = {
  testStarted: false,
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
}, action) => {
  const response = action.payload || {};
  const errorResponse = (action.error && action.error.response) || {};

  switch (action.type) {
    case 'GIVE_CONSENT':
      return {
        ...state,
        obtainedConsent: true,
      };
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
    case 'START_TEST':
      return {
        ...state,
        pendingReq: true,
        error: null,
        testData: null,
      };
    case 'START_TEST_SUCCESS':
      return {
        ...state,
        pendingReq: true,
        testStarted: true,
        testData: response.data,
        lastWordChange: getNow(),
      };
    case 'START_TEST_FAIL':
      return {
        ...state,
        pendingReq: true,
        testStarted: true,
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
        testStarted: false,
      };
    case 'SEND_RESULTS_SUCCESS':
      return {
        ...state,
        pendingReq: false,
        resultData: response.data,
        gotResults: true,
      };
    case 'SEND_RESULTS_FAIL':
      return {
        ...state,
        pendingReq: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
