import { isAppStudio as _isAppStudio } from "../utils/core-utils";

/**
 * Return true if the development platform is Buisness Application Studio otherwise return false
 */
export async function isAppStudio(): Promise<boolean> {
  return _isAppStudio();
}
