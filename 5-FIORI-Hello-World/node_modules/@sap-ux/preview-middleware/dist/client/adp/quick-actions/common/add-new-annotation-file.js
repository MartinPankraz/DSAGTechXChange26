"use strict";

sap.ui.define(["open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "sap/ui/dt/OverlayRegistry", "sap/ui/rta/command/CommandFactory", "../../../utils/application", "../../../utils/fe-v4", "../../../utils/version", "../../api-handler", "../../dialog-factory", "../dialog-enablement-validator", "../fe-v2/utils", "../quick-action-base"], function (___sap_ux_private_control_property_editor_common, OverlayRegistry, CommandFactory, _____utils_application, _____utils_fe_v4, _____utils_version, ____api_handler, ____dialog_factory, ___dialog_enablement_validator, ___fe_v2_utils, ___quick_action_base) {
  "use strict";

  const NESTED_QUICK_ACTION_KIND = ___sap_ux_private_control_property_editor_common["NESTED_QUICK_ACTION_KIND"];
  const getApplicationType = _____utils_application["getApplicationType"];
  const getV4AppComponent = _____utils_fe_v4["getV4AppComponent"];
  const getUi5Version = _____utils_version["getUi5Version"];
  const isLowerThanMinimalUi5Version = _____utils_version["isLowerThanMinimalUi5Version"];
  const getDataSourceAnnotationFileMap = ____api_handler["getDataSourceAnnotationFileMap"];
  const DialogFactory = ____dialog_factory["DialogFactory"];
  const DialogNames = ____dialog_factory["DialogNames"];
  const DIALOG_ENABLEMENT_VALIDATOR = ___dialog_enablement_validator["DIALOG_ENABLEMENT_VALIDATOR"];
  const getV2AppComponent = ___fe_v2_utils["getV2AppComponent"];
  const QuickActionDefinitionBase = ___quick_action_base["QuickActionDefinitionBase"];
  const ADD_NEW_ANNOTATION_FILE = 'add-new-annotation-file';
  const ADD_NEW_ANNOTATION_FILE_TITLE = 'QUICK_ACTION_ADD_NEW_ANNOTATION_FILE';

  /**
   * Add New Annotation File.
   */
  class AddNewAnnotationFile extends QuickActionDefinitionBase {
    children = [];
    get quickActionSteps() {
      return 1;
    }
    kind = NESTED_QUICK_ACTION_KIND;
    type = ADD_NEW_ANNOTATION_FILE;
    forceRefreshAfterExecution = true;
    isApplicable = true;
    get id() {
      return `${this.context.key}-${this.type}`;
    }
    constructor(context) {
      super(ADD_NEW_ANNOTATION_FILE, NESTED_QUICK_ACTION_KIND, '', context, [DIALOG_ENABLEMENT_VALIDATOR]);
      this.context = context;
    }
    async initialize() {
      const version = await getUi5Version();
      if (isLowerThanMinimalUi5Version(version, {
        major: 1,
        minor: 108,
        patch: 27
      })) {
        this.isApplicable = false;
        return;
      }
      this.annotationDataSourceData = await getDataSourceAnnotationFileMap();
      const {
        annotationDataSourceMap
      } = this.annotationDataSourceData;
      if (!Object.keys(this.annotationDataSourceData.annotationDataSourceMap).length) {
        throw new Error('No data sources found in the manifest');
      }
      for (const key in annotationDataSourceMap) {
        if (Object.prototype.hasOwnProperty.call(annotationDataSourceMap, key)) {
          const source = annotationDataSourceMap[key];
          const {
            annotationExistsInWS
          } = source.annotationDetails;
          if (source.metadataReadErrorMsg) {
            this.children.push({
              path: this.children.length.toString(),
              enabled: false,
              tooltip: source.metadataReadErrorMsg,
              label: this.context.resourceBundle.getText('ADD_ANNOTATION_FILE', [key]),
              children: []
            });
          } else {
            this.children.push({
              path: this.children.length.toString(),
              enabled: true,
              label: annotationExistsInWS ? this.context.resourceBundle.getText('SHOW_ANNOTATION_FILE', [key]) : this.context.resourceBundle.getText('ADD_ANNOTATION_FILE', [key]),
              children: []
            });
          }
        }
      }
    }
    get textKey() {
      let result = ADD_NEW_ANNOTATION_FILE_TITLE;
      const dataSourceIds = Object.keys(this.annotationDataSourceData.annotationDataSourceMap);
      if (dataSourceIds.length === 1) {
        const details = this.annotationDataSourceData.annotationDataSourceMap[dataSourceIds[0]];
        if (details.annotationDetails.annotationExistsInWS) {
          result = 'QUICK_ACTION_SHOW_ANNOTATION_FILE';
        }
      }
      return result;
    }
    async execute(path) {
      const {
        annotationDataSourceMap,
        isRunningInBAS
      } = this.annotationDataSourceData;
      const appType = getApplicationType(this.context.rta.getRootControlInstance().getManifest());
      const index = Number(path);
      if (index >= 0) {
        const dataSourceId = Object.keys(annotationDataSourceMap)[index];
        const dataSource = annotationDataSourceMap[dataSourceId];
        if (dataSource?.annotationDetails.annotationExistsInWS) {
          const annotationFileDetails = dataSource.annotationDetails;
          const {
            annotationPath,
            annotationPathFromRoot
          } = annotationFileDetails;
          await DialogFactory.createDialog(OverlayRegistry.getOverlay(this.context.view),
          // this passed only because, for method param is required.
          this.context.rta,
          // same as above
          DialogNames.FILE_EXISTS, undefined, {
            fileName: annotationPathFromRoot,
            filePath: annotationPath,
            isRunningInBAS: isRunningInBAS
          });
        }
        // Create annotation file only, if no file exists already for datasource id or if the change file exist and but no annotation file exists in file system.
        else if (dataSource) {
          const timestamp = Date.now();
          const annotationFileNameWithoutExtension = `annotation_${timestamp}`;
          const annotationFileName = `${annotationFileNameWithoutExtension}.xml`;
          const annotationNameSpace = this.context.flexSettings.layer === 'CUSTOMER_BASE' ? `customer.annotation.${annotationFileNameWithoutExtension}` : `annotation.${annotationFileNameWithoutExtension}`;
          const parameters = {
            dataSourceId: dataSourceId,
            annotations: [annotationNameSpace],
            annotationsInsertPosition: 'END',
            dataSource: {
              [annotationNameSpace]: {
                uri: `annotations/${annotationFileName}`,
                type: 'ODataAnnotation'
              }
            }
          };
          const modifiedValue = {
            changeType: 'appdescr_app_addAnnotationsToOData',
            appComponent: appType === 'fe-v4' ? getV4AppComponent(this.context.view) : getV2AppComponent(this.context.view),
            generator: this.context.flexSettings.generator,
            reference: this.context.flexSettings.projectId,
            parameters,
            serviceUrl: dataSource.serviceUrl
          };
          const command = await CommandFactory.getCommandFor(this.context.view, 'appDescriptor', modifiedValue, null, this.context.flexSettings);
          return [command];
        }
      }
      return [];
    }

    /**
     * Prepares nested quick action object
     * @returns action instance
     */
    getActionObject() {
      return {
        kind: NESTED_QUICK_ACTION_KIND,
        id: this.id,
        enabled: this.isApplicable,
        title: this.context.resourceBundle.getText(this.textKey),
        children: this.children
      };
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.ADD_NEW_ANNOTATION_FILE = ADD_NEW_ANNOTATION_FILE;
  __exports.AddNewAnnotationFile = AddNewAnnotationFile;
  return __exports;
});
//# sourceMappingURL=add-new-annotation-file.js.map