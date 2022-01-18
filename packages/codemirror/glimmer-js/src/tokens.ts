import { ExternalTokenizer } from '@lezer/lr';

import {
  Expression as longExprToken,
  htmlCommentContent as htmlCommentToken,
  longCommentContent as longCommentToken,
  shortCommentContent as shortCommentToken,
} from './syntax.grammar.terms';

import type { InputStream } from '@lezer/lr';

const space = [
  9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201,
  8202, 8232, 8233, 8239, 8287, 12288,
];

const parenOpen = 40;
const parenClose = 41;
const squareOpen = 91;
const squareClose = 93;
const curlyOpen = 123;
const curlyClose = 125;
const comma = 44;
const colon = 58;
const hash = 35;
const at = 64;
const slash = 47;
const greaterThan = 62;
const dash = 45;
const quoteDouble = 34;
const quoteSingle = 39;
const backslash = 92;
const newline = 10;
const asterisk = 42;
const tick = 96;

const prefixes = [colon, hash, at, slash];

const shortCommentEnd = [curlyClose, curlyClose];
const longCommentEnd = [dash, dash, curlyClose, curlyClose];
const htmlCommentEnd = [dash, dash, greaterThan];

function matchForComment(commentEndPattern, commentToken, input) {
  for (let found = 0, i = 0; ; i++) {
    if (input.next < 0) {
      if (i) input.acceptToken(commentToken);

      break;
    }

    let hasMatch = commentEndPattern[found] === input.next;

    if (!hasMatch) {
      found = 0;
      input.advance();

      continue;
    }

    if (found === commentEndPattern.length - 1) {
      if (i > commentEndPattern.length - 1) {
        input.acceptToken(commentToken, 1 - commentEndPattern.length);
      } else {
        console.warn('Reached end of comment but there is still content left');
      }

      break;
    }

    found++;
    input.advance();
  }
}

export const shortCommentContent = new ExternalTokenizer((input) => {
  return matchForComment(shortCommentEnd, shortCommentToken, input);
});

export const longCommentContent = new ExternalTokenizer((input) => {
  return matchForComment(longCommentEnd, longCommentToken, input);
});

export const htmlCommentContent = new ExternalTokenizer((input) => {
  return matchForComment(htmlCommentEnd, htmlCommentToken, input);
});

// TODO: string handler does not handle interpolation

function createStringHandler(input: InputStream) {
  let inString = false;
  let inStringType: 'double' | 'single' | 'template' | null = null;
  let inStringIgnoreNext = false;

  return () => {
    if (inString) {
      if (inStringIgnoreNext) {
        inStringIgnoreNext = false;

        return true;
      }

      if (input.next === backslash) {
        inStringIgnoreNext = true;

        return true;
      }

      if (inStringType === 'double' && input.next === quoteDouble) {
        inString = false;
        inStringType = null;

        return true;
      }

      if (inStringType === 'single' && input.next === quoteSingle) {
        inString = false;
        inStringType = null;

        return true;
      }

      if (inStringType === 'template' && input.next === tick) {
        inString = false;
        inStringType = null;

        return true;
      }

      return true;
    }

    if (input.next === quoteDouble) {
      inString = true;
      inStringType = 'double';

      return true;
    }

    if (input.next === quoteSingle) {
      inString = true;
      inStringType = 'single';

      return true;
    }

    if (input.next === tick) {
      inString = true;
      inStringType = 'template';

      return true;
    }

    return false;
  };
}

function createCommentHandler(input: InputStream) {
  let inLineComment = false;
  let inBlockComment = false;

  return () => {
    if (inLineComment) {
      if (input.next === newline) {
        inLineComment = false;

        return true;
      }

      return true;
    }

    if (inBlockComment) {
      if (input.next === asterisk && input.peek(1) === slash) {
        inBlockComment = false;

        return true;
      }

      return true;
    }

    if (input.next === slash && input.peek(1) === slash) {
      inLineComment = true;

      return true;
    }

    if (input.next === slash && input.peek(1) === asterisk) {
      inBlockComment = true;

      return true;
    }

    return false;
  };
}

type ExpressionStack = '(' | '{' | '{{' | '[';

// closes on a delimiter that probably isn't in the expression
export const expression = new ExternalTokenizer((input) => {
  if (prefixes.includes(input.next)) {
    return;
  }

  const commentHandler = createCommentHandler(input);
  const stringHandler = createStringHandler(input);

  let stack: ExpressionStack[] = [];

  const popIfMatch = (match: ExpressionStack) => {
    const idx = stack.lastIndexOf(match);

    if (idx !== -1) {
      while (stack.length > idx) {
        stack.pop();
      }
    }
  };

  for (let pos = 0; ; pos++) {
    // end of input
    if (input.next < 0) {
      if (pos > 0) input.acceptToken(longExprToken);

      break;
    }

    if (commentHandler() || stringHandler()) {
      input.advance();
      continue;
    }

    if (
      stack.length === 0 &&
      (input.next === curlyClose || input.next === parenClose || input.next === squareClose)
    ) {
      input.acceptToken(longExprToken);

      break;
    }

    switch (input.next) {
      case parenOpen:
        stack.push('(');

        break;
      case parenClose:
        popIfMatch('(');

        break;
      case squareOpen:
        stack.push('[');

        break;
      case squareClose:
        popIfMatch('[');

        break;
      case curlyOpen:
        stack.push('{');

        break;
      case curlyClose:
        popIfMatch('{');

        break;
    }

    input.advance();
  }
});
