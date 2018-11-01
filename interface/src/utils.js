export const GenFormatter = templateVars => templateString => (
  /* eslint-disable no-new-func */
  Function(`return \`${templateString}\`;`).call(templateVars)
);

export const FilterQuestions = (questions, vars) => questions.filter(
  /* eslint-disable no-new-func */
  question => typeof question.show_if === 'undefined' || Function(`return ${question.show_if};`).call(vars),
);
