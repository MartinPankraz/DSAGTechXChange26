"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMtaPath = getMtaPath;
const file_search_1 = require("../file/file-search");
const constants_1 = require("../constants");
const node_path_1 = require("node:path");
/**
 * Searches `projectPath` and parent folders.
 * If mta.yaml file is inside projectPath, this is a special type of MTA project
 * that created in Fiori generator (Standalone App Router). E.g. Creating a new project that doesn't have
 * a parent root folder for MTA project, and this project itself is configured
 * to have deploy target CF and user answered yes to "add to Managed App Router" question.
 *
 * @param projectPath - Fiori app root folder
 * @param fs - optional mem-fs-editor instance
 * @returns - MtaPath
 */
async function getMtaPath(projectPath, fs) {
    const mtaPath = await (0, file_search_1.findFileUp)(constants_1.FileName.MtaYaml, projectPath, fs);
    if (!mtaPath) {
        return undefined;
    }
    else {
        const mtaFolderPath = (0, node_path_1.dirname)(mtaPath);
        return {
            mtaPath,
            hasRoot: mtaFolderPath !== projectPath
        };
    }
}
//# sourceMappingURL=mta.js.map