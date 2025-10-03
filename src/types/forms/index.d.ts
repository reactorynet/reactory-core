/* eslint-disable no-unused-vars */
/// <reference path="../global.d.ts" />
/// <reference path="../schema/index.d.ts" />

declare namespace Reactory {
  export namespace Forms {
    export type ReactoryFieldComponent<
      TData,
      TSchema = Reactory.Schema.AnySchema,
      TUISchema = Reactory.Schema.IUISchema,
      TAdditional = {},
    > = React.ComponentType<IFieldProps<TData, TSchema, Reactory.Schema.IUISchema> & TAdditional>;

    export type ReactorySchemaFieldComponent = ReactoryFieldComponent<any, Schema.ISchema>;
    export type ReactoryArrayFieldComponent = ReactoryFieldComponent<any[], Schema.IArraySchema>;
    export type ReactoryBooleanFieldComponent = ReactoryFieldComponent<
      boolean,
      Schema.IBooleanSchema
    >;
    export type ReactoryNumberFieldComponent = ReactoryFieldComponent<number, Schema.INumberSchema>;
    export type ReactoryObjectFieldComponent = ReactoryFieldComponent<object, Schema.IObjectSchema>;
    export type ReactoryStringFieldComponent = ReactoryFieldComponent<string, Schema.IStringSchema>;
    export type ReactoryDateFieldComponent = ReactoryFieldComponent<Date, Schema.IDateSchema>;
    export type ReactoryDateTimeComponent = ReactoryFieldComponent<Date, Schema.IDateTimeSchema>;
    export type ReactoryTitleFieldComponent = ReactoryFieldComponent<
      any,
      Schema.ISchema,
      Schema.IUISchema,
      { title: string | Schema.UITitleFieldOptions }
    >;
    export type ReactoryDescriptionFieldComponent = ReactoryFieldComponent<
      any,
      Schema.ISchema,
      Schema.IUISchema,
      { description: string | Schema.UIDescriptionFieldOptions }
    >;
    export type ReactoryGridLayoutComponent = ReactoryFieldComponent<object | any[]>;
    export type ReactoryTabbedLayoutComponent = ReactoryFieldComponent<object | any[]>;
    export type ReactoryListLayoutComponent = ReactoryFieldComponent<object | any[]>;
    export type ReactoryUnsupportedFieldComponent = ReactoryFieldComponent<
      null,
      Schema.AnySchema,
      Schema.IUISchema,
      { reason: string }
    >;
    export type ReactoryErrorFieldComponent = ReactoryFieldComponent<
      any,
      Schema.IErrorSchema,
      Schema.IUISchema,
      { errors: string[] }
    >;
    export type ReactoryHelpFieldComponent = ReactoryFieldComponent<
      any,
      Schema.AnySchema,
      Schema.IUISchema,
      { topics: string[] }
    >;

    export interface IReactoryFields {
      ArrayField: ReactoryArrayFieldComponent;
      BooleanField: ReactoryBooleanFieldComponent;
      TitleField: ReactoryTitleFieldComponent;
      DescriptionField: ReactoryDescriptionFieldComponent;
      NumberField: ReactoryNumberFieldComponent;
      ObjectField: ReactoryObjectFieldComponent;
      DateField: ReactoryDateFieldComponent;
      SchemaField: ReactorySchemaFieldComponent;
      StringField: ReactoryStringFieldComponent;
      GridField: ReactoryGridLayoutComponent;
      TabbedField: ReactoryTabbedLayoutComponent;
      ListField: ReactoryListLayoutComponent;
      UnsupportedField: ReactoryUnsupportedFieldComponent;
      ErrorField: ReactoryErrorFieldComponent;
      HelpField: ReactoryHelpFieldComponent;
      [key: string]: ReactoryFieldComponent<any>;
    }

    export type ValidationTypes = "submit" | "blur" | "change";

    export type SchemaFormValidationResult = {
      valid: boolean;
      errors: any[];
      errorSchema: Schema.IErrorSchema;
    };

    export type SchemaFormValidationFunctionSync<TData> = (
      formData: TData,
      schema: Reactory.Schema.ISchema,
      validationType: ValidationTypes,
    ) => SchemaFormValidationResult;

    export type SchemaFormValidationFunctionAsync<TData> = (
      formData: TData,
      schema: Reactory.Schema.ISchema,
      validationType: ValidationTypes,
    ) => Promise<SchemaFormValidationResult>;

    export type TransformErrorsFunction = (
      errors: any[],
      schema: Reactory.Schema.ISchema,
    ) => Promise<{
      errors: any[];
      errorSchema: Reactory.Schema.IErrorSchema;
    }>;

    /**
     * Defines the property set for the ISchemaFormProps
     */
    export interface ISchemaFormProps<TData> {
      idSchema?: Reactory.Schema.IDSchema;
      schema: Reactory.Schema.ISchema;
      uiSchema: Reactory.Schema.IUISchema;
      idPrefix?: string;
      errorSchema?: any;
      formData?: TData;
      formContext: Reactory.Forms.ReactoryFormContext<TData, any>;
      widgets?: {
        [key: string]: React.Component | React.FC | React.PureComponent;
      };
      fields?: object;
      ArrayFieldTemplate?: () => any;
      ObjectFieldTemplate?: () => any;
      FieldTemplate?: () => any;
      ErrorList?: React.FC<any>;
      onBlur?: (...args: any) => Promise<void>;
      onFocus?: (...args: any) => Promise<void>;
      onChange: (
        data: TData,
        errors: any[],
        errorSchema: Reactory.Schema.IErrorSchema,
      ) => Promise<void>;
      onSubmit: (
        data: TData,
        errors: any[],
        errorSchema: Reactory.Schema.IErrorSchema,
      ) => Promise<void>;
      onError?: (errors: any[], errorSchema?: Reactory.Schema.IErrorSchema) => Promise<void>;
      showErrorList?: boolean;
      id?: string;
      className?: string;
      chilren?: any;
      name?: string;
      method?: string;
      target?: string;
      action?: string;
      autocomplete?: string;
      enctype?: string;
      acceptcharset?: string;
      noValidate?: boolean;
      noHtml5Validate?: boolean;
      liveValidate?: boolean;
      toolbarPosition?: string | "top" | "bottom" | "none";
      validate?: SchemaFormValidationFunctionSync<TData> | SchemaFormValidationFunctionAsync<TData>;
      transformErrors?: TransformErrorsFunction;
      safeRenderCompletion?: boolean;
      disabled?: boolean;
      style?: any;
      // @deprecated
      ref: (form: any) => void;
      [key: string]: any;
    }

    export interface IReactoryWidgets {
      [key: string]: Reactory.Forms.ReactoryFieldComponent<any>;
    }

    export interface IReactoryTemplates {
      ArrayFieldTemplate: Reactory.Forms.ReactoryArrayFieldComponent;
      DateFieldTemplate: Reactory.Forms.ReactoryDateFieldComponent;
      FieldTemplate: Reactory.Forms.ReactorySchemaFieldComponent;
      FormErrorList: Reactory.Forms.ReactorySchemaFieldComponent;
      ObjectTemplate: Reactory.Forms.ReactoryObjectFieldComponent;
      [key: string]: Reactory.Forms.ReactoryFieldComponent<any>;
    }

    export interface IReactoryFormUtilitiesRegistry {
      fields: IReactoryFields;
      widgets: IReactoryWidgets;
      templates: IReactoryTemplates;
      formContext: Reactory.Client.IReactoryFormContext<unknown>;
      definitions: {
        [key: string]: Reactory.Schema.AnySchema;
      };
    }

    export interface ReactoryFormUtitlitiesHookProps<
      TData,
      TSchema extends Reactory.Schema.AnySchema,
      TUISchema extends Reactory.Schema.IUISchema,
    > {
      schema: TSchema;
      uiSchema?: TUISchema;
      idSchema: Reactory.Schema.IDSchema;
      required?: boolean;
      formData: TData;
      errorSchema?: any;
      disabled?: boolean;
      rawErrors?: any;
      formContext: Reactory.Forms.ReactoryFormContext<TData, any>;
    }

    export interface ReactoryFormUtitlitiesHookResult {
      TitleField: ReactoryFieldComponent<String>;
      DescriptionField: ReactoryFieldComponent<string>;
      Field: ReactoryFieldComponent<any>;
      ErrorField: ReactoryFieldComponent<any>;
    }

    export type ReactorySchemaUtitlitiesHook = <
      TData,
      TSchema extends Reactory.Schema.AnySchema,
      TUISchema extends Reactory.Schema.IUISchema,
    >(
      props: ReactoryFormUtitlitiesHookProps<TData, TSchema, TUISchema>,
    ) => ReactoryFormUtitlitiesHookResult;

    /**
     * A Reactory UX Package is consist of fields
     * widgets and templates.
     */
    export interface IReactoryUxPackage extends Reactory.IComponentFqnDefinition {
      /**
       * A description or translation key for your package
       */
      description: string;
      /**
       * A property containing the fields
       */
      fields?: IReactoryFields;
      /**
       * A property containing custom widgets
       */
      widgets?: IReactoryWidgets;
      /**
       * A property for field templates.
       */
      templates?: IReactoryTemplates;
      /**
       * for future use
       */
      assets?: unknown;
      /**
       * for future use
       */
      resources?: unknown;
      [key: string]: unknown;
    }

    /**
     * Container for key pair of
     */
    export type ReactoryUxPackages = Reactory.IKeyValuePair<
      Reactory.UX.UIFrameWork,
      IReactoryUxPackage
    >;
    export interface IReactoryNotification extends NotificationOptions {
      inAppNotification?: boolean;
      title?: string;
      type?: string | "success" | "warning" | "danger" | "info";
      props?: unknown;
    }

    /**
     * The IReactoryEvent is used to define the basic construct for an event that
     * will be fired by the reactory form engine via the reactory event bus.
     */
    export interface IReactoryEvent {
      /**
       * The name for the event
       */
      name: string;
      /**
       * Data being passed to the event
       * */
      data?: unknown | undefined;
      /**
       * Data map object that is used to map any input data to the event
       */
      dataMap?: Reactory.ObjectMap;
      /**
       * Indicates whether or not to spread the props from the data object
       * or to pass the data object as is.
       * */
      spreadProps?: boolean;
      /**
       * When set to true the form will refresh with each event, when not
       * provided it will only execute the refresh once.
       */
      on?: boolean;
    }

    /**
     * The ReactoryFormGraphResultHandler is used to indicate what the reactory form
     * should do once the graph query or mutation has been executed.
     *
     * The options are as follows:
     * - redirect: Redirect the user to a new URI
     * - notification: Will show a notification to the user
     * - function: Will execute a function, the function will receive the data result
     * - refresh: Will refresh the form using the defined query for the form
     * - none: Will do nothing aside from data bind the result to the form if the data binding params are defined.
     * - component: Will bind the result to a component. The default behaviour will be to replace the existing form
     *   with the component.
     */
    export type ReactoryFormActionHandlerType =
      | "redirect"
      | "notification"
      | "function"
      | "refresh"
      | "none"
      | "component"
      | "event";

    export interface IReactoryFormQueryErrorHandlerDefinition {
      /**
       * The method to use when an error occurs.
       */
      onErrorMethod: ReactoryFormActionHandlerType | ReactoryFormActionHandlerType[];
      /**
       * The component fqn to use when the onErrorMethod is set to component or function
       * */
      componentRef?: string;
      /**
       * The name of a method to invoke when the onErrorMethod is set to function
       * if there is no method name, the system will attempt to use the default
       * name of 'onError'
       */
      method?: string;
      /**
       * The template string to use when the onErrorMethod is set to redirect.
       * The following properties can be used in the template string.
       * - formData - the form data
       * - formContext - the form context
       * - form - the form
       * - errors - the result of the mutation
       *
       * The template string can be used to build a URI that will be used to redirect the user.
       * Template syntax uses the lodash template syntax.
       * i.e. "/some/path/${formData.id}"
       */
      onErrorUrl?: string;
      /**
       * The timeout in millis that the form will wait
       * before redirecting the user. This is generally only used on mutations.
       */
      onErrorRedirectTimeout?: number;

      /**
       * The notification event object to use when the onErrorMethod is set to event.
       */
      onErrorEvent?: IReactoryEvent;

      /**
       * The notification to use when the onErrorMethod is set to notification.
       */
      notification?: IReactoryNotification;
    }

    /**
     * Defines the interface construct for a graph form result handler.
     * The handler properties are used by the reactory form engine to
     * determine the appropriate action on completion of a graph query or mutation.
     */
    export interface IReactoryFormGraphResultHandler {
      /**
       * Indicates which method or methods to use once the graph query or mutation has been executed.
       */
      onSuccessMethod?: ReactoryFormActionHandlerType | ReactoryFormActionHandlerType[];
      /**
       * The template string to use when the onSuccessMethod is set to redirect.
       * the following properties can be used in the template string.
       * - formData - the form data
       * - formContext - the form context
       * - props - the form props
       * - mutation_result - the result of the mutation
       *
       * The template string can be used to build a URI that will be used to redirect the user.
       * Template syntax uses the lodash template syntax.
       * i.e. "/some/path/${formData.id}"
       * */
      onSuccessUrl?: string;

      /**
       * The timeout in millis that the form will wait
       * before redirecting the user. This is generally only used on mutations
       *
       * The default value is 500
       */
      onSuccessRedirectTimeout?: number;

      /**
       * The component reference to use when the onSuccessMethod is set to component
       * The componentRef must be a fqn of a component that is registered with the client
       *
       * The componentRef is used for both function and component types.
       * */
      componentRef?: string;
      /**
       * The result map is used to map the data result to the form data.
       * The result map is an object that maps the data result to the form data.
       */
      resultMap?: Reactory.ObjectMap;
      /**
       * The merge strategy to use when merging the data result with the form data.
       * */
      mergeStrategy?: string | "merge" | "replace" | "function" | "none";
      /**
       * The merge function to use when merging the data result with the form data.
       *
       * If the componentRef is an object, then a method name can be provided here.
       * If the componentRef is a function then the mergeFunction should be left
       * undefined.
       * */
      mergeFunction?: string;

      /**
       * If defined an event will be fired once the graph query or mutation has been executed.
       *
       * The event will be fired in addition to the onSuccessMethod if it is defined.
       */
      onSuccessEvent?: IReactoryEvent;

      /**
       * onError definition provides a way to handle errors that may occur during the execution of the graph query or mutation.
       */
      onError?: IReactoryFormQueryErrorHandlerDefinition;

      /**
       * The notification object to use when the onSuccessMethod is set to notification.
       */
      notification?: IReactoryNotification;
    }

    export interface IReactoryFormGraphElement extends IReactoryFormGraphResultHandler {
      /**
       * The name of the graph data element
       */
      name: string;
      /**
       * The text that represent the mutation / query
       */
      text: string;
      /**
       * The map that is used to map the resulting data to
       * the correct data object.
       */
      resultMap?: ObjectMap;
      /**
       * The data type that is represented by the data result. The allowed
       * values are.
       * - string
       * - number
       * - date
       * - object
       * - array
       */
      resultType?: string;
      /**
       * Used when only want to extract a single value from the data result.
       */
      resultKey?: string;
      /**
       * Any static data we want included in the data response or that
       * may be needed data transformations.
       */
      formData?: unknown;
      /**
       * A variable mapping object that maps data values to a query params.
       *
       * eg.
       *
       * {
       *  "formData.id": "id",
       *  "formData.name": "name",
       *  "formContext.value": "value"
       *  "formContext": { "key": "fieldId", transform: "core.SomeTransformerFunction@1.0.0" }
       * }
       */
      variables?: ObjectMap;
      /**
       * On success method handling type. This is generally used after executing
       * a mutation that changes the data.
       *
       * Supports
       */
      onSuccessMethod?: ReactoryFormActionHandlerType | ReactoryFormActionHandlerType[];

      /**
       * Response handlers key names should match the typename of the
       * response data. i.e. if your graph type name is "Foo" then the
       * response handler key should be "Foo". This is used to map results for
       * queries or mutaions that have union types. Use these when the query or mutation
       * returns with a union type.
       */
      responseHandlers?: {
        [key: string]: IReactoryFormGraphResultHandler;
      };
      /**
       * The event handler information that provides additional
       * on sucess handling strategies.
       */
      onSuccessEvent?: IReactoryEvent | undefined;
      /**
       * How we wnt to handle the data merging. We can merge, replace or use a custom function.
       */
      mergeStrategy?: string | "merge" | "replace" | "function" | "none";
      /**
       * A FQN of a function that will be used to perform the merge
       */
      mergeFunction?: string;
      /**
       *
       */
      onError?: IReactoryFormQueryErrorHandlerDefinition;
      /**
       * Apollo network options to use with the query
       */
      options?: {
        fetchPolicy?: string | "cache-first" | "cache-and-network" | "network-only" | "cache-only";
        [key: string]: unknown;
      };
      /**
       * A throttle in ms, if this called is to be throttled.
       * This is useful for queries or mutations that trigger on
       * form change events.
       */
      throttle?: number;
    }

    export interface IReactoryFormQuery extends IReactoryFormGraphElement {
      /**
       * The message that will be displayed while the form is updating
       */
      queryMessage?: string;
      /**
       * Custom static properties that will be passed to the qery
       * */
      props?: object;

      /**
       *
       */
      autoQuery?: boolean;
      //the number of milliseconds the autoQuery must be delayed for before executing
      autoQueryDelay?: number;
      /**
       *
       * */
      interval?: number;
      /**
       * Indicates whether or not to use websockets for the query
       */
      useWebsocket?: boolean;
      /**
       * Notification object
       */
      notification?: IReactoryNotification;
      refreshEvents?: IReactoryEvent[] | undefined;
    }

    export interface IReactoryFormMutation extends IReactoryFormGraphElement {
      /**
       * The name of the mutation. This should match the mutation name on your
       * graph server.
       */
      name: string;
      /**
       * The full mutation text.
       * @example
       * mutation Foo($input) {
       *  Foo(input:$input) {
       *    bar
       *  }
       * }
       */
      text: string;
      /**
       * The message that will be displayed will the form is updating
       * in a minimal modal
       */
      updateMessage?: string;
      /**
       * Any events that needs to be fired once the
       * the mutation has been executed.
       */
      refreshEvents?: IReactoryEvent[] | undefined;
      /**
       * A url that / url template that
       * will be used to redirect the user navigation.
       */
      onSuccessUrl?: string;
      /**
       * The timeout in millis that the form will wait
       * before redirecting the user.
       *
       * The default value is 500
       */
      onSuccessRedirectTimeout?: number;
      /**
       * A notification object
       */
      notification?: IReactoryNotification;
      /**
       * Currently supported options are "merge" and "replace"
       */
      mergeStrategy?: "merge" | "replace" | "function" | "none";
      /**
       * The merge function that will be used to merge the current form data with
       * the incoming form data.
       *
       * It can be either a string which must be a
       */
      mergeFunction?: string | "(data: unknown) => unknown";
      /**
       *
       */
      handledBy?: string | "onChange" | "onSubmit";

      objectMap?: boolean;
      /**
       * Options object to pass to the mutation
       */
      options?: {
        /**
         * Refetech Queries that will be executed after the mutation
         */
        refetchQueries?: unknown[];
      };
    }

    export type ElementSymbol = string | symbol;

    export interface IReactoryFormMutations {
      new?: IReactoryFormMutation;
      edit?: IReactoryFormMutation;
      delete?: IReactoryFormMutation;
      [key: ElementSymbol]: IReactoryFormMutation;
    }

    export interface IReactoryFormQueries {
      [key: ElementSymbol]: IReactoryFormQuery;
    }

    /**
     * IFormGraphDefinition, defines a form has data binding for graphql queries
     */
    export interface IFormGraphDefinition {
      /**
       * Default graphql query
       */
      query?: IReactoryFormQuery;
      mutation?: IReactoryFormMutations;
      queries?: IReactoryFormQueries;
      clientResolvers?: unknown;
    }

    /**
     * This interface provides the structure for a REACTORY form
     */
    export interface IReactoryFormRESTCall {
      /**
       * Defines where the rest call is executed. The call can either
       * be made from the client or from the server on behalf of the user.
       *
       * The default is server side. The form will detect where the data pipeline should execute
       * and will process the call using either client or server.
       */
      runat?: "server" | "client";
      /**
       * The cache settings for the FORM.
       */
      cache?: any;
      /**
       * Indicates which provider to use to execute the
       * data fetch. Default is fetch.
       */
      provider?: "axios" | "fetch";
      /**
       * Method to use for the rest call.
       */
      method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
      /**
       * Options to pass to the rest call
       */
      options: {
        /**
         *
         */
        headers?: any;
        body?: any;
        [key: string]: any;
      };
      optionsProvider: FQN;
      /**
       * The URL for the rest call. Can be a template string.
       *
       * i.e.
       *
       * ${process.env.SOME_API_URL}/v1/customer/${formContext.queryObject.user_id}
       */
      url: string;
    }

    /**
     * Interface for REST Definitions.
     */
    export interface IFormRESTDefinition {
      default?: string;
      queries?: {
        [key: string]: IReactoryFormRESTCall;
      };
      mutations?: {
        [key: string]: IReactoryFormRESTCall;
      };
    }

    export interface IReactoryGRPCCall {}

    export interface IFormGrpcDefinition {}

    export interface IWidgetMap {
      component?: string | unknown;
      componentFqn: string;
      widget: string;
      props?: unknown;
      propsMap?: IObjectMap;
    }

    export interface IFieldMap {
      component: string | unknown;
      componentFqn: string;
      field: string;
    }

    export interface IObjectMap {
      [key: string]: string | Array<unknown> | object;
    }

    /**
     * ScreenSizeKey is define a screen size or breakpoint for the form engine.
     * The screen size key can be a breakpoint or a number.
     * Breakpoits are defined as xs, sm, md, lg, xl
     */
    export type ScreenSizeKey = Breakpoint | number;

    /**
     * The IUISchemaMenuItem is used to define a menu item that will be used to
     * to select a UI schema for the form engine.
     */
    export interface IUISchemaMenuItem {
      /**
       * The unique id for the menu item.
       */
      id: string;
      /**
       * The title for the menu item. This is the text that will be displayed
       * in the menu. Provide a i18n key if you want to use translations.
       */
      title: string;
      /**
       * The key for the menu item. This is the key that will be used to select
       * the UI schema for the form engine.
       */
      key: string;
      /**
       * The description for the menu item. This is the text that will be displayed as a tooltip
       * for the menu item. Provide a i18n key if you want to use translations.
       */
      description: string;
      /**
       * The icon for the menu item. This is the icon that will be displayed in the menu.
       */
      icon: string;
      /**
       * schema that can be used to override the default schema.
       */
      schema?: Schema.AnySchema;
      /**
       * Defines how the schemma should be merged with the default schema
       * - merge - will merge the schema with the default schema
       * - replace - will replace the default schema with the schema
       * - remove - will remove the schema from the default schema
       *
       * Default is merge
       */
      schemaMergeStragegy?: "merge" | "replace" | "remove";
      /**
       * The UI schema that will be used for the form engine.
       */
      uiSchema: Schema.IFormUISchema;
      /**
       * Defines how the ui schema should be merged with the default ui schema
       * - merge - will merge the ui schema with the default ui schema
       * - replace - will replace the default ui schema with the ui schema
       * - remove - will remove the ui schema from the default ui schema
       *
       * Default is merge
       */
      uiSchemaMergeStrategy?: "merge" | "replace" | "remove";
      /**
       * used to override the graphql definitions for that view type
       * */
      graphql?: IFormGraphDefinition;
      /**
       * The modes that the menu item is available for. The mode for the form
       * engine is set by the form engine. The mode is used to determine the
       * what actions are available for the form.
       */
      modes?: string[];
      /**
       * Defines which screen sizes the menu item is available for.
       */
      sizes?: ScreenSizeKey[];
      /**
       * Defines a minimum width for the menu item. When set
       * the menu item will only be available when the screen
       * width is greater than or equal to the min width.
       */
      minWidth?: number;
      /**
       * Indicates which platforms the menu item is available for.
       */
      platforms?: Platform.PlatformType[];

      /**
       * a regex pattern that matches the
       * connecting client. This is to ensure
       * we only provide uiSchemas that are
       * compatible with the target device / app
       */
      userAgents?: string[];
    }

    export interface IReactoryComponentDefinition {
      fqn?: string;
      dependencies?: IReactoryComponentDefinition[];
      props?: unknown;
      propsMap?: unknown;
      componentType: string | "component" | "object" | "function" | "module" | "plugin";
    }

    export interface IReactoryPdfReport extends Client.IFramedWindowProperties {
      title?: string;
      report: string;
      folder: string;
      icon?: string;
      reportTitle?: string;
      waitingText?: string;
      dataMap?: IObjectMap;
    }

    export interface IExcelColumnDefinition {
      title: string;
      propertyField: string;
      format: string;
      type: string;
      width?: number;
      key?: string;
      required: boolean;
      style?: unknown;
    }

    export interface IExcelSheet {
      name: string;
      index: number;
      arrayField: string;
      startRow: number;
      columns: IExcelColumnDefinition[];
    }

    export interface IExcelExportOptions {
      filename: string;
      sheets: IExcelSheet[];
    }

    export interface IExport extends Client.IFramedWindowProperties {
      title?: string;
      engine?: string;
      useClient?: boolean;
      mappingType?: string;
      mapping?: unknown;
      exportOptions?: unknown;
      disabled?: string;
      icon?: string;
    }

    export interface IReactoryComponentDefinition {
      fqn?: string;
      dependencies?: IReactoryComponentDefinition[];
      props?: unknown;
      propsMap?: unknown;
      componentType: string | "component" | "object" | "function" | "module" | "plugin";
    }

    /**
     * A reactory Event Bubble Action
     */
    export interface IEventBubbleAction {
      /**
       * The event name
       */
      eventName: string;
      /**
       * Action to take
       */
      action: string | "bubble" | "swallow" | "function";
      /**
       * The fuction FQN if set to function
       */
      functionFqn?: string;
    }

    /**
     * A Reactory Form / Code module.
     *
     * A module that is defined on a form will be parsed
     * by the forms collector / forms resolvers.  The
     * module definitions will automatically add
     * resource dependendies to the form resources
     * that will allow the ReactoryFormComponent to download
     * and install components in a JIT compiled manner.
     */
    export interface IReactoryFormModule {
      id: string;
      src?: string;
      url?: string;
      compiled?: boolean;
      signed?: boolean;
      signature?: string;
      compiler?: string | "npm" | "none" | "webpack" | "grunt" | "rollup";
      compilerOptions: unknown;
      /***
       * When roles are added the API will check the logged in user
       * credentials and will include or exclude the resource based on role
       */
      roles?: string[];
      fileType?: string;
      components?: Client.IReactoryComponentRegistryEntry<unknown>[];
    }

    /**
     * Reactory Form Resource structure
     */
    export interface IReactoryFormResource {
      /**
       * A unique id for the ui resource. This has to be unqiue for the runtime of the
       * application. When a UI resource is injected into the client, it will check the client
       * whether or not the resource has been injected / delivered.
       */
      id?: string;
      /**
       * The name of the Form UI resource. This is a human readable name
       */
      name: string;
      /**
       * The type of asset / resource. Common types are css, script, image video and audio. Addition
       * types provided are wasm, module, certificate and data. Other types may be used for for
       * custom code ingestors.
       */
      type:
        | string
        | "css"
        | "font"
        | "json"
        | "xml"
        | "text"
        | "html"
        | "pdf"
        | "script"
        | "image"
        | "video"
        | "audio"
        | "wasm"
        | "module"
        | "certificate"
        | "data";
      /**
       * Indicates if the form resource is required
       */
      required?: boolean;
      /**
       * A string template that can be used to evaluate if the component is
       * already installed / available on the target container / window / form.
       *
       * An example could be checking if a module is already loaded in the component registery
       * @example
       * ${reactory.componentRegister["core.MyModule@1.0.0"] !== undefined &&
       * reactory.componentRegister["core.MyModule@1.0.0"] !== null}
       */
      expr?: string;
      /**
       * Indicates whetther or not the resource is signed.
       */
      signed?: boolean;
      /**
       * Indicator of how this resource is signed
       */
      signature?: string;
      /**
       * Text indicator of how this resource is signed
       */
      signatureMethod?: string;
      /**
       * Indicate whether or not this resource is being taken from a 3rd party domain.
       */
      crossOrigin?: boolean;
      /**
       * The uniform resource identifier for this UI Resource item.  For a web client this would be
       * a https://your.resource.com/package/script.js or for css https://your.resource.com/package/css.js
       * For a native client this would be a resource identifier for a library include that
       * can be a react-native package, an android external module or an ios external module.
       */
      uri: string;
      /**
       * A loader to use when loading the resource. This is useful for loading resources that
       * are not standard. If no loader is defined the default action for the target platform should
       * be implement.
       */
      loader?: FQN;
      /**
       * If true, the Reactory Server will attempt to load the resource from the server
       * and inject it into the client via the reactory server data location.
       */
      autoProxy?: boolean;
      /**
       * Indicates whether or not to cache the remote resource
       */
      cache?: boolean;
      /**
       * The cache timeout in milliseconds
       */
      cacheTimeout?: number;
      /**
       * The cache key to use for the resource
       */
      cacheKey?: string;
      /**
       * The cache provider to use for the resource
       */
      cacheProvider: FQN;
    }

    /**
     * Resource loader options
     */
    export interface IResourceLoaderOptions {
      /**
       * The resource to load
       */
      resource: IReactoryFormResource;
      /**
       * The reactory client
       */
      reactory: Reactory.Client.ReactorySDK;
    }

    /**
     * Reactory Resource Loader
     */
    export type ReactoryResourceLoader = (options: IResourceLoaderOptions) => Promise<void>;

    export interface IReactoryFormBase {
      /**
       * A unique id for the form. This id, allows the form to be found
       * via the reactory.form(id)
       */
      id: string;
      /**
       * The uiFramework to use for this form.
       */
      uiFramework?: string | "material" | "bootstrap" | "blueprint" | "office";
      /**
       * uiSupport that is availanle for this form
       */
      uiSupport?: string[];
      /**
       * The uiResources that is required for the form to render.
       */
      uiResources?: IReactoryFormResource[];
      /**
       * The title for the form. This is a human readable string or it can be a
       * i18n language key
       */
      title?: string;
      /**
       * The tags for the resource
       */
      tags?: string[];

      /**
       * avatar image for the form
       */
      avatar?: string;

      /**
       * icon to use when representing the form
       */
      icon?: string;

      /**
       * A list of help topics associated with the form.
       */
      helpTopics?: string[];
    }

    export interface IReactoryFormArgs {
      /**
       * provides a schema when requiring input parameters to execute a graph action
       */
      argsSchema?: Schema.AnySchema | Schema.TServerSchemaResolver | Schema.TClientSchemaResolver;
      /**
       * provides a ui schema when require input parameters to execute a graph action
       */
      argsUiSchema?:
        | Schema.IFormUISchema
        | Schema.IUISchema
        | Schema.TServerUISchemaResolver
        | Schema.TClientUISchemaResolver;

      /**
       * provides the component id / fully qualified name to use for parameter input
       * The component FQN should take precendence over the argSchema and argUiSchema
       */
      argsComponentFqn?: string;
    }

    export interface IReactoryFormSchemas {
      /**
       * The schema that represents the form
       */
      schema: Schema.AnySchema | Schema.TServerSchemaResolver | Schema.TClientSchemaResolver;
      /**
       * A sanitzation schema. This schema will ensure that the data
       * produced by the form input conforms to a given standard.
       */
      sanitizeSchema?: Schema.AnySchema;
      /**
       * The default uiSchema to use
       */
      uiSchema?:
        | Schema.IFormUISchema
        | Schema.IUISchema
        | Schema.TServerUISchemaResolver
        | Schema.TClientUISchemaResolver;
      /**
       * uiSchemas this is a list of uiSchemas that is available
       * to the connecting client.
       */
      uiSchemas?: IUISchemaMenuItem[];
      /**
       * The default UI Schema Key
       */
      defaultUiSchemaKey?: string;
    }

    export interface IReactoryFormRuntime {
      /**
       * Indicate whether or not to use this form as a component?
       */
      registerAsComponent?: boolean;
      /**
       * The nameSpace for the form.
       */
      nameSpace: string;
      /**
       * The name for the form.
       */
      name: string;
      /**
       * The description for the form.
       */
      description?: string;
      /**
       * The version number for the form.
       */
      version: string;
      /**
       * The roles that are allowed access this form.
       */
      roles?: string[];
      /**
       * The components that this form uses / requires.
       */
      components?: string[];
    }

    export type ReactoryFormDataProvider =
      | FQN
      | "graphql"
      | "rest"
      | "local"
      | "grpc"
      | "socket"
      | "none";

    export interface IReactoryFormDataProviderOptions {
      [key: string]: unknown;
      /**
       * Defines the data merging strategy for the data provider.
       * - FQN: A fully qualified name of a function that will be used to merge the data.
       *   The function needs to be registered in the reactory container.
       * - merge: Will merge the data with the form data
       * - replace: Will replace the form data with the data
       * - none: Will do nothing (default)
       * - mapper: Will use the map to map the data
       */
      mergeStrategy?: FQN | "merge" | "replace" | "none" | "mapper";
      /**
       * The object map to use for mapping the data if the merge strategy is set to mapper
       * or if the merge strategy is undefined, but the map is defined.
       */
      map?: ObjectMap;
    }
    export interface IReactoryFormDataProvider<TOptions extends IReactoryFormDataProviderOptions> {
      type: ReactoryFormDataProvider;
      options?: TOptions;
    }
    /**
     * Data provider configuration for a reactory form.
     */
    export interface IReactoryFormDataProviderConfig {
      /**
       * Providers are used to provide data to the form. The form can use
       * multiple providers to provide data to the form.
       *
       * By default the form will attempt use local data provider and graphql data provider as default if none
       * is specified.
       *
       * The providers are executed in order they are defined. The first provider will be considered the primary
       * provider.
       */
      providers?: {
        [key: string]: ReactoryFormDataProvider;
      };
    }

    /**
     * The main interface for the data structure that represents the Reactory Form.
     * Most properties are optional as the form only requires a schema and a few other basic
     * properties in order to run as a reactory form / component.
     */
    export interface IReactoryForm
      extends IReactoryFormBase,
        IReactoryFormArgs,
        IReactoryFormSchemas,
        IReactoryFormRuntime,
        IReactoryFormDataProviderConfig {
      /**
       * The graph definition for the form
       */
      graphql?: IFormGraphDefinition;
      /**
       * Default value for the form
       */
      defaultFormValue?: unknown;
      /**
       * Default PDF Report entry to use when generating PDFs
       */
      defaultPdfReport?: IReactoryPdfReport;
      /**
       * Default Excel export definition to use when exporting excel
       */
      defaultExport?: IExport;
      /**
       * An array of reports associated with this form
       */
      reports?: IReactoryPdfReport[];
      /**
       * An array of export definitions assoacited with this form
       */
      exports?: IExport[];
      /**
       * Refresh property has several flags that can be used to
       * triggere a form refresh.
       */
      refresh?: {
        onChange?: boolean;
        onSubmit?: boolean;
        onTimeout?: number;
      };
      /**
       * The widget map used to map components to internal Widgets
       */
      widgetMap?: IWidgetMap[];
      /**
       * A field map used to map components to internal field
       */
      fieldMap?: IFieldMap[];
      /**
       * Indicates whether or not the back button must be displayed
       */
      backButton?: boolean;
      /**
       * A work flow configuration for the form. The workflow will be
       * triggered when the form is submitted.
       */
      workflow?: {
        /** The id of the workflow to call */
        id: FQN;
        /**
         * The object map to use to transform the
         * input data.
         */
        map?: ObjectMap;
        /**
         * Any additional properties to use for the merge
         */
        props?: unknown;
      };
      /**
       * boolean property for indicating Html5 validation
       */
      noHtml5Validate?: boolean;
      /**
       * A form context data / properties that should be injected
       */
      formContext?: Reactory.Client.IReactoryFormContext<unknown>;
      /**
       * fields for the form. The fields are set at runtime
       * and are used to render the form. The fields are derived
       * by using the uiFramework selection.
       */
      fields?: unknown;
      /**
       * Widgets for the form. The widgets are set at runtime
       * and are used to render the form. The widgets are derived
       * by using the uiFramework selection.
       */
      widgets?: unknown;
      /**
       * Only set this value to true, if the form is intended
       * to run outside of the main reactory container. This is for
       * edge cases where the form is rendered inside some other static content that
       * is not managed by the reactory container.
       *
       * This provides a separate application context for that form instance.
       */
      wrap?: boolean;
      /**
       *
       */
      eventBubbles?: IEventBubbleAction[];
      /**
       * A custom field template
       */
      FieldTemplate?: Client.AnyValidComponent;
      /**
       * A custom Object Field Template that can be provided per form
       */
      ObjectFieldTemplate?: Client.AnyValidComponent;
      /**
       * components to mount in the componentDef propertie
       */
      componentDefs?: string[];
      /**
       * object map to use for mapping querystring.
       */
      queryStringMap?: unknown;

      /**
       * Array of dependencies this form or it's children
       * may relay on in order to successfully load.
       */
      dependencies?: IReactoryComponentDefinition[];
      /**
       * An array of modules that the form may require.
       * These modules are compiled and emitted at runtime to optimize
       * best use of server resource and client resources
       */
      modules?: IReactoryFormModule[];
      /**
       * Boolean flag stored on the form to indicate if the full
       * schema has been fetched yet.
       */
      __complete__?: boolean;
      /**
       * The source is where form originates from or where it must
       * be published to.  If the source is null, it will automatically
       * be assigned the __runtime__ value.
       *
       * Modules that publish their forms need to provide the source
       * location if editing the form is allowed via the editor.
       */
      source?: string;
      /**
       * If remote editing (client side) of form is allowed
       * then this property has to be set to true. The default
       * value is false.
       */
      allowEdit?: boolean;
      /**
       * Edit roles
       */
      editRoles?: string[];
      /**
       * Clone roles
       */
      cloneRoles?: string[];
      /**
       * Cloning / copying of forms default to false.
       * Has to be explicitly set to true
       */
      allowClone?: boolean;
      /**
       * If published is not set it will by default be set to true
       */
      published?: boolean;

      [key: string]: unknown;
    }

    /**
     * ReactoryFormGeneratorFunction is a function that will generate an array of forms
     */
    export type ReactoryFormGeneratorFunction<TOptions> = (
      options: TOptions,
    ) => Promise<IReactoryForm[]>;

    /**
     * ReactoryFormGeneratorFunctionSync is a function that will generate an array of forms
     */
    export type ReactoryFormGeneratorFunctionSync<TOptions> = (
      options: TOptions,
    ) => IReactoryForm[];

    /**
     * IReactoryFormGenerator is a structure that defines a form generator
     * that can be used to generate a form.
     */
    export interface IReactoryFormGeneratorConfig<TOptions> {
      /**
       * The id of the generator to use
       * i.e. "core-generators.PostgresTable@1.0.0"
       */
      id: FQN;

      /**
       * Options that will be passed to the generator. If the optionsForm is defined
       * then the options will be collected from the form.
       */
      options?: TOptions;
    }

    export type TFormGeneratorProps<TOptions> = Reactory.Service.IReactoryServiceProps &
      IReactoryFormGeneratorConfig<TOptions>;

    export class ReactoryFormGeneratorService<TFormGeneratorProps, TContext> extends Reactory
      .Service.ReactoryService<TFormGeneratorProps, TContext> {
      generate(): Promise<IReactoryForm[]>;
    }

    export interface IReactoryDatabaseEntityColumn {
      name: string;
      type?: string;
      required?: boolean;
      unique?: boolean;
      primaryKey?: boolean;
      autoIncrement?: boolean;
      defaultValue?: unknown;
      readonly?: boolean;
      comment?: string;
      foreignKey?: {
        table: string;
        column: string;
        onDelete?: string | "cascade" | "restrict" | "set null" | "no action";
        onUpdate?: string | "cascade" | "restrict" | "set null" | "no action";
      };
    }
    export interface IReactoryDatabaseEntity {
      /**
       * The type of entity to generate
       */
      type: string | "table" | "view" | "query" | "function";
      /**
       * The schema name of the entity, if not provided the default schema will be used.
       * This schema is usually the database schema name to which the entity belongs.
       */
      schema?: string;
      /**
       * name of the entity
       */
      name: string;
      /**
       * columns to include
       */
      columns?: IReactoryDatabaseEntityColumn[];
      /**
       * Query to use to generate the entity.
       */
      query?: string;
      /**
       * The stereo types to generate for the entity
       */
      stereoTypes?: Reactory.Schema.UISchemaStereotype[];
    }
    /**
     * Defines the interface for the ReactoryFormGeneratorOptions
     * this will be used to pass options to the form generator function
     * that will be used to generate the form.
     *
     * requires a connection id or connection string to the database
     * and a dialect.
     */
    export interface IReactoryRelationDatabaseFormGeneratorOptions {
      /**
       * the connection id / or connection string to use
       * for the postgres database driver. This connection
       * must exist for the partner / reactory client that is
       * executing the generator.
       */
      connection: string;

      /**
       * The name of the module in which the generated
       * forms will be placed.
       */
      module?: string;

      /**
       * The entities to use for the form generation
       */
      entities: IReactoryDatabaseEntity[];
      /**
       * Provides fine grained control of ux output
       */
      outputs?: {
        /**
         * The types of ui schemas is expected to be generated for this
         * form. If defined here these will be used as the default stereotypes
         */
        uiSchemaStereotypes?: Schema.UISchemaStereotype[];
      };
    }

    export type ReactoryFormContext<TData, TAdditional extends Array<unknown>> = {
      signature: string;
      version: number;
      formDef: IReactoryForm;
      formData: TData;
      query: unknown;
      formInstanceId: string;
      setFormData: (data: TData, callback?: () => void) => void;
      refresh: () => void;
      graphql: Reactory.Forms.IFormGraphDefinition;
      getData: (input?: Partial<TData>) => Promise<void>;
      reset: () => void;
      i18n: typeof i18n;
      reactory: Reactory.Client.IReactoryApi;
      screenBreakPoint: string | "xs" | "sm" | "md" | "lg" | "xl";
      [key: string]: unknown;
    } & TAdditional;

    export interface IReactoryFormComponent
      extends React.FunctionComponent<Reactory.Client.IReactoryFormProps<unknown>> {}
  }
}
