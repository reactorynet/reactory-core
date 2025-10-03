/* eslint-disable no-unused-vars */
/// <reference path="../global.d.ts" />
import { ObjectId } from "mongodb";
import Mongoose from "mongoose";

declare namespace Reactory {
  export namespace Mongo {
    export interface IReactoryModelMetaDocumentQueryHelpers<TMeta> {
      /**
       * Returns the meta data for the given model
       * */
      getMeta(): Promise<TMeta>;
      /**
       * Clears the meta data for the given model
       * */
      clearMeta(): Promise<void>;
    }

    export interface IReactoryModelMetaDocumenFunctions<TMeta> {
      // Add any document functions here
    }

    export interface IReactoryModelMetaDocument<TMeta> {
      // Add document interface properties here
    }

    export type ReactoryModelMetaDocument<TMeta> = Mongoose.Model<
      ObjectId,
      IReactoryModelMetaDocumenFunctions<TMeta>,
      IReactoryModelMetaDocumentQueryHelpers<TMeta>,
      IReactoryModelMetaDocument<TMeta>
    >;
  }
}