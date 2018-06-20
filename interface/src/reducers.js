import { combineReducers } from 'redux';

const testReducer = (state = {
  testStarted: false,
  consentData: null,
  testData: null,
  obtainedConsent: false,
  pendingReq: false,
  error: null,
  taskNumber: 0,
}, action) => {
  const response = action.payload || {};
  const errorResponse = (action.error && action.error.response) || {};

  switch (action.type) {
    case 'GIVE_CONSENT':
      return { ...state, obtainedConsent: true };
    case 'GET_CONSENT':
      return { ...state, pendingReq: true, error: null, consentData: null };
    case 'GET_CONSENT_SUCCESS':
      if (response.data && response.data.text && response.data.button) {
        return { ...state, pendingReq: false, consentData: response.data };
      }
      return { ...state, pendingReq: false, error: true };
    case 'GET_CONSENT_FAIL':
      return { ...state, pendingReq: false, error: errorResponse };
    case 'START_TEST':
      return { ...state, pendingReq: true, error: null, testData: null };
    case 'START_TEST_SUCCESS':
      return { ...state, pendingReq: true, testStarted: true, testData: response.data };
    case 'START_TEST_FAIL':
      return { ...state, pendingReq: true, testStarted: true, error: errorResponse };
    default:
      return state;
  }
};

export default combineReducers({
  testReducer,
});
