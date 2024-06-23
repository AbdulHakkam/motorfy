"use strict";
/**
 * Util Method to check given id is mongoose objec id
 * @param {string} id
 * @returns {bolean}
 */
Object.defineProperty(exports, "__esModule", { value: true });
const isObject = (id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return true;
    }
    return false;
};
exports.default = isObject;
