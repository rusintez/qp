/**
 * filters the list using string query
 */

/**
 * Module dependencies
 */

var parser  = require('./parser');
var native  = require('./lib/qp/native.js');
var sift    = require('./lib/qp/sift.js');

/**
 * Expose filter
 *
 * @param {String} query, check README.md
 * @param {Array} list, list of objects to query
 * @param {String} adapter, native or sift, defaults to native
 * @return {Array} filered array or query syntax error
 * @throws {SyntaxError} for malformed queries
 */

exports = module.exports = function filter(query, list, adapter) {
  adapter = adapter || 'native';
  var tree = parser.parse(query);
  
  if (adapter === 'native') {
    return native(tree, list);
  } else {
    return sift(tree, list);
  }
}
