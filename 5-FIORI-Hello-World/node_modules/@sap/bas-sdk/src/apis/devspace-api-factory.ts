import { devspaceApi } from "../../api";
import { WebSocket } from "ws";

/**
 * Implement the devspace API internally. Expose only the API via the DevspaceApi
 */
class DevspaceApi implements devspaceApi.IDevspaceApi {
  protected ws!: WebSocket;
  private connectionOpen = false;
  private devspaceUrl: string;
  private callback!: (value: string) => void;
  private callbackOnError!: (e: Error) => void;
  private callbackOnClose!: (code: number, reason: Buffer) => void;
  private output: string;
  private prompt: string;

  constructor(devspaceUrl: string) {
    this.devspaceUrl = devspaceUrl;
    this.output = "";
    this.prompt = "";
  }

  async connect(jwt: string): Promise<void> {
    const ret: Promise<void> = new Promise((resolve, reject) => {
      const options = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      this.ws = new WebSocket(this.devspaceUrl, options);

      this.ws.on("open", () => {
        this.connectionOpen = true;
        resolve();
      });

      this.ws.on("message", (data) => {
        const value = data.toString();
        // connection can be closed by server side - notify the client
        if (value === "bye!") {
          this.callback(`${this.output} - connection interrupted...`);
        }
        // each terminal command comes to us in packages, and when we receive the terminal's prompt, we know the command has ended.
        // eslint-disable-next-line no-control-regex -- its a pty terminal's hint symbol pattern, first for Debian terminal (the prompt is '$ ') and second for Alpine terminal (the prompt is `$ [6n`)
        if (/(\$ )$/g.test(value) || /(\$ \[6n)$/g.test(value)) {
          if (this.prompt) {
            this.callback(
              this.output.concat(value.slice(0, -this.prompt.length)),
            ); // get rid of the prompt in the value and add it to the output
            this.output = ""; // clear output buffer
          } else {
            // immediately after a connection is established, the terminal first returns a hint character
            this.prompt = value;
          }
        } else {
          this.output = this.output.concat(value);
        }
      });

      this.onError((error) => {
        reject(error);
      });

      this.onClose((code, reason) => {
        this.connectionOpen = false;
        console.log(`connection closed ${code}, ${reason}`);
      });
    });

    return ret;
  }

  execute(opt: {
    command: string;
    args?: string[];
    cb?: (err?: Error) => void;
  }): void {
    if (this.connectionOpen) {
      const exec = opt.command.concat(
        " ",
        ...(opt.args?.join(" ") || ""),
        "\n",
      );
      this.ws.send(exec, opt.cb);
    }
  }

  onMessage(v: (value: string) => void): void {
    this.callback = v;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore for private func
  private swapCallback(event: string, cbName: string, other: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore for private func
    const that = this as any;
    if (that[cbName]) {
      this.ws?.removeListener(event, that[cbName]);
    }
    that[cbName] = other;
    this.ws?.addListener(event, that[cbName]);
  }

  onError(callback: (e: Error) => void): void {
    this.swapCallback("error", `callbackOnError`, callback);
  }

  onClose(callback: (code: number, reason: Buffer) => void): void {
    this.swapCallback("close", `callbackOnClose`, callback);
  }

  disconnect(): void {
    if (this.connectionOpen) {
      this.ws.close();
    }
  }
}

export function devspaceApiFactory(
  devspaceUrl: string,
): devspaceApi.IDevspaceApi {
  return new DevspaceApi(devspaceUrl);
}
