function parse (node) {
  let tokens = {
    AND (item) {
      return parse(node.left)(item) &&
        parse(node.right)(item);
    },
    OR (item) {
      return parse(node.left)(item) ||
        parse(node.right)(item);
    },
    NOT (item) {
      return parse(node.value)(item);
    },
    FLAG (item) {
      return item[node.value];
    },
    EQUALS (item) {
      return item[node.key] === parse(node.value)();
    },
    GT (item) {
      return item[node.key] > parse(node.value)();
    },
    GTE (item) {
      return item[node.key] >= parse(node.value)();
    },
    LT (item) {
      return item[node.key] < parse(node.value)();
    },
    LTE (item) {
      return item[node.key] <= parse(node.value)();
    },
    INCLUDES (item) {
      return [].concat(parse(node.value)()).every((n) => item[node.key].indexOf(n) > -1);
    },
    ARRAY () {
      return node.value.map((n) => parse(n)());
    },
    STRING () {
      return node.value;
    },
    NUMBER () {
      return node.value;
    },
    BOOLEAN () {
      return node.value;
    },
    NULL () {
      return node.value;
    }
  };

  return tokens[node.token];
}

/**
 * Expose
 */

exports = module.exports = function filter (tree, list) {
  return list.filter(parse(tree));
}
