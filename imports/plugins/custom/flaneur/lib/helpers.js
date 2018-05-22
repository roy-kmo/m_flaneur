/**
 * Moves an item at a given index, to a new position in the given array,
 * and returns the array.
 *
 * @param {Array} arry
 * @param {Number} previousIndex Index item currently resides at
 * @param {Number} newIndex Index to move item to
 *
 * @returns {Array}
 */
export function arrayMove (arr, previousIndex, newIndex) {
  const array = arr.slice(0);
  if (newIndex >= array.length) {
    let k = newIndex - array.length;
    while (k-- + 1) {
      array.push(undefined);
    }
  }
  array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
  return array;
}
