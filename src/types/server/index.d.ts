/* eslint-disable no-unused-vars */
/// <reference path="../../global.d.ts" />

declare namespace Reactory {
  export namespace Server {
/**
     * Utility type for extending the environment with additional properties
     */
    export type ExtendedEnvironment<Additional extends unknown[]> = NodeJS.ProcessEnv &
      Additional[number];

    export interface ReactoryEmailEnvironment {
      /**
       * Send grid API key - this will be moved to
       * a per client key configuration.
       */
      SENDGRID_API_KEY: string;
      /**
       * The default method to use for sending email
       */
      REACTORY_EMAIL_SEND_VIA?:
        | string
        | "postal"
        | "sendgrid"
        | "smtp"
        | "microsoft"
        | "google"
        | "mailgun"
        | "aws"
        | "sendmail"
        | "mandrill"
        | "postmark"
        | "sparkpost"
        | "elasticemail";
    }

    /**
     * Represents the environment variables for the server application
     * specifically the variables that relate to Azure AD / O365 authentication
     */
    export interface ReactoryAzureEnvironment {
      /**
       * The Azure AD tenant id
       */
      OAUTH_APP_ID: string;
      /**
       * The Azure AD application id
       */
      OAUTH_APP_PASSWORD: string;
      /**
       * The Azure AD redirect URI
       */
      OAUTH_REDIRECT_URI: string;
      /**
       * The Azure AD scopes
       */
      OAUTH_SCOPES: string;
      /**
       * The Azure AD authority
       * */
      OAUTH_AUTHORITY: string;
      /**
       * The Azure AD metadata
       * */
      OAUTH_ID_METADATA: string;
      /**
       *  The Azure AD authorize endpoint
       * */
      OAUTH_AUTHORIZE_ENDPOINT: string;
      /**
       * The Azure AD token endpoint
       */
      OAUTH_TOKEN_ENDPOINT: string;
    }

    export interface ReactoryI18NEnvironment {
      /**
       * Additional i18n namespaces to load.
       * Can be a single namespace, i.e.:
       * `I18N_NS=foo`
       * or you can provide a comma separated value, i.e.;
       *  `I18N_NS=foo,bar,baz`
       * and it will be interpreted as a string array
       * Default namespaces are 'common', 'forms', 'models', 'services', 'workflow', 'schemas'
       * The system will automatically add a namespace that matches the
       * the module key for an activated module.
       */
      I18N_NS?: string;
      /**
       * The fallback language key to use
       * when the translations are not available
       */
      I18N_FALLBACK?: string;
      /**
       * The I18N languages that will be pre loaded into the
       * language provider
       */
      I18N_PRELOAD?: string;
    }

    export interface ReactoryDefaultClientEnvironment {
      /**
       * The username the use for the reactory default client
       * application
       */
      REACTORY_APPLICATION_USERNAME: string;
      /**
       * The password to use for the reactory default client
       */
      REACTORY_APPLICATION_EMAIL: string;
      /**
       * The password to use for the reactory default client
       */
      REACTORY_APPLICATION_PASSWORD: string;
      /**
       * The url to use for the reactory default site
       */
      REACTORY_SITE_URL: string;
      /**
       * The reactory native application uri
       */
      REACTORY_NATIVEAPP_URI: string;
      /**
       * The whitelist for the default reactory site
       **/
      REACTORY_APP_WHITELIST: string;
    }

    /**
     * The environment that the server is running in
     */
    export type ReactoryEnvironment = ExtendedEnvironment<
      [
        ReactoryBaseEnvironment,
        ReactoryEmailEnvironment,
        ReactoryAzureEnvironment,
        ReactoryI18NEnvironment,
        ReactoryDefaultClientEnvironment,
      ]
    >;

    export interface IReactoryModuleDefinition {
      id: string;
      name: string;
      key: string;
      fqn: string;
      license: string;
      moduleEntry: string;
      shop: string;
    }

    export interface IReactoryGrpcConfig {
      // provide the proto filenames for the module
      protos: string[];
      // define the services for the module
      services: {
        [key: string]: unknown;
      };
    }

    export type TReactoryForm = Forms.IReactoryForm;

    export type TCli = Reactory.IReactoryComponentDefinition<
      (kwargs: string[], context: Reactory.Server.IReactoryContext) => Promise<void>
    >;


    export type ExpressMiddlewareFunction = (req: Express.Request | Reactory.Server.ReactoryExpressRequest, res: Express.Response, next: Function) => void;

    export type ExpressMiddlewareConfigurationFunctionAsync = (app: Express.Application, httpServer: http.Server) => Promise<void>;

    export type ExpressMiddlewareConfigurationFunction = (app: Express.Application, httpServer: http.Server) => void;

    export type ExpressErrorHandlerMiddlewareFunction = (err: Error, req: Express.Request, res: Express.Response, next: Function) => void;
    /**
     * The middleware definition for the module
     */
    export type ReactoryMiddlewareDefinition = Reactory.IReactoryComponentDefinition<
    ExpressMiddlewareFunction | 
    ExpressMiddlewareConfigurationFunctionAsync | 
    ExpressMiddlewareConfigurationFunction |
    ExpressErrorHandlerMiddlewareFunction> & { 
      ordinal: number;
      type: "function" | "configuration";
      async: boolean;
    };

    /**
     * The module data structure represents a collection of all the services,
     * workflows, forms, and PDF definitions.
     */
    export interface IReactoryModule {
      /**
       * The id for the module. This should correlate with the
       * folder name that the module is in. If the id is not set it
       * will be generated and set at runtime.
       */
      id?: string;
      /**
       * The namespace of the module.
       */
      nameSpace: string;

      /**
       * The name of the module.
       */
      name: string;

      /**
       * The version of the module.
       */
      version: string;

      /**
       * A description of the module
       */
      description?: string;

      /**
       * The dependencies of the module.
       */
      dependencies?: string[];

      /**
       * The priority of the module.
       */
      priority: number;

      /**
       * The graph definitions of the module.
       */
      graphDefinitions?: Graph.IGraphDefinitions;

      /**
       * The workflows of the module.
       */
      workflows?: Workflow.IWorkflow[];

      /**
       * The forms of the module.
       */
      forms?: TReactoryForm[];

      /**
       * The PDF definitions of the module.
       */
      pdfs?: Pdf.IReactoryPdfComponent[];

      /**
       * The service definitions of the module.
       */
      services?: Service.IReactoryServiceDefinition<Service.IReactoryService>[];

      /**
       * The grpc definitions of the module.
       */
      grpc?: IReactoryGrpcConfig[];

      /**
       * Route handlers providerd by the module
       */
      routes?: {
        [key: string]: Router;
      };

      /**
       * The models of the module provided by the module
       */
      models?: Reactory.IReactoryComponentDefinition<unknown>[];

      /**
       * The client plugins of the module.
       */
      clientPlugins?: Reactory.Platform.IReactoryApplicationPlugin[];

      /**
       * The translations of the module.
       */
      translations?: Models.IReactoryTranslations[];

      /**
       * The PassportJS providers of the module.
       */
      passportProviders?: ReactoryPassportProviders;

      /**
       * A list of command line interface applications that
       * the module provides.
       *
       * These can be executed from the command line using the
       * `reactory-cli` nameSpace.name --arg1 --arg2=value
       */
      cli?: TCli[];

      /**
       * A list of middleware that the module provides.
       */
      middleware?: ReactoryMiddlewareDefinition[];

      /**
       * Reactor is a container property specifically for the 
       * reactor AI agents. 
       */
      reactor?: {
        providers: any[];
        agents: any[];
        macros: any[];
        tools: any[];
        mcp: any[];
      }
    }

    export type ReactoryServiceFilter = {
      id?: string;
      name?: string;
      type?: string;
      lifeCycle?: Reactory.Service.SERVICE_LIFECYCLE;
    };

    /**
     * The IReactoryContext is the object should be passed through to all levels of the execution.
     * It contains the logged in user, the memberships and several shortcut utilities that allows
     * all code to be executed with a specific user / application context details.
     */
    export interface IReactoryContext {
      /**
       * Current Active Context Id
       */
      id: string;
      /**
       * The user account that is associated with this execution
       */
      user: Reactory.Models.IUserDocument;
      /**
       * The partner / application that is currently executing
       */
      partner: Reactory.Models.IReactoryClientDocument;

      /**
       * The host indicates the current execution environment.
       */
      host: string | "cli" | "express" | "grpc" | "test" | "workflow" | "web";

      /**
       * Service activator function that creates / returns a service with the given
       * fqn (fully qualified name)
       * @param fqn - the FQN for the service to activate.
       * @param props - unknown properties to pass to the service if required.
       * @param context - a specific context if you want to execute as different user,
       * otherwise current context is used
       * @param lifeCycle - the lifecycle type for the service, either instance or singleton
       */
      getService<T extends Reactory.Service.IReactoryService>(
        fqn: string,
        props?: unknown,
        lifeCycle?: Service.SERVICE_LIFECYCLE,
      ): T;

      /**
       * list all services that are available to the current context.
       * @param filter - the filter to apply to the services
       */
      listServices(
        filter: ReactoryServiceFilter,
      ): Reactory.Service.IReactoryServiceDefinition<any>[];

      /**
       * An array of all the services that are available to the current context
       */
      services: Reactory.Service.IReactoryService[];

      /**
       * Logging method to write logs.
       * @param message - the message to log
       * @param meta - unknown meta data
       * @param type - "error", "info", "debug" or "warning"
       * @param clazz - the class or component id
       */
      log(message: string, meta?: unknown, type?: Service.LOG_TYPE, clazz?: string): void;
      /**
       * Logs a debug message to the console / log output
       * @param message - message to log out
       * @param meta - unknown meta data
       * @param clazz - the class or component id
       */
      debug(message: string, meta?: unknown, clazz?: string): void;
      /**
       * Logs a warning message to the console / log output
       * @param message - message to log out
       * @param meta - unknown meta data
       * @param clazz - the class or component id
       */
      warn(message: string, meta?: unknown, clazz?: string): void;
      /**
       * Logs an error message to the console / log output
       * @param message - message to log out
       * @param meta - unknown meta data
       * @param clazz - the class or component id
       */
      error(message: string, meta?: unknown, clazz?: string): void;
      /**
       * Write an info message to the console / log output
       * @param message - message to log out
       * @param meta - unknown meta data
       * @param clazz - the class or component id
       */
      info(message: string, meta?: unknown, clazz?: string): void;
      state: {
        [key: string]: unknown;
      };
      /**
       * The current response object
       */
      response?: Response;
      /**
       * The current request object
       */
      request?: ReactoryExpressRequest;
      /**
       * current color palette
       */
      colors: unknown;
      /**
       * IoC container
       */
      container: Container;
      /**
       * Modules that are currently available for this
       * instance
       */
      modules: Server.IReactoryModule[];
      /**
       * utility tools
       */
      utils: {
        /**
         * creates a hash from an object
         */
        hash: (obj: unknown) => number;

        /**
         * Object mapper utility
         */
        objectMapper: typeof ObjectMapper;

        /**
         * lodash utility for array management
         */
        lodash: typeof Lodash;
      };
      /**
       * Function to help check for specific permission
       */
      hasRole: (
        role: string,
        partner?: Models.IPartner,
        organization?: Models.IOrganizationDocument,
        businessUnit?: Models.IBusinessUnitDocument,
      ) => boolean;

      hasAnyRole: (
        roles: string[],
        partner?: Models.IPartner,
        organization?: Models.IOrganizationDocument,
        businessUnit?: Models.IBusinessUnitDocument,
      ) => boolean;

      /**
       * Internationalisation Service / Translation Service.
       */
      i18n: typeof i18n;

      /**
       * Current language
       */
      lang: string;

      /**
       * Supported languages
       */
      languages: string[];

      /**
       * The current active theme for this context
       */
      theme: Reactory.UX.IReactoryTheme;

      /**
       * The current active palette for this context
       */
      palette: Reactory.UX.IThemePalette;

      /**
       * Function that uses the default cache provider to get a value
       * @param key - the key to get the value for
       * @param defaultValue - the default value to return if the key is not found
       */
      getValue<T>(key: string, defaultValue?: Promise<T>): Promise<T>;

      /**
       * Function that uses the default cache provider to set a value
       * @param key - the key to set the value for
       * @param value - the value to set
       * @param ttl - the time to live for the value
       */
      setValue<T>(key: string, value: T, ttl?: number): Promise<void>;

      /**
       * Function that removes the value from the default cache provider
       * @param key - the key to remove the value for
       */
      removeValue(key: string): Promise<void>;

      /**
       * Extends the Context with extensions using the
       * client configuration.
       */
      extend<TResult extends IReactoryContext>(): Promise<TResult>;

      /**
       * Executes a target promise as a specific user account.
       * @param user
       * @param target
       */
      runAs<TResult>(user: Models.IUserDocument, target: Promise<TResult>): Promise<TResult>;

      /**
       * Executes a target promise using the system user account
       * @param target
       */
      runAsSystem<TResult>(target: Promise<TResult>): Promise<TResult>;
      // additional context properties
      [key: string]: unknown;
    }

    export interface IReactoryCliContext {
      readline: ReadLine;
    }

    export interface IExecutionContextProvider extends Reactory.Service.IReactoryService {
      getContext(currentContent: IReactoryContext): Promise<IReactoryContext>;
    }

    /**
     * The user structure that we permit in the base client config. This is useful for
     * administrator account / system accounts that need to interact with other services.
     */
    export interface IStaticallyLoadedUser {
      /**
       * Email address
       */
      email: string;
      /**
       * Unique username for the user
       */
      username?: string;
      /**
       * The roles granted to this user
       */
      roles: string[];
      /**
       * Firstname for the user
       */
      firstName: string;
      /**
       * Lastname for the user
       */
      lastName: string;
      /**
       * Password for the user, if left blank the
       * system will generate a strong password
       */
      password?: string;

      /**
       * The auth providers that this user is associated with.
       * This can be a list of auth provider names, i.e.:
       * ["local", "google", "azure", "facebook", "linkedin", "apple", "okta"]       
       */
      authProviders?: string[];

      /**
       * The organization that this user is associated with.
       * */
      organization?: string | ObjectId | Reactory.Models.IOrganizationDocument;

      /**
       * The business unit that this user is associated with.
       */
      businessUnit?:
        | string
        | ObjectId
        | Reactory.Models.IBusinessUnitDocument;

      /**
       * The teams that the user is associated with.
       * This can be a list of team ids, team names or team documents.
       */
      teams: string[] | ObjectId[] | Reactory.Models.ITeamDocument[];
    }

    /**
     * A feature flag is a data structure that is used to
     * store information around what features are exposed.
     *
     * Each module in the reactory ecosystem can provide a
     * list of feature flags that it exposes.
     *
     * A feature flag is configured on a per connecting application.
     *
     * This means each client configuration will have an entry for
     * a feature flag.
     */
    export interface IReactoryFeatureFlag extends IFQNObject {
      /**
       * The internal id for the feature flag
       */
      id: string | ObjectId;
      /**
       * A user friendly title for the feature flag
       */
      title: string;
      /**
       * A description for the feature flag
       */
      description?: string;
      /**
       * The permissions for the feature flag.
       */
      permissions: {
        /**
         * The roles that are allowed to view the feature flag
         */
        viewer: string[];
        /**
         * The roles that are allowed to edit the feature flag
         */
        editor: string[];
        /**
         * The roles that are allowed to admin the feature flag
         */
        admin: string[];
      };
      /**
       * The form FQN to use for the feature flag data.
       */
      form: FQN;
    }

    /**
     * The IReactoryClientFeature
     */
    export interface IReactoryFeatureFlagValue<T> {
      /**
       * The feature reference. When using string, it either
       * has to be the FQN string or the ObjectId string.
       */
      feature: string | ObjectId | IReactoryFeatureFlag;
      /**
       * The partner for which this feature flag is configured. If null
       * it will mean the feature flag is configure for ALL partners.
       *
       * When the partner value is set flag is applied to a specific
       */
      partner?: string | ObjectId | Reactory.Models.IReactoryClient;
      /**
       * The organization the feature flag is bound to
       */
      organization?: string | ObjectId | Reactory.Models.IOrganization;
      /**
       * The business unit the feature flag is bound to
       */
      businessUnit?: string | ObjectId | Reactory.Models.IOrganization;
      /**
       * The regions (2 digit iso country codes)
       */
      regions?: string[];
      /**
       * The application roles to which the feature flag applies
       */
      roles?: string[];
      /**
       * The users that the feature flag applies to
       */
      users?: string[] | ObjectId[] | Reactory.Models.IUser[];
      /**
       * The time zones to which the feature flag applies
       */
      timezones?: string[];
      /**
       * The data value for the feature flag
       */
      value: T;
    }

    export interface IReactoryClientSetting<T> {
      name: string;
      componentFqn: string;
      formSchema?: Reactory.Schema.ISchema;
      data: T;
    }

    /**
     * Known auth providers are provider that is provider
     * by the reactory platform. Additional providers can
     * be implemented
     */
    export type ReactoryKnownAuthProvider =
      | "local"
      | "google"
      | "azure"
      | "facebook"
      | "linkedin"
      | "apple"
      | "okta";

    /**
     * Author configuration interface.
     */
    export interface IReactoryAuthConfiguration<TOptions> {
      provider: string | ReactoryKnownAuthProvider;
      enabled: boolean;
      options: TOptions;
    }

    /**
     * The reactory client config structure that is used for base configuration options
     */
    export interface IReactoryClientConfig {
      [key: string]: unknown;
      /**
       * key for the client. This key is used by other processed
       * to determine cross application access
       */
      key: string;
      /**
       * The name of the of the application
       */
      name: string;
      /**
       * The username for the application
       */
      username: string;
      /**
       * A system email for the application
       */
      email: string;
      /**
       * set to "generate" in order for the system to
       * automatically generate a salt for your password
       */
      salt: string;
      /**
       * The password for the application.  This password is
       * used in the header of the client request in order to request
       * access to the system.
       */
      password: string;
      /**
       * An avatar for the application
       */
      avatar: string; // application avatar
      /**
       * The site url where the api is expecting
       * the client application to be served from
       */
      siteUrl: string;
      /**
       * Email send via is the key of the email provider
       * that you want to use in order to send emails.
       */
      emailSendVia: string;
      /**
       * The email api key for the application
       */
      emailApiKey: string;
      /**
       * DEPRECATED - not to be used
       */
      resetEmailRoute: string;
      /**
       * The menu configuration for the application
       */
      menus: UX.IReactoryMenuConfig[];
      /**
       * The roles that your application will expose when in use.
       * A logged in user, will automatically be assigned the role USER
       * and an anonymous user will be assigned the ANON role. So your
       * application should at the very least have the following
       * two applicationRoles ["USER", "ANON"]
       */
      applicationRoles: string[];
      /**
       * An array of users that should be automatically loaded / linked to this application
       */
      users?: IStaticallyLoadedUser[];

      /**
       * Used to expose a list of all the components
       * that ship with this client config. At the moment
       * this is not being used anywhere but the react-native
       * client cannot as easily ingest dynamic external libraries
       * so we will rely on a server component registry during build
       * time to include / download unknown components into our
       * source tree during compilation.
       */
      components?: unknown[];

      /**
       * The title of the current active theme for the user Api status call.
       */
      theme?: string;
      /**
       * Available themes that the application can provide
       */
      themes?: UX.IReactoryTheme[];

      /**
       * A full list of application plugins that
       * that the application will load into the client
       * during runtime / compile time.
       */
      plugins?: Platform.IReactoryApplicationPlugin[];
      /**
       * The billing type structure for this application partner
       * These will only apply to application where there is a billing model
       * associated with the application access
       */
      billingType?: string;
      /**
       * The built in modules for the application. These are modules that
       * are configured for the application the application can compile
       * these at runtime.
       */
      modules?: unknown[];
      /**
       * The configured routes for the application
       */
      routes: unknown[];

      /**
       * We can provide application specific forms. These forms
       * can either be statically defined forms or dynamically
       * generated forms.
       */
      forms?: TReactoryForm[];

      /**
       * enabled authentication configuration
       */
      auth_config?: IReactoryAuthConfiguration<unknown>[];
      /**
       *
       */
      settings?: IReactoryClientSetting<unknown>[];

      /**
       * The feature flags that are associated with the client
       */
      featureFlags?: IReactoryFeatureFlagValue<unknown>[];

      /**
       * A whitelist of referring sites that are permitted for this application
       * configuration.
       */
      whitelist?: string[];

      /**
       * If set to true to the client should be permitted to enable custom themes
       */
      allowCustomTheme?: boolean;
    }

    /**
     * Represents an Express Request with additional properties
     */
    export interface ReactoryExpressRequest<
      P = core.ParamsDictionary,
      ResBody = unknown,
      ReqBody = unknown,
      ReqQuery = core.Query,
      Locals extends Record<string, unknown> = Record<string, unknown>,
    > extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
      /**
       * The current active partner / client for this request
       */
      partner?: Reactory.Models.IReactoryClientDocument;
      /**
       * The current active user for this request
       */
      user?: Reactory.Models.IUserDocument;
      /**
       * The current active reactory context for this request
       */
      context?: Reactory.Server.IReactoryContext;
    }

    /**
     * Represents a reactory passport provider
     */
    export interface IReactoryPassportProvider {
      /**
       * The name of the provider
       */
      name: string;
      /**
       * The strategy for the provider
       */
      strategy: Strategy;
      /**
       * Configure the express application
       * with route handlers etc.
       * @param app - Express Application
       * @returns void
       */
      configure?: (app: Application) => void;
      [key: string]: unknown;
    }

    /**
     * Represents a reactory passport provider array
     */
    export type ReactoryPassportProviders = IReactoryPassportProvider[];
  }
  }