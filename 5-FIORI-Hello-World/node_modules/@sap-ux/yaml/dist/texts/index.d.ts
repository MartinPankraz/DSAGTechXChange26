export type StringMap = {
    [key: string]: any;
};
/**
 * Perform string interpolation on the given template string.
 *
 * @param {string} template - template string
 * @param {StringMap} [replacements] - a list of options for translation interpolation
 * @returns {string} the interpolated string
 * @example
 * text('Hi {{name}}, today is {{day}}.', {name: 'Jon', day: 'Jan 1, 1970'});
 * // Returns 'Hi Jon, today is Jan 1, 1970.'
 */
export declare function interpolate(template: string, replacements?: StringMap): string;
//# sourceMappingURL=index.d.ts.map