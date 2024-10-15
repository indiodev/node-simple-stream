import { writeFile } from "node:fs/promises";
import { Writable } from "node:stream";

const path = new URL("output.json", import.meta.url);

export class ToJSONWritableStream extends Writable {
  constructor(options) {
    super(options);
    this.data = [];
  }
  _write(chunk, encoding, callback) {
    try {
      this.data.push(JSON.parse(chunk));
      callback();
    } catch (error) {
      this.emit("error", error);
    }
  }

  _final(callback) {
    writeFile(path, JSON.stringify(this.data, null, 2))
      .then(() => {
        console.log("Conversão concluída.");
        callback();
      })
      .catch(() => {
        console.error("Erro durante a conversão.");
        this.emit("error", error);
      });
  }
}
