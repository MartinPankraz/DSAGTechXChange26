"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpolate = interpolate;
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
function interpolate(template, replacements) {
    try {
        return !replacements
            ? template
            : template?.replace(/{{-?([^{}]*)}}/g, (match, captureGroup1) => {
                const key = captureGroup1?.trim();
                // Use replacement only if it can be converted to a string
                return replacements[key]?.toString() || match;
            });
    }
    catch {
        return '';
    }
}
//# sourceMappingURL=index.js.map