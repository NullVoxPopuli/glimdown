// @ts-check

/**
 * @typedef {import('micromark-util-types').Extension} Extension
 */
import { Parser } from 'acorn';
import { combineExtensions } from 'micromark-util-combine-extensions';

import { acornGlimmer } from './plugins/acorn-glimmer.js';

/**
 * @param {{}} [options]
 * @returns {Extension}
 */
export function glimdown(options) {
  const settings = Object.assign(
    {
      acorn: Parser.extend(acornGlimmer()),
      acornOptions: { ecmaVersion: 2020, sourceType: 'module' },
      addResult: true,
    },
    options
  );

  return combineExtensions([
    // glimdown(settings),
    // betterIndentation(settings),
  ]);
}
