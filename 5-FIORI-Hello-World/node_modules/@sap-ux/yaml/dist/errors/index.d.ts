import { YAMLError } from './yaml-error';
export declare const errorCode: Readonly<{
    yamlParsing: "yamlParsing";
    nodeNotFound: "nodeNotFound";
    nodeNotFoundMatching: "nodeNotFoundMatching";
    nodeNotAMap: "nodeNotAMap";
    propertyNotFound: "propertyNotFound";
    pathCannotBeEmpty: "pathCannotBeEmpty";
    pathDoesNotExist: "pathDoesNotExist";
    seqDoesNotExist: "seqDoesNotExist";
    tryingToAppendToNonSequence: "tryingToAppendToNonSequence";
    startNodeMustBeCollection: "startNodeMustBeCollection";
    scalarValuesDoNotHaveProperties: "scalarValuesDoNotHaveProperties";
}>;
export type ErrorTemplate = Record<string, string>;
export declare const errorTemplate: Readonly<ErrorTemplate>;
export { YAMLError };
//# sourceMappingURL=index.d.ts.map