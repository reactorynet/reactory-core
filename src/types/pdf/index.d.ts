/* eslint-disable no-unused-vars */
/// <reference path="../global.d.ts" />

declare namespace Reactory {
  export namespace Pdf {
    export interface IReactoryPdfOptions {
      fonts: {
        [key: string]: {
          normal: string;
          bold: string;
        };
      };
      defaultFont: string;
      fontSize: number;
    }

    export interface IReactoryPdfGenerator {
      generate(options: IReactoryPdfOptions): Promise<Buffer>;
    }

    export interface IReactoryPdfComponent {
      nameSpace: string;
      name: string;
      version: string;
      component: IReactoryPdfGenerator;
    }
  }
}