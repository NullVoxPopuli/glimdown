import { styleTags, tags as t } from '@lezer/highlight';

export const glimmerHighlighting = styleTags({
  'Text RawText': t.content,
  'StartTag StartCloseTag SelfClosingEndTag EndTag': t.angleBracket,
  TagName: t.tagName,
  'MismatchedCloseTag/TagName': [t.tagName, t.invalid],
  AttributeName: t.attributeName,

  // Glimmer
  TemplateTag: t.definition(t.annotation),
  '{{ }}': t.bracket,
  '( )': t.paren,
  Function: t.function(t.name),
  Splattributes: t.derefOperator,
  Comment: t.blockComment,
  ShortComment: t.blockComment,
  LongComment: t.blockComment,
  HtmlComment: t.blockComment,
  ArgName: t.attributeName,
  Argument: t.propertyName,
  NamedBlock: t.tagName,
  Is: t.definitionOperator,
  Pipe: t.definitionOperator,

  as: t.definitionOperator,
  let: t.function(t.definitionOperator),
  this: t.self,
  yield: t.operatorKeyword,
  outlet: t.operatorKeyword,

  component: t.function(t.definitionKeyword),
  modifier: t.function(t.definitionKeyword),
  helper: t.function(t.definitionKeyword),
  hash: t.function(t.definitionKeyword),
  array: t.function(t.definitionKeyword),
  on: t.function(t.definitionKeyword),
  concat: t.function(t.operatorKeyword),
  'if then catch unless else each each-in': t.controlKeyword,

  // TODO:
  UnquotedAttributeValue: t.attributeValue,
  'DoubleQuote SingleQuote AttributeValueContent': t.attributeValue,
  'EntityReference CharacterReference': t.character,
  '[ ]': t.squareBracket,

  ComponentName: t.className,
  StyleAttributeName: t.propertyName,
  BlockType: t.controlKeyword,
  BlockPrefix: t.typeOperator,
  'UnknownBlock/BlockType': t.invalid,
  UnknownBlockContent: t.invalid,

  Variable: t.variableName,
  Modifier: t.modifier,
  ModifierValue: t.function(t.modifier),
});
