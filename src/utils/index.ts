/**
 * Helper function that supports merging maps
 *
 * @param {Object} target
 * @param {Object} source
 * @return {Object}
 */
export function mergeObservables(target: Object, source?: Object): Object {
  if (!source) {
    return target;
  } else {
    for (let key in target) {
      if (source.hasOwnProperty(key) && target.hasOwnProperty(key)) {
        target[key] = Object.assign(target[key], source[key]);
      }
    }
    return target;
  }
}