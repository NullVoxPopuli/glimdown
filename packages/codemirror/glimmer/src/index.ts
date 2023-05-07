import { html, htmlCompletionSource } from '@codemirror/lang-html';
import {
  foldNodeProp,
  indentNodeProp,
  LanguageSupport,
  LRLanguage,
  syntaxTree,
} from '@codemirror/language';
import { EditorSelection } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { parseMixed } from '@lezer/common';
import { parser as htmlParser } from '@lezer/html';

import { parser } from './syntax.grammar';
import { MoustacheExpression } from './syntax.grammar.terms';

import type { Text } from '@codemirror/state';
import type { SyntaxNode } from '@lezer/common';

export const glimmerParser = parser;

export const glimmerLanguage = LRLanguage.define({
  parser: parser.configure({
    wrap: parseMixed((node) => {
      let { name } = node.type;

      switch (name) {
        case 'Template':
          return null;
        case 'Comment':
        case 'MoustacheExpression':
        case 'NamedBlock':
        case 'Splattributes':
        case 'Argument':
          return { parser };
      }

      console.log(node.type.name);

      return { parser: htmlParser };
    }),

    props: [
      indentNodeProp.add({
        Element: (context) => {
          let after = /^(\s*)(<\/)?/.exec(context.textAfter)!;

          if (context.node.to <= context.pos + after[0].length) return context.continue();

          return context.lineIndent(context.node.from) + (after[2] ? 0 : context.unit);
        },

        Block: (context) => {
          const node = context.node;
          const text = context.textAfter.trim();

          if (text.startsWith('{/')) {
            const name = node.name;

            if (
              (name === 'IfBlock' && text.startsWith('{/if')) ||
              (name === 'EachBlock' && text.startsWith('{/each')) ||
              (name === 'KeyBlock' && text.startsWith('{/key'))
            ) {
              return context.lineIndent(context.node.from);
            }

            return null;
          }

          if (node.name === 'IfBlock' || node.name === 'EachBlock') {
            if (text.startsWith('{{:else')) return context.lineIndent(node.from);
            if (text.startsWith('{{else')) return context.lineIndent(node.from);
          }

          // not sure if this needed to be duplicated
          let after = /^(\s*)(<\/)?/.exec(context.textAfter)!;

          if (context.node.to <= context.pos + after[0].length) return context.continue();

          return context.lineIndent(context.node.from) + (after[2] ? 0 : context.unit);
        },

        'BlockOpen BlockClose BlockInline': (context) => {
          return context.column(context.node.from) + context.unit;
        },

        'OpenTag CloseTag SelfClosingTag': (context) => {
          return context.column(context.node.from) + context.unit;
        },

        Document: (context) => {
          if (context.pos + /\s*/.exec(context.textAfter)![0].length < context.node.to) {
            return context.continue();
          }

          let endElt: SyntaxNode | null = null;
          let close: SyntaxNode;

          for (let cur = context.node; ; ) {
            let last = cur.lastChild;

            if (!last || last.name != 'Element' || last.to != cur.to) break;
            endElt = cur = last;
          }

          if (
            endElt &&
            !(
              (close = endElt.lastChild) &&
              (close.name === 'CloseTag' || close.name === 'SelfClosingTag')
            )
          ) {
            return context.lineIndent(endElt.from) + context.unit;
          }

          return null;
        },
      }),

      foldNodeProp.add({
        Block: (node) => {
          const open = `${node.name}Open`;
          const close = `${node.name}Close`;

          const first = node.firstChild;
          const last = node.lastChild;

          if (!first || first.name !== open) return null;

          return {
            from: first.to,
            to: last?.name === close ? last.from : node.to,
          };
        },

        Element: (node) => {
          let first = node.firstChild;
          let last = node.lastChild!;

          if (!first || first.name != 'OpenTag') return null;

          return {
            from: first.to,
            to: last.name === 'CloseTag' ? last.from : node.to,
          };
        },
      }),
    ],
  }),

  languageData: {
    commentTokens: {
      block: { open: '<!--', close: '-->' },
      devBlock: { open: '{{!--', close: '--}}' },
      devBlockShort: { open: '{{!', close: '}}' },
    },
    indentOnInput: /^\s*((<\/\w+\W)|(\{:(else|then|catch))|(\{\/(if|unless|each|await|key)))$/,
    wordChars: '-._',
    autocomplete: htmlCompletionSource,
  },
});

export function glimmer() {
  return new LanguageSupport(glimmerLanguage, [html().support, autoCloseTags]);
}

// unfortunately the HTML language explicitly checks for the language type,
// so we have to duplicate the entire autoCloseTags extension

function elementName(doc: Text, tree: SyntaxNode | null | undefined, max = doc.length) {
  if (!tree) return '';

  let tag = tree.firstChild;
  let name = tag && (tag.getChild('TagName') || tag.getChild('ComponentName'));

  return name ? doc.sliceString(name.from, Math.min(name.to, max)) : '';
}

const autoCloseTags = EditorView.inputHandler.of((view, from, to, text) => {
  if (
    view.composing ||
    view.state.readOnly ||
    from != to ||
    (text != '>' && text != '/') ||
    !glimmerLanguage.isActiveAt(view.state, from, -1)
  )
    return false;

  let { state } = view;
  let changes = state.changeByRange((range) => {
    let { head } = range;
    let around = syntaxTree(state).resolveInner(head, -1);
    let name: string;

    if (
      around.name === 'TagName' ||
      around.name === 'ComponentName' ||
      around.name === 'StartTag'
    ) {
      around = around.parent!;
    }

    if (text === '>' && around.name === 'OpenTag') {
      if ((name = elementName(state.doc, around.parent, head))) {
        let hasRightBracket = view.state.doc.sliceString(head, head + 1) === '>';
        let insert = `${hasRightBracket ? '' : '>'}</${name}>`;

        return {
          range: EditorSelection.cursor(head + 1),
          changes: { from: head + (hasRightBracket ? 1 : 0), insert },
        };
      }
    } else if (text === '/' && around.name === 'OpenTag') {
      let empty = around.parent,
        base = empty?.parent;

      if (
        empty!.from == head - 1 &&
        base!.lastChild?.name != 'CloseTag' &&
        (name = elementName(state.doc, base, head))
      ) {
        let hasRightBracket = view.state.doc.sliceString(head, head + 1) === '>';
        let insert = `/${name}${hasRightBracket ? '' : '>'}`;
        let pos = head + insert.length + (hasRightBracket ? 1 : 0);

        return {
          range: EditorSelection.cursor(pos),
          changes: { from: head, insert },
        };
      }
    }

    return { range };
  });

  if (changes.changes.empty) return false;

  view.dispatch(changes, { userEvent: 'input.type', scrollIntoView: true });

  return true;
});