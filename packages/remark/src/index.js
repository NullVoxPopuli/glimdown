// @ts-check
/**
 * @typedef {import('mdast').Root} Root
 *
 * References:
 *  - https://github.com/mdx-js/mdx/blob/main/packages/remark-mdx/index.js
 */

/**
 * Unified plugin for parsing glimdown for use in
 * the remark/rehype/unified ecosystem.
 *
 * @example
 * ~~~js
 * import { unified } from 'unified';
 * import remarkRehype from 'remark-rehype';
 * import rehypeStringify from 'rehype-stringify';
 *
 * import { glimdown } from '@glimdown/remark';
 *
 * let code = `
 *  # Hello, world!
 *
 *  <SomeComponent />
 *
 *  ```gjs live
 *  <template>
 *    <div>Hello, world! (from Glimmer)</div>
 *  </template>
 *  ```
 * `;
 *
 * let stack = unified()
 *  .use(glimdown)
 *  .use(remarkRehype)
 *  .use(rehypeStringify);
 *
 *  let processed = await stack.process(code);
 *  let extractedDemos = processed.data.demos;
 *  let html = processed.toString();
 *
 *  console.log(html);
 * ~~~
 *
 */
export function glimdown(options = {}) {
  const data = this.data();

  add('micromarkExtensions', mdxjs(options));
  add('fromMarkdownExtensions', mdxFromMarkdown);
  // add('toMarkdownExtensions', mdxToMarkdown);

  /**
   * @param {string} field
   * @param {unknown} value
   */
  function add(field, value) {
    const list = /** @type {Array<unknown>} */ (
      // Other extensions
      /* c8 ignore next 2 */
      data[field] ? data[field] : (data[field] = [])
    );

    list.push(value);
  }
}
