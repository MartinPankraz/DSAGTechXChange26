import { spawn } from "cross-spawn";
import { ChildProcessWithoutNullStreams } from "child_process";
import { isEmpty, isUndefined } from "lodash";

/**
 * Return true if the development platform is Buisness Application Studio otherwise return false
 */
export function isAppStudio(): boolean {
  const wsBaseUrl = process.env.WS_BASE_URL;
  if (isUndefined(wsBaseUrl)) {
    return false;
  }
  return !isEmpty(wsBaseUrl);
}

/**
 * Return exception if the development platform is not Buisness Application Studio
 */
export function validDevPlatform(funcName: string): void {
  if (!isAppStudio()) {
    throw new Error(
      `The '${funcName}' API is supported only in Buisness Application Studio environment.`,
    );
  }
}

/**
 * Return the value of the given environment variable name
 * @param name - The name of the environment name
 * @returns The value of the environment variable
 * @throws When the environment variable does not exists
 */
export function getEnvValue(name: string): string {
  const value = process.env[name];
  if (isUndefined(value)) {
    throw new Error(`The ${name} environment variable is missing.`);
  }
  return value;
}

export async function runCommand(
  command: string,
  args: string[],
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const proc = spawn(command, args);
    procEvents(command, proc, resolve, reject);
  });
}

function procEvents(
  command: string,
  proc: ChildProcessWithoutNullStreams,
  resolve: (value: string) => void,
  reject: (value: Error) => void,
) {
  const output: string[] = [];
  let handled = false;

  proc.stdout.on("data", (data) => {
    output.push(String(data));
  });
  proc.stderr.on("data", (data) => {
    output.push(String(data));
  });

  proc.on("error", (err) => {
    // istanbul ignore if - defensive programming, it should not happen
    if (handled) {
      return;
    }
    handled = true;
    reject(err);
  });
  proc.on("exit", (code, signal) => {
    // istanbul ignore if - defensive programming, it should not happen
    if (handled) {
      return;
    }
    handled = true;
    const allOutput = output.join("").trim();
    let returnValue = allOutput.substring(allOutput.lastIndexOf("\n") + 1);
    // If the last line doesn't start with an opening curly brace \"{\", it isn't a JSON object as expected,
    // so instead, all the output is taken.
    // istanbul ignore next - defensive programming, we don't have such a use case currently
    if (!returnValue.startsWith("{")) {
      returnValue = allOutput;
    }
    if (code === 0) {
      resolve(returnValue);
    } else {
      // Not using else-if here due to istanbul issue: https://github.com/gotwarlost/istanbul/issues/781
      // istanbul ignore if - signals cannot be triggered easily in tests
      if (signal !== null) {
        const error: ErrorWithCode = new Error(`Could not execute ${command}`);
        error.code = signal;
        reject(error);
      } else {
        try {
          // Tries to get the error message. If no message is found, uses the return value itself.
          // istanbul ignore next - no easy way to test the condition
          returnValue = JSON.parse(returnValue).message || returnValue;
        } catch (e) {
          // Ignores this and uses the return value itself.
        }
        reject(new Error(returnValue));
      }
    }
  });
}

export interface ErrorWithCode extends Error {
  code?: string;
}

/**
 * Compose the url of the 'external login' page according to the specified landscape
 * @param landscapeUrl The url of the required landscape
 * @param useVscodeProtocol - External login process using vscode protocol
 * @returns The calculated value of 'external login' page
 */
export function getExtLoginPath(
  landscapeUrl: string,
  useVscodeProtocol?: boolean,
): string {
  const url = new URL(landscapeUrl);
  url.protocol = `https`;
  url.pathname = `${useVscodeProtocol ? "remote" : "ext"}-login.html`;
  url.search = `cb=${Math.floor(Math.random() * 100000)}`;
  return url.toString();
}
