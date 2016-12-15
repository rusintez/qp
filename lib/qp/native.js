function parse(node) {
  var tokens = {
    AND: function(item) {
      return parse(node.left)(item)
        && parse(node.right)(item);
    },
    OR: function(item) {
      return parse(node.left)(item)
        || parse(node.right)(item);
    },
    NOT: function(item) {
      return parse(node.value)(item);
    },
    FLAG: function(item) {
      return item[node.value];
    },
    EQUALS: function(item) {
      return item[node.key] === parse(node.value)();
    },
    GT: function(item) {
      return item[node.key] > parse(node.value)();
    },
    GTE: function(item) {
      return item[node.key] >= parse(node.value)();
    },
    LT: function(item) {
      return item[node.key] < parse(node.value)();
    },
    LTE: function(item) {
      return item[node.key] <= parse(node.value)();
    },
    INCLUDES: function(item) {
      return [].concat(parse(node.value)()).every(function(n) {
        return item[node.key].indexOf(n) > -1;
      });
    },
    ARRAY: function() {
      return node.value.map(function(n) {
        return parse(n)();
      });
    },
    STRING: function() {
      return node.value;
    },
    NUMBER: function() {
      return node.value;
    },
    BOOLEAN: function() {
      return node.value;
    },
    NULL: function() {
      return node.value;
    }
  };

  return tokens[node.token];
}

/**
 * Expose
 */

exports = module.exports = function filter(tree, list) {
  return list.filter(parse(tree));
}