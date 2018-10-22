const fieldRE = RegExp('\\$\\{.+?\\}', 'g');

const traverseObj = (object, keyList, defValue) => {
  let obj = object;
  keyList.forEach((key) => { obj = obj && obj[key] ? obj[key] : null; });
  if (!obj) {
    return defValue || '';
  }
  return obj;
};

export default templateVars => (templateString) => {
  let finalString = templateString;
  const matches = templateString.match(fieldRE);
  if (matches) {
    matches.forEach((field) => {
      const parts = field.slice(2, -1).split(':');
      const objPath = parts[0].split('.');
      const defValue = parts.length > 1 ? parts[1] : null;
      const value = traverseObj(templateVars, objPath, defValue);
      finalString = finalString.replace(field, value);
    });
  }
  return finalString;
};
