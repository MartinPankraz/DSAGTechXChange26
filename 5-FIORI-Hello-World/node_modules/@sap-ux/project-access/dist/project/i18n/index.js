"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCapI18nEntries = exports.createAnnotationI18nEntries = exports.createUI5I18nEntries = exports.createManifestI18nEntries = exports.getI18nBundles = exports.getCapI18nFolderNames = exports.getI18nPropertiesPaths = void 0;
var i18n_1 = require("./i18n");
Object.defineProperty(exports, "getI18nPropertiesPaths", { enumerable: true, get: function () { return i18n_1.getI18nPropertiesPaths; } });
var read_1 = require("./read");
Object.defineProperty(exports, "getCapI18nFolderNames", { enumerable: true, get: function () { return read_1.getCapI18nFolderNames; } });
Object.defineProperty(exports, "getI18nBundles", { enumerable: true, get: function () { return read_1.getI18nBundles; } });
var write_1 = require("./write");
Object.defineProperty(exports, "createManifestI18nEntries", { enumerable: true, get: function () { return write_1.createManifestI18nEntries; } });
Object.defineProperty(exports, "createUI5I18nEntries", { enumerable: true, get: function () { return write_1.createUI5I18nEntries; } });
Object.defineProperty(exports, "createAnnotationI18nEntries", { enumerable: true, get: function () { return write_1.createAnnotationI18nEntries; } });
Object.defineProperty(exports, "createCapI18nEntries", { enumerable: true, get: function () { return write_1.createCapI18nEntries; } });
//# sourceMappingURL=index.js.map