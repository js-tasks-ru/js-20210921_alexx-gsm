/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  return Object.keys(obj).reduce((result, next) => {
    return fields.includes(next) ? result : Object.assign(result, {[next]: obj[next]});
  }, {});
};
