"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YAMLError = exports.errorTemplate = exports.errorCode = void 0;
const yaml_error_1 = require("./yaml-error");
Object.defineProperty(exports, "YAMLError", { enumerable: true, get: function () { return yaml_error_1.YAMLError; } });
exports.errorCode = Object.freeze({
    yamlParsing: 'yamlParsing',
    nodeNotFound: 'nodeNotFound',
    nodeNotFoundMatching: 'nodeNotFoundMatching',
    nodeNotAMap: 'nodeNotAMap',
    propertyNotFound: 'propertyNotFound',
    pathCannotBeEmpty: 'pathCannotBeEmpty',
    pathDoesNotExist: 'pathDoesNotExist',
    seqDoesNotExist: 'seqDoesNotExist',
    tryingToAppendToNonSequence: 'tryingToAppendToNonSequence',
    startNodeMustBeCollection: 'startNodeMustBeCollection',
    scalarValuesDoNotHaveProperties: 'scalarValuesDoNotHaveProperties'
});
exports.errorTemplate = Object.freeze({
    yamlParsing: 'Error parsing YAML document',
    nodeNotFound: 'Node not found at path: [{{- path }}]',
    nodeNotFoundMatching: 'Node not found at path: [{{- path }}, matching [{{- key }} = {{- value }}]',
    nodeNotAMap: 'Node path: [{{- path }}, matching [{{- key }} = {{- value }}], is not a map',
    propertyNotFound: 'Node not found at path: [{{- path }}]',
    pathCannotBeEmpty: 'Path cannot be empty',
    pathDoesNotExist: 'Parent node does not exist at: [{{- path }}]',
    seqDoesNotExist: 'Sequence does not exist at: [{{- path }}]',
    tryingToAppendToNonSequence: 'Cannot append to non-sequence at: [{{- path }}]',
    startNodeMustBeCollection: 'Starting node must be an array or an object',
    scalarValuesDoNotHaveProperties: 'Scalar values do not have properties'
});
//# sourceMappingURL=index.js.map