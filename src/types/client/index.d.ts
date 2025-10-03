/* eslint-disable no-unused-vars */
/// <reference path="../global.d.ts" />

declare namespace Reactory {
  export namespace Client {
    export type ReactoryUser = Partial<IUser>;

    export type AMQEventData<TEventData> = TEventData | TEventData[];
    export type AMQEventHandler<TEventData> = (data: AMQEventData<TEventData>) => void;
    export interface AsyncMessageQueue {
      $chan: (name: string) => IChannelDefinition<unknown>;
      $sub: {
        def: (eventId: string, func: AMQEventHandler<unknown>, channel?: string) => void;
        transactions: (eventId: string, func: AMQEventHandler<unknown>) => void;
        file: (eventId: string, func: AMQEventHandler<unknown>) => void;
        data: (eventId: string, func: AMQEventHandler<unknown>) => void;
        metrics: (eventId: string, func: AMQEventHandler<unknown>) => void;
        formCommand: (eventId: string, func: AMQEventHandler<unknown>) => void;
        workFlow: (eventId: string, func: AMQEventHandler<unknown>) => void;
        messageHandlerLoaded: (eventId: string, func: AMQEventHandler<unknown>) => void;
        pluginLoaded: (eventId: string, func: AMQEventHandler<unknown>) => void;
      };
      $pub: {
        def: (eventId: string, data: unknown, channel?: string) => void;
        transactions: (eventId: string, data?: AMQEventData<unknown>) => void;
        file: (eventId: string, data?: AMQEventData<unknown>) => void;
        data: (eventId: string, data?: AMQEventData<unknown>) => void;
        metrics: (eventId: string, data?: AMQEventData<unknown>) => void;
        formCommand: (eventId: string, formData: AMQEventData<unknown>) => void;
        workFlow: (eventId: string, data: AMQEventData<unknown>) => void;
        messageHandlerLoaded: (eventId: string, data: AMQEventData<unknown>) => void;
        pluginLoaded: (eventId: string, data: AMQEventData<unknown>) => void;
      };
      onTransactionEvent: (eventId: string, func: AMQEventHandler<unknown>) => void;
      onFileEvent: (eventId: string, func: AMQEventHandler<unknown>) => void;
      onDataEvent: (eventId: string, func: AMQEventHandler<unknown>) => void;
      onMetricEvent: (eventId: string, func: AMQEventHandler<unknown>) => void;
      onFormCommandEvent: (eventId: string, func: AMQEventHandler<unknown>) => void;
      onMessageHandlerLoaded: (eventId: string, func: AMQEventHandler<unknown>) => void;
      onReactoryPluginLoaded: (eventId: string, func: AMQEventHandler<unknown>) => void;
      onReactoryPluginEvent: (eventId: string, func: AMQEventHandler<unknown>) => void;
      raiseTransactionEvent: (eventId: string, data?: AMQEventData<unknown>) => void;
      raiseFileEvent: (eventId: string, data?: AMQEventData<unknown>) => void;
      raiseDataEvent: (eventId: string, data?: AMQEventData<unknown>) => void;
      raiseMetricEvent: (eventId: string, data?: AMQEventData<unknown>) => void;
      raiseFormCommand: (eventId: string, formData: AMQEventData<unknown>) => void;
      raiseWorkFlowEvent: (eventId: string, data: AMQEventData<unknown>) => void;
      raiseMessageHandlerLoadedEvent: (eventId: string, data: AMQEventData<unknown>) => void;
      raiseReactoryPluginEvent: (eventId: string, data: AMQEventData<unknown>) => void;
    }

    export interface LoadashTemplateExecutor {
      (data?: object): string;
      source: string;
    }

    export interface IFrameProperties {
      url: string;
      height: string;
      width: string;
      styles: unknown;
      method?: string;
    }

    export interface IMessageHandler {
      id: string;
      name: string;
      type: string;
      uri: string;
      component: string;
    }

    export interface IFramedWindowProperties {
      proxyRoot?: string;
      frameProps?: IFrameProperties;
      messageHandlers?: IMessageHandler[];
    }

    export interface NotificationProperties {
      title: string;
      options: NotificationOptions;
    }

    export type ValidComponent<P> = React.ComponentType<P>;

    export type AnyValidComponent = ValidComponent<unknown> | "() => JSX.Element";

    export type ValidModule = AnyValidComponent | unknown | Module;

    export type ReactoryFC<P extends IReactoryComponentProps> = React.FunctionComponent<P>;

    export type ReactoryComponent<P extends IReactoryComponentProps, S, SS> = React.Component<
      P,
      S,
      SS
    >;

    export type ReactoryPureComponent<
      P extends IReactoryComponentProps,
      S,
      SS,
    > = React.PureComponent<P, S, SS>;
    export interface IReactoryImports {
      [key: string]: ValidModule;
    }

    export interface ResetPasswordProps {
      password: string;
      confirmPassword: string;
      resetToken: string;
    }

    /**
     * Reactory Api utilities interface.
     */
    export interface IReactoryApiUtils {
      /**
       * Utility function that deep removes unknown properties matching the key input.
       */
      omitDeep: (obj: unknown | unknown[], key?: string) => unknown | unknown[];
      /**
       * Query string utility
       */
      queryString: {
        parse: (queryString: string) => object;
        stringify: (props: object) => string;
      };
      /**
       * Simple hash code generator
       */
      hashCode: (inputString: string) => number;
      /**
       * utility function that injects css and script resources into the application
       */
      injectResources: (sources: Forms.IReactoryFormResource[]) => void;

      /***
       * Helper utility to return the component name, namespace
       * and version from a full or partial component FQN
       */
      componentPartsFromFqn: (fqn: string) => {
        name: string;
        nameSpace: string;
        version: string;
      };
      /**
       * Function that will return a fqn string of a reactory component FQN.
       */
      componentFqn: (component: Reactory.IComponentFqnDefinition) => string;
      /**
       * Validation function to check if plugin passes validation
       */
      pluginDefinitionValid: (pluginDef: Reactory.Platform.IReactoryPluginDefinition) => boolean;
      /**
       * Moment interface
       */
      moment: typeof moment;
      /**
       * Object mappper utility used to convert objects from one shape to another
       */
      objectMapper: typeof ObjectMapper;
      /**
       * Creates a compiled template function that can interpolate data properties
       * in "interpolate" delimiters,
       * HTML-escape interpolated data properties in "escape" delimiters, and execute
       * JavaScript in "evaluate"
       * delimiters. Data properties may be accessed as free variables in the template.
       * If a setting object is
       * provided it takes precedence over _.templateSettings values.
       *
       * Note: In the development build _.template utilizes
       * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl) for easier
       * debugging.
       *
       * For more information on precompiling templates see
       * [lodash's custom builds documentation](https://lodash.com/custom-builds).
       *
       * For more information on Chrome extension sandboxes see
       * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
       *
       * @param string The template string.
       * @param options The options object.
       * @param options.escape The HTML "escape" delimiter.
       * @param options.evaluate The "evaluate" delimiter.
       * @param options.imports An object to import into the template as free variables.
       * @param options.interpolate The "interpolate" delimiter.
       * @param options.sourceURL The sourceURL of the template's compiled source.
       * @param options.variable The data object variable name.
       * @return Returns the compiled template function.
       */
      template: (
        templateString: string,
        templateOptions?: Lodash.TemplateOptions,
      ) => Lodash.TemplateExecutor;
      /**
       * This function allows you to pass in a templated object definition.
       * The function iterates over every propery of the object and then
       * checks the value of that property.
       *
       * If the property is a string, we check for a template pattern ${...}
       * and then parse the template against the input propety bag data.
       * @param templateObject
       * @param props
       */
      templateObject: <T>(objectMap: Reactory.ObjectMap, props: unknown) => T;
      /**
       * Function to provide easy to read humanized numbers.
       * i.e. 13000 -> 13K
       */
      humanNumber: typeof HumanNumner;
      /**
       * utility function to check if something is nil
       */
      nil: (o: unknown) => boolean;
      /**
       * utility function to check if a string is null or empty
       */
      nilStr: (s: string) => boolean;
      /**
       * Schema inspector shortcut.
       */
      inspector: {
        /**
         * Sanitize a data object using a sanitize schema
         */
        sanitize: (sanitizeSchema: unknown, data: unknown) => void;
        /**
         * Validate data against a validation schema
         */
        validate: (validationSchema: unknown, data: unknown) => unknown;
      };
      /**
       * Shortcut to the gql document function
       */
      gql: typeof gql;
      /**
       * Human date short cut
       */
      humanDate: typeof HumanDate;
      /**
       * returns a slug version of input text.
       * if limit param is > 0 then it will substring the text if it is longer
       * than the given limit.
       */
      slugify: (text: string, limit?: number) => string;
      /**
       * A function that compares if two objects/ arrays are equal.
       */
      deepEquals: (a: unknown, b: unknown, ca?: unknown[], cb?: unknown[]) => boolean;
      /**
       * Lodash module
       */
      lodash: typeof Lodash;
      /**
       * generates class names
       */
      classNames: typeof classNames;
      /**
       * Utility  function to generate a v4 uuid
       */
      uuid: typeof uuid;
      /**
       * Collects data from a collection of forms. This is useful when
       * you have several forms on a page and want collect all data
       * from the forms programmatically.
       *
       * Pass in a shape object that can be used by the ObjectMapper to
       * translate the object into a desired shape.
       */
      collectData: <T>(forms: unknown[], shape: unknown) => T;
      /**
       * localForage
       */
      localForage: LocalForage;
      /**
       * Utility function to check if a string is a valid email
       */
      isEmail: (email: string) => boolean;
      /**
       * Utility function to check if a password passes minimum required
       * spec.
       */
      isValidPassword: (passw: string) => boolean;
    }

    /**
     * Client utilities interface. Alias of IReactoryApiUtils
     */
    export type ClientUtils = IReactoryApiUtils;

    /**
     * Defines the interface definition for a component
     * that is registered in the client kernel.
     */
    export interface IReactoryComponentRegistryEntry<T> {
      /**
       * Required namespace for the component
       */
      nameSpace: string;
      /**
       * Required name for the component
       */
      name: string;
      /**
       * Required version for the component
       * @example "1.0.0"
       * */
      version: string;
      /**
       * The component reference.
       * A component can be a function, class, module, object or
       * any valid javascript value.
       * */
      component: T;
      /**
       * Component tags, these are used to provide additional data
       * about the component.
       */
      tags?: string[];
      /**
       * The user roles that are allowed to access this component.
       */
      roles?: string[];
      connectors?: unknown[];
      componentType?:
        | string
        | "form"
        | "module"
        | "function"
        | "class"
        | "component"
        | "widget"
        | "form-widget";
      title?: string;
      description?: string;
      useReactory?: boolean;
      useErrorBoundary?: boolean;
    }

    /**
     * interface for the component register
     */
    export interface IReactoryComponentRegister {
      /**
       * The component registry is an object that contains a list of components
       * mapped to a fully qualified name. The component registry is used to
       * register components that are available to the client.
       */
      [key: FQN]: IReactoryComponentRegistryEntry<unknown>;
    }

    /**
     * Interface for a grouped component register. This is used to group
     * components by namespace. This is useful when you have a large number
     * of components and you want to group them by namespace.    
     */
    export interface IReactoryGroupedComponentRegister { 
      [nameSpace: string]: {
        [name: string]: { 
          [version: string]: IReactoryComponentRegistryEntry<unknown>
        }
      }
    }

    export interface ILoginResult {
      user: {
        firstName: string;
        lastName: string;
        token: string;
      };
    }

    /**
     * Api Status Request options paramaters
     * interface definition
     */
    export interface IApiStatusRequestOptions {
      /**
       * If true, the reactory api wil emit the
       * onLogin event and provide the user api
       * status object back.
       */
      emitLogin?: boolean;
      /**
       * If true then user will be forcefully
       * logged out in the event that the API
       * doesn't return a successful status call
       */
      forceLogout?: boolean;
      /**
       * A theme key
       */
      theme?: string;
      /**
       * The theme mode
       */
      mode?: string;
    }

    interface IWindowSizeSpec {
      innerWidth: number;
      innerHeight: number;
      outerWidth: number;
      outerHeight: number;
      resolution: {
        width: number;
        height: number;
      };
      ratio: number;
      view: "landscape" | "portrait";
      size: "xl" | "lg" | "md" | "sm" | "xs";
    }

    /**
     * Component dependency alias. Use this to load a component with an alias instead
     * of using the default behavior using the component FQN.name.
     */
    export type ComponentDependencyAlias = { fqn?: FQN, id?: FQN, alias: string };
    /**
     * Component dependency type. This can be a FQN or a ComponentDependencyAlias
     */
    export type ComponentDependency = FQN | ComponentDependencyAlias;

    /**
     * Reactory API interface definition. This interface defines the reactory
     * api that is available to the client. The client api is a singleton
     * instance that is available to the client via the window / global object.
     */
    export interface IReactoryApi {
      /**
       * Constains the navigation history object. This object is used to
       * navigate the application.
       * Future use of this object is not certain and may be removed in future.
       */
      history: unknown;

      /**
       * Navigation function that can be used to navigate the application.
       */
      navigation: ReactRouterAlias.NavigateFunction;

      /**
       * Contains the current location object.
       */
      location: ReactRouterAlias.Location;
      /**
       * Contains register queries, this will be deprecated in future.
       *
       * @deprecated - use of this object is not recommended.
       * */
      queries: unknown;
      /**
       * Contains register mutations, this will be deprecated in future.
       *
       */
      mutations: unknown;
      /**
       * Window size internal state.
       */
      $windowSize: IWindowSizeSpec;
      /**
       * Input props passed to the constructor
       */
      props: unknown;
      /**
       * The application container
       */
      componentRegister: IReactoryComponentRegister;
      /**
       * The apollo client connection
       * */
      client: ApolloClient<NormalizedCacheObject>;

      /**
       * Initializer function that is used to initialize the reactory api.
       * @returns
       */
      init: () => Promise<void>;

      /**
       * Returns the current window size specification.
       * @returns
       */
      getSizeSpec: () => IWindowSizeSpec;

      /**
       * Provides login access to the reactory api using a username and password.
       * @param email
       * @param password
       * @returns
       */
      login: (email: string, password: string) => Promise<ILoginResult>;
      /**
       * Provides a simple register function that can be used to register a user
       * @param username
       * @param password
       * @returns
       */
      register: (username: string, password: string) => void;
      /**
       * Provides a simple reset function that can be used to reset a user password
       * @param email
       * @param password
       * @returns
       */
      reset: (email: string, password: string) => void;
      /***
       * Triggers a password reset email to be sent to the user.
       */
      forgot: (email: string) => void;

      /**
       * Provides a simple logout function that can be used to logout a user
       */
      utils: IReactoryApiUtils;
      /**
       * Gets company with a predefined id.
       * @param id
       * @returns
       */
      companyWithId: (id: string) => Promise<Reactory.Models.IOrganization>;
      /**
       * Functions property provides a map of functions that can be modified and
       * extended by the client.
       */
      $func: {
        [key: string]: (kwargs: unknown[]) => unknown | Promise<unknown>;
      };
      tokenValidated: boolean;
      lastValidation: number;
      tokenValid: boolean;
      /**
       * Utitlity function that is used to return a image url for a specific user profile.
       * @param profile - Reactory user profile object
       * @param alt - the alt text for the image
       * @returns a string url for the user profile image.
       */
      getAvatar: (profile: Reactory.Models.IUser, alt?: string) => string;
      /**
       * Utility function that is used to return a image url for a specific organization logo.
       * @param organizationId 
       * @param file 
       * @returns 
       */
      getOrganizationLogo: (organizationId: string, file: string) => string;
      /**
       * Utitlity function that returns the user's full name.
       * @param user 
       * @returns 
       */
      getUserFullName: (user: Reactory.Models.IUser) => string;
      /**
       * Application CDN root
       * @example "https://cdn.reactory.io" or "http://localhost:4000/cdn" for local development
       */
      CDN_ROOT: string;
      /**
       * Application API root
       * @example "https://api.reactory.io" or "http://localhost:4000/graph" for local development
       * */
      API_ROOT: string;
      /**
       * Application CLIENT_KEY
       */
      CLIENT_KEY: string;
      /**
       * Application CLIENT_PWD
       */
      CLIENT_PWD: string;
      /**
       * Loaded forms schemas that have been loaded for the logged
       * in user.
       */
      formSchemas: Forms.IReactoryForm[];
      /**
       * Last time the form schema was fetched.
       */
      formSchemaLastFetch: Date;
      /**
       * System asset register. Can be extended by the client to provide additional 
       * assets that can be used by the application. Assets are periodically refetched and cached.
       */
      assets: {
        logo: string;
        avatar: string;
        icons: {
          16: string;
          32: string;
          44: string;
          64: string;
          144: string;
          192: string;
          512: string;
        };
        [key: string]: string | { [key: string]: string };
      };
      /**
       * Intenranl Asynchronous message queue
       */
      amq: AsyncMessageQueue;
      /**
       * Internal statistics container
       */
      statistics: unknown[];
      /**
       * Internal form instances, used by the ReactoryForm component
       */
      __form_instances: unknown[];
      /**
       * 
       * */
      flushIntervalTimer: unknown;
      /**
       * Flag that indicates the object is a reactory api object.
       */
      __REACTORYAPI: boolean;
      /**
       * Indicates if client is busy publishing statistics
       */
      publishingStats: boolean;
      /**
       * Reference to the redux store.
       */
      reduxStore: unknown;
      /**
       * Mui theme object
       */
      muiTheme: MaterialCoreAlias.Theme & { [key: string]: unknown };
      /**
       * The current active query object
       * */
      queryObject: { [key: string]: string };
      /**
       * The current active query string
       */
      queryString: string;
      /**
       * helper function to convert an object to a query string
       * @param obj 
       * @returns 
       */
      objectToQueryString: (obj: unknown) => string;
      /**
       * The iniatialized i18n object
       */
      i18n: typeof i18next;
      /**
       * Clears local application cache.
       */
      clearCache(): void;

      /**
       *
       * @param title Central notification api call
       * @param notificationProperties
       */
      createNotification(
        title: string,
        notificationProperties: NotificationProperties | unknown,
      ): void;

      /**
       *
       * @param where
       * @param state
       */
      goto(where: string, state: unknown): void;

      /**
       * Registers a function with reactory component.
       * @param fqn
       * @param functionReference
       * @param requiresApi
       */
      registerFunction(
        fqn: string,
        functionReference: Function | '(args: unknown | unknown[]) => unknown',
        requiresApi: boolean,
      ): void;

      /**
       * central logging for the client
       * @param message
       * @param params
       * @param kind
       */
      log(
        message: string,
        params?: unknown,
        kind?: string | "error" | "debug" | "warning" | "info",
      ): void;

      /**
       * Send a debug message to the logger
       * @param message 
       * @param params 
       */
      debug(message: string, params?: unknown): void;

      /**
       * Send a error message to the logger
       * @param message 
       * @param params 
       */
      error(message: string, params?: unknown): void;

      /**
       * Send a warning message to the logger
       * @param message 
       * @param params 
       */
      warning(message: string, params?: unknown): void;

      /**
       * send an info message to the logger
       * @param message 
       * @param params 
       */
      info(message: string, params?: unknown): void;

      /**
       * publish stats flushes statistic data associated with the user to the server.
       */
      publishstats(): void;

      /**
       * flushes internally saved stats
       * @param save
       */
      flushstats(save: boolean): void;

      /**
       * Use the stat() function to log unknown statistic you want persisted
       * and associated with the user
       * @param key - string key
       * @param statistic - unknown data structure
       */
      stat(key: string, statistic: unknown): void;

      /**
       *
       * @param formInstance
       */
      trackFormInstance(formInstance: unknown): void;

      /**
       * Executes a graph mutation against the API
       *
       * @param mutation
       * @param variables
       * @param options
       */
      graphqlMutation<T, V>(
        mutation: DocumentNode | string,
        variables: V,
        options?: unknown,
      ): Promise<FetchResult<T>>;

      /**
       * Executes a graph query against the API
       * @param query - A graph document node or string.
       * @param variables - The variables object to use for the query
       * @param options - unknown additional options
       */
      graphqlQuery<T, V>(
        query: DocumentNode | string,
        variables: V,
        options?: unknown,
      ): Promise<ApolloQueryResult<T>>;

      /**
       *
       * @param user A function call that is executed on login.
       */
      afterLogin(user: Client.ILoginResult): Promise<Reactory.Models.IApiStatus>;

      /**
       *
       * @param Component
       * @param props
       * @param target
       */
      loadComponent(Component: ValidComponent<unknown>, props: unknown, target: unknown): void;

      /**
       *
       * @param fqn
       * @param props
       * @param target
       */
      loadComponentWithFQN(fqn: string, props: unknown, target: unknown): void;

      /**
       * ??
       * @param componentView
       */
      renderForm(componentView: unknown): unknown;

      /**
       * Function call to render a reactory form component.
       * @param form
       */
      reactoryForm(form: Forms.IReactoryForm): React.ReactElement;

      /**
       * Function call to reload the forms
       */
      forms(): Promise<Reactory.Forms.IReactoryForm[]>;

      /**
       * Loads a form with a gven id
       * @param id - FQN for the form.
       * @param onFormUpdated - callback function to call when form schema is updated.
       * @param options - Options that is passed to the form resolver Form schema and ui schema can use options to change ouput
       */
      form(
        id: string,
        onFormUpdated?: (form: Forms.IReactoryForm, error?: Error) => void,
        options?: any
      ): Forms.IReactoryForm;

      /**
       *
       * @param commandId
       * */
      raiseFormCommand(commandId: string, commandDef: unknown, formData: unknown): Promise<unknown>;

      /**
       * starts a workflow
       * */
      startWorkFlow(workFlowId: string, data: unknown): void;

      /**
       *
       * @param commandId
       * @param func
       */
      onFormCommandEvent(commandId: string, func: (args: unknown | unknown[]) => unknown): void;

      /**
       * Checks user roles against the given roles
       * @param itemRoles
       * @param userRoles
       * @param organization
       * @param business_unit
       * @param userMembership
       */
      hasRole(
        itemRoles: string[],
        userRoles?: string[],
        organization?: Reactory.Models.IOrganization,
        business_unit?: Reactory.Models.IBusinessUnit,
        userMembership?: Reactory.Models.IMembership[],
      ): boolean;

      isAnon(): boolean;

      addRole(
        user: Reactory.Models.IUser,
        organization: Reactory.Models.IOrganization,
        role: string,
      ): boolean;

      removeRole(
        user: Reactory.Models.IUser,
        organization: Reactory.Models.IOrganization,
        role: string,
      ): boolean;

      getMenus(target: unknown): unknown[];
      /**
       * Returns the current theme
       */
      getTheme(): UX.IReactoryTheme;

      /**
       * Returns resource for the current theme key.
       *
       * i.e. if you want to load current theme avatar from the CDN
       * then use images/avatar.png, the call will return the file located at
       * CDN_ROOT/themes/CLIENT_KEY/images/avatar.png
       */
      getThemeResource: (path?: string) => string;

      /**
       * returns a resource from the current active CDN.
       */
      getCDNResource: (path: string) => string;

      /***
       * Returns the routes for the application
       */
      getRoutes(): Reactory.Routing.IReactoryRoute[];

      /**
       * Returns the roles available for this application
       */
      getApplicationRoles(): string[];

      /**
       * Set the "User" object. This user object is technically an API response object that is
       * constructed from the logged in user.
       * @param user
       */
      setUser(user: Reactory.Models.IApiStatus): void;

      /**
       * Set the authorization token for the user
       * @param token
       */
      setAuthToken(token: string): void;
      /**
       * gets the auth token for the logged in user
       */
      getAuthToken(): string;

      /**
       * Sets the last user email address
       * @param email
       */
      setLastUserEmail(email: string): void;

      /**
       * Returns the last user that logged in
       */
      getLastUserEmail(): void;

      /**
       * Component register
       * @param nameSpace
       * @param name
       * @param version
       * @param component
       * @param tags
       * @param roles
       * @param wrapWithApi
       * @param connectors
       * @param componentType
       */
      registerComponent(
        nameSpace: string,
        name: string,
        version: string,
        component: unknown,
        tags?: string[],
        roles?: string[],
        wrapWithApi?: boolean,
        connectors?: unknown[],
        componentType?: string,
      ): void;
      /**
       * Use getComponents to retrieve components from the registry.
       * @param dependencies
       */
      getComponents<TComponents>(dependencies: ComponentDependency[]): TComponents;
      /**
       * Returns a component for the given key.
       * @param fqn
       */
      getComponent<TComponent>(dependency: FQN): TComponent;

      /**
       * Returns a slice of all the components that match the type
       * @param type
       */
      getComponentsByType(type: string): IReactoryComponentRegister;

      /**
       *
       * @param notFoundComponentFqn Returns a component to use a
       */
      getNotFoundComponent(notFoundComponentFqn: string): ValidComponent<unknown>;

      getNotAllowedComponent(notAllowedComponentFqn: string): ValidComponent<unknown>;

      /**
       * Function to mount a component to a dom node.
       * @param ComponentToMount 
       * @param props 
       * @param domNode 
       * @param theme 
       * @param callback 
       */
      mountComponent(
        ComponentToMount: React.ComponentType<unknown> | ValidComponent<unknown>,
        props: unknown,
        domNode: unknown,
        theme?: boolean,
        callback?: () => void,
      ): void;

      /**
       * 
       * @param componentFqn 
       * @param title 
       * @param props 
       * @param modalProps 
       * @param domNode 
       * @param theme 
       * @param callback 
       */
      showModalWithComponentFqn(
        componentFqn: string,
        title: string,
        props: unknown,
        modalProps: unknown,
        domNode: unknown,
        theme: unknown,
        callback: (args: unknown | unknown[]) => unknown,
      ): void;

      /**
       * 
       * @param title 
       * @param ComponentToMount 
       * @param props 
       * @param modalProps 
       * @param domNode 
       * @param theme 
       * @param callback 
       */
      showModalWithComponent(
        title: string,
        ComponentToMount: ValidComponent<unknown>,
        props: unknown,
        modalProps: unknown,
        domNode: unknown,
        theme: unknown,
        callback: (args: unknown | unknown[]) => unknown,
      ): void;

      /**
       * 
       * @param ComponentToCreate 
       * @param props 
       */
      createElement(ComponentToCreate: ValidComponent<unknown>, props: unknown): unknown;

      /**
       * Removes a component from the dom.
       * @param node 
       */
      unmountComponent(node: unknown): boolean;

      /**
       * 
       * @param refreshStatus 
       */
      logout(refreshStatus: boolean): void;

      /**
       * 
       */
      getLastValidation(): number | unknown;

      /**
       * 
       */
      getTokenValidated(): boolean | unknown;

      /**
       * 
       */
      getUser(): Reactory.Models.IApiStatus;

      /**
       * 
       * @param provider 
       * @param props 
       */
      saveUserLoginCredentials(provider: string, props: unknown): Promise<unknown>;

      /**
       * 
       * @param provider 
       */
      getUserLoginCredentials(provider: string): Promise<unknown>;

      /**
       * Stores an Object With a Key
       * @param key - unique key to use for the item
       * @param objectToStore - the object to store
       * @param indexDB - if true will use localForage / index DB to store the data,
       *  default is false
       * @param cb - callback only applicable to indexDB true
       */
      storeObjectWithKey(
        key: string,
        objectToStore: unknown,
        indexDB?: boolean,
        cb?: (err: unknown) => void,
      ): Promise<void>;

      /**
       * Reads an object from local storage
       * @param key - the key to use for reading the storage
       * @param indexDB - boolean flag to indicate whether or not to use index db
       * @param cb  - callback for error handling
       */
      readObjectWithKey(
        key: string,
        indexDB?: boolean,
        cb?: (err: unknown) => void,
      ): Promise<unknown>;

      /**
       * deletes an object from local storage
       * @param key - the key to use for deleting
       * @param indexDB - boolean to indicate if the key is indexDB
       * @param cb - callback for error handling
       */
      deleteObjectWithKey(
        key: string,
        indexDB?: boolean,
        cb?: (err: unknown) => void,
      ): Promise<void>;

      /**
       * Calls the API Status graph endpoint
       * @param options
       */
      status(options?: IApiStatusRequestOptions): Promise<Reactory.Models.IApiStatus>;

      /**
       * Validates a token input
       * @param token 
       */
      validateToken(token: string): void;

      /**
       * Initiates the password reset process for a user.
       * @param resetProps 
       */
      resetPassword(resetProps: ResetPasswordProps): Promise<unknown>;

      /**
       * Injects a resource defined in the form resource object
       * @param resource 
       */
      injectResource(resource: Forms.IReactoryFormResource): void;

      /**
       * Inbjects a plugin component into the platform.
       * @param plugin 
       */
      injectPlugin(plugin: Platform.IReactoryApplicationPlugin): void;

      setViewContext(context: unknown): void;

      getViewContext(): unknown;

      extendClientResolver(resolver: unknown): void;

      setDevelopmentMode(enabled: boolean): void;

      isDevelopmentMode(): boolean;

      emit(event: string | symbol, ...args: unknown[]): boolean;
      [key: string]: unknown;
    }

    export class ReactorySDK extends EventEmitter implements IReactoryApi {      
      [key: string]: unknown;
      $windowSize: IWindowSizeSpec;
      init: () => Promise<void>;
      getSizeSpec: () => IWindowSizeSpec;
      form(
        id: string,
        onFormUpdated?: (form: Forms.IReactoryForm, error?: Error) => void,
      ): Forms.IReactoryForm;
      navigation: ReactRouterAlias.NavigateFunction;
      location: ReactRouterAlias.Location;
      history: unknown;
      queries: unknown;
      mutations: unknown;
      props: unknown;
      componentRegister: IReactoryComponentRegister;
      client: ApolloClient<NormalizedCacheObject>;
      login: (email: string, password: string) => Promise<ILoginResult>;
      register: (username: string, password: string) => void;
      reset: (email: string, password: string) => void;
      forgot: (email: string) => void;
      utils: IReactoryApiUtils;
      companyWithId: (id: string) => Promise<Reactory.Models.IOrganization>;
      $func: { [key: string]: (kwargs: unknown[]) => unknown };
      tokenValidated: boolean;
      lastValidation: number;
      tokenValid: boolean;
      getAvatar: (profile: Reactory.Models.IUser, alt?: string) => string;
      getOrganizationLogo: (organizationId: string, file: string) => string;
      getUserFullName: (user: Reactory.Models.IUser) => string;
      CDN_ROOT: string;
      API_ROOT: string;
      CLIENT_KEY: string;
      CLIENT_PWD: string;
      formSchemas: Forms.IReactoryForm[];
      formSchemaLastFetch: Date;
      assets: {
        logo: string;
        avatar: string;
        icons: {
          16: string;
          32: string;
          44: string;
          64: string;
          144: string;
          192: string;
          512: string;
        };
      };
      amq: AsyncMessageQueue;
      statistics: unknown[];
      __form_instances: unknown[];
      flushIntervalTimer: unknown;
      __REACTORYAPI: boolean;
      publishingStats: boolean;
      reduxStore: unknown;
      muiTheme: MaterialCoreAlias.Theme & { [key: string]: unknown };
      queryObject: { [key: string]: string };
      queryString: string;
      objectToQueryString: (obj: unknown) => string;
      i18n: typeof i18n;
      clearCache(): void;
      createNotification(title: string, notificationProperties: unknown): void;
      goto(where: string, state: unknown): void;
      registerFunction(
        fqn: string,
        functionReference: (args: unknown) => unknown,
        requiresApi: boolean,
      ): void;
      log(message: string, params?: unknown, kind?: string): void;
      debug(message: string, params?: unknown): void;
      error(message: string, params?: unknown): void;
      warning(message: string, params?: unknown): void;
      info(message: string, params?: unknown): void;
      publishstats(): void;
      flushstats(save: boolean): void;
      stat(key: string, statistic: unknown): void;
      trackFormInstance(formInstance: unknown): void;
      graphqlMutation<T, V>(
        mutation: string | DocumentNode,
        variables: V,
        options?: unknown,
      ): Promise<FetchResult<T, Record<string, any>, Record<string, any>>>;
      graphqlQuery<T, V>(
        query: string | DocumentNode,
        variables: V,
        options?: unknown,
      ): Promise<ApolloQueryResult<T>>;
      afterLogin(user: ILoginResult): Promise<Reactory.Models.IApiStatus>;
      loadComponent(Component: ValidComponent<unknown>, props: unknown, target: unknown): void;
      loadComponentWithFQN(fqn: string, props: unknown, target: unknown): void;
      renderForm(componentView: unknown): unknown;
      reactoryForm(
        form: Forms.IReactoryForm,
      ): ReactAlias.ReactElement<any, string | ReactAlias.JSXElementConstructor<any>>;
      forms(): void;
      raiseFormCommand(commandId: string, commandDef: unknown, formData: unknown): Promise<unknown>;
      startWorkFlow(workFlowId: string, data: unknown): void;
      onFormCommandEvent(commandId: string, func: (args: unknown) => unknown): void;
      hasRole(
        itemRoles: string[],
        userRoles?: string[],
        organization?: Reactory.Models.IOrganization,
        business_unit?: Reactory.Models.IBusinessUnit,
        userMembership?: Reactory.Models.IMembership[],
      ): boolean;
      isAnon(): boolean;
      addRole(
        user: Reactory.Models.IUser,
        organization: Reactory.Models.IOrganization,
        role: string,
      ): boolean;
      removeRole(
        user: Reactory.Models.IUser,
        organization: Reactory.Models.IOrganization,
        role: string,
      ): boolean;
      getMenus(target: unknown): unknown[];
      getTheme(): UX.IReactoryTheme;
      getThemeResource: (path?: string) => string;
      getCDNResource: (path: string) => string;
      getRoutes(): Routing.IReactoryRoute[];
      getApplicationRoles(): string[];
      setUser(user: Reactory.Models.IApiStatus): void;
      setAuthToken(token: string): void;
      getAuthToken(): string;
      setLastUserEmail(email: string): void;
      getLastUserEmail(): void;
      registerComponent(
        nameSpace: string,
        name: string,
        version: string,
        component: unknown,
        tags?: string[],
        roles?: string[],
        wrapWithApi?: boolean,
        connectors?: unknown[],
        componentType?: string,
      ): void;
      getComponents<TComponents>(dependencies: ComponentDependency[]): TComponents;
      getComponent<TComponent>(fqn: FQN): TComponent;
      getComponentsByType(type: string): IReactoryComponentRegister;
      getNotFoundComponent(notFoundComponentFqn: string): ValidComponent<unknown>;
      getNotAllowedComponent(notAllowedComponentFqn: string): ValidComponent<unknown>;
      mountComponent(
        ComponentToMount: ValidComponent<unknown>,
        props: unknown,
        domNode: unknown,
        theme?: boolean,
        callback?: () => void,
      ): void;
      showModalWithComponentFqn(
        componentFqn: string,
        title: string,
        props: unknown,
        modalProps: unknown,
        domNode: unknown,
        theme: unknown,
        callback: (args: unknown) => unknown,
      ): void;
      showModalWithComponent(
        title: string,
        ComponentToMount: ValidComponent<unknown>,
        props: unknown,
        modalProps: unknown,
        domNode: unknown,
        theme: unknown,
        callback: (args: unknown) => unknown,
      ): void;
      createElement(ComponentToCreate: ValidComponent<unknown>, props: unknown): unknown;
      unmountComponent(node: unknown): boolean;
      logout(refreshStatus: boolean): void;
      getLastValidation(): unknown;
      getTokenValidated(): unknown;
      getUser(): Reactory.Models.IApiStatus;
      saveUserLoginCredentials(provider: string, props: unknown): Promise<void>;
      getUserLoginCredentials(provider: string): Promise<unknown>;
      storeObjectWithKey(
        key: string,
        objectToStore: unknown,
        indexDB?: boolean,
        cb?: (err: unknown) => void,
      ): Promise<void>;
      readObjectWithKey(
        key: string,
        indexDB?: boolean,
        cb?: (err: unknown) => void,
      ): Promise<unknown>;
      deleteObjectWithKey(
        key: string,
        indexDB?: boolean,
        cb?: (err: unknown) => void,
      ): Promise<void>;
      status(options?: IApiStatusRequestOptions): Promise<Reactory.Models.IApiStatus>;
      validateToken(token: string): void;
      resetPassword(resetProps: ResetPasswordProps): Promise<unknown>;
      injectResource(resource: Forms.IReactoryFormResource): void;
      setViewContext(context: unknown): void;
      getViewContext(): unknown;
      extendClientResolver(resolver: unknown): void;
      setDevelopmentMode(enabled: boolean): void;
      isDevelopmentMode(): boolean;
    }

    export interface IReactoryWiredComponent {
      /**
       * The global reactory variable that represent the reactory api instance
       */
      reactory: IReactoryApi;
    }

    /**
     * The context object that is passed to the form component.
     * @template T The form data type.
     */
    export interface IReactoryFormContext<T> {
      /**
       * The form signature.
       */
      signature: string;
      /**
       * The form version.
       */
      version: number;
      /**
       * The form definition.
       */
      formDef: Forms.IReactoryForm;
      /**
       * The form data.
       */
      formData: T;
      /**
       * The query string.
       */
      query: unknown;
      /**
       * The form instance ID.
       */
      formInstanceId: string;
      /**
       * The $ref property.
       */
      $ref: unknown;
      /**
       * The refresh method.
       * @param args The arguments to pass to the method.
       */
      refresh: (args: unknown) => void;
      /**
       * The setFormData method.
       * @param formData The form data to set.
       * @param callback The callback function to execute after setting the form data.
       */
      setFormData: (formData: T, callback: () => void) => void;
      /**
       * The graphql property.
       */
      graphql: Forms.IFormGraphDefinition;
      /**
       * The getData method.
       * @param data Optional form data to get.
       */
      getData: (data?: T) => void;
      /**
       * The reset method.
       */
      reset: () => void;
      /**
       * The screen break point.
       */
      screenBreakPoint: string | "xs" | "sm" | "md" | "lg" | "xl";
      /**
       * Additional properties.
       */
      [key: string | symbol]: unknown;
    }

    export type ValidationResult = {
      valid: boolean;
      errors: string[];
      errorSchema: Schema.IErrorSchema
    }

    /**
     * The ReactoryFormComponent properties.
     */
    export interface IReactoryFormProps<TData> {
       // deprecated 
       ref?: (formRef: unknown) => void;
       /**
        * Active UI schema key to apply to the form
        */
       uiSchemaKey?: string;
       /**
        * Active ui schema id to apply to the form
        */
       uiSchemaId?: string;
       /**
        * The form data.
        */
       data?: TData | TData[];
       /**
        * Alias for the data property.
        */
       formData?: TData | TData[];
       /**
        * Provide a complete form defintion to the form component if not using the 
        * id property to remotely fetch the form definition.
        */
       formDef?: Reactory.Forms.IReactoryForm;
       /**
        * The form id to fetch the form definition from the server. The 
        * correct format is the form id in the format of "nameSpace.name@version"
        */
       formId?: FQN;
       /**
        * Each form may have multiple help topics that can be displayed when the 
        * user clicks on the help icon. These will be merged with the form definition ]
        * help topics.
        * */
       helpTopics?: string[];
       /**
        * The help form title.
        */
       helpTitle?: string;
       /**
        * The UI framework to use for the form. Default is "material"
        */
       uiFramework?: string;
       /**
        * The form mode. Default is "view" 
        * The mode of the form. The mode can be one of the following:
        * - view - The form is in view mode
        * - edit - The form is in edit mode, the form will use the edit graphql mutation to save the form data
        * - new - The form is in new mode, the form will use the new graphql mutation to save the form data
        * - delete - The form is in delete mode, the form will use the delete graphql mutation to delete the form data
        */
       mode?: string | "view" | "edit" | "new" | "delete";
       /**
        * The form context object.
        */
       formContext?: Partial<IReactoryFormContext<unknown>>;
       /**
        * Custom function hook to extend the form definition. This 
        * function is called when the form definition is created.
        * @param args 
        * @returns 
        */
       extendSchema?: (args: unknown | unknown[]) => Reactory.Forms.IReactoryForm;
       /**
        * busy indicator - this will override the forms internal busy indicator. 
        * Use this if you want to control the busy state of the form from the parent component.
        */
       busy?: boolean;
       /**
        * A map of events that the form will listen for. The form will call the event handler
        * when the event is triggered. The form will internally bump a version number to indicate
        * that the form has changed.
        */
       events?: {
         [key: string]: (args: unknown | unknown[]) => unknown;
       };
       /**
        * Indicates which query to use to load the form data. The query is a graphql query binding.
        */
       query?: {
         [key: string]: unknown;
       };
       /**
        * An on change event handler that is called when the form data changes. 
        * Be wary of using binding this function and then updating the form properties as this may 
        * lead to excessive rendering of the form causing a doom loop.
        * @param args 
        * @returns 
        */
       onChange?: (...args: unknown[]) => void;
       /**
        * An onSubmit event handler that is called when the form is submitted.
        * Use this if you want to perform any custom actions when the form is submitted.
        * @param args 
        * @returns 
        */
       onSubmit?: (...args: unknown[]) => void;
       /**
        * An on error event handler that is called when the form encounters an error.
        * Use this if you want to perform any custom actions when the form encounters an error.
        * @param args 
        * @returns 
        */
       onError?: (...args: unknown[]) => void;
       /**
        * If the form has command buttons defined then the form will call the onCommand event handler
        * when a command button is clicked. Use this to hook into the command button events
        * @param args 
        * @returns 
        */
       onCommand?: (...args: unknown[]) => unknown;
       /**
        * Provides a event hook to listen for when the form has completed a mutation
        * @param args 
        * @returns 
        */
       onMutateComplete?: (...args: unknown[]) => unknown;
       /**
        * Provides a event hook to listen for when the form has completed a query
        * @param args 
        * @returns 
        */
       onQueryComplete?: (...args: unknown[]) => unknown;
       /**
        * Components that should be rendered before the form component.
        */
       before?: React.Component | React.ReactNode | React.ReactNodeArray;
       /**
        * Components that should be rendered inside the form component as part of the node children.
        */
       children?: React.ReactNode | React.ReactNodeArray;
       /**
        * The current active route
        */
       route?: Reactory.Routing.IReactoryRoute;
       // $App?: unknown;
       /**
        * Custom validation function that is used to validate the input data
        * @param args 
        * @returns 
        */
       validate?: Forms.SchemaFormValidationFunctionSync<TData> | Forms.SchemaFormValidationFunctionAsync<TData>; 
       /**
        * Function to transform the errors returned by the validation function
        */
       transformErrors?: Forms.TransformErrorsFunction;
       /**
        * Indicator to show whether auto query is enable / disabled. If auto query is enabled
        * the form will automatically query the data when the form is loaded. If set to false the form 
        * will load data when the form data changes and the submit is handled.
        */
       autoQueryDisabled?: boolean;
       /**
        * A route prefix for the form. The route prefix is generally used in conjunction with the 
        * reactory form router.
        */
       routePrefix?: string;
       refCallback?: (formReference: unknown) => void;
       /**
        * Indicates whether the form should query the data when the form data changes.
        */
       queryOnFormDataChange?: boolean;
       /**
        * Event handler that is called before a mutation is called. Returning false will prevent the mutation from being called.
        * @param args 
        * @returns 
        */
       onBeforeMutation?: (data: TData, context: Reactory.Client.IReactoryFormContext<TData>) => boolean;
       /**
        * Event handler that is called before the query is executed for the form. Returning false will prevent the query from running
        * @param args 
        * @returns 
        */
       onBeforeQuery?: (data: TData, context: Reactory.Client.IReactoryFormContext<TData>) => boolean;

       /**
        * 
        * @param data 
        * @param context 
        * @returns 
        */
       onBeforeSubmit?: (data: TData, context: Reactory.Client.IReactoryFormContext<TData>) => boolean;
       /**
        * Defines what type of component the represents. It component can be a form or a widget.
        */
       componentType?: string | "form" | "widget";
       /**
        * A list of properties that the form should watch for changes. If any of the properties
        * change the form will requery the data as variable may be dependent on the watched properties.
        */
       watchList?: string[];
       
       [key: string]: unknown;
    }

    /**
     * Widget error schema
     */
    export interface IWidgetErrorSchema {
      [key: string]: unknown;
    }

    /**
     * The base widget property set. Additional property type created
     * by extending this interface for your specfic form type
     */
    export interface IReactoryWidgetProps<
      T = unknown,
      TRoot = unknown,
      TSchema = Schema.ISchema,
      TUISchema = Schema.IUISchema,
    > extends IReactoryWiredComponent {
      formData: T;
      schema: TSchema;
      uiSchema: TUISchema;
      idSchema: Schema.IDSchema;
      formContext: Reactory.Client.IReactoryFormContext<TRoot>;
      onChange: (newFormData: T, errorSchema?: Reactory.Schema.IErrorSchema) => void;
      [key: string]: unknown;
    }

    export interface IReactoryClientRoute {
      path: string;
      caseSensitive?: boolean;
      key: React.Key;
      element: () => JSX.Element;
    }
  }
}