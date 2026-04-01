/* eslint-disable no-unused-vars */
/// <reference path="../global.d.ts" />

declare namespace Reactory {
  export namespace Pdf {

    // ─── Font Management ───────────────────────────────────────────────

    /**
     * Describes font file paths for a single font family.
     * At minimum, a `normal` variant is required.
     */
    export interface IFontDescriptor {
      normal: string;
      bold?: string;
      italics?: string;
      bolditalics?: string;
    }

    /**
     * A map of font family names to their file descriptors.
     */
    export interface IFontDescriptors {
      [fontName: string]: IFontDescriptor;
    }

    /**
     * Configuration for the PDF service's font system.
     */
    export interface IFontConfig {
      descriptors: IFontDescriptors;
      defaultFont?: string;
      defaultFontSize?: number;
    }

    // ─── Style Definitions ─────────────────────────────────────────────

    /**
     * Comprehensive style definition matching pdfmake's style capabilities.
     */
    export interface IPDFStyleDefinition {
      alignment?: 'left' | 'right' | 'center' | 'justify';
      font?: string;
      fontSize?: number;
      margin?: number | [number] | [number, number] | [number, number, number, number];
      lineHeight?: number;
      bold?: boolean;
      italics?: boolean;
      color?: string;
      background?: string;
      decoration?: 'underline' | 'lineThrough' | 'overline';
      decorationStyle?: 'dashed' | 'dotted' | 'double' | 'wavy';
      decorationColor?: string;
      characterSpacing?: number;
      opacity?: number;
      fillOpacity?: number;
      noWrap?: boolean;
      leadingIndent?: number;
      preserveLeadingSpaces?: boolean;
      preserveTrailingSpaces?: boolean;
      sup?: boolean;
      sub?: boolean;
      markerColor?: string;
    }

    // ─── Shared Content Properties ─────────────────────────────────────

    type PDFMargin = number | [number] | [number, number] | [number, number, number, number];

    /**
     * Common properties shared across most content nodes.
     */
    interface IPDFBaseNode {
      style?: string | string[];
      margin?: PDFMargin;
      pageBreak?: 'before' | 'after';
      pageOrientation?: 'portrait' | 'landscape';
      id?: string;
    }

    // ─── Content Node Types ────────────────────────────────────────────

    /**
     * Text content node. The `text` property can be a string or an array
     * of inline text spans for mixed styling within a single paragraph.
     */
    export interface IPDFTextNode extends IPDFBaseNode, IPDFStyleDefinition {
      text: string | (string | IPDFTextNode)[];
      link?: string;
      linkToPage?: number;
      linkToDestination?: string;
      headlineLevel?: number;
      tocItem?: boolean | string | string[];
      tocStyle?: string | string[];
      tocMargin?: PDFMargin;
      tocNumberStyle?: IPDFStyleDefinition;
    }

    /**
     * Image content node. Supports JPEG and PNG images from
     * base64 data URIs, file paths (Node.js), HTTP/HTTPS URLs, or VFS keys.
     */
    export interface IPDFImageNode extends IPDFBaseNode {
      image: string;
      width?: number;
      height?: number;
      fit?: [number, number];
      cover?: {
        width: number;
        height: number;
        valign?: 'top' | 'center' | 'bottom';
        align?: 'left' | 'center' | 'right';
      };
      opacity?: number;
      link?: string;
    }

    /**
     * SVG content node for inline SVG markup.
     */
    export interface IPDFSVGNode extends IPDFBaseNode {
      svg: string;
      width?: number;
      height?: number;
      fit?: [number, number];
    }

    /**
     * Column layout node. Arranges child nodes side by side.
     */
    export interface IPDFColumnNode extends IPDFBaseNode {
      columns: IPDFContentNode[];
      columnGap?: number;
    }

    /**
     * Stack node. Arranges child nodes vertically (default layout).
     */
    export interface IPDFStackNode extends IPDFBaseNode {
      stack: IPDFContentNode[];
    }

    // ─── Table Types ───────────────────────────────────────────────────

    /**
     * Table cell extending style definition with cell-specific properties.
     */
    export interface IPDFTableCell extends IPDFStyleDefinition {
      text?: string | IPDFTextNode | (string | IPDFTextNode)[];
      image?: string;
      svg?: string;
      stack?: IPDFContentNode[];
      ul?: IPDFContentNode[];
      ol?: IPDFContentNode[];
      colSpan?: number;
      rowSpan?: number;
      fillColor?: string;
      fillOpacity?: number;
      border?: [boolean, boolean, boolean, boolean];
      borderColor?: [string, string, string, string];
      style?: string | string[];
      margin?: PDFMargin;
    }

    /**
     * Custom table layout callbacks for controlling borders, padding, and fills.
     */
    export interface IPDFTableLayout {
      hLineWidth?: (i: number, node: unknown) => number;
      vLineWidth?: (i: number, node: unknown) => number;
      hLineColor?: (i: number, node: unknown) => string;
      vLineColor?: (i: number, node: unknown) => string;
      hLineStyle?: (i: number, node: unknown) => { dash: { length: number; space?: number } } | null;
      vLineStyle?: (i: number, node: unknown) => { dash: { length: number; space?: number } } | null;
      fillColor?: (rowIndex: number, node: unknown, columnIndex: number) => string | null;
      fillOpacity?: (rowIndex: number, node: unknown, columnIndex: number) => number;
      paddingLeft?: (i: number, node: unknown) => number;
      paddingRight?: (i: number, node: unknown) => number;
      paddingTop?: (i: number, node: unknown) => number;
      paddingBottom?: (i: number, node: unknown) => number;
      defaultBorder?: boolean;
    }

    /**
     * Table content node with support for headers, col/row spans,
     * custom widths, and custom layouts.
     */
    export interface IPDFTableNode extends IPDFBaseNode {
      table: {
        body: (IPDFContentNode | IPDFTableCell | string)[][];
        widths?: (number | string | '*' | 'auto')[];
        heights?: number | number[] | ((row: number) => number);
        headerRows?: number;
        dontBreakRows?: boolean;
        keepWithHeaderRows?: number;
      };
      layout?: string | IPDFTableLayout;
    }

    // ─── List Types ────────────────────────────────────────────────────

    /**
     * Ordered (numbered) list node.
     */
    export interface IPDFOrderedListNode extends IPDFBaseNode {
      ol: IPDFContentNode[];
      type?: 'lower-alpha' | 'upper-alpha' | 'lower-roman' | 'upper-roman' | 'none';
      start?: number;
      reversed?: boolean;
      separator?: string | [string, string];
      markerColor?: string;
    }

    /**
     * Unordered (bulleted) list node.
     */
    export interface IPDFUnorderedListNode extends IPDFBaseNode {
      ul: IPDFContentNode[];
      type?: 'disc' | 'square' | 'circle' | 'none';
      markerColor?: string;
    }

    // ─── Special Content Nodes ─────────────────────────────────────────

    /**
     * Table of contents node. Collects all nodes marked with `tocItem`.
     */
    export interface IPDFTocNode extends IPDFBaseNode {
      toc: {
        title?: IPDFTextNode;
        numberStyle?: IPDFStyleDefinition;
        textMargin?: PDFMargin;
        textStyle?: IPDFStyleDefinition;
      };
    }

    /**
     * QR code content node.
     */
    export interface IPDFQrCodeNode extends IPDFBaseNode {
      qr: string;
      eccLevel?: 'L' | 'M' | 'Q' | 'H';
      fit?: number;
      foreground?: string;
      background?: string;
      version?: number;
    }

    /**
     * Canvas drawing element types for the canvas node.
     */
    export type IPDFCanvasElement =
      | { type: 'rect'; x: number; y: number; w: number; h: number; r?: number; color?: string; lineColor?: string; lineWidth?: number }
      | { type: 'line'; x1: number; y1: number; x2: number; y2: number; lineWidth?: number; lineColor?: string; dash?: { length: number; space?: number } }
      | { type: 'ellipse'; x: number; y: number; r1: number; r2?: number; color?: string; lineColor?: string; lineWidth?: number }
      | { type: 'polyline'; points: { x: number; y: number }[]; closePath?: boolean; color?: string; lineColor?: string; lineWidth?: number };

    /**
     * Canvas node for drawing geometric shapes.
     */
    export interface IPDFCanvasNode extends IPDFBaseNode {
      canvas: IPDFCanvasElement[];
    }

    // ─── Content Union Type ────────────────────────────────────────────

    /**
     * Union of all possible content node types in a pdfmake document.
     * Plain strings are also valid content (treated as simple text paragraphs).
     */
    export type IPDFContentNode =
      | string
      | IPDFTextNode
      | IPDFImageNode
      | IPDFSVGNode
      | IPDFColumnNode
      | IPDFStackNode
      | IPDFTableNode
      | IPDFOrderedListNode
      | IPDFUnorderedListNode
      | IPDFTocNode
      | IPDFQrCodeNode
      | IPDFCanvasNode;

    // ─── Page Size ─────────────────────────────────────────────────────

    export interface IPDFPageSize {
      width: number;
      height: number;
    }

    // ─── Document Definition ───────────────────────────────────────────

    /**
     * Complete pdfmake document definition. This is the top-level object
     * passed to the PDF generation engine.
     */
    export interface IPDFDocumentDefinition {
      /** Output filename used in Content-Disposition header */
      filename?: string;
      /** PDF metadata embedded in the document */
      info?: {
        title?: string;
        author?: string;
        subject?: string;
        keywords?: string;
        creator?: string;
        producer?: string;
      };
      /** Document content -- the main body of the PDF */
      content: IPDFContentNode | IPDFContentNode[];
      /** Static or dynamic page header */
      header?: IPDFContentNode | ((currentPage: number, pageCount: number, pageSize: IPDFPageSize) => IPDFContentNode);
      /** Static or dynamic page footer */
      footer?: IPDFContentNode | ((currentPage: number, pageCount: number, pageSize: IPDFPageSize) => IPDFContentNode);
      /** Background layer rendered behind content on each page */
      background?: IPDFContentNode | ((currentPage: number, pageSize: IPDFPageSize) => IPDFContentNode);
      /** Named image dictionary for reuse via key references */
      images?: {
        [key: string]: string | Buffer;
      };
      /** Page size -- standard name (e.g. 'A4', 'LETTER') or custom dimensions */
      pageSize?: string | IPDFPageSize;
      /** Page orientation */
      pageOrientation?: 'portrait' | 'landscape';
      /** Page margins */
      pageMargins?: number | [number, number] | [number, number, number, number];
      /** Default style applied to all content */
      defaultStyle?: IPDFStyleDefinition;
      /** Named style dictionary */
      styles?: {
        [key: string]: IPDFStyleDefinition;
      };
      /** Custom table layout dictionary */
      tableLayouts?: {
        [key: string]: IPDFTableLayout;
      };
      /** Enable PDF compression */
      compress?: boolean;
      /** Watermark text or configuration */
      watermark?: string | {
        text: string;
        color?: string;
        opacity?: number;
        bold?: boolean;
        italics?: boolean;
        fontSize?: number;
        angle?: number;
      };
      /** Custom page break logic */
      pageBreakBefore?: (
        currentNode: unknown,
        followingNodesOnPage: unknown[],
        nodesOnNextPage: unknown[],
        previousNodesOnPage: unknown[]
      ) => boolean;
      /** User password for opening the PDF */
      userPassword?: string;
      /** Owner password for full access */
      ownerPassword?: string;
      /** PDF permission flags */
      permissions?: {
        printing?: 'highResolution' | 'lowResolution';
        modifying?: boolean;
        copying?: boolean;
        annotating?: boolean;
        fillingForms?: boolean;
        contentAccessibility?: boolean;
        documentAssembly?: boolean;
      };
    }

    // ─── Extraction Types ──────────────────────────────────────────────

    /**
     * Extracted text content from a single PDF page.
     */
    export interface IPDFExtractedPage {
      pageNumber: number;
      text: string;
      lines: string[];
    }

    /**
     * Result of text extraction from a PDF document.
     */
    export interface IPDFExtractedText {
      pages: IPDFExtractedPage[];
      metadata?: Record<string, string>;
      totalPages: number;
    }

    /**
     * A positioned element extracted from a PDF page with layout information.
     */
    export interface IPDFExtractedElement {
      type: 'text' | 'image' | 'form-field';
      content: string;
      x: number;
      y: number;
      width: number;
      height: number;
    }

    /**
     * Layout-aware extraction result for a single page.
     */
    export interface IPDFExtractedPageLayout {
      pageNumber: number;
      width: number;
      height: number;
      text: string;
      elements: IPDFExtractedElement[];
    }

    /**
     * An image extracted from a PDF document.
     */
    export interface IPDFExtractedImage {
      pageNumber: number;
      index: number;
      data: Buffer;
      mimeType: string;
      width?: number;
      height?: number;
    }

    // ─── Manipulation Types ────────────────────────────────────────────

    /**
     * Options for merging multiple PDF documents into one.
     */
    export interface IPDFMergeOptions {
      /** PDF sources as Buffers or file paths */
      sources: (Buffer | string)[];
      /** Optional output file path. If omitted, returns a Buffer. */
      outputPath?: string;
    }

    /**
     * Options for splitting a PDF into multiple parts.
     */
    export interface IPDFSplitOptions {
      /** Source PDF as a Buffer or file path */
      source: Buffer | string;
      /** Page ranges to extract (1-indexed, inclusive) */
      ranges: [number, number][];
      /** Optional output directory for writing split files */
      outputDir?: string;
    }

    // ─── Component & Generator ─────────────────────────────────────────

    /**
     * A PDF generator defines how to produce a PDF document definition
     * from input parameters. Each generator has a `content` function
     * that returns a document definition, and an optional `resolver`
     * that fetches the data needed to populate the document.
     */
    export interface IReactoryPdfGenerator {
      enabled: boolean;
      key: string;
      name: string;
      description: string;
      /** Generates the pdfmake document definition from resolved data */
      content: (params: unknown, context: Server.IReactoryContext) => Promise<IPDFDocumentDefinition>;
      /** Optional data resolver -- fetches data needed by `content` */
      resolver?: (params: unknown, context: Server.IReactoryContext) => Promise<unknown>;
      /** Optional configuration for this generator */
      props?: {
        meta?: {
          title?: string;
          author?: string;
          [key: string]: unknown;
        };
        fonts?: IFontDescriptors;
        defaultFont?: string;
        fontSize?: number;
      };
    }

    /**
     * Options for PDF generation passed to a generator.
     */
    export interface IReactoryPdfOptions {
      fonts: IFontDescriptors;
      defaultFont: string;
      fontSize: number;
    }

    /**
     * A registered PDF component that modules export via their `pdfs` array.
     * Components are resolved by `nameSpace` + `name` + optional `version`.
     */
    export interface IReactoryPdfComponent {
      nameSpace: string;
      name: string;
      version: string;
      component: IReactoryPdfGenerator;
    }
  }
}
