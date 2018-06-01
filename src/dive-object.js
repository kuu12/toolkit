/**
 * To safely access a property in a deeply-nested object.
 * example:
 * const object = {
 *     a: {
 *         b: {
 *             c: 'find me :)'
 *         }
 *     }
 * };
 * const message = dive(object, 'a', 'b', 'c'); // 'find me :)'
 * const another = dive(object, 'a', 'f', 'k'); // got undefined, but no exception throws.
 * 
 * @param   {Object}    obj         top-level object
 * @param   {String}    next        path
 * @param   {Array}     nextNexts   and more paths
 * @return  {*}                     value
 */

function dive(obj, next, ...nextNexts) {
    if (typeof next === 'undefined') return obj;
    if (typeof obj === 'undefined' || obj === null) return obj;

    return dive(obj[next], ...nextNexts);
}

export default dive;
