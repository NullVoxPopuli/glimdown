import { javascript, javascriptLanguage } from '@codemirror/lang-javascript';
import { LanguageSupport, LRLanguage } from '@codemirror/language';
import { parseMixed } from '@lezer/common';
import { glimmerParser } from 'codemirror-lang-glimmer';

import { parser as metaParser } from './syntax.grammar';

export { metaParser };

export function gjs() {
  return new LanguageSupport(gjsLanguage, [javascript().support]);
}

export const gjsLanguage = LRLanguage.define({
  parser: metaParser.configure({
    wrap: parseMixed((node) => {
      if (node.type.name === 'Document') return null;
      if (node.type.name === 'GlimmerTemplateTag') return { parser: glimmerParser };

      return { parser: javascriptLanguage.parser };
    }),
  }),
});
