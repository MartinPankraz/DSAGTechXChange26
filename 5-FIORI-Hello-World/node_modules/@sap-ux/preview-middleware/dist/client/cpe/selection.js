"use strict";

sap.ui.define(["open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "./control-data", "./utils", "sap/base/Log", "sap/ui/dt/OverlayRegistry", "sap/ui/dt/OverlayUtil", "../utils/core", "../utils/error", "./documentation"], function (___sap_ux_private_control_property_editor_common, ___control_data, ___utils, Log, OverlayRegistry, OverlayUtil, ___utils_core, ___utils_error, ___documentation) {
  "use strict";

  const changeProperty = ___sap_ux_private_control_property_editor_common["changeProperty"];
  const controlSelected = ___sap_ux_private_control_property_editor_common["controlSelected"];
  const propertyChanged = ___sap_ux_private_control_property_editor_common["propertyChanged"];
  const PropertyType = ___sap_ux_private_control_property_editor_common["PropertyType"];
  const reportTelemetry = ___sap_ux_private_control_property_editor_common["reportTelemetry"];
  const selectControl = ___sap_ux_private_control_property_editor_common["selectControl"];
  const buildControlData = ___control_data["buildControlData"];
  const getOverlay = ___utils["getOverlay"];
  const getRuntimeControl = ___utils["getRuntimeControl"];
  const getComponent = ___utils_core["getComponent"];
  const getControlById = ___utils_core["getControlById"];
  const getError = ___utils_error["getError"];
  const getDocumentation = ___documentation["getDocumentation"];
  /**
   * Change id is a combination of controlId and propertyName.
   *
   * @param controlId unique identifier for a control.
   * @param propertyName name of the control property.
   * @returns string
   */
  function propertyChangeId(controlId, propertyName) {
    return [controlId, propertyName].join(',');
  }

  /**
   * Return document of a property.
   *
   * @param property - control metadata props.
   * @param ui5Type - ui5 type
   * @param document - property that is ignored during design time
   * @returns PropertiesInfo
   */
  function getPropertyDocument(property, ui5Type, document) {
    return document?.[property.name] ? document[property.name] : {
      defaultValue: property.defaultValue ?? '-',
      description: '',
      propertyName: property.name,
      type: ui5Type ?? '-',
      propertyType: ui5Type ?? '-'
    };
  }
  async function addDocumentationForProperties(control, controlData) {
    try {
      const controlMetadata = control.getMetadata();
      const allProperties = controlMetadata.getAllProperties();
      const selectedControlName = controlMetadata.getName();
      const selContLibName = controlMetadata.getLibraryName();
      // Add the control's properties
      const document = await getDocumentation(selectedControlName, selContLibName);
      controlData.properties.forEach(controlProp => {
        if (controlProp.propertyType === PropertyType.ControlProperty) {
          const property = allProperties[controlProp.name];
          controlProp.documentation = getPropertyDocument(property, controlProp.ui5Type, document);
        }
      });
    } catch (e) {
      Log.error('Document loading failed', getError(e));
    }
  }

  /**
   *
   */
  class SelectionService {
    appliedChangeCache = new Map();
    activeChangeHandlers = new Set();
    /**
     *
     * @param rta - rta object.
     * @param ui5 - facade for ui5 framework methods
     * @param changeService - change service instance.
     */
    constructor(rta, changeService) {
      this.rta = rta;
      this.changeService = changeService;
    }

    /**
     * Initialize selection service.
     *
     * @param sendAction action sender function
     * @param subscribe subscriber function
     */
    init(sendAction, subscribe) {
      const eventOrigin = new Set();
      const onselectionChange = this.createOnSelectionChangeHandler(sendAction, eventOrigin);
      this.rta.attachSelectionChange(event => {
        onselectionChange(event).catch(error => Log.error('Event interrupted: ', getError(error)));
      });
      subscribe(async action => {
        if (changeProperty.match(action)) {
          this.applyControlPropertyChange(action.payload.controlId, action.payload.propertyName);
        } else if (selectControl.match(action)) {
          const id = action.payload;
          const control = getControlById(id);
          if (!control) {
            const component = getComponent(id);
            if (component) {
              await this.buildProperties(component, sendAction);
            }
            return;
          }
          this.currentSelection = control;
          eventOrigin.add('outline');
          let controlOverlay = OverlayRegistry.getOverlay(control);
          const selectedOverlayControls = this.rta.getSelection() ?? [];
          //remove previous selection
          for (const selectedOverlayControl of selectedOverlayControls) {
            selectedOverlayControl.setSelected(false); //deselect previously selected control
          }
          const controlRef = controlOverlay?.getDomRef?.();
          controlRef?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
          if (!controlRef) {
            //look for closest control in order to highlight in UI the (without firing the selection event)
            controlOverlay = OverlayUtil.getClosestOverlayFor(control);
          }
          if (controlOverlay?.isSelectable()) {
            controlOverlay.setSelected(true); //highlight without firing event only if the layer is selectable
          } else {
            await this.buildProperties(control, sendAction);
          }
        }
      });
      // rebuild config properties in panel for the selected control onStackChange event
      this.changeService.onStackChange(async event => {
        const control = event.detail.controls.find(ctrl => ctrl === this.currentSelection);
        if (control) {
          const overlay = getOverlay(control);
          await this.buildProperties(control, sendAction, overlay);
        }
      });
    }
    async buildProperties(control, sendAction, overlay) {
      const controlData = buildControlData(control, this.changeService, overlay);
      await addDocumentationForProperties(control, controlData);
      const action = controlSelected(controlData);
      sendAction(action);
    }

    /**
     *
     * @param controlId unique identifier for a control
     * @param propertyName name of the control property.
     */
    applyControlPropertyChange(controlId, propertyName) {
      const changeId = propertyChangeId(controlId, propertyName);
      this.appliedChangeCache.set(changeId, Date.now());
    }

    /**
     * Create handler for onSelectionChange.
     *
     * @param sendAction sending action method
     * @param eventOrigin origin of the event.
     * @returns (event: Event) => Promise<void>
     */
    createOnSelectionChangeHandler(sendAction, eventOrigin) {
      return async event => {
        const selection = event.getParameter('selection');
        for (const dispose of this.activeChangeHandlers) {
          dispose();
        }
        this.activeChangeHandlers.clear();
        if (Array.isArray(selection) && selection.length === 1) {
          const overlayControl = sap.ui.getCore().byId(selection[0].getId());
          if (overlayControl) {
            const runtimeControl = getRuntimeControl(overlayControl);
            this.currentSelection = runtimeControl;
            const controlName = runtimeControl.getMetadata().getName();
            this.handlePropertyChanges(runtimeControl, sendAction);
            try {
              const isOutline = eventOrigin.has('outline');
              const name = controlName.toLowerCase().startsWith('sap') ? controlName : 'Other Control Types';
              if (isOutline) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                reportTelemetry({
                  category: 'Outline Selection',
                  controlName: name
                });
              } else {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                reportTelemetry({
                  category: 'Overlay Selection',
                  controlName: name
                });
              }
            } catch (error) {
              const extendedError = getError(error);
              Log.error('Failed to report telemetry', extendedError);
            } finally {
              await this.buildProperties(runtimeControl, sendAction, overlayControl);
              eventOrigin.delete('outline');
            }
          }
        }
      };
    }

    /**
     *
     * @param runtimeControl sap/ui/base/ManagedObject
     * @param sendAction send action method.
     */
    handlePropertyChanges(runtimeControl, sendAction) {
      const handler = e => {
        const propertyName = e.getParameter('name');
        const controlId = e.getParameter('id');
        const changeId = propertyChangeId(controlId, propertyName);
        const timestamp = this.appliedChangeCache.get(changeId);
        if (timestamp) {
          // Change originated from control property editor, we do not need to notify it
          this.appliedChangeCache.delete(changeId);
          return;
        }
        const info = runtimeControl.getBindingInfo(propertyName);
        const newValue = info?.bindingString ?? e.getParameter('newValue');
        const change = propertyChanged({
          controlId,
          propertyName,
          newValue
        });
        sendAction(change);
      };
      runtimeControl.attachEvent('_change', handler);
      this.activeChangeHandlers.add(() => {
        try {
          runtimeControl.detachEvent('_change', handler);
        } catch {
          // control has already been cleaned up, nothing to do here
        }
      });
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.SelectionService = SelectionService;
  return __exports;
});
//# sourceMappingURL=selection.js.map