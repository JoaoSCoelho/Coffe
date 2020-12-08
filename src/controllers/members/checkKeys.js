module.exports = (obj, ignore, obs, reject) => {
  if (Object.keys(obj).filter(key => !/^\d+-\d+$/g.test(key + '')).length) {
    if (ignore) {
      obs.ignoredKeys = Object.keys(obj).filter(key => !/^\d+-\d+$/g.test(key + ''));
      obs.ignoredKeys.forEach((id) => obj[id] = null);
    } else {
      reject(new Error('A key da propriedade deve corresponder à seguinte expressão: "/^\\d+-\\d+$/g"'));
      return false;
    };
  };
  return true;
};