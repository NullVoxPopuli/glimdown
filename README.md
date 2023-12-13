# Archived

All code moved to https://github.com/nullvoxpopuli/limber

# Glimdown

## Usage

### Ember

<!-- change this to gjs once implemented -->

```jsx
import { compile } from '@glimdown/ember';

let code = `
# Glimdown

<SomeComponent />

\`\`\`gjs live
const scrollTo = () => { /* ...*/ }

<template>
  <div {{scrollTo}}></div>
</template>
\`\`\`

`;

let { component: myComponent, name, error } = await compile(processed);

<template>
  {{#if error}}
    {{error}}
  {{else}}
    <myComponent />
  {{/if}}

  debug info: {{name}}
</template>

```

### Unified/Remark/Rehype

```js
import { unified } from "unified";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

import { glimdown } from "@glimdown/remark";

let code = `
# Glimdown

<SomeComponent />

\`\`\`gjs live
const scrollTo = () => { /* ...*/ }

<template>
  <div {{scrollTo}}></div>
</template>
\`\`\`

`;

let stack = unified().use(glimdown).use(remarkRehype).use(rehypeStringify);

let processed = await stack.process(code);
let extractedDemos = processed.data.demos;
// html uses the .name property from each demo to map to the demo components.
// when using strict-mode, the compiled demos should be mapped in the 'scope'
// property using the corresponding .name
let html = processed.toString();
```

if in an ember environment,

```js
import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnlyComponent from '@ember/component/template-only';
import { trackedFunction } from 'ember-resources';
import { compileJS } from 'ember-repl';

export default class DemoRenderer extends Component {

  compiledDemos = trackedFunction(this, async () => {
    let demos = await Promise.all(
      this.args.demos.map(async ({ name, code }) => {
        let { component, name, error } = await compileJS(code);

        return { name, component };
      })
    );

    return demos.reduce((map, info) => {
      map[info.name] = info.component;

      return map;
    }, {});
  });

  @cached
  get rendered() {
    setComponentTemplate(
      precompileTemplate(html, {
        strictMode: true,
        scope: () => {
          ...(this.compiledDemos.value || {}),
        }
      }
    ),
    templateOnlyComponent());
  }
}
```

```hbs
<this.rendered />
```

## References

- https://github.com/remarkjs/remark/discussions/922
- https://github.com/micromark/micromark#extending-markdown
- https://github.com/mdx-js/mdx + https://mdxjs.com/packages/
