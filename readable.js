import { readFile } from "node:fs/promises";
import { Readable } from "node:stream";

const file_path = new URL("./input.xlsx", import.meta.url);

export class XLSXReadableStream extends Readable {
  async _read() {
    try {
      const data = await readFile(file_path);
      this.push(data);
      this.push(null);
    } catch (error) {
      this.emit("error", error);
    }
  }
}
