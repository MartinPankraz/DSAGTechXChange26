"use strict";

sap.ui.define(["./dialog-enablement-validator"], function (___dialog_enablement_validator) {
  "use strict";

  const DIALOG_ENABLEMENT_VALIDATOR = ___dialog_enablement_validator["DIALOG_ENABLEMENT_VALIDATOR"];
  /**
   * Base class for all  quick actions.
   */
  class QuickActionDefinitionBase {
    get id() {
      return `${this.context.key}-${this.type}`;
    }
    getTelemetryIdentifier(update = false) {
      if (update === true) {
        this.telemetryIdentifier = new Date().toISOString();
      }
      return this.telemetryIdentifier;
    }
    get quickActionSteps() {
      return this.enablementValidators.find(item => item === DIALOG_ENABLEMENT_VALIDATOR) ? 2 : 1;
    }

    /**
     * Quick Actions tooltip.
     */
    get tooltip() {
      if (this.validationResult) {
        const validationErrors = this.validationResult.filter(result => result?.type === 'error');
        if (validationErrors.length > 0) {
          const error = validationErrors[0];
          return error.message;
        }
      }
      return undefined;
    }
    get isDisabled() {
      if (this.validationResult === undefined) {
        return false;
      }
      const validationErrors = this.validationResult.filter(result => result?.type === 'error');
      return validationErrors.length > 0;
    }
    get textKey() {
      return this.defaultTextKey;
    }
    constructor(type, kind, defaultTextKey, context, enablementValidators = []) {
      this.type = type;
      this.kind = kind;
      this.defaultTextKey = defaultTextKey;
      this.context = context;
      this.enablementValidators = enablementValidators;
    }
    async runEnablementValidators() {
      this.validationResult = await Promise.all(this.enablementValidators.map(async validator => await validator.run()));
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.QuickActionDefinitionBase = QuickActionDefinitionBase;
  return __exports;
});
//# sourceMappingURL=quick-action-base.js.map