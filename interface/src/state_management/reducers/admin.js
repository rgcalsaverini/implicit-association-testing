
const dataResult = (action, state, resKey) => {
  const response = action.payload || {};
  if (response.data) {
    const res = {
      ...state,
      pendingReq: false,
    };
    res[resKey] = response.data;
    return res;
  }
  return {
    ...state,
    pendingReq: false,
    error: true,
  };
};

const dataFail = (action, state) => {
  const errorResponse = (action.error && action.error.response) || {};

  return {
    ...state,
    pendingReq: false,
    error: errorResponse,
  };
};

const reducer = (state = {
  userId: null,
  testList: null,
  testConfig: null,
  editingTest: null,
  pendingReq: false,
  error: null,
}, action) => {
  switch (action.type) {
    case 'GET_TEST_LIST': case 'GET_TEST_CONFIGS': case 'GET_USER_ID':
      return {
        ...state,
        pendingReq: true,
        error: null,
      };
    case 'GET_TEST_LIST_SUCCESS':
      return dataResult(action, state, 'testList');
    case 'GET_USER_ID_SUCCESS':
      return dataResult(action, state, 'userId');
    case 'GET_TEST_CONFIGS_SUCCESS':
      return dataResult(action, state, 'testConfig');
    case 'GET_TEST_LIST_FAIL': case 'GET_TEST_CONFIGS_FAIL': case 'GET_USER_ID_FAIL':
      return dataFail(action, state);
    case 'SET_TEST_EDIT':
      return {
        ...state,
        editingTest: action.templateId,
        testConfig: null,
      };
    default:
      return state;
  }
};

export default reducer;
