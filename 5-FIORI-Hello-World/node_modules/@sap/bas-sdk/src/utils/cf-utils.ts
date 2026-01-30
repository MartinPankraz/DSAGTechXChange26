import { URL } from "url";

/**
 * Validate the endpoint is a valid URL afterwards it extract
 * the region of hrtt based on uri.authority
 * function returns a string calculate based on endpoint minus https://api.cf.
 * For example:
 *   for paramter end point: 'https://api.cf.test.xxx.ondemand.com'
 *   method execution returns 'sap.hana.ondemand.com'
 * @throws Errors when the endpoint not match the rules
 *       1. endpoint is missing
 *       2. Url is invalid
 *       3. the endpoint does not start with "api.cf."
 */
export function getCfDomain(endPoint: string): string {
  if (!endPoint) {
    throw new Error(`endpoint is missing`);
  }
  let url: URL;
  try {
    url = new URL(endPoint);
  } catch (err) {
    throw new Error(
      `Could not parse the following URL: ${endPoint}. Reason: ${err.message}`,
    );
  }
  if (url.protocol !== "https:") {
    throw new Error(`The endpoint '${endPoint}' URL is not an https schema`);
  }
  const params = /^api\.cf\.(.*)$/.exec(url.host);
  if (!params) {
    throw new Error(
      `The endpoint '${endPoint}' URL doesn't start with "api.cf."`,
    );
  }
  return params[1];
}
