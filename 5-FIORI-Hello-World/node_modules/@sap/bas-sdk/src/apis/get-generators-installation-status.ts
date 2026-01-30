import { readExtensionsInstallationCompletionFile } from "../utils/devspace-utils";

/**
 * Return installation status of generators.
 *
 * @returns - installation status
 */
export async function didBASGeneratorsFinishInstallation(): Promise<boolean> {
  return (await readExtensionsInstallationCompletionFile())
    .InstallationCompleted;
}
