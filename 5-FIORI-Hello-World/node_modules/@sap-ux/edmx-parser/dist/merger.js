"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
const utils_1 = require("./utils");
/**
 * Merges multiple metadata output from the parser together into one.
 *
 * @param parserOutputs the different output from the parser
 * @returns The merge metadata output
 */
function merge(...parserOutputs) {
    const outParserOutput = new utils_1.MergedRawMetadata(parserOutputs[0]);
    parserOutputs.forEach((parserOutput) => {
        outParserOutput.addParserOutput(parserOutput);
    });
    return outParserOutput;
}
exports.merge = merge;
//# sourceMappingURL=merger.js.map