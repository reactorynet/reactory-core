/* eslint-disable no-unused-vars */
/// <reference path="../global.d.ts" />

declare namespace Reactory {
  export namespace Excel {
    export interface IExcelSheet {
      name: string;
      index: number;
      arrayField: string;
      startRow: number;
      columns: IExcelColumnDefinition[];
    }

    export interface IExcelColumnDefinition {
      field: string;
      header: string;
      width?: number;
      type?: string;
    }

    export interface IExcelExportOptions {
      filename: string;
      sheets: IExcelSheet[];
    }

    export interface IExport {
      title?: string;
      engine?: string;
      useClient?: boolean;
      mappingType?: string;
      mapping?: unknown;
      icon?: string;
      exportOptions?: unknown | IExcelExportOptions;
      disabled?: string;
    }
  }
}