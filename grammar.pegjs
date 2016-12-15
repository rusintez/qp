start = Space* b:block Space* { return b; }

block
  = Statement
  / "(" statement:Statement ")" { return statement }

Statement
  = StatementAND
  / StatementOR
  / StatementNOT
  / Expression

StatementAND
  = head:Expression Space "AND" Space tail:Statement {
    return {
      token: 'AND',
      left: head,
      right: tail
    }
  }

StatementOR
  = head:Expression Space "OR" Space tail:Statement {
    return {
      token: 'OR',
      left: head,
      right: tail
    }
  }

StatementNOT
  = "NOT" Space value:Statement {
    return {
      token: 'NOT',
      value: value
    }
  }

ExpressionEquals
  = key:Word Space* ("=" / "EQUALS") Space* value:Value {
    return {
      token: 'EQUALS',
      key: key,
      value: value
    }
  }

ExpressionGt
  = key:Word Space* ">" Space* value:Value {
    return {
      token: 'GT',
      key: key,
      value: value
    }
  }

ExpressionGte
  = key:Word Space* ">=" Space* value:Value {
    return {
      token: 'GTE',
      key: key,
      value: value
    }
  }

ExpressionLt
  = key:Word Space* "<" Space* value:Value {
    return {
      token: 'LT',
      key: key,
      value: value
    }
  }

ExpressionLte
  = key:Word Space* "<=" Space* value:Value {
    return {
      token: 'GT',
      key: key,
      value: value
    }
  }

ExpressionIncludes
  = key:Word Space* ("INCLUDES" / "IN") Space* value:Value {
    return {
      token: 'INCLUDES',
      key: key,
      value: value
    }
  }

Expression
  = ExpressionEquals
  / ExpressionGt
  / ExpressionGte
  / ExpressionLt
  / ExpressionLte
  / ExpressionIncludes
  / Flag
  / "(" statement:Statement ")" { return statement }

Value "value"
  = Array
  / String
  / Number
  / Boolean
  / Null

Array "array"
  = "[" Space* head:Value Space* tail:("," Space* Value Space*)* Space* "]" {
    return {
      token: 'ARRAY',
      value: [head].concat(tail.map(function(item) {
        return item[2];
      }))
    }
  }

String "string"
  = '"' word:Word '"' { return { token: 'STRING', value: word  } }
  / "'" word:Word '"' { return { token: 'STRING', value: word  } }

Number "number"
  = value:[0-9]+ {
    return { token: 'NUMBER', value: parseInt(value.join('')) }
  }

Boolean "boolean"
  = value:("true" / "false") {
    return {
      token: 'BOOLEAN',
      value: value
    }
  }

Null "null"
  = value:"null" {
    return {
      token: 'NULL',
      value: null
    }
  }

Flag "flag"
  = w:Word {
    return { token: "FLAG", value: w }
  }

Word "word"
  = w:Letter+ { return  w.join('') }

Letter
  = [a-zA-Z0-9_]

Space "space"
  = s:" "+ {
    return {
      token: 'SPACE',
      value: ' '
    }
  }
