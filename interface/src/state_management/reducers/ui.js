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
    case 'RESIZE_WINDOW': {
      const width = Math.max(
        document.documentElement.clientWidth,
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
      );
      return {
        ...state,
        small: width < constants.mobileWidth,
      };
    }
    default:
      return state;
  }
};

export default reducer;
