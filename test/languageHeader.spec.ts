import ReactoryStatic from "../src/Reactory";
import { LANGUAGE_HEADER } from "../src/constants";

/**
 * The language header name is the one value that has to agree between the
 * server's CORS allowlist and the client's request headers. Hosting it in core
 * only helps if it is also reachable from the package's default export, which is
 * how both consumers import core — so assert both the constant and the surface
 * the consumers will actually use (`Reactory.LANGUAGE_HEADER`).
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
});
