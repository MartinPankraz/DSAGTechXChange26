import { ENV_H2O_URL } from "../utils/destinations";
import { getEnvValue } from "./get-env-value";

export const INTERNAL_ACCOUNT_PREFIX = "int.applicationstudio.cloud.sap";

/**
 * Checks if the H2O URL obtained from the environment variables
 * includes the INTERNAL_ACCOUNT_PREFIX.
 *
 * @returns {boolean} True if the H2O URL includes the INTERNAL_ACCOUNT_PREFIX, otherwise false.
 */
export function isInternalAccount(): boolean {
  // Get the H2O URL from the environment variables.
  const h2o = getEnvValue(ENV_H2O_URL);

  // Check if the H2O URL includes the internal account prefix.
  return h2o.includes(INTERNAL_ACCOUNT_PREFIX);
}
