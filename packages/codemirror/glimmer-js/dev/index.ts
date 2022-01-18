import { syntaxTree } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';

import { svelte, svelteParser } from '../dist/';
import { printTree } from './print-lezer-tree';

const commentTest = `<template>
  {{! simple comment }}
  {{!-- simple comment --}}
  <!-- html comment -->
  
  {{yield 1 "two"}}
</template>;
`;

const testDoc = `let greeting = "hello there";

let Empty = <template></template>;
let Inline = <template>inline</template>;
let OneLine = <template>
  {{greeting}}
</template>;

let MultiLine = <template>
  {{! 
    simple comment 
  }}

  {{!-- 
    long comment 
  --}}

  <!--
    HTML Comment
    {{still a comment}}
    {{!still a comment}}
    {{!--still a comment--}}
    -->

  {{#let greeting as |value|}}
    {{value}}
  {{/let}}

  {{#if (nested (condition))}}
    bar
  {{else}}
    foo
  {{/if}}

  {{#unless (nested (condition))}}
    bar
  {{else}}
    foo
  {{/unless}}
</template>;

class Demo {
  @tracked name = "human";

  <template>
    Hello {{this.name}}!
  </template>
}

// default
<template>
  {{! inline simple }}
  {{!-- inline long }}

  <MultiLine />
  <OneLine />
  <Inline />
  <Empty 
    attribute="value" 
    foo=bar 
    bar={{foo}} 
    @arg="str" 
    @arg1={{value}}
    @arg2={{call something}}
    @arg3={{ (call something) }}
    @arg4={{ (call (nested thing)) }}
    {{someModifier}}
    {{someModifier 1 (two) three=(four)}}
  />

  {{hash foo="hello" bar=(component Inline arg="hi")}}
  
  {{array 1 2 @foo @bar}}

  <ul {{someModifier}}>
    {{#each (array 1 2 (concat "hi" "there")) as |item|}}
      
      <li>{{item}}</li>

    {{/each}}
  </ul>

  <button {{on 'click' handler}}>click me</button>

  <div class="string {{value}}"></div>
  <div class="{{if condition "class-name"}}"></div>
  <div class='{{if condition "class-name"}}'></div>
  <div class="{{if condition 'class-name'}}"></div>

  {{yield}}
  {{yield to="elsewhere"}}
  {{yield foo}}
  {{yield (hash foo="bar")}}
  {{yield (hash 
            c=(component "foo" named=2)
            m=(modifier "foo" named=2)
            h=(helper "foo" named=2)
          )}}

  {{outlet}}
</template>
`;

// const doc = testDoc;
const doc = commentTest;

const syncAST = EditorView.updateListener.of((update) => {
  if (update.docChanged || update.selectionSet) {
    const { from: oldFrom, to: oldTo } = update.startState.selection.ranges[0];
    let { from, to } = update.state.selection.ranges[0];

    const docChanged = update.docChanged;
    const selectionChanged = !(
      (from === to && oldFrom === oldTo) ||
      (from === oldFrom && to === oldTo)
    );
    const hasSelection = from !== to;

    if (docChanged || selectionChanged) {
      const ast = printTree(
        syntaxTree(update.view.state),
        update.state.doc.toString(),
        hasSelection ? { from, to } : undefined
      );

      queueMicrotask(() => {
        astView.dispatch({ changes: { from: 0, to: astView.state.doc.length, insert: ast } });
      });
    }
  }
});

const mainView = new EditorView({
  state: EditorState.create({
    doc,
    extensions: [basicSetup, svelte(), oneDark, EditorView.lineWrapping, syncAST],
  }),
  parent: document.querySelector('#editor'),
});

const astView = new EditorView({
  state: EditorState.create({
    doc: printTree(svelteParser.parse(doc), doc),
    extensions: [basicSetup, oneDark, EditorView.lineWrapping, EditorState.readOnly.of(true)],
  }),
  parent: document.querySelector('#editor-ast'),
});
