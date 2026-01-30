"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinCdsVersion = exports.MinCdsPluginUi5Version = exports.moduleCacheRoot = exports.fioriToolsDirectory = exports.SchemaName = exports.FioriToolsSettings = exports.DirName = exports.FileName = void 0;
const node_os_1 = require("node:os");
const node_path_1 = require("node:path");
exports.FileName = {
    AdaptationConfig: 'config.json',
    CapJavaApplicationYaml: 'application.yaml',
    ExtConfigJson: '.extconfig.json',
    IndexCds: 'index.cds',
    Library: '.library',
    Manifest: 'manifest.json',
    ManifestAppDescrVar: 'manifest.appdescr_variant',
    MtaYaml: 'mta.yaml',
    Package: 'package.json',
    Pom: 'pom.xml',
    SpecificationDistTags: 'specification-dist-tags.json',
    ServiceCds: 'services.cds',
    Tsconfig: 'tsconfig.json',
    Ui5Yaml: 'ui5.yaml',
    Ui5LocalYaml: 'ui5-local.yaml',
    Ui5MockYaml: 'ui5-mock.yaml',
    UI5DeployYaml: 'ui5-deploy.yaml',
    PackageLock: 'package-lock.json',
    XSAppJson: 'xs-app.json',
    XSSecurityJson: 'xs-security.json',
    DotGitIgnore: '.gitignore',
    MtaExtYaml: 'mta-ext.mtaext'
};
exports.DirName = {
    Changes: 'changes',
    ModuleCache: 'module-cache',
    Schemas: '.schemas',
    Pages: 'pages',
    Webapp: 'webapp',
    Temp: '.tmp',
    LocalService: 'localService',
    Controller: 'controller',
    View: 'view',
    Fragment: 'fragment',
    Fragments: 'fragments',
    Ext: 'ext',
    VSCode: '.vscode',
    AppConfig: 'appconfig',
    Db: 'db',
    Csv: 'csv',
    Data: 'data',
    Mockdata: 'mockdata',
    Dist: 'dist',
    Coding: 'coding',
    Manifest: 'manifest',
    Annotations: 'annotations'
};
exports.FioriToolsSettings = {
    dir: '.fioritools',
    migrationSettingsFile: 'migrationSettings.json'
};
exports.SchemaName = {
    Ftfs: 'ftfs'
};
/**
 * Directory where fiori tools settings are stored
 */
exports.fioriToolsDirectory = (0, node_path_1.join)((0, node_os_1.homedir)(), exports.FioriToolsSettings.dir);
/**
 * Directory where modules are cached
 */
exports.moduleCacheRoot = (0, node_path_1.join)(exports.fioriToolsDirectory, exports.DirName.ModuleCache);
exports.MinCdsPluginUi5Version = '0.13.0';
exports.MinCdsVersion = '6.8.2';
//# sourceMappingURL=constants.js.map