import type { PropertyList, Token } from '../types';
/**
 * Implements reading files Java properties files as described in https://docs.oracle.com/javase/10/docs/api/java/util/Properties.html.
 *
 * @param tokens list of token
 * @param text text content
 * @returns array of property line
 */
export declare function getPropertyList(tokens: Token[], text: string): PropertyList;
//# sourceMappingURL=properties-parser.d.ts.map