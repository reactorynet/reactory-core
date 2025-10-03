/* eslint-disable no-unused-vars */
/// <reference path="../../global.d.ts" />

declare namespace Reactory {
  export namespace ReactNative {
export type ImageUploaderHookProps<TData> = {
      formData: TData;
      onChange: (data: TData) => void;
      schema: Reactory.Schema.AnySchema;
      uiSchema: Reactory.Schema.IUISchema;
      idSchema: Reactory.Schema.IDSchema;
      formContext: Reactory.Forms.ReactoryFormContext<TData, unknown[]>;
      reactory: Reactory.Client.IReactoryApi;
    };

    export type ImageUploaderHook<TData> = (props: ImageUploaderHookProps<TData>) => {
      upload: (base64: string, file: File, id: string) => Promise<string>;
      uploadBase64: (base64: string) => Promise<string>;
      uploadStatus: "idle" | "uploading" | "done" | "error";
      uploadError: Error | null;
    };
  }
}