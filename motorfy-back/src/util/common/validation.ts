/**
 * Util Method to check given id is mongoose objec id
 * @param {string} id
 * @returns {bolean}
 */

const isObject = (id: string): boolean => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    return true;
  }
  return false;
};

export default isObject;
