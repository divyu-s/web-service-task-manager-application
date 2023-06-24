import { TaskObjReqProps } from "../constants/appConstant.js";
/**
 * Method checks Is object containg any invaid property if yes then returns true otherwise false
 * @param {*} obj
 * @param {*} validPros
 * @returns
 */
export const isObjHasInvalidProps = (obj, validPros) => {
  for (let property in obj) {
    if (!validPros.includes(property)) {
      return true;
    }
  }
  return false;
};

/**
 * Method checks Is Object containg all required properties if yes then returns true otherwise false
 * @param {*} obj
 * @param {*} requiredPros
 * @returns
 */
export const isObjContainsReqProps = (obj, requiredPros) => {
  for (let i = 0; i < requiredPros.length; i++) {
    if (!obj.hasOwnProperty(requiredPros[i])) {
      return false;
    }
  }
  return true;
};

/**
 * Method to cheaks Is any object property is empty if yes then returns true otherwise false
 * @param {*} obj
 * @returns
 */
export const objHasEmptyProps = (obj) => {
  for (let property in obj) {
    if (
      (property != TaskObjReqProps[2] && !obj[property]) ||
      (property == TaskObjReqProps[2] && typeof obj[property] !== "boolean")
    ) {
      return true;
    }
  }
  return false;
};
