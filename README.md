# qp

Filter arrays using SQL like querystring

### Installation 

    $ npm install @rusintez/qp --save

### Usage

```js

var filter = require('@rusintez/qp');
var assert = require('assert');

var arr = [{
  bool_field: true,
  another_bool_field: false,
  a: 1,
  b: 2,
  c: 'blah',
  d: [1, "2", true, false]
}];

var query = 'bool_field AND NOT another_bool_field AND a = 1 AND (b >= 2 OR c = "blah") AND d INCLUDES [1, "2", true]';
var result = filter(query, arr);

assert.deepEqual(arr, result);
```

### API

#### filter({String} query, {Array} list[, {String} adapter]):Array

```js
var result = filter(query, list);
```

### Adapters

By default adapter is set to 'native' that uses tree-like structure to filter objects in an array.
It's possible to use (included) sift.js filtering mechanism

```js
var siftFilteredList = filter(query, list, 'sift');
```

### Query Syntax

##### AND

`a AND b` — true when both are true

##### OR

`a OR b` - true when either one is true

##### NOT

`NOT c` — true if c is falsy

##### EQUALS

`a EQUALS 5` — true when a is number 5
`a = 5` — shorthand, same as above

##### GT

`a > 4` — true when a is greater than 4

##### GTE

`a >= 4` — true when a is greater than or equals 4

##### LT

`a < 4` — true when a is less than 4

##### LTE

`a <= 4` — true when a is less than or equals 4

##### INCLUDES

`tags INCLUDES ["russia", "china"]` — true when tags include *both* russia and china 
`tags IN ["us", "uk"]` — shorthand, same as above

##### Flags

Flags are shorthand expressions by them selves, eg.

`has_active_license AND no_principal` will become `has_active_license = true AND no_principal = true`

##### Brackets

Brackets are supported to ensure correct order or comparison

```
a = 5 OR (b = 10 AND c > 0) AND NOT tags IN ["blacklisted"]
```

### Supported datatypes

##### String

`"hello world"` — strings must be surrounded by double quotes

##### Number 

`5` - for now only non-negative integers are supported, more coming soon

##### Boolean

`true`, `false`

##### Null

`null`

##### Array

`[1,"2", false, [true, true], null]` — all of the above + nesting

### Advanced

It's possible to get back parsed query tree using excellent PEG generated parser.

```js

var parser = require('@rusintez/qp/parser');
var assert = require('assert');

var tree = parser.parse('license_types INCLUDES 7');

assert.deepEqual(tree, { 
  token: 'INCLUDES',
  key: 'license_types',
  value: { 
    token: 'NUMBER', 
    value: 7
  }
});

```

### Author

Vladimir Popov

### License

MIT