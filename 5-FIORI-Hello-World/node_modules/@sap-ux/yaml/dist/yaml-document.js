"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YamlDocument = void 0;
exports.yamlDocumentToYamlString = yamlDocumentToYamlString;
const yaml_1 = __importStar(require("yaml"));
const merge_1 = __importDefault(require("lodash/merge"));
const errors_1 = require("./errors");
const texts_1 = require("./texts");
/**
 * Converts a YAML document object into a YAML string.
 *
 * @param {YamlDocument} yamlDocument The YAML document object to convert into a string.
 * @returns {string} The YAML string representation of the input YAML document.
 */
function yamlDocumentToYamlString(yamlDocument) {
    return yaml_1.default.stringify(yamlDocument);
}
/**
 * Represents a yaml document with utility functions to manipulate the document.
 *
 * @class YamlDocument
 */
class YamlDocument {
    documents;
    /**
     * Returns a new instance of YamlDocument.
     *
     * @static
     * @param {string} serializedYaml - the serialized yaml string
     * @returns {YamlDocument} the YamlDocument instance
     * @memberof YamlDocument
     */
    static async newInstance(serializedYaml) {
        return new YamlDocument(serializedYaml);
    }
    /**
     * Creates an instance of YamlDocument.
     *
     * @param {string} serializedYaml - the serialized yaml string
     * @memberof YamlDocument
     */
    constructor(serializedYaml) {
        this.documents = yaml_1.default.parseAllDocuments(serializedYaml);
        if (this.documents.length === 0) {
            // this is done for backward compatibility when only single document yaml was supported.
            // yaml.parseDocument('') creates a new document
            // yaml.parseAll('') does not create a new document
            this.documents.push(yaml_1.default.parseDocument(serializedYaml));
        }
        const docsWithErrors = this.documents.filter((doc) => doc.errors.length > 0);
        if (docsWithErrors.length > 0) {
            throw new errors_1.YAMLError(errors_1.errorTemplate.yamlParsing +
                '\n' +
                docsWithErrors.map((doc) => doc.errors.map((e) => e.message).join('')), errors_1.errorCode.yamlParsing);
        }
    }
    /**
     * Returns a string representation of the yaml document.
     *
     * @returns {string} the string representation
     * @memberof YamlDocument
     */
    toString() {
        return this.documents.map((d) => d.toString({ singleQuote: true })).join('');
    }
    /**
     * Adds a comment to the yaml document.
     *
     * @param root0 - the comment object
     * @param root0.comment - the comment object's comment
     * @param root0.location - the comment object's location
     * @returns {YamlDocument} the YamlDocument instance
     * @memberof YamlDocument
     */
    addDocumentComment({ comment, location = 'beginning' }) {
        switch (location) {
            case 'beginning':
                this.documents[0].commentBefore = comment;
                break;
            case 'end':
                this.documents[0].comment = comment;
                break;
            default:
                break;
        }
        return this;
    }
    /**
     * Creates a Node element and adds the provided comments.
     * To add the comments the value must be flat JSON.
     *
     * @param options - Options
     * @param options.value - the object's value (must be flat json)
     * @param options.comments - optional comments for no in value being added
     * @returns the node create from the value with any added comments
     */
    createNode({ value, comments }) {
        const newNode = this.documents[0].createNode(value);
        if (comments?.length) {
            for (const c of comments) {
                const nodeIndex = newNode.items.findIndex((item) => {
                    const keyValue = item.key.value;
                    return keyValue === c.key;
                });
                newNode.items[nodeIndex].value.comment = c.comment;
            }
        }
        return newNode;
    }
    /**
     * Set the value at a given path.
     *
     * @param path - hierarchical path where the node will be inserted/updated
     * @param path.path - the path object's path
     * @param path.value - the path object's value
     * @param path.createIntermediateKeys - create the intermediate keys if they're missing. Error if not
     * @param path.comment - an optional comment
     * @example
     * If the document is:
     * key1:
     *   key2: value2
     *   key3:
     *     key4:
     *       - item: item1
     *       - item: item2
     *
     * To set the second item, the path will be `key1.key3.key4.1.item`
     * To set key2's value: `key1.key2`
     * To set a property at the root: 'keyX'
     * @returns {YamlDocument} the YamlDocument instance
     * @memberof YamlDocument
     */
    setIn({ path, value, createIntermediateKeys, comment }) {
        const pathArray = this.toPathArray(path);
        if (pathArray.length > 1) {
            const parentPath = pathArray.slice(0, -1);
            const parentNode = this.documents[0].getIn(parentPath);
            if (!parentNode && !createIntermediateKeys) {
                // Not at root and we're not asked to create the intermediate keys
                throw new errors_1.YAMLError((0, texts_1.interpolate)(errors_1.errorTemplate.pathDoesNotExist, { path: parentPath }), errors_1.errorCode.pathDoesNotExist);
            }
        }
        const newNode = this.documents[0].createNode(value);
        if (comment) {
            newNode.commentBefore = comment;
        }
        this.documents[0].setIn(pathArray, newNode);
        return this;
    }
    /**
     * Appends a node to a sequence in the document.
     *
     * @param path - hierarchical path where the node will be inserted/updated
     * @param {string} path.path - the path object's path
     * @param {object} path.value - the path object's value
     * @param {boolean} path.createIntermediateKeys - create the intermediate keys if they're missing. Error if not
     * @param path.nodeComment - optional comment to add to the node
     * @param path.comments - optional comments for subnodes in value being added
     * @returns {YamlDocument} the YamlDocument instance
     * @memberof YamlDocument
     */
    appendTo({ path, value, createIntermediateKeys = true, nodeComment, comments }) {
        const pathArray = this.toPathArray(path);
        // Create a copy to work to modify
        const documentCopy = this.documents[0].clone();
        let seq = documentCopy.getIn(pathArray);
        if (!seq) {
            if (!createIntermediateKeys) {
                throw new errors_1.YAMLError((0, texts_1.interpolate)(errors_1.errorTemplate.seqDoesNotExist, { path }), errors_1.errorCode.seqDoesNotExist);
            }
            seq = new yaml_1.YAMLSeq();
            documentCopy.setIn(pathArray, seq);
        }
        else if (!(0, yaml_1.isSeq)(seq)) {
            throw new errors_1.YAMLError((0, texts_1.interpolate)(errors_1.errorTemplate.tryingToAppendToNonSequence, { path }), errors_1.errorCode.tryingToAppendToNonSequence);
        }
        const newNode = documentCopy.createNode(value);
        if (nodeComment) {
            newNode.commentBefore = nodeComment;
        }
        seq.items.push(newNode);
        if (comments && comments.length > 0) {
            if (typeof value !== 'object') {
                throw new errors_1.YAMLError(errors_1.errorTemplate.scalarValuesDoNotHaveProperties, errors_1.errorCode.scalarValuesDoNotHaveProperties);
            }
            const index = seq.items.length - 1;
            for (const c of comments) {
                const propPathArray = this.toPathArray(c.path);
                const n = documentCopy.getIn([...pathArray, index, ...propPathArray], true);
                if (!n) {
                    throw new errors_1.YAMLError((0, texts_1.interpolate)(errors_1.errorTemplate.propertyNotFound, { path: c.path }), errors_1.errorCode.propertyNotFound);
                }
                n.comment = c.comment;
            }
        }
        // Modification succeeded, replace document with modified copy
        this.documents[0] = documentCopy;
        return this;
    }
    /**
     * Updates a node in a sequence in the document.
     *
     * @param path - hierarchical path where the node will be inserted/updated
     * @param {string} path.path - the path object's path
     * @param {object} path.matcher - key/value pair identifying the object
     * @param {object} path.value - the path object's value
     * @param path.matcher.key - name of the key
     * @param path.matcher.value - value of the key
     * @param {'merge' | 'overwrite'} [path.mode] - optional update mode: merge or overwrite, default is merge
     * @returns {YamlDocument} the YamlDocument instance
     * @memberof YamlDocument
     */
    updateAt({ path, matcher, value, mode = 'merge' }) {
        const pathArray = this.toPathArray(path);
        const seq = this.documents[0].getIn(pathArray);
        if (!seq) {
            throw new errors_1.YAMLError((0, texts_1.interpolate)(errors_1.errorTemplate.seqDoesNotExist, { path }), errors_1.errorCode.seqDoesNotExist);
        }
        const node = seq.items.find((nodeInput) => nodeInput.toJSON()[matcher.key] === matcher.value);
        if (!node) {
            throw new errors_1.YAMLError((0, texts_1.interpolate)(errors_1.errorTemplate.nodeNotFoundMatching, { path, key: matcher.key, value: matcher.value }), errors_1.errorCode.nodeNotFoundMatching);
        }
        const newValue = mode === 'merge' ? (0, merge_1.default)(node.toJSON(), value) : value;
        const newNode = this.documents[0].createNode(newValue);
        seq.items.splice(seq.items.indexOf(node), 1, newNode);
        return this;
    }
    /**
     * Simplified method to delete a value in the yaml document.
     *
     * @param key - key of the yaml node to delete
     * @returns `true` if the item was found and removed.
     */
    delete(key) {
        return this.documents[0].delete(key);
    }
    /**
     * Deletes a node in a sequence in the document.
     *
     * @param path - hierarchical path where the node will be deleted
     * @param {string} path.path - the path object's path
     * @param {object} path.matcher - key/value pair identifying the object
     * @param {string} path.matcher.key - the key
     * @param {string} path.matcher.value - the value
     * @returns {YamlDocument} the YamlDocument instance
     * @memberof YamlDocument
     */
    deleteAt({ path, matcher }) {
        const pathArray = this.toPathArray(path);
        const seq = this.documents[0].getIn(pathArray);
        if (!seq?.items) {
            throw new errors_1.YAMLError((0, texts_1.interpolate)(errors_1.errorTemplate.seqDoesNotExist, { path }), errors_1.errorCode.seqDoesNotExist);
        }
        const deletedNode = seq.items.find((node, index) => {
            if (node.toJSON()[matcher.key] === matcher.value) {
                seq.items.splice(index, 1);
                return true;
            }
            else {
                return false;
            }
        });
        if (!deletedNode) {
            throw new errors_1.YAMLError((0, texts_1.interpolate)(errors_1.errorTemplate.propertyNotFound, { path }), errors_1.errorCode.propertyNotFound);
        }
        return this;
    }
    /**
     * @param options - Options
     * @param options.start - Optional collection type to start looking from
     * @param options.path - String path of the node
     * @returns {unknown} - Node, if found. Will throw an error if not
     */
    getNode({ start, path }) {
        if (start) {
            if (!((0, yaml_1.isSeq)(start) || (0, yaml_1.isMap)(start))) {
                throw new errors_1.YAMLError(errors_1.errorTemplate.startNodeMustBeCollection, errors_1.errorCode.startNodeMustBeCollection);
            }
        }
        const pathArray = this.toPathArray(path);
        const node = start || this.documents[0];
        const targetNode = node?.getIn(pathArray);
        if (!targetNode) {
            throw new errors_1.YAMLError((0, texts_1.interpolate)(errors_1.errorTemplate.nodeNotFound, { path }), errors_1.errorCode.nodeNotFound);
        }
        else {
            return targetNode;
        }
    }
    /**
     * @param options - Options
     * @param options.start - Optional collection type to start looking from
     * @param options.path - String path of the sequence
     * @returns {YAMLSeq} - Sequence, if found. Will throw an error if not
     */
    getSequence({ start, path }) {
        const a = this.getNode({ start, path });
        if (!(0, yaml_1.isSeq)(a)) {
            throw new errors_1.YAMLError((0, texts_1.interpolate)(errors_1.errorTemplate.seqDoesNotExist, { path }), errors_1.errorCode.seqDoesNotExist);
        }
        else {
            return a;
        }
    }
    /**
     * @param options - Options
     * @param options.start - Optional collection type to start looking from
     * @param options.path - String path of the map
     * @returns {YAMLMap} - Map, if found. Will throw an error if not
     */
    getMap({ start, path }) {
        const a = this.getNode({ start, path });
        if (!(0, yaml_1.isMap)(a)) {
            throw new errors_1.YAMLError((0, texts_1.interpolate)(errors_1.errorTemplate.nodeNotAMap, { path }), errors_1.errorCode.nodeNotAMap);
        }
        else {
            return a;
        }
    }
    /**
     * @param sequence - Sequence to find the item in
     * @param predicate - predicate function to determine the match
     * @returns {unknown} - Item node if found. Or undefined if not
     */
    findItem(sequence, predicate) {
        const toJson = (o) => (o !== undefined && typeof o.toJSON === 'function' && o.toJSON.call(o)) || {};
        return sequence.items.find((item) => predicate(toJson(item)));
    }
    /**
     * Converts to a path object to an array.
     *
     * @private
     * @template T
     * @param {string} path - string path
     * @returns {string[]} - the path array
     * @memberof YamlDocument
     */
    toPathArray(path) {
        const result = path
            ?.toString()
            .split('.')
            .filter((p) => p !== '')
            .map((p) => (Number.isNaN(Number(p)) ? p : Number(p))); // to add comments to array elements e.g arr.0.prop
        if (!result || result.length === 0) {
            throw new errors_1.YAMLError(errors_1.errorTemplate.pathCannotBeEmpty, errors_1.errorCode.pathCannotBeEmpty);
        }
        return result;
    }
}
exports.YamlDocument = YamlDocument;
//# sourceMappingURL=yaml-document.js.map