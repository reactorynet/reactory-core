import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";

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
 *   3. the value declaration inside the top-level `Reactory` namespace in the
 *      published typings (`Reactory.LANGUAGE_HEADER`).
 *
 * (3) rots silently: rollup copies `src/types/*.d.ts` into `dist/types`
 * verbatim with no type-check, so it is asserted structurally here rather than
 * by substring — a substring match also passes if the declaration is moved to
 * file scope, where consumers then get TS2339.
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

  describe("published typings", () => {
    // `index.d-new.ts` is a dormant sibling of `index.d.ts` that duplicates the
    // `Reactory` namespace; if it is ever promoted it must already carry the
    // declaration. The rollup copy of `index.d.ts` is verbatim, so asserting on
    // the source is equivalent to asserting on `dist/types`.
    const candidateFiles = ["index.d.ts", "index.d-new.ts"]
      .map((name) => path.resolve(__dirname, "../src/types", name))
      .filter((file) => fs.existsSync(file));

    /** The `declare namespace Reactory { ... }` node, if present. */
    const topLevelReactoryNamespace = (
      sourceFile: ts.SourceFile,
    ): ts.ModuleDeclaration | undefined =>
      sourceFile.statements.find(
        (statement): statement is ts.ModuleDeclaration =>
          ts.isModuleDeclaration(statement) &&
          ts.isIdentifier(statement.name) &&
          statement.name.text === "Reactory",
      );

    /**
     * `: string` parses to the `StringKeyword` node rather than a type
     * reference, so accept either form (the reference branch guards a
     * hand-written alias).
     */
    const isStringType = (type: ts.TypeNode | undefined): boolean => {
      if (type === undefined) return false;
      if (type.kind === ts.SyntaxKind.StringKeyword) return true;

      return (
        ts.isTypeReferenceNode(type) &&
        ts.isIdentifier(type.typeName) &&
        type.typeName.text === "string"
      );
    };

    /**
     * True when the namespace body declares `LANGUAGE_HEADER` with a string
     * type. Membership is checked against the namespace's own statement block,
     * so hoisting the declaration out of the namespace, or into a nested one,
     * fails.
     */
    const declaresLanguageHeader = (namespace: ts.ModuleDeclaration): boolean => {
      const body = namespace.body;
      if (body === undefined || !ts.isModuleBlock(body)) return false;

      return body.statements.some(
        (statement) =>
          ts.isVariableStatement(statement) &&
          statement.declarationList.declarations.some((declaration) => {
            if (!ts.isIdentifier(declaration.name)) return false;
            if (declaration.name.text !== "LANGUAGE_HEADER") return false;

            return isStringType(declaration.type);
          }),
      );
    };

    it("has at least one typings entry point", () => {
      // A missing entry point entirely means the typings moved; fail loudly.
      expect(candidateFiles.length).toBeGreaterThan(0);
    });

    it.each(candidateFiles)(
      "declares LANGUAGE_HEADER: string in the Reactory namespace of %s",
      (file) => {
        const source = fs.readFileSync(file, "utf8");
        const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
        const namespace = topLevelReactoryNamespace(sourceFile);

        expect(namespace).toBeDefined();
        expect(declaresLanguageHeader(namespace as ts.ModuleDeclaration)).toBe(true);
      },
    );
  });
});
