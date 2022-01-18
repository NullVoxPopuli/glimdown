import { styleTags, tags as t } from '@lezer/highlight';

// See: https://github.com/lezer-parser/javascript/blob/main/src/highlight.js
export const glimmerHighlighting = styleTags({
  'each if unless else': t.controlKeyword,
  'yield outlet': t.operatorKeyword,
  let: t.definitionKeyword,
  'debugger log on fn': t.keyword,
  BooleanLiteral: t.bool,
  this: t.self,
  null: t.null,
  BlockComment: t.blockComment,
  Number: t.number,
  String: t.string,
  '( )': t.paren,
  '{{ }}': t.brace,
  '.': t.derefOperator,
});
