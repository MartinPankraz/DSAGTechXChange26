"use strict";

sap.ui.define(["./utils", "sap/base/Log", "open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "../utils/info-center-message", "../utils/error"], function (___utils, Log, ___sap_ux_private_control_property_editor_common, ___utils_info_center_message, ___utils_error) {
  "use strict";

  const getLibrary = ___utils["getLibrary"];
  const MessageBarType = ___sap_ux_private_control_property_editor_common["MessageBarType"];
  const sendInfoCenterMessage = ___utils_info_center_message["sendInfoCenterMessage"];
  const FetchError = ___utils_error["FetchError"];
  /**
   * Get ui5 metadata of given library name.
   *
   * @param libName library name for eg: sap.m
   * @returns Promise<SchemaForApiJsonFiles>
   */
  async function getUi5ApiDtMetadata(libName) {
    const libUrl = '/test-resources/' + libName.split('.').join('/') + '/designtime/api.json';
    const response = await fetch(libUrl);
    if (!response.ok) {
      throw new FetchError(response);
    }
    return response.json();
  }

  /**
   * load ui5 controls design time metadata api.json for following libraries
   * sap.m, sap.ui.comp, sap.f, sap.ui.core
   * loading libraries(more in file size) in parallel during initialization.
   * Others (less in file size) are loaded dynamically in getControlMetadata method
   */
  const ui5ApiDtMetadata = new Map();
  function loadDefaultLibraries() {
    const allData = Promise.all([getUi5ApiDtMetadata('sap.m'), getUi5ApiDtMetadata('sap.ui.comp'), getUi5ApiDtMetadata('sap.ui.core'), getUi5ApiDtMetadata('sap.f')]);
    allData.then(res => {
      res.forEach(api => {
        if (api.library) {
          ui5ApiDtMetadata.set(api.library, api);
        }
      });
    }).catch(reason => {
      Log.error('Loading Library Failed: ' + reason);
    });
  }

  /**
   * Format html text.
   *
   * @param sHtml - html string
   * @returns string
   */
  function formatHtmlText(sHtml) {
    // replaced "sHtml.replace(new RegExp('<[^>]*>', 'g')" due to regex runtime vulnerability
    const parts = (sHtml || '').split('<');
    let result = '';
    for (const part of parts) {
      if (!result) {
        result = part;
      } else {
        const indexClosingBracket = part.indexOf('>');
        result += indexClosingBracket >= 0 ? part.substring(indexClosingBracket + 1) : `<${part}`;
      }
    }
    return result;
  }

  /**
   * Method to parse ui5 control metadata.
   *
   * @param controlLibMetadata control library metadata
   * @param controlName name of the control
   * @returns ControlMetadata
   */
  function parseControlMetaModel(controlLibMetadata, controlName) {
    const controlInfo = {
      baseType: '',
      doc: '',
      properties: {}
    };
    const selectedControlMetadata = (controlLibMetadata.symbols ?? []).find(control => control.name === controlName);
    if (selectedControlMetadata) {
      // base type info of control is available on property 'extends'
      controlInfo.baseType = selectedControlMetadata.extends;
      controlInfo.doc = selectedControlMetadata.description ?? '';
      const properties = selectedControlMetadata['ui5-metadata'].properties;
      if (properties) {
        properties.forEach(prop => {
          prop.description = formatHtmlText(prop.description || '');
          prop.propertyName = prop.name;
          prop.propertyType = prop.type;
          if (prop.defaultValue === null || prop.defaultValue === '') {
            prop.defaultValue = '-';
          }
          controlInfo.properties[prop.name] = {
            ...prop
          };
        });
      }
    }
    return controlInfo;
  }

  /**
   * Get control metadata for a given control.
   *
   * @param controlName name of the control
   * @param contLibName library name of the control
   * @returns Promise<ControlMetadata | undefined>
   */
  async function getControlMetadata(controlName, contLibName) {
    let result;
    let controlLibMetadata = ui5ApiDtMetadata.get(contLibName);
    if (controlLibMetadata) {
      result = parseControlMetaModel(controlLibMetadata, controlName);
    } else {
      controlLibMetadata = await getUi5ApiDtMetadata(contLibName);
      ui5ApiDtMetadata.set(contLibName, controlLibMetadata);
      result = parseControlMetaModel(controlLibMetadata, controlName);
    }
    return result;
  }

  /**
   * Get Control Property Documentation for a give control name and control library.
   *
   * @param controlName name of the control
   * @param contLibName library name of the control
   * @returns Promise<Properties | undefined>
   */
  async function getControlPropertyDocumentation(controlName, contLibName) {
    const doc = await getControlMetadata(controlName, contLibName);
    if (doc) {
      const baseControlType = doc.baseType;
      if (baseControlType) {
        const baseContLibName = await getLibrary(baseControlType);
        if (baseContLibName) {
          const baseControlProps = await getControlPropertyDocumentation(baseControlType, baseContLibName);
          return {
            ...baseControlProps,
            ...doc.properties
          };
        }
      }
      return {
        ...doc.properties
      };
    } else {
      return undefined;
    }
  }

  /**
   * Get documentation of a given control of a ui5 library.
   *
   * @param controlName name of the control.
   * @param contLibName library name of the control
   * @returns Promise<Properties | undefined>
   */
  async function getDocumentation(controlName, contLibName) {
    let doc;
    try {
      doc = await getControlPropertyDocumentation(controlName, contLibName);
    } catch (error) {
      Log.error(`Error in getting documentation for ${contLibName}`);
      // For some UI5 components we do not have an api.json provided instead 404, not found,
      // response is retuned from the server. For such components we do not want to
      // flood the info center with errors.
      if (error instanceof FetchError && error.status === 404) {
        return undefined;
      }
      await sendInfoCenterMessage({
        title: {
          key: 'DOCUMENTATION_ERROR_TITLE'
        },
        description: {
          key: 'DOCUMENTATION_ERROR_DESCRIPTION',
          params: [contLibName]
        },
        type: MessageBarType.error
      });
    }
    return doc;
  }
  var __exports = {
    __esModule: true
  };
  __exports.getUi5ApiDtMetadata = getUi5ApiDtMetadata;
  __exports.loadDefaultLibraries = loadDefaultLibraries;
  __exports.getDocumentation = getDocumentation;
  return __exports;
});
//# sourceMappingURL=documentation.js.map