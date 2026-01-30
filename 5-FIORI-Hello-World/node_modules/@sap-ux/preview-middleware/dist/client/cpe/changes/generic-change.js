"use strict";

sap.ui.define(["../../utils/version", "sap/ui/core/util/reflection/JsControlTreeModifier", "sap/base/Log", "../../utils/error", "../../utils/fe-v4"], function (____utils_version, JsControlTreeModifier, Log, ____utils_error, ____utils_fe_v4) {
  "use strict";

  function __ui5_require_async(path) {
    return new Promise(function (resolve, reject) {
      sap.ui.require([path], function (module) {
        if (!(module && module.__esModule)) {
          module = module === null || !(typeof module === "object" && path.endsWith("/library")) ? {
            default: module
          } : module;
          Object.defineProperty(module, "__esModule", {
            value: true
          });
        }
        resolve(module);
      }, function (err) {
        reject(err);
      });
    });
  }
  const getUi5Version = ____utils_version["getUi5Version"];
  const isLowerThanMinimalUi5Version = ____utils_version["isLowerThanMinimalUi5Version"];
  const getError = ____utils_error["getError"];
  const getConfigMapControlIdMap = ____utils_fe_v4["getConfigMapControlIdMap"];
  const ADD_NEW_ANNOTATION_FILE_CHANGE = 'appdescr_app_addAnnotationsToOData';
  const RENAME_CHANGE = 'rename';
  const MOVE_CHANGE = 'moveControls';
  const ADD_XML_CHANGE = 'addXML';
  const PROPERTY_CHANGE = 'propertyChange';
  const PROPERTY_BINDING_CHANGE = 'propertyBindingChange';
  const MANIFEST_V4_CHANGE = 'appdescr_fe_changePageConfiguration';
  const MANIFEST_V2_CHANGE = 'appdescr_ui_generic_app_changePageConfiguration';
  /**
   * Returns a shortened version of the given configuration path segments by removing excess segments,
   * leaving only the most relevant parts for display. For example, the configuration path
   * `controlConfiguration/com.sap.UI.v1.LineItem/tableSettings` will be shortened to
   * `LineItem/tableSettings`.
   *
   * @param propertyPathSeg string[]
   * @returns string
   */
  function getCompactV4ConfigPath(propertyPathSeg) {
    return propertyPathSeg.join('/').replace(/^controlConfiguration\/(?:([^/]+\/))?@[^/]+\.v1\./, '$1');
  }
  function assertProperties(properties, target) {
    for (const property of properties) {
      const value = target[property];
      if (value === null || value === undefined) {
        throw new Error(`Invalid change, missing ${property} in the change file`);
      }
    }
  }
  /**
   * Assert change for its validity. Throws error if no value found in saved changes.
   *
   * @param change Change object
   */
  function assertChange(change) {
    assertProperties(['fileName', 'selector', 'content'], change);
    assertProperties(['id'], change.selector);
    assertProperties(['property'], change.content);
  }
  function assertManifestChange(change) {
    assertProperties(['fileName', 'content'], change);
    assertProperties(['page', 'entityPropertyChange'], change.content);
    assertProperties(['propertyPath', 'operation', 'propertyValue'], change.content.entityPropertyChange);
  }

  /**
   * Get FlexObject from change object based on UI5 version.
   *
   * @param change change object
   * @returns FlexChange
   */
  async function getFlexObject(change) {
    if (isLowerThanMinimalUi5Version(await getUi5Version(), {
      major: 1,
      minor: 109
    })) {
      const Change = (await __ui5_require_async('sap/ui/fl/Change')).default;
      return new Change(change);
    }
    const FlexObjectFactory = (await __ui5_require_async('sap/ui/fl/apply/_internal/flexObjects/FlexObjectFactory')).default;
    return FlexObjectFactory.createFromFileContent(change);
  }

  /**
   * Get element id by change.
   *
   * @param change to be executed for creating change
   * @param appComponent app component
   * @returns element id or empty string
   */
  async function getControlIdByChange(change, appComponent) {
    const selector = typeof change.getSelector === 'function' ? change.getSelector() : undefined;
    const changeType = change.getChangeType();
    const layer = change.getLayer();
    if (!selector?.id) {
      return;
    }
    try {
      const control = JsControlTreeModifier.bySelector(selector, appComponent);
      if (!control) {
        return selector.id;
      }
      const changeHandlerAPI = (await __ui5_require_async('sap/ui/fl/write/api/ChangesWriteAPI')).default;
      if (typeof changeHandlerAPI?.getChangeHandler !== 'function') {
        return selector.id;
      }
      const changeHandler = await changeHandlerAPI.getChangeHandler({
        changeType,
        element: control,
        modifier: JsControlTreeModifier,
        layer
      });
      if (changeHandler && typeof changeHandler.getChangeVisualizationInfo === 'function') {
        const result = await changeHandler.getChangeVisualizationInfo(change, appComponent);
        return JsControlTreeModifier.getControlIdBySelector(result?.affectedControls?.[0] ?? selector, appComponent);
      }
      return JsControlTreeModifier.getControlIdBySelector(selector, appComponent);
    } catch (error) {
      Log.error('Getting element ID from change has failed:', getError(error));
      return selector.id;
    }
  }
  async function getPropertyChange(change, {
    appComponent
  }) {
    const propertyChange = change;
    const flexObject = await getFlexObject(change);
    const selectorId = await getControlIdByChange(flexObject, appComponent);
    const changeTitle = change.selector.type ? change.selector.type.split('.').pop() : '';
    assertChange(propertyChange);
    if ([propertyChange.content.newValue, propertyChange.content.newBinding].every(item => item === undefined || item === null)) {
      throw new Error('Invalid change, missing new value in the change file');
    }
    if (change.changeType !== PROPERTY_CHANGE && change.changeType !== PROPERTY_BINDING_CHANGE) {
      throw new Error('Unknown Change Type');
    }
    return {
      changeTitle: changeTitle,
      controlId: selectorId,
      changeType: 'property',
      properties: [{
        label: propertyChange.content.property,
        value: propertyChange.content.newValue ?? propertyChange.content.newBinding,
        displayValueWithIcon: true
      }]
    };
  }
  function getV2ConfigurationChange(change, {
    textBundle
  }) {
    const {
      entityPropertyChange,
      parentPage
    } = change.content;
    const propertyPathSegments = entityPropertyChange.propertyPath.split('/');
    const propertyName = Object.keys(entityPropertyChange.propertyValue)?.[0] ?? propertyPathSegments[propertyPathSegments.length - 1];
    const propertyValue = entityPropertyChange.propertyValue?.[propertyName] ?? entityPropertyChange.propertyValue;
    return {
      changeTitle: textBundle?.getText('CONFIGURATION_CHANGE'),
      controlId: [],
      changeType: 'configuration',
      subtitle: entityPropertyChange.propertyPath ?? parentPage.component,
      properties: [{
        label: propertyName ?? '',
        value: propertyValue,
        displayValueWithIcon: true
      }]
    };
  }
  function getV4ConfigurationChange(change, {
    configPropertyControlIdMap,
    textBundle
  }) {
    assertManifestChange(change);
    if ([change.content.entityPropertyChange.propertyValue].every(item => item === undefined || item === null)) {
      throw new Error('Invalid change, missing property value on change file');
    }
    const propertyPathSegments = change.content.entityPropertyChange.propertyPath.split('/');
    const propertyName = propertyPathSegments.pop();
    if (!propertyName) {
      throw new Error('No property name found');
    }
    const configMapKey = getConfigMapControlIdMap(change.content.page, propertyPathSegments);
    const controlIds = configPropertyControlIdMap?.get(configMapKey) || [];
    const value = change.content.entityPropertyChange.propertyValue;
    const properties = typeof value === 'object' ? [{
      label: propertyName,
      displayValueWithIcon: true
    }, ...Object.keys(value).map(key => {
      if (typeof value[key] === 'object') {
        return undefined;
      }
      return {
        label: key,
        value: value[key],
        displayValueWithIcon: true
      };
    }).filter(item => !!item)] : [{
      label: propertyName,
      value,
      displayValueWithIcon: true
    }];
    return {
      changeTitle: textBundle?.getText('CONFIGURATION_CHANGE'),
      controlId: controlIds,
      changeType: 'configuration',
      subtitle: getCompactV4ConfigPath(propertyPathSegments),
      properties
    };
  }
  const GENERIC_CHANGE_HANDLER = {
    [ADD_NEW_ANNOTATION_FILE_CHANGE]: (annotationFileChange, {
      textBundle
    }) => {
      const dataSourceId = annotationFileChange.content.dataSourceId;
      const sourceKey = Object.keys(annotationFileChange.content.dataSource)[0];
      return {
        changeTitle: textBundle?.getText('ADD_NEW_ANNOTATION_FILE'),
        changeType: 'configuration',
        properties: [{
          label: textBundle?.getText('SERVICE_NAME'),
          value: dataSourceId
        }, {
          label: textBundle?.getText('ANNOTATION_FILE_URI'),
          value: annotationFileChange.content.dataSource[sourceKey].uri
        }]
      };
    },
    [RENAME_CHANGE]: (renameChange, {
      textBundle
    }) => {
      const selectorId = renameChange.selector.id;
      return {
        changeTitle: textBundle?.getText('RENAME_CHANGE'),
        controlId: selectorId,
        properties: [{
          label: textBundle?.getText('SELECTOR_ID'),
          value: selectorId
        }, {
          label: textBundle?.getText('NEW_VALUE'),
          value: renameChange.texts.newText.value
        }, {
          label: textBundle?.getText('TEXT_TYPE'),
          value: renameChange.texts.newText.type
        }]
      };
    },
    [MOVE_CHANGE]: (moveChange, {
      textBundle
    }) => {
      const movedControlId = moveChange.content.movedElements[0].selector.id;
      return {
        changeTitle: textBundle?.getText('MOVE_CONTROLS_CHANGE'),
        controlId: movedControlId,
        properties: [{
          label: textBundle?.getText('TARGET_CONTROL_ID'),
          value: moveChange.content.target.selector.id
        }, {
          label: textBundle?.getText('MOVE_FROM_INDEX'),
          value: String(moveChange.content.movedElements[0].sourceIndex)
        }, {
          label: textBundle?.getText('MOVE_TO_INDEX'),
          value: String(moveChange.content.movedElements[0].targetIndex)
        }, {
          label: textBundle?.getText('MOVED_CONTROL_ID'),
          value: movedControlId
        }]
      };
    },
    [ADD_XML_CHANGE]: (addXmlChange, {
      textBundle
    }) => {
      return {
        changeTitle: textBundle?.getText('ADD_XML_CHANGE'),
        controlId: addXmlChange.selector.id,
        properties: [{
          label: textBundle?.getText('AGGREGATION'),
          value: addXmlChange.content.targetAggregation
        }, {
          label: textBundle?.getText('FRAGMENT_PATH'),
          value: addXmlChange.content.fragmentPath
        }]
      };
    },
    [PROPERTY_CHANGE]: async (change, handlerOptions) => {
      return getPropertyChange(change, handlerOptions);
    },
    [PROPERTY_BINDING_CHANGE]: async (change, handlerOptions) => {
      return getPropertyChange(change, handlerOptions);
    },
    [MANIFEST_V4_CHANGE]: (change, handlerOptions) => {
      return getV4ConfigurationChange(change, handlerOptions);
    },
    [MANIFEST_V2_CHANGE]: (change, handlerOptions) => {
      return getV2ConfigurationChange(change, handlerOptions);
    }
  };
  var __exports = {
    __esModule: true
  };
  __exports.ADD_NEW_ANNOTATION_FILE_CHANGE = ADD_NEW_ANNOTATION_FILE_CHANGE;
  __exports.RENAME_CHANGE = RENAME_CHANGE;
  __exports.MOVE_CHANGE = MOVE_CHANGE;
  __exports.ADD_XML_CHANGE = ADD_XML_CHANGE;
  __exports.PROPERTY_CHANGE = PROPERTY_CHANGE;
  __exports.PROPERTY_BINDING_CHANGE = PROPERTY_BINDING_CHANGE;
  __exports.MANIFEST_V4_CHANGE = MANIFEST_V4_CHANGE;
  __exports.MANIFEST_V2_CHANGE = MANIFEST_V2_CHANGE;
  __exports.assertProperties = assertProperties;
  __exports.assertChange = assertChange;
  __exports.getFlexObject = getFlexObject;
  __exports.getControlIdByChange = getControlIdByChange;
  __exports.GENERIC_CHANGE_HANDLER = GENERIC_CHANGE_HANDLER;
  return __exports;
});
//# sourceMappingURL=generic-change.js.map