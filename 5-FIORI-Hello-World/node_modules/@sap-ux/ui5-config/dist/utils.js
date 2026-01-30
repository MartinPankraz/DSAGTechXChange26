"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeObjects = mergeObjects;
exports.getEsmTypesVersion = getEsmTypesVersion;
exports.getTypesVersion = getTypesVersion;
exports.getTypesPackage = getTypesPackage;
exports.replaceEnvVariables = replaceEnvVariables;
const mergeWith_1 = __importDefault(require("lodash/mergeWith"));
const semver_1 = __importDefault(require("semver"));
/**
 * Merges two objects. All properties from base and from extension will be present.
 * Overlapping properties will be used from extension. Arrays will be concatenated and de-duped.
 *
 * @param base - any object definition
 * @param extension - another object definition
 * @returns - a merged package defintion
 */
function mergeObjects(base, extension) {
    return (0, mergeWith_1.default)({}, base, extension, (objValue, srcValue) => {
        // merge and de-dup arrays
        if (objValue instanceof Array && srcValue instanceof Array) {
            return [...new Set([...objValue, ...srcValue])];
        }
        else {
            return undefined;
        }
    });
}
/**
 * Get the best types version for the given minUI5Version within a selective range, starting at 1.90.0
 * for https://www.npmjs.com/package/@sapui5/ts-types-esm or https://www.npmjs.com/package/@sapui5/types.
 * For anything before use 1.90.0, and if no minVersion is provided, use the latest LTS version (1.108.x).
 *
 * @param minUI5Version the minimum UI5 version that needs to be supported
 * @returns semantic version representing the types version.
 */
function getEsmTypesVersion(minUI5Version) {
    const version = semver_1.default.coerce(minUI5Version);
    if (!version) {
        return `~${"1.136.0" /* UI5_DEFAULT.TYPES_VERSION_BEST */}`;
    }
    else if (semver_1.default.lt(version, "1.94.0" /* UI5_DEFAULT.ESM_TYPES_VERSION_SINCE */)) {
        return `~${"1.94.0" /* UI5_DEFAULT.ESM_TYPES_VERSION_SINCE */}`;
    }
    else {
        return `~${semver_1.default.major(version)}.${semver_1.default.minor(version)}.0`;
    }
}
/**
 * Get the best types version for the given minUI5Version for https://www.npmjs.com/package/@sapui5/ts-types where specific versions are missing.
 *
 * @param minUI5Version the minimum UI5 version that needs to be supported
 * @returns semantic version representing the types version.
 */
function getTypesVersion(minUI5Version) {
    const version = semver_1.default.coerce(minUI5Version);
    if (!version) {
        return `~${"1.136.0" /* UI5_DEFAULT.TYPES_VERSION_BEST */}`;
    }
    else if (semver_1.default.lt(version, "1.76.0" /* UI5_DEFAULT.TYPES_VERSION_SINCE */)) {
        return `~${"1.76.0" /* UI5_DEFAULT.TYPES_VERSION_SINCE */}`;
    }
    else {
        return `~${semver_1.default.major(version)}.${semver_1.default.minor(version)}.0`;
    }
}
/**
 * Get the correct type package name for the given ui5Version.
 * For anything before 1.113.0, use https://www.npmjs.com/package/@sapui5/ts-types-esm,
 * otherwise use the new package https://www.npmjs.com/package/@sapui5/types.
 *
 * @param ui5Version the UI5 version to get the correct package for
 * @returns string representing the types package name.
 */
function getTypesPackage(ui5Version) {
    const version = semver_1.default.coerce(ui5Version) ?? semver_1.default.coerce("1.136.0" /* UI5_DEFAULT.TYPES_VERSION_BEST */);
    if (version && semver_1.default.lt(version, "1.113.0" /* UI5_DEFAULT.NEW_TYPES_PACKAGE_SINCE */)) {
        return "@sapui5/ts-types-esm" /* UI5_DEFAULT.TS_TYPES_ESM_PACKAGE_NAME */;
    }
    else {
        return "@sapui5/types" /* UI5_DEFAULT.TYPES_PACKAGE_NAME */;
    }
}
/**
 * Replace environment variable references of pattern `env:VAR_NAME` with the value of the corresponding environment variable.
 *
 * @param obj - any object structure
 */
function replaceEnvVariables(obj) {
    for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'object') {
            replaceEnvVariables(value);
        }
        else if (typeof value === 'string' && value.startsWith('env:')) {
            const varName = value.split('env:')[1];
            obj[key] = process.env[varName];
        }
    }
}
//# sourceMappingURL=utils.js.map