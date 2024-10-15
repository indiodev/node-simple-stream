import { XLSXReadableStream } from "./readable.js";
import { JSONMapPropsTransform, XLSXToJSONTransform } from "./transform.js";
import { ToJSONWritableStream } from "./writeable.js";

new XLSXReadableStream()
  .pipe(new XLSXToJSONTransform())
  .pipe(new JSONMapPropsTransform())
  .pipe(new ToJSONWritableStream());
