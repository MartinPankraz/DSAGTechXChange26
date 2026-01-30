import { getEnvValue as _getEnvValue } from "../utils/core-utils";

/**
 * Return the value of the environment value for name
 */
export function getEnvValue(name: string): string {
  return _getEnvValue(name);
}
