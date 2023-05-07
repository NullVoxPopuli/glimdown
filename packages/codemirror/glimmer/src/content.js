import { parseMixed } from '@lezer/common';

// import { Element, Expression } from './syntax.grammar.terms';

function getAttrs(element, input) {
  let attrs = Object.create(null);

  for (let att of element.firstChild.getChildren('Attribute')) {
    let name = att.getChild('AttributeName'),
      value = att.getChild('AttributeValue') || att.getChild('UnquotedAttributeValue');

    if (name)
      attrs[input.read(name.from, name.to)] = !value
        ? ''
        : value.name == 'AttributeValue'
        ? input.read(value.from + 1, value.to - 1)
        : input.read(value.from, value.to);
  }

  return attrs;
}

function maybeNest(node, input, tags) {
  let attrs;

  for (let tag of tags) {
    if (!tag.attrs || tag.attrs(attrs || (attrs = getAttrs(node.node.parent, input))))
      return { parser: tag.parser };
  }

  return null;
}

// const expressionParser = javascriptParser.configure({
//   top: 'SingleExpression',
// });

// tags: {
//   tag: "script" | "style" | "textarea",
//   attrs?: ({[attr: string]: string}) => boolean,
//   parser: Parser
// }[]
