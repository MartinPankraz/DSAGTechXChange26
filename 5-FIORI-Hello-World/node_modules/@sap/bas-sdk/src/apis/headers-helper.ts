import { getEnvValue, isAppStudio } from "../utils/core-utils";

const ENV_H2O_JWT = "H2O_JWT";

export function addJwtHeader(
  headers: Record<string, string>,
): Record<string, string> {
  if (!isAppStudio()) {
    //if it is not appstudio add the H2O_JWT to the header, so the destination API will work outside BAS environment
    headers["x-approuter-authorization"] = `Bearer ${getEnvValue(ENV_H2O_JWT)}`;
  }
  return headers;
}
