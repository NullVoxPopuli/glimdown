import { stripIndent } from 'common-tags';
import { micromark } from 'micromark';
import { describe, expect, it } from 'vitest';

const s = stripIndent;

describe('micromark-extension', () => {
  it('works', () => {
    let md = s`
      # Hello, world!

      <SomeComponent @arg={{2}} />
    `;

    const output = micromark(md, {
      allowDangerousHtml: true,
      extensions: [],
      htmlExtensions: [],
    });

    expect(output).toEqual(s`
      <h1>Hello, world!</h1>

      <SomeComponent @arg={{2}} />
    `);
  });
});
