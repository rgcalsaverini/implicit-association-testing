// import { debounce } from 'lodash';

export default () => (new Date()).getTime() / 1000.0;

// export const debouncedAction = (duration, action) => {
//   const innerFunction = debounce(
//     (dispatch, ...args) => dispatch(
//       action(...args),
//     ),
//     duration,
//     { leading: true },
//   );
//   return (...args) => dispatch => innerFunction(dispatch, ...args);
// };


export const debouncedAction = (duration, actionFunc) => {
  const innerFunction = (...args) => {
    const action = actionFunc(...args);
    action.meta = {
      ...(action.meta || {}),
      debounce: {
        time: duration,
        leading: true,
        trailing: false,
      },
    };
    return action;
  };

  innerFunction.meta = {
    debounce: {
      time: duration,
      leading: true,
      trailing: false,
    },
  };

  return innerFunction;
};
