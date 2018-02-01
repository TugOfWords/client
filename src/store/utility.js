/**
 * Immutably update oldObject with updatedProps
 * @param {Object} oldObject
 *   the object to update
 * @param {Object} updatedProps
 *   the updated properties of the object
 * @returns {Object}
 *   the updated object
 */
export const updateObject = (oldObject, updatedProps) => ({ ...oldObject, ...updatedProps }); // eslint-disable-line
