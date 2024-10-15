import { createReadStream } from "node:fs";
import { JSONMapPropsTransform, XLSXToJSONTransform } from "./transform.js";
import { ToJSONWritableStream } from "./writeable.js";
// import { XLSXReadableStream } from "./readable.js";
// import { JSONMapPropsTransform, XLSXToJSONTransform } from "./transform.js";

// new XLSXReadableStream()
//   .pipe(new XLSXToJSONTransform())
//   .pipe(new JSONMapPropsTransform())
//   .pipe(new ToJSONWritableStream());

const file_path = new URL("./input.xlsx", import.meta.url);

const readable = createReadStream(file_path);

readable
  .pipe(new XLSXToJSONTransform())
  .pipe(new JSONMapPropsTransform())
  .pipe(new ToJSONWritableStream());
