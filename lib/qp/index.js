/**
 * filters the list using string query
 */

/**
 * Module dependencies
 */

const parser = require('./parser');
const native = require('./native');
const sift = require('./sift');

/**
 * Expose filter
 *
 * @param {String} query, check README.md
 * @param {Array<*>} list, list of objects to query
 * @param {String} [adapter], native or sift, defaults to native
 * @returns {Array} filered array or query syntax error
 * @throws {SyntaxError} for malformed queries
 */

exports = module.exports = function filter (query, list, adapter = 'native') {
  const tree = parser
    .parse(query);

  const fn = adapter === 'native' 
    ? native 
    : sift;

  return fn(tree, list);
}
