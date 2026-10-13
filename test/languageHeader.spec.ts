import * as fs from "fs";
import * as path from "path";

import ReactoryStatic from "../src/Reactory";
import { LANGUAGE_HEADER } from "../src/constants";

/**
 * The language header name is the one value that has to agree between the
 * server's CORS allowlist and the client's request headers. Hosting it in core
 * only helps if consumers can actually reach it, so pin the three things that
 * together make it reachable:
 *
 *   1. the constant's value;
 *   2. the static on the class the package exports (runtime);
 *   3. the value declaration in the published typings (`Reactory.LANGUAGE_HEADER`).
 *
 * (3) is the one that rots silently: rollup copies `src/types/*.d.ts` into
 * `dist/types` verbatim with no type-check, so a declaration removed there would
 * only surface later as a consumer compile error.
 */
describe("Language header constant", () => {
  it("uses the agreed header name", () => {
    expect(LANGUAGE_HEADER).toBe("x-reactory-language");
  });

  it("exposes the header on the Reactory class for consumers", () => {
    expect(ReactoryStatic.LANGUAGE_HEADER).toBe(LANGUAGE_HEADER);
  });

  it("exposes the header as a lowercase header name", () => {
    // HTTP header names are case-insensitive, but the client and server CORS
    // allowlist both compare lowercased values; a mixed-case constant would be
    // a needless source of drift.
    expect(LANGUAGE_HEADER).toBe(LANGUAGE_HEADER.toLowerCase());
  });

  it("declares the header in the published typings entry points", () => {
    // `index.d-new.ts` is a dormant sibling of `index.d.ts` that duplicates the
    // `Reactory` namespace; if it is ever promoted to the published entry point
    // the declaration must already be present, so both are asserted.
    const declarationFiles = ["index.d.ts", "index.d-new.ts"]
      .map((name) => path.resolve(__dirname, "../src/types", name))
      .filter((file) => fs.existsSync(file));

    // A missing entry point entirely would mean the typings moved; fail loudly.
    expect(declarationFiles.length).toBeGreaterThan(0);

    declarationFiles.forEach((file) => {
      const source = fs.readFileSync(file, "utf8");
      expect(source).toContain("export const LANGUAGE_HEADER: string;");
    });
  });
});
