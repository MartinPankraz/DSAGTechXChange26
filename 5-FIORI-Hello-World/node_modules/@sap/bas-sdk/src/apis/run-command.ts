import { runCommand as _runCommand } from "../utils/core-utils";

/**
 * Return value for the command that was being executed
 */
export async function runCommand(
  command: string,
  args: string[],
): Promise<string> {
  return await _runCommand(command, args);
}
