import getNow from 'state_management/utils';
import constants from 'app_constants';

const windowSize = () => {
  const docEl = document.documentElement;
  const body = document.getElementsByTagName('body')[0];
  return {
    width: window.innerWidth || docEl.clientWidth || body.clientWidth,
    height: window.innerHeight || docEl.clientHeight || body.clientHeight,
  };
};

const reducer = (state = {
  small: windowSize().width < constants.mobileWidth,
}, action) => {
  switch (action.type) {
    case 'RESIZE_WINDOW':
      return {
        ...state,
        small: windowSize().width < constants.mobileWidth,
      };
    default:
      return state;
  }
};

export default reducer;
