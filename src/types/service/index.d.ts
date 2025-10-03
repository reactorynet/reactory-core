/* eslint-disable no-unused-vars */
/// <reference path="../../global.d.ts" />

declare namespace Reactory {
  export namespace Service {
export interface IReactoryImportPackageManager extends Service.IReactoryContextAwareService {
      state: Models.IPackageManagerState;

      /**
       * Start a package and process all the data inputs
       * @param workload_id
       * @param file_ids
       * @param processors
       */
      start(workload_id: string, file_ids: string[], processors: string[]): Promise<unknown>;
      stop(workload_id: string, file_ids: string[]): Promise<unknown>;
      delete(workload_id: string): Promise<unknown>;
      addFile(workload_id: string, file: Models.IReactoryFileModel): Promise<unknown>;
      removeFile(workload_id: string, file_id: string): Promise<unknown>;
      previewFile(workload_id: string, file_id: string, processors: string[]): Promise<unknown>;

      /**
       * Returns the next processor if the service is started.
       * Every time this function is called the internal state of the class is updated.
       */
      getNextProcessor(): Service.IProcessor;
    }

    export interface IReactoryServiceResult<T> {
      data?: T;
      errors?: Error[];
    }

    export interface IReactoryResultService<T> {
      (props: unknown, context: unknown): IReactoryServiceResult<T>;
    }

    export interface IReactoryServiceProps {
      [key: string]: unknown;
      $services: IReactoryServiceRegister;
    }

    export enum FunctionalServiceTypes {
      "file", // File handling services
      "data", // Data services
      "iot", // Internet of Things related services
      "email", // Email related services
      "notification", // Notification services
      "integration", // Services used for integration
      "authentication", // Authentication services
      "authorization", // Authorization services
      "billing", // Billing or payment related services
      "messaging", // Messaging services (e.g. chat, SMS)
      "logging", // Logging services
      "monitoring", // Monitoring or observability services
      "analytics", // Analytics services
      "search", // Search related services
      "database", // Database related services
      "cache", // Caching services
      "queue", // Queue services
      "stream", // Stream processing services
      "workflow", // Workflow services
      "network", // Network related services
      "storage", // Storage services
      "backup", // Backup services
      "scheduler", // Scheduling services
      "location", // Location services
      "security", // Security related services
      "reporting", // Reporting services
      "translation", // Translation services
      "ocr", // Optical Character Recognition services
      "ai", // AI or Machine Learning services
      "media", // Media processing services (audio, video)
      "cdn", // Content Delivery Network services
      "session", // Session management services
      "configuration", // Configuration services
      "rateLimiting", // Rate limiting services
      "abTesting", // A/B testing services
      "featureToggle", // Feature toggle services
      "event", // Event related services
      "custom", // Custom services
      "template", // Template related services
    }

    export enum LifecycleServiceTypes {
      "codeGeneration", // Services used for code generation
      "codeAnalysis", // Services used for code analysis
      "schemaGeneration", // Services used for schema generation
      "schemaValidation", // Services used for schema validation
      "development", // Services used during development phase
      "testing", // Services used during testing phase
      "staging", // Services used during staging phase
      "production", // Services used during production phase
      "maintenance", // Services used for maintenance
      "debugging", // Services used for debugging
      "monitoring", // Services used for monitoring application health
      "logging", // Services used for logging
      "deployment", // Services used for deployment
      "continuousIntegration", // Services used for continuous integration
      "continuousDelivery", // Services used for continuous delivery
      "bugTracking", // Services used for bug tracking
      "issueTracking", // Services used for issue tracking
      "taskTracking", // Services used for task tracking
      "versionControl", // Services used for version control
      "codeReview", // Services used for code review
      "build", // Services used for build process
      "release", // Services used for release process
      "rollback", // Services used for rollback process
      "scaling", // Services used for scaling (vertical, horizontal)
      "loadBalancing", // Services used for load balancing
      "failover", // Services used for failover process
      "backupRestore", // Services used for backup and restore process
      "securityScanning", // Services used for security scanning
      "performanceTuning", // Services used for performance tuning
      "audit", // Services used for auditing
      "compliance", // Services used for compliance
      "documentation", // Services used for documentation
    }

    export enum OrganizationalServiceTypes {
      "user", // Services intended for regular users
      "admin", // Services intended for administrators
      "superAdmin", // Services intended for super administrators
      "support", // Services intended for support teams
      "developer", // Services intended for developers
      "productOwner", // Services intended for product owners
      "stakeholder", // Services intended for stakeholders
      "businessAnalyst", // Services intended for business analysts
      "qa", // Services intended for QA teams
      "hr", // Services intended for human resources
      "finance", // Services intended for finance teams
      "marketing", // Services intended for marketing teams
      "sales", // Services intended for sales teams
      "legal", // Services intended for legal teams
      "operation", // Services intended for operations teams
      "security", // Services intended for security teams
      "auditor", // Services intended for auditors
      "compliance", // Services intended for compliance teams
      "training", // Services intended for training or education
      "projectManagement", // Services intended for project management teams
      "executive", // Services intended for executive users
      "customer", // Services intended for customers
      "partner", // Services intended for partners or third-party collaborators
      "supplier", // Services intended for suppliers
      "vendor", // Services intended for vendors
      "consultant", // Services intended for consultants
    }

    export enum DomainServiceTypes {
      "customerManagement", // Services for customer management
      "productManagement", // Services for product management
      "inventoryManagement", // Services for inventory management
      "salesManagement", // Services for sales management
      "orderManagement", // Services for order management
      "paymentProcessing", // Services for payment processing
      "shipmentManagement", // Services for shipment management
      "accountManagement", // Services for account management
      "subscriptionManagement", // Services for subscription management
      "contractManagement", // Services for contract management
      "projectManagement", // Services for project management
      "taskManagement", // Services for task management
      "resourceManagement", // Services for resource management
      "documentManagement", // Services for document management
      "contentManagement", // Services for content management
      "knowledgeBase", // Services for knowledge base or FAQ
      "reporting", // Services for reporting
      "analytics", // Services for analytics
      "marketingAutomation", // Services for marketing automation
      "crm", // Services for Customer Relationship Management
      "erp", // Services for Enterprise Resource Planning
      "hr", // Services for human resources operations
      "financial", // Services for financial operations
      "manufacturing", // Services for manufacturing operations
      "logistics", // Services for logistics operations
      "supplyChain", // Services for supply chain operations
      "eCommerce", // Services for e-commerce operations
      "healthCare", // Services for healthcare operations
      "education", // Services for education operations
      "realEstate", // Services for real estate operations
      "legal", // Services for legal operations
      "itManagement", // Services for IT management operations
      "custom", // Custom domain-specific services
    }

    export type ReactoryServiceTypes =
      | FunctionalServiceTypes
      | LifecycleServiceTypes
      | OrganizationalServiceTypes
      | DomainServiceTypes;

    export interface IReactoryServiceDependency {
      /**
       * The full service id that is required
       */
      id: string | FQN;
      /**
       * The service property alias.
       */
      alias: string;
    }

    export type ServiceDependency = string | IReactoryServiceDependency;

    export type ReactoryServiceDependencies = ServiceDependency[];

    /**
     * A service type can be a string or one of the pre-defined ReactoryServiceTypes
     * The service type is used by the reactory system to dynamically find and load
     * services based on the type.
     */
    export type ValidServiceType = string | ReactoryServiceTypes;

    /**
     * A service definition is used to define a service that can be loaded
     * by the reactory system as well as activated by the system.
     */
    export interface IReactoryServiceDefinition<T extends IReactoryService>
      extends IReactoryComponentDefinition<T> {
      /**
       * The ID is the full FQN of the service
       * - this property will be deprecated in the future and replaced with the nameSpace, name and version properties
       * */
      id?: FQN | string;

      /**
       * You can provide a list of aliases for the service.
       * For instance, the ReactoryFileService has an alias of "FileService".
       */
      alias?: FQN[] | string[];

      /**
       * If there are more than one service of the same fqn, you can provide an order
       * to indicate which service should be used with the highest priority.
       */
      order?: number;

      /***
       * A function that returns an instance of the service.  Your service
       * can either run per execution or can run in the context of the service as a singleton
       * across all requests.
       *
       * The execution context of the startup account will be that of the server service account.
       * So using singleton instances should be done with care and it is advised to run all services
       * in the execution context of the user where possible.
       */
      service(props: IReactoryServiceProps, context: Reactory.Server.IReactoryContext): T;
      /**
       * Primary service type that is used to classify the service.
       */
      serviceType: ValidServiceType;
      /**
       * Secondary service types that is used to classify the service.
       */
      secondaryTypes?: ValidServiceType[];
      /**
       * Depenency array
       * @example
       * [
       *    // safe - will use the fqn to find the service and will
       *    // will use setFileService to set the service instance
       *    'core.FileService@1.0.0',
       *    // safe - will use the fqn to find the service and will
       *    // use the alias name to determine setter, in this instance
       *    // it would be setMyUserSerivce
       *    { id: 'core.UserService@1.0.0', alias: 'myUserService' }
       *    // unsafe - will use nlp service to find the service and will
       *    // createa a camel cased setter name based on the input
       *    'report service'
       * ]
       */
      dependencies?: ReactoryServiceDependencies;
      /**
       * Defines how the service lifecycle is managed.
       *
       * Basic supported types are instance or singleton.
       *
       * Also accepted are FQN string which will use a component to manage the lifecycle
       * of the service.
       */
      lifeCycle?: SERVICE_LIFECYCLE;
    }

    export interface IReactoryServiceRegister {
      [key: string]: IReactoryServiceDefinition<IReactoryService>;
    }

    export interface IExcelReaderService {
      readFile(file: string): Promise<ExcelJS.Workbook>;
    }

    export interface IExcelFormat {
      font: string;
    }

    export interface IExcelWriterOptions {
      filename: string;
      query?: string;
      params?: unknown;
      output?: string;
      formatting?: IExcelFormat;
      stream?: Stream;
    }

    export interface IReactoryService extends IComponentFqnDefinition {
      description?: string;
      tags?: string[];
    }

    export type TProps<T> = IReactoryServiceProps & T;
    export type TContext<T> = Server.IReactoryContext & T;

    export class ReactoryService<TP, TC> implements IReactoryService {
      nameSpace: string;
      name: string;
      version: string;
      props: TP;
      context: TC;
      [key: string]: unknown;

      toString(includeVersion: boolean = true): string {
        return `${this.nameSpace}.${this.name}${includeVersion ? `@${this.version}` : ""}`;
      }
    }

    /**
     * Base interface for a Reactory Service that is aware of the startup process.
     */
    export interface IReactoryStartupAwareService extends IReactoryService {
      /**
       * Called when the service is started
       * Services that use the startup promise should handle
       * their errors internally and return a rejected promise
       * if the service is not able to start.
       */
      onStartup(context: Reactory.Server.IReactoryContext): Promise<void>;
    }

    /**
     * Base interface for a Reactory Service that is aware of the shutdown process.
     */
    export interface IReactoryShutdownAwareService extends IReactoryService {
      /**
       * Called when the service is shutdown
       * Services that use the shutdown promise should handle
       * and shouldn't return a rejected promise, as we always want to terminate
       * the service and processes when requested.
       */
      onShutdown(): Promise<void>;
    }

    /**
     * Base interface for a Context Aware Reactory Service.
     */
    export interface IReactoryContextAwareService<TC = Server.IReactoryContext>
      extends IReactoryService {
      context: TC;
      getExecutionContext(): Server.IReactoryContext;
      setExecutionContext(executionContext: Server.IReactoryContext): void;
    }

    export interface IReactoryDefaultService<TC = Server.IReactoryContext>
      extends IReactoryStartupAwareService,
        IReactoryContextAwareService<TC> {}

    export class ReactoryDefaultService<TP, TC>
      extends ReactoryService<TP, TC>
      implements IReactoryDefaultService<TC>
    {
      props: TP;
      context: TC;
      description?: string;
      tags?: string[];
      getExecutionContext(): Server.IReactoryContext;
      setExecutionContext(executionContext: Server.IReactoryContext): void;
      onStartup(): Promise<void>;
      onShutdown(): Promise<void>;
    }

    export interface IReactoryDefaultServiceStatic {
      new (props: IReactoryServiceProps, context: Server.IReactoryContext): IReactoryDefaultService;
      reactory: IReactoryServiceDefinition<IReactoryService>;
    }
    /**
     * Reactory Model Registry Service is a service that is used to register models
     * and to retrieve models from the registry.
     */
    export type TReactoryModelRegistryService = IReactoryDefaultService &
      IReactoryShutdownAwareService & {
        /**
         * Registers a model with the registry
         * @param model
         * @returns
         */
        register: <T>(model: Reactory.IReactoryComponentDefinition<T>, overwrite?: boolean) => void;
        /**
         * Gets a model from the registry
         * @param spec
         * @returns
         */
        getModel: <T>(spec: Partial<Reactory.IReactoryComponentDefinition<T>>) => T | null;

        /**
         * Returns an array of models where the model matches the spec
         * @param spec
         * @returns
         */
        getModels: <T>(spec: Partial<Reactory.IReactoryComponentDefinition<T>>) => T[];
        /**
         * Generates a model object based on spec
         * @param spec
         * @returns
         */
        generate: <T>(spec: Partial<Reactory.IReactoryComponentDefinition<T>>) => T;
      };

    export interface IExcelWriterService extends IReactoryContextAwareService {
      setCellRichText(cell: ExcelJS.Cell, cellProps: unknown): ExcelJS.Cell;
      writeAsFile(
        options: IExcelWriterOptions,
        appender: (workbook: ExcelJS.Workbook) => Promise<ExcelJS.Workbook>,
      ): Promise<boolean>;
      writeAsStream(
        options: IExcelWriterOptions,
        appender: (workbook: ExcelJS.Workbook) => Promise<ExcelJS.Workbook>,
      ): Promise<boolean>;
      writeToBuffer(
        options: IExcelWriterOptions,
        appender: (workbook: ExcelJS.Workbook) => Promise<ExcelJS.Workbook>,
      ): Promise<Buffer>;
    }

    export interface ICoreEmailService
      extends IReactoryStartupAwareService,
        IReactoryContextAwareService {
      sendEmail(message: Reactory.Models.IEmailMessage): Promise<Reactory.Models.EmailSentResult>;
    }

    export interface IErrorHandlerServer extends IReactoryContextAwareService {
      handle<T>(FunctionPointer: Promise<T>): T;
    }

    export interface ITemplateService
      extends IReactoryStartupAwareService,
        IReactoryContextAwareService {
      /**
       * Service function for rerturning a template objeect
       * @param view - string field that represents a unique element within the context of
       * a view, reactory client id and organisation id
       * @param reactoryClientId - the reactory client id to use in the filter,
       * default will be global.partner
       * @param organizationId - the organisation id to use in the filter,
       * default is null, which means the template applies to organisation
       * @param businessUnitId - the business unit id to use as part of the filter
       * @param userId - the user id to use as part of the filter
       */
      getTemplate(
        view: string,
        reactoryClientId: string,
        organizationId?: string,
        businessUnitId?: string,
        userId?: string,
      ): Promise<Models.ITemplate>;

      /***
       * Service function to set a template for a given view, reactory client and organisation id
       * @param view - the view name to use - if found it will update the exsting one
       * @param reactoryClientId - the client id to use in the filter, default is global.partner
       * @param organizationId - the organization id the template will be linked to
       * @param businessUnitId - the business unit id the template will be linked to
       * @param userId - the user the template will be linked to
       */
      setTemplate(
        view: string,
        template: Models.ITemplate,
        reactoryClientId?: string | ObjectId,
        organizationId?: string | ObjectId,
        businessUnitId?: string | ObjectId,
        userId?: string | ObjectId,
      ): Promise<Models.ITemplate>;
    }

    export interface IEmailTemplateService extends ITemplateService {
      /**
       * Template Service function that converts a standard ITemplate into a
       * IEmailTemplate by extracting the subject, body and footer (if available) for this template
       * @param template The template to use as the basis of an email template
       */
      hydrateEmail(
        template: Models.ITemplate | Models.ITemplateDocument,
      ): Promise<Models.IEmailTemplate>;

      /**
       * Template service function that converts the IEmailTemplate into an ITemplate
       * @param template The email template to convert to a standard ITemplate
       */
      dehydrateEmail(template: Models.IEmailTemplate): Promise<Models.ITemplate>;
    }

    export interface ITemplateRenderingService extends IReactoryService {
      /**
       *
       * @param template - can either be an object of type ITemplate or string.
       * @param properties - the property bag that is passed to the ejs engine to render the
       * template
       */
      renderTemplate(template: Models.ITemplate | string, properties: unknown): string;
    }

    export interface IReactoryTemplateService
      extends Reactory.Service.ITemplateService,
        Reactory.Service.ITemplateRenderingService,
        Reactory.Service.IEmailTemplateService {}

    export interface IFile {
      createReadStream: (args: unknown | unknown[]) => unknown;
      filename: string;
      mimetype: string;
      encoding: string;
    }
    export interface FileUploadArgs {
      file: IFile;
      rename: boolean;
      catalog?: boolean;
      uploadContext?: string;
      isUserSpecific?: boolean;
      virtualPath?: string;
      filename?: string;
    }

    export interface IReactoryFileService extends Reactory.Service.IReactoryDefaultService {
      uploadFile(uploadArgs: FileUploadArgs): Promise<Reactory.Models.IReactoryFileModel>;

      getContentBytes(path: string): number;

      getContentBytesAsString(path: string, encoding: BufferEncoding): string;

      removeFilesForContext(context: string): Promise<Reactory.Models.IReactoryFileModel[]>;

      getFileModelsForContext(context: string): Promise<Reactory.Models.IReactoryFileModel[]>;

      /**
       * Fetches remote file and saves it to the local instance.
       * @param url
       * @param headers
       * @param save
       * @param options
       */
      getRemote(
        url: string,
        method: string,
        headers: HeadersInit,
        save: boolean,
        options?: {
          ttl?: number;
          sync?: boolean;
          owner?: ObjectId;
          permissions?: Models.IReactoryFilePermissions;
          public: boolean;
        },
      ): Promise<Models.IReactoryFileModel>;

      setFileModel(file: Models.IReactoryFileModel): Promise<Reactory.Models.IReactoryFileModel>;

      getFileModel(id: string): Promise<Reactory.Models.IReactoryFileModel>;

      getFileSize(file: Models.IReactoryFileModel): number;

      sync(): Promise<Reactory.Models.IReactoryFileModel[]>;

      clean(): Promise<Reactory.Models.IReactoryFileModel[]>;

      deleteFile(fileModel: Reactory.Models.IReactoryFileModel): boolean;

      catalogFile(
        filename: string,
        mimetype?: string,
        alias?: string,
        context?: string,
        partner?: Models.IReactoryClient | Models.IReactoryClientDocument,
        user?: Models.IUser | Models.IUserDocument,
      ): Promise<Models.IReactoryFileModel>;

      generateFileChecksum(filename: string, algo: string): Promise<string>;
    }

    export type OrganizationImageType = string | "logo" | "avatar";
    export interface IReactoryOrganizationService extends Reactory.Service.IReactoryDefaultService {
      setOrganization(
        id: string,
        updates: {
          name?: string;
          code?: string;
          color?: string;
          logo?: string;
        },
      ): Promise<Models.IOrganizationDocument>;

      uploadOrganizationImage(
        id: string,
        file: IFile,
        imageType: OrganizationImageType,
      ): Promise<Models.IOrganizationDocument>;

      get(id: string): Promise<Models.IOrganizationDocument>;

      findWithName(name: string): Promise<Models.IOrganizationDocument>;

      create(name: string): Promise<Models.IOrganizationDocument>;

      findBusinessUnit(
        organization_id: string | number | ObjectId,
        search: string | number | ObjectId,
      ): Promise<Models.IBusinessUnitDocument>;

      createBusinessUnit(
        organization_id: string | number | ObjectId,
        name: string,
      ): Promise<Models.IBusinessUnitDocument>;

      findTeam(
        organization_id: string | number | ObjectId,
        search: string | number | ObjectId,
      ): Promise<Reactory.Models.ITeamDocument>;

      createTeam(
        organization_id: string | number | ObjectId,
        search: string | number | ObjectId,
      ): Promise<Reactory.Models.ITeamDocument>;
    }

    export type FormStore = "db" | "fs";

    /**
     * interface definition for a form service that will manage access to forms for users.
     */
    export interface IReactoryFormService extends Reactory.Service.IReactoryDefaultService {
      /**
       * Provide a list of forms for the current logged in user context / partner context
       */
      list(): Promise<Reactory.Forms.IReactoryForm[]>;

      /***
       * Returns a list of globals that are available in the eco system
       */
      globals(): Promise<Reactory.Forms.IReactoryForm[]>;

      /**
       * Return a form with a given id
       * @param id
       */
      get(id: string): Promise<Reactory.Forms.IReactoryForm>;

      /**
       * Persists the form to storage.
       * @param form - The form definition that will be persisted
       * @param options - options for persisting the form. If options.publish
       *
       */
      save(
        form: Reactory.Forms.IReactoryForm,
        options?: {
          publish: boolean;
          module?: string;
          storage?: FormStore;
          git?: Reactory.Git.GitOptions;
        },
      ): Promise<Reactory.Forms.IReactoryForm>;

      /**
       * Delete a form from the data store
       * @param form
       */
      delete(form: Reactory.Forms.IReactoryForm): Promise<boolean>;

      /**
       * @param form Returns an array of resources for the form
       */
      getResources(
        form: Reactory.Forms.IReactoryForm,
      ): Promise<Reactory.Forms.IReactoryFormResource[]>;

      /**
       * Searches for a form using the search params
       * @param form - Partial form. it will use name, title, description and tags to search
       * @param targetModule
       * @param where
       */
      search(
        form: Partial<Reactory.Forms.IReactoryForm>,
        targetModule?: string,
        where?: FormStore[],
      ): Promise<Reactory.Forms.IReactoryForm[]>;

      /**
       * Overrides a form with a newer version in the database
       * @param form
       * @param overrides
       */
      override(
        form: Reactory.Forms.IReactoryForm,
        overrides: Reactory.Forms.IReactoryForm,
      ): Promise<Reactory.Forms.IReactoryForm>;
    }

    export interface IReactoryModuleCompilerService
      extends Reactory.Service.IReactoryDefaultService {
      /**
       *
       * @param module Compiles a ReactoryFormModule
       */
      compileModule(
        module: Reactory.Forms.IReactoryFormModule,
      ): Promise<Reactory.Forms.IReactoryFormResource>;
    }

    export interface IReactoryUserService extends Reactory.Service.IReactoryDefaultService {
      createUser(
        userInput: Reactory.Models.IUserCreateParams,
        organization?: Reactory.Models.IOrganizationDocument,
        businessUnit?: Reactory.Models.IBusinessUnitDocument,
        teams?: Reactory.Models.ITeamDocument[],
        partner?: Reactory.Models.IReactoryClientDocument,
      ): Promise<Reactory.Models.IUserDocument>;

      findUserWithEmail(email: string): Promise<Reactory.Models.IUserDocument>;

      findUserById(id: string | ObjectId): Promise<Reactory.Models.IUserDocument>;

      getUserPeers(
        id: string | ObjectId,
        organization_id: string | ObjectId,
      ): Promise<Reactory.Models.IOrganigramDocument>;

      removeUserMembership(
        userId: string | ObjectId,
        id: string | ObjectId,
      ): Promise<Reactory.Models.CoreSimpleResponse>;

      setUserPeers(
        user: Models.IUserDocument,
        peers: unknown,
        organization: Models.IOrganizationDocument,
        allowEdit: boolean,
        confirmedAt?: Date,
      ): Promise<Models.IOrganigramDocument>;

      setUserDemographics(
        userId: string,
        organisationId: string,
        membershipId?: string,
        dob?: Date,
        businessUnit?: string,
        gender?: string,
        operationalGroup?: string,
        position?: string,
        race?: string,
        region?: string,
        team?: string,
      ): Promise<Reactory.Models.IUserDemographics | Reactory.Models.IUserDemographicDocument>;

      updateUser(userInput: Reactory.Models.IUser): Promise<Reactory.Models.IUserDocument>;

      listAllUsers(): Promise<Reactory.Models.IUserDocument[]>;

      searchUsers(
        search: string,
        sort?: string,
        limit?: number,
        offset?: number,
      ): Promise<Reactory.Models.IUserDocument[]>;
    }

    export interface IReactoryUserDemographicsService
      extends Reactory.Service.IReactoryDefaultService {
      setUserDemographics(
        demographics: Reactory.Models.IUserDemographics,
        user: Reactory.Models.IUser,
      ): Promise<Models.IUserDemographicDocument>;
    }

    export interface IReactoryWorkflowService extends Reactory.Service.IReactoryDefaultService {
      startWorkflow(workflow_id: string, input: unknown): Promise<unknown>;
      stopWorkflow(worflow_id: string, instance: string): Promise<unknown>;
      workflowStatus(worflow_id: string, instance: string): Promise<unknown>;
      clearWorkflows(): Promise<unknown>;
    }

    export interface IFetchAuthenticationProvder {
      /**
       * Authenticates a fetch request before the call is made.
       * This would be used to set headers for which
       * we already have the request data.
       * @param request
       */
      authenticateRequestSync(request: unknown): void;

      /**
       * Authenticates a fetch request asynchronously
       * @param request
       */
      authenticateRequest(request?: unknown): Promise<unknown>;
    }

    export interface IFetchHeaderProvider {
      /**
       * Decorates a Fetch request with unknown custom headers
       * @param request
       */
      decorateRequestHeaderSync(request: unknown): void;

      /**
       * decorates a fetch request with custom headers asynch
       * @param request
       */
      decorateRequestHeader(request: unknown): Promise<unknown>;
    }

    /**
     * The IFetchService interface extends the IReactoryDefaultService interface.
     * It represents a wrapper around the node-fetch module, providing methods
     * to perform authenticated fetch requests in various forms (GET, POST, PUT, DELETE),
     * as well as allowing for custom authentication and header providers.
     */
    export interface IFetchService extends Reactory.Service.IReactoryDefaultService {
      /**
       * Sets the authentication provider for this instance.
       * @param provider - An implementation of the IFetchAuthenticationProvder interface.
       */
      setAuthenticationProvider(provider: IFetchAuthenticationProvder): void;

      /**
       * Sets the header provider for this instance.
       * @param provider - An implementation of the IFetchHeaderProvider interface.
       */
      setHeaderProvider(provider: IFetchHeaderProvider): void;

      /**
       * Sends a GET request and returns the JSON response.
       * @param url - The request URL.
       * @param args - Optional additional arguments for the request.
       * @param authenticate - Whether to authenticate the request. Default is false.
       * @param charset - Optional character set for the request.
       * @returns A Promise that resolves with the JSON response data.
       */
      getJSON<T>(url: string, args?: unknown, authenticate?: boolean, charset?: string): Promise<T>;

      /**
       * Sends a POST request and returns the JSON response.
       * @param url - The request URL.
       * @param args - Optional additional arguments for the request.
       * @param authenticate - Whether to authenticate the request. Default is false.
       * @param charset - Optional character set for the request.
       * @returns A Promise that resolves with the JSON response data.
       */
      postJSON<T>(
        url: string,
        args?: unknown,
        authenticate?: boolean,
        charset?: string,
      ): Promise<T>;

      /**
       * Sends a PUT request and returns the JSON response.
       * @param url - The request URL.
       * @param args - Optional additional arguments for the request.
       * @param authenticate - Whether to authenticate the request. Default is false.
       * @param charset - Optional character set for the request.
       * @returns A Promise that resolves with the JSON response data.
       */
      putJSON<T>(url: string, args?: unknown, authenticate?: boolean, charset?: string): Promise<T>;

      /**
       * Sends a DELETE request and returns the JSON response.
       * @param url - The request URL.
       * @param args - Optional additional arguments for the request.
       * @param authenticate - Whether to authenticate the request. Default is false.
       * @param charset - Optional character set for the request.
       * @returns A Promise that resolves with the JSON response data.
       */
      deleteJSON<T>(
        url: string,
        args?: unknown,
        authenticate?: boolean,
        charset?: string,
      ): Promise<T>;

      /**
       * Sends a fetch request and returns the response.
       * @param url - The request URL.
       * @param args - Optional additional arguments for the request.
       * @param authenticate - Whether to authenticate the request. Default is false.
       * @param contentType - Optional content type for the request.
       * @param defaultHeaders - Whether to include default headers. Default is true.
       * @returns A Promise that resolves with the Response or JSON response data.
       */
      fetch<T>(
        url: string,
        args?: unknown,
        authenticate?: boolean,
        contentType?: string,
        defaultHeaders?: boolean,
      ): Promise<Response | T>;
    }

    export interface IPDFStyleDefinition {
      alignment?: string | "left" | "right" | "justify" | "center";
      font?: string;
      fontSize?: string;
      margin?: [number, number?, number?, number?];
      lineHeight?: number;
      bold?: boolean;
      italics?: boolean;
      color?: string;
      [key: string]: unknown;
    }
    export interface IPDFContentNode {
      style?: string[];
      margin?:
        | [number]
        | [number, number]
        | [number, number, number]
        | [number, number, number, number];
      [key: string]: unknown;
    }

    export interface IPDFTableLayout {
      fillColor: (rowIndex: number, node: unknown, columnIndex: number) => unknown;
    }

    export interface IPDFDocumentDefinition {
      filename: string;
      info?: {
        title?: string;
        author?: string;
        subject?: string;
        keywords?: string;
      };
      content: IPDFContentNode[];
      header?: (currentPage: number, pageCount: number) => IPDFContentNode[];
      footer?: (currentPage: number, pageCount: number, pageSize: number) => IPDFContentNode[];
      images?: {
        [key: string]: string | Buffer;
      };
      pageMargins: [number, number, number, number];
      styles: {
        [key: string]: IPDFStyleDefinition;
      };
      tableLayoutOut: {
        [key: string]: IPDFTableLayout;
      };
    }

    /**
     * Pdf service that generates PDFs using PDF make
     */
    export interface IReactoryPdfService extends Reactory.Service.IReactoryDefaultService {
      generate(definition: unknown, stream: unknown): Promise<unknown>;

      pdfDefinitions(): Reactory.Pdf.IReactoryPdfComponent;
    }

    export interface IReactorySupportService extends Reactory.Service.IReactoryDefaultService {
      
      /**
       * Get's a ticket by the ticket id and checks if the 
       * user has permissions to retrieve
       * @param ticket_id 
       */
      getTicket(ticket_id: string): Promise<Models.ReactorySupportDocument>;
      
      /**
       * Creates a new support ticket
       * @param request 
       * @param description 
       * @param requestType 
       * @param meta 
       * @param formId 
       */
      createRequest(
        request: string,
        description: string,
        requestType?: string,
        meta?: unknown,
        formId?: string,
      ): Promise<Models.IReactorySupportTicket | Models.IReactorySupportTicketDocument>;

      /**
       * Deletes a support ticket
       * @param ticket_id 
       * @param reason 
       */
      deleteRequest(
        ids: string[],
        reason?: string,
      ): Promise<void>;

      /**
       * Updated a support ticket
       * @param ticket_id 
       * @param updates 
       */
      updateTicket(
        ticket_id: string,
        updates: Models.IReactorySupportTicketUpdate,
      ): Promise<Models.IReactorySupportTicket | Models.IReactorySupportTicketDocument>;

      /**
       * Attaches a file to a support ticket
       * @param ticket_id 
       * @param file 
       * @param name 
       */
      attachDocument(
        ticket_id: string,
        file: File,
        name: string,
      ): Promise<Models.IReactorySupportTicket | Models.IReactorySupportTicketDocument>;

      /**
       * Returns a paged list of support tickets
       * @param filter 
       * @param paging 
       */
      pagedRequest(
        filter: Partial<Models.IReactorySupportTicketFilter>,
        paging: Models.IPagingRequest,
      ): Promise<Models.IPagedReactorySupportTickets>;
    }

    export class ReactorySupportServiceStatic {
      constructor();
    }
    export interface IReactorySupportServiceStatic {
      new (): ReactorySupportServiceStatic;
      reactory: IReactoryServiceDefinition<IReactorySupportService>;
    }

    export type TReactorySupportService = IReactorySupportService & IReactorySupportServiceStatic;

    /***
     * The Reactory System Service provides wrapper functionality for various core functionality
     * that is share across concerns.
     */
    export interface IReactorySystemService extends Reactory.Service.IReactoryDefaultService {
      /**
       * Return a ReactoryClient item with a given id
       * @param id the id to search / use
       * @param populate (elements to populate)
       */
      getReactoryClient(
        id: string | ObjectId,
        populate?: string[],
      ): Promise<Models.TReactoryClient>;

      /**
       * Returns a list of cients based on a query input
       * @param query
       */
      getReactoryClients(query: unknown): Promise<Models.TReactoryClient[]>;

      /**
       * returns a list of menus for a given ReactoryClient
       * @param client
       */
      getMenusForClient(client: Models.TReactoryClient): Promise<UX.IReactoryMenuConfig[]>;
      /**
       * Run a graphql query against the graph.
       * @param query
       * @param variables
       */
      query(query: string, variables: unknown): Promise<unknown>;
      /**
       * Run a graphql mutation against the graph.
       * @param query
       * @param variables
       */
      mutate(mutation: string, variables: unknown): Promise<unknown>;
    }

    export interface IReactoryTranslationService extends Reactory.Service.IReactoryDefaultService {
      /**
       * Initializes the i18n next component for the logged in user context.
       * Loads system and module defined translations and loads unknown user defined
       * translations into the user context.
       *
       * returns true when completed without error, false if there was some kind of error.
       *
       */
      init(): Promise<boolean>;

      /**
       * Returns all the translations for a given locale string, if the
       * local is not provide the syste default will be used as defined on the
       * process.env.REACTORY_DEFAULT_LOCALE, if no default locale is set the
       * operating system user default will be used.
       * @param locale - the local string to use
       */
      getTranslations(locale?: string): Promise<Models.IReactoryTranslations>;

      /**
       * Sets a translation item. When using the default service the data will
       * be validated before being added to the resource collection
       * @param translation
       */
      setTranslation(
        translation: Models.IReactoryTranslation,
      ): Promise<Models.IReactoryTranslation>;
      /**
       * Removes a particular translation
       * @param translation
       */
      removeTranslation(
        translation: Models.IReactoryTranslation,
      ): Promise<Models.IReactoryTranslation>;

      /**
       * Creates a object from the key structure
       * @param translation
       */
      getResource(translation: Models.IReactoryTranslation): Promise<unknown>;

      /**
       * Creates an object from all the items in translations set
       * @param translations
       */
      getResources(translations: Models.IReactoryTranslations): Promise<unknown>;

      /**
       * Set translations package for a given languge. If present it must replace
       * a given translation.
       * @param translations
       */
      setTranslations(
        translations: Models.IReactoryTranslations,
      ): Promise<Models.IReactoryTranslations>;

      /**
       * Translates a key and merges with a given parameter set.
       * @param key
       */
      translate(key: string, params?: unknown): string;
    }

    export interface IReactoryTranslationServiceStatic {
      new (): IReactorySupportServiceStatic;
      reactory: IReactoryServiceDefinition<IReactoryTranslationService>;
    }

    export type TReactoryTranslationService = IReactoryTranslationService &
      IReactoryTranslationServiceStatic;

    /**
     * Represents input data for a React-based content object.
     */
    export interface ReactoryContentInput {
      /** The ID of the content object, if available. */
      id?: string;
      /** The slug of the content object, which is a unique identifier used in URLs. */
      slug: string;
      /** An array of topic strings associated with the content object. */
      topics?: string[];
      /** The title of the content object. */
      title: string;
      /** A short description of the content object. */
      description?: string;
      /** The content of the object, usually in the form of HTML. */
      content: string;
      /** The locale of the content, such as "en-US". */
      locale?: string;
      /** Whether or not the content should use a template. */
      template?: boolean;
      /** The rendering engine to use, such as "react" or "vue". */
      engine?: string;
      /** The input form to use for previewing the content. */
      previewInputForm?: string;
      /** The version of the content object. */
      version?: string;
      /** The date and time the content object was created. */
      createdAt?: Date;
      /** The date and time the content object was last updated. */
      updatedAt?: Date;
      /** The date and time the content object was published. */
      publishedDate?: Date;
      /** The ID of the user who created the content object. */
      createdBy?: Models.IUser;
      /** The ID of the user who last updated the content object. */
      updatedBy?: Models.IUser;
      /** Whether or not the content object is published. */
      published?: boolean;
    }

    /**
     * Represents the arguments for converting an SVG to an image.
     */
    export interface IReactorySvgToImageArgs {
      /**
       * The folder where the image file will be saved.
       */
      folder: string;
      /**
       * The name of the image file.
       */
      filename: string;
      /**
       * The SVG content to convert to an image.
       */
      svg: string;
      /**
       * The width of the resulting image, in pixels.
       */
      width: number;
      /**
       * The height of the resulting image, in pixels.
       */
      height: number;
    }

    /**
     * Represents the response returned from saving image data.
     */
    export interface IReactorySaveImageDataResponse {
      /**
       * Whether or not the image data was successfully saved.
       */
      success: boolean;
      /**
       * The URL of the PNG image, if available.
       */
      pngURL?: string;
      /**
       * The URL of the SVG image, if available.
       */
      svgURL?: string;
    }

    /**
     * Represents a service for managing React-based content objects.
     */
    export interface IReactoryContentService extends Reactory.Service.IReactoryDefaultService {
      /**
       * Retrieves a content object by its slug.
       * @param slug The slug of the content object to retrieve.
       * @returns A promise that resolves to the retrieved content object.
       */
      getContentBySlug(slug: string, basePath?: string): Promise<Models.IReactoryContent>;

      /**
       * Retrieves a content object by its ID.
       * @param id The ID of the content object to retrieve.
       * @returns A promise that resolves to the retrieved content object.
       */
      getContentById(id: string): Promise<Models.IReactoryContent>;

      /**
       * Returns a list of content objects by their tags.
       * @param tags The tags to search for
       * @param paging The paging information
       */
      getContentByTags(
        tags: string[],
        paging: Data.PagingRequest,
      ): Promise<Data.PagedDataResponse<Models.IReactoryContent, string[]>>;

      /**
       * Retrieves a content object by its slug and locale.
       * @param slug The slug of the content object to retrieve.
       * @param locale The locale of the content object to retrieve.
       * @returns A promise that resolves to the retrieved content object.
       */
      getContentBySlugAndLocale(slug: string, locale: string): Promise<Models.IReactoryContent>;

      /**
       * Retrieves a content object by its ID and locale.
       * @param id The ID of the content object to retrieve.
       * @param locale The locale of the content object to retrieve.
       * @returns A promise that resolves to the retrieved content object.
       */
      getContentByIdAndLocale(id: string, locale: string): Promise<Models.IReactoryContent>;

      /**
       * Retrieves a content object by its slug and client.
       * @param slug The slug of the content object to retrieve.
       * @param client The client associated with the content object.
       * @returns A promise that resolves to the retrieved content object.
       */
      getContentBySlugAndClient(
        slug: string,
        client: Models.TReactoryClient,
      ): Promise<Models.IReactoryContent>;

      /**
       * Retrieves a list of content objects that match the specified query and paging criteria.
       * @param query The query parameters to filter the results by.
       * @param paging The paging criteria to use.
       * @returns A promise that resolves to a paged response containing the matching
       * content objects.
       */
      listContent<TQuery>(
        query: TQuery,
        paging: Reactory.Data.PagingRequest,
      ): Promise<Reactory.Data.PagedDataResponse<Models.IReactoryContent, TQuery>>;

      /**
       * Creates a new content object.
       * @param content The input data for the content object.
       * @returns A promise that resolves to the created content object.
       */
      createContent(content: ReactoryContentInput): Promise<Models.IReactoryContent>;

      /**
       * Saves image data in the specified folder and filename.
       * @param image The SVG image data to save.
       * @returns A promise that resolves to a response object containing the URLs
       * of the saved images.
       */
      saveImageData(image: IReactorySvgToImageArgs): Promise<IReactorySaveImageDataResponse>;
    }

    export interface FrequencyDistribution {
      /**
       * Returns an array of all unique tokens in the distribution
       */
      keys(): string[];

      /**
       * Returns the frequency count for a given token
       * @param token - the token to get the frequency count for
       */
      count(token: string): number;

      /**
       * Returns the total number of tokens in the distribution
       */
      N(): number;

      /**
       * Returns the frequency of a given token
       * @param token - the token to get the frequency of
       */
      frequency(token: string): number;

      /**
       * Returns the most common n tokens in the distribution
       * @param n - the number of tokens to return, defaults to 10
       */
      mostCommon(n?: number): [string, number][];

      /**
       * Returns the frequency distribution as an object
       */
      get(): { [token: string]: number };

      /**
       * Updates the frequency count for a given token
       * @param token - the token to update the frequency count for
       * @param count - the new frequency count for the token
       */
      increment(token: string, count?: number): void;

      /**
       * Updates the frequency distribution with a list of new tokens
       * @param tokens - the list of new tokens to add to the distribution
       * @param update - a boolean indicating whether to update the frequency
       * count for existing tokens, defaults to true
       */
      add(tokens: string[], update?: boolean): void;
    }

    /**
     * An object containing the results of various Natural language processing functions
     */
    export interface INaturalPackageForInput {
      /**
       * An array of tokens generated from the input text
       */
      tokens: Models.INaturalTokenizedInput;

      /**
       * The stemmed version of the input text
       */
      stem: string;

      /**
       * An array of n-grams generated from the input text
       */
      ngrams: string[];

      /**
       * The Jaccard index between two given strings
       */
      jaccardIndex: number;

      /**
       * The Jaro-Winkler distance between two given strings
       */
      jaroWinklerDistance: number;

      /**
       * The Dice coefficient between two given strings
       */
      diceCoefficient: number;

      /**
       * The overlap coefficient between two given strings
       */
      overlapCoefficient: number;

      /**
       * The Levenshtein distance between two given strings
       */
      levenshteinDistance: number;

      /**
       * An array of tokens with part of speech tags generated from the input text
       */
      posTags: string[];

      /**
       * An object containing sentiment analysis results for the input text
       */
      sentiment: Models.INaturalSentiment;

      /**
       * An object containing spelling correction results for the input text
       */
      spellcheck: Models.INaturalSpellCheckResult;

      /**
       * An array of synonyms for a given word
       */
      synonyms: string[];

      /**
       * An array of antonyms for a given word
       */
      antonyms: string[];

      /**
       * An array of hypernyms for a given word
       */
      hypernyms: string[];

      /**
       * An array of hyponyms for a given word
       */
      hyponyms: string[];

      /**
       * An array of meronyms for a given word
       */
      meronyms: string[];

      /**
       * An array of holonyms for a given word
       */
      holonyms: string[];

      /**
       * A truncated version of the input text
       */
      truncatedText: string;

      /**
       * A normalized version of the input text
       */
      normalizedText: string;

      /**
       * A boolean indicating whether two given strings are equal, ignoring case and diacritics
       */
      equals: boolean;

      /**
       * A randomly generated string of specified length and character set
       */
      randomString: string;

      /**
       * A hash generated from the input text
       */
      hash: string;

      /**
       * An object containing the frequency distribution of tokens in the input text
       */
      frequencyDistribution: Models.INaturalFrequencyMap;
    }

    export type PackageOptions = {
      tokenizer?: string;
      stemmingLang?: string;
      ngramSize?: number;
      posLang?: string;
      customDictionary?: string[];
      wordnetPos?: string;
      wordnetLang?: string;
      truncateLength?: number;
      truncateEllipsis?: string;
      randomLength?: number;
      randomCharset?: string;
      hashAlgorithm?: string;
      hashEncoding?: string;
    };

    /**
     * Represents a service for performing natural language processing tasks.
     */
    export interface INaturalService extends Reactory.Service.IReactoryDefaultService {
      /**
       * Tokenizes a given text string using a specified tokenizer and returns an array of tokens
       * @param text - the text to tokenize
       * @param tokenizer - the name of the tokenizer to use, defaults to "WordTokenizer"
       * @returns an array of tokens
       */
      tokenize(text: string, tokenizer?: string): Models.INaturalTokenizedInput;

      /**
       * Stems a word using a specified language and algorithm
       * @param word - the word to stem
       * @param lang - the ISO 639-1 language code to use, defaults to "en" (English)
       * @returns the stemmed word
       */
      stem(word: string, lang?: string): string;

      /**
       * Generates an array of n-grams from a given text string
       * @param text - the text to generate n-grams from
       * @param n - the size of each n-gram
       * @returns an array of n-grams
       */
      ngrams(text: string, n: number): string[];

      /**
       * Calculates the Jaro-Winkler distance between two given strings
       * @param s1 - the first string
       * @param s2 - the second string
       * @returns the Jaro-Winkler distance between s1 and s2
       */
      jaroWinklerDistance(s1: string, s2: string): number;

      /**
       * Calculates the Dice coefficient between two given strings
       * @param s1 - the first string
       * @param s2 - the second string
       * @returns the Dice coefficient between s1 and s2
       */
      diceCoefficient(s1: string, s2: string): number;

      /**
       * Calculates the Levenshtein distance between two given strings
       * @param s1 - the first string
       * @param s2 - the second string
       * @returns the Levenshtein distance between s1 and s2
       */
      levenshteinDistance(s1: string, s2: string): number;

      /**
       * Tags a given text string with parts of speech using a specified language
       * @param text - the text to tag
       * @param lang - the ISO 639-1 language code to use, defaults to "en" (English)
       * @returns an array of tokens with part of speech tags
       */
      tag(text: string, lang?: string): string[];

      /**
       * Analyzes the sentiment of a given text string using a specified language
       * @param text - the text to analyze
       * @param lang - the ISO 639-1 language code to use, defaults to "en" (English)
       * @returns an object with sentiment analysis results
       */
      sentiment(text: string, lang?: string): Models.INaturalSentiment;

      /**
       * Checks the spelling of a given text string using a specified language and custom dictionary
       * @param text - the text to check
       * @param lang - the ISO 639-1 language code to use, defaults to "en" (English)
       * @param customDictionary - an optional array of custom dictionary words
       * @returns an array of spelling results for each word in the input text
       */
      spellcheck(
        text: string,
        lang?: string,
        customDictionary?: string[],
      ): Models.INaturalSpellCheckResult;

      /**
       * Gets the synonyms of a given word from WordNet using a specified language and part
       * of speech
       * @param word - the word to get synonyms for
       * @param pos - the part of speech to limit the results to, defaults to "n" (noun)
       * @param lang - the ISO 639-1 language code to use, defaults to "en" (English)
       * @returns a promise that resolves to an array of synonyms for the given word
       */
      getSynonyms(word: string, pos?: string, lang?: string): Promise<string[]>;

      /**
       * Gets the antonyms of a given word from WordNet using a specified language and part
       * of speech
       * @param word - the word to get antonyms for
       * @param pos - the part of speech to limit the results to, defaults to "n" (noun)
       * @param lang - the ISO 639-1 language code to use, defaults to "en" (English)
       * @returns a promise that resolves to an array of antonyms for the given word
       */
      getAntonyms(word: string, pos?: string, lang?: string): Promise<string[]>;

      /**
       * Gets the hypernyms of a given word from WordNet using a specified language and
       * part of speech
       * @param word - the word to get hypernyms for
       * @param pos - the part of speech to limit the results to, defaults to "n" (noun)
       * @param lang - the ISO 639-1 language code to use, defaults to "en" (English)
       * @returns a promise that resolves to an array of hypernyms for the given word
       */
      getHypernyms(word: string, pos?: string, lang?: string): Promise<string[]>;

      /**
       * Gets the hyponyms of a given word from WordNet using a specified language and
       * part of speech
       * @param word - the word to get hyponyms for
       * @param pos - the part of speech to limit the results to, defaults to "n" (noun)
       * @param lang - the ISO 639-1 language code to use, defaults to "en" (English)
       * @returns a promise that resolves to an array of hyponyms for the given word
       */
      getHyponyms(word: string, pos?: string, lang?: string): Promise<string[]>;

      /**
       * Gets the meronyms of a given word from WordNet using a specified language
       * zand part of speech
       * @param word - the word to get meronyms for
       * @param pos - the part of speech to limit the results to, defaults to "n" (noun)
       * @param lang - the ISO 639-1 language code to use, defaults to "en" (English)
       * @returns a promise that resolves to an array of meronyms for the given word
       */
      getMeronyms(word: string, pos?: string, lang?: string): Promise<string[]>;

      /**
       * Gets the holonyms of a given word from WordNet using a specified language
       * and part of speech
       * @param word - the word to get holonyms for
       * @param pos - the part of speech to limit the results to, defaults to "n" (noun)
       * @param lang - the ISO 639-1 language code to use, defaults to "en" (English)
       * @returns a promise that resolves to an array of holonyms for the given word
       */
      getHolonyms(word: string, pos?: string, lang?: string): Promise<string[]>;

      /**
       * Truncates a given text string to a specified length, adding an ellipsis if necessary
       * @param text - the text to truncate
       * @param length - the maximum length of the truncated text, defaults to 100
       * @param ellipsis - the string to use as an ellipsis, defaults to "..."
       * @returns the truncated text
       */
      truncate(text: string, length?: number, ellipsis?: string): string;

      /**
       * Normalizes a given text string by converting it to lowercase and removing diacritics
       * @param text - the text to normalize
       * @returns the normalized text
       */
      normalize(text: string): string;

      /**
       * Compares two strings for equality, ignoring case and diacritics
       * @param s1 - the first string to compare
       * @param s2 - the second string to compare
       * @returns true if the strings are equal, false otherwise
       */
      equals(s1: string, s2: string): boolean;

      /**
       * Generates a random string of a specified length and character set
       * @param length - the length of the random string to generate, defaults to 8
       * @param charset - the character set to use for generating the string, defaults
       *  to alphanumeric
       * @returns a random string
       */
      randomString(length?: number, charset?: string): string;

      /**
       * Generates a hash for a given text string using a specified algorithm
       * @param text - the text to hash
       * @param algorithm - the hashing algorithm to use, defaults to "sha256"
       * @param encoding - the encoding of the hash output, defaults to "hex"
       * @returns the hash of the input text
       */
      hash(text: string, algorithm?: string, encoding?: string): string;

      /**
       * Calculates the frequency distribution of a given list of tokens
       * @param tokens - the tokens to calculate the frequency distribution of
       * @returns an object with token frequencies
       */
      frequencyDistribution(tokens: string[]): FrequencyDistribution;

      /**
       * Creates a packaged output object for a given input text
       * !Use with caution as this is a very expensive operation!
       * @param input
       * @param lang
       * @param options
       * @returns
       */
      packageForInput(
        input: string,
        compare?: string,
        lang?: string,
        options?: Partial<PackageOptions>,
      ): INaturalPackageForInput;
    }

    export interface ISearchResults<T> {
      results: T[];
      offset: number;
      limit: number;
      total: number;
    }

    export interface ISearchIndexResult {
      id: any;
      success: boolean;
      error?: string;
    }

    export interface ISearchService extends Reactory.Service.IReactoryDefaultService {
      search<T>(
        index: string,
        filter: string,
        fields?: string[],
        limit?: number,
        offset?: number,
      ): Promise<ISearchResults<T>>;
      index<T>(index: string, data: T[]): Promise<ISearchIndexResult>;
      deleteIndex<T>(index: string): Promise<boolean>;
    }
  }
  }