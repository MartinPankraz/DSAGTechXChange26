/**
 * This function returns the URI that should be used to open vscode on remote BAS landscape with specific folder.
 * @param landscapeUrl
 * @param wsId
 * @param folderPath
 * @returns
 */
export function getOpenProjectInVSCodeURI(
  landscapeUrl: string,
  wsId: string,
  folderPath: string,
): string {
  if (!landscapeUrl) {
    throw new Error(`Landscape parameter should not be empty.`);
  }
  let landscapeHostName;
  try {
    landscapeHostName = new URL(landscapeUrl).hostname;
  } catch (err) {
    throw new Error(
      `Failed to get hostname from given landscape URL. Error: ${err}`,
    );
  }
  // Remove "workspaces-" prefix from wsId if present
  if (wsId.startsWith("workspaces-")) {
    wsId = wsId.substring("workspaces-".length);
  }
  if (!wsId) {
    throw new Error(`Dev Space ID parameter should not be empty.`);
  }
  if (!folderPath) {
    throw new Error(`Folder path parameter should not be empty.`);
  }

  return `vscode://SAPOSS.app-studio-toolkit/open?landscape=${landscapeHostName}&devspaceid=${wsId}&folderpath=${folderPath}`;
}
