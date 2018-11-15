import store from './state_management/store';

export const GenFormatter = templateVars => templateString => (
  /* eslint-disable no-new-func */
  Function(`return \`${templateString}\`;`).call(templateVars)
);

export const FilterQuestions = (questions, vars) => questions.filter(
  /* eslint-disable no-new-func */
  question => typeof question.show_if === 'undefined' || Function(`return ${question.show_if};`).call(vars),
);

const specialTextDict = {
  normal: {
    use_what: 'use your computer keys',
  },
  small: {
    use_what: 'touch on the screen',
  },
};

export const specialText = (textId) => {
  const dictKey = store.getState().uiReducer.small ? 'small' : 'normal';
  return specialTextDict[dictKey][textId];
};
