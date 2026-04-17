/* eslint-disable no-unused-vars */
/// <reference path="../global.d.ts" />

declare namespace Reactory {
  export namespace Workflow {
    /**
     * Workflow step interface (legacy/basic)
     */
    export interface IWorkflowStep {
      id: string;
      name: string;
      description?: string;
      type: string;
      data?: unknown;
    }

    /**
     * Workflow definition interface (legacy/basic)
     */
    export interface IWorkflowDefinition {
      id: string;
      name: string;
      description?: string;
      steps: IWorkflowStep[];
    }

    // =========================================================================
    // YAML Workflow Step Execution Contracts (from IYamlStep.ts)
    // =========================================================================

    /**
     * Context provided to each step during execution
     */
    export interface IStepExecutionContext {
      /** Current workflow metadata */
      workflow: {
        id: string;
        instanceId: string;
        nameSpace: string;
        name: string;
        version: string;
      };

      /** Workflow-level input data provided at execution time */
      workflowInputs: Record<string, any>;

      /** Workflow-level variables */
      variables: Record<string, any>;

      /** Environment variables */
      env: Record<string, any>;

      /** Results from previous steps */
      stepResults: Record<string, IYamlStepExecutionResult>;

      /** Logger instance */
      logger: {
        log: (message: string, ...args: any[]) => void;
        error: (message: string, ...args: any[]) => void;
        warn: (message: string, ...args: any[]) => void;
        info: (message: string, ...args: any[]) => void;
        debug: (message: string, ...args: any[]) => void;
      };

      /**
       * Reactory context for accessing services, user info, and partner context.
       * May be undefined if the workflow is executed outside of a Reactory server context.
       */
      reactoryContext?: Reactory.Server.IReactoryContext;
    }

    /**
     * Result returned by a YAML step execution
     */
    export interface IYamlStepExecutionResult {
      /** Whether the step executed successfully */
      success: boolean;

      /** Output data from the step */
      outputs: Record<string, any>;

      /** Additional metadata about execution */
      metadata: Record<string, any>;

      /** Error message if execution failed */
      error?: string;

      /** Whether the step was skipped */
      skipped?: boolean;

      /** Stack trace if execution failed */
      stackTrace?: string;
    }

    /**
     * Configuration validation result for steps
     */
    export interface IStepValidationResult {
      /** Whether the configuration is valid */
      valid: boolean;

      /** List of validation errors */
      errors: string[];

      /** Optional warnings */
      warnings?: string[];
    }

    /**
     * Main interface that all YAML workflow steps must implement
     */
    export interface IYamlStep {
      /** Unique identifier for this step instance */
      readonly id: string;

      /** Type of step (log, delay, etc.) */
      readonly stepType: string;

      /** Static, step-type-specific configuration (e.g. message, url, command) */
      readonly config: Record<string, any>;

      /** Dynamic input parameters with variable substitution support */
      readonly inputs: Record<string, any>;

      /** Whether this step is enabled */
      readonly enabled: boolean;

      /**
       * Execute the step with the given context
       */
      execute(context: IStepExecutionContext): Promise<IYamlStepExecutionResult>;

      /**
       * Validate the step configuration
       */
      validateConfig(config: Record<string, any>): IStepValidationResult;
    }

    /**
     * Constructor signature for step classes
     */
    export interface IStepConstructor {
      new (id: string, config: Record<string, any>, inputs?: Record<string, any>): IYamlStep;
    }

    /**
     * Parameters passed to the step registry's createStep factory.
     * Distinct from IStepConfig which represents the step-type-specific
     * configuration content.
     */
    export interface IStepCreationParams {
      /** Unique step identifier */
      id: string;
      /** Step type (e.g. 'log', 'api_call') */
      type: StepType;
      /** Static step-type-specific configuration */
      config?: Record<string, any>;
      /** Dynamic input parameters (may be a JSON string from YAML) */
      inputs?: Record<string, any> | string;
    }

    /**
     * Options for step registration
     */
    export interface IStepRegistrationOptions {
      /** Whether to force override an existing registration */
      force?: boolean;

      /** Description of the step type */
      description?: string;

      /** Version of the step implementation */
      version?: string;
    }

    /**
     * Step metadata for registry
     */
    export interface IStepMetadata {
      /** Step type identifier */
      stepType: string;

      /** Constructor function */
      constructor: IStepConstructor;

      /** Registration options */
      options: IStepRegistrationOptions;

      /** When it was registered */
      registeredAt: Date;
    }

    /**
     * Entry for registering a workflow step from a module.
     * Used in IReactoryModule.workflowSteps.
     */
    export interface IWorkflowStepProvider {
      /** The step type identifier, e.g. 'myModule.sendEmail' */
      stepType: string;

      /** The constructor/class that implements IYamlStep */
      constructor: IStepConstructor;

      /** Registration options (description, version, force override) */
      options?: IStepRegistrationOptions;
    }

    // =========================================================================
    // YAML Workflow Definition Types (from WorkflowDefinition.ts)
    // =========================================================================

    /**
     * YAML workflow definition structure
     */
    export interface IYamlWorkflowDefinition {
      nameSpace: string;
      name: string;
      version: string;
      description?: string;
      author?: string;
      tags?: string[];
      metadata?: IWorkflowMetadata;
      inputs?: Record<string, IInputParameter>;
      outputs?: Record<string, IOutputParameter>;
      variables?: Record<string, any>;
      steps: IYamlWorkflowStep[];
    }

    export interface IWorkflowMetadata {
      timeout?: number;
      retryPolicy?: IRetryPolicy;
      security?: ISecuritySettings;
      /** Visual designer metadata for the workflow canvas */
      designer?: IDesignerMetadata;
    }

    /**
     * A step within a YAML workflow definition
     */
    export interface IYamlWorkflowStep {
      id: string;
      name?: string;
      description?: string;
      type: StepType;
      enabled?: boolean;
      continueOnError?: boolean;
      timeout?: number;
      retryPolicy?: IRetryPolicy;
      inputs?: Record<string, any>;
      outputs?: Record<string, string>;
      condition?: string;
      dependsOn?: string | string[];
      config?: IStepConfig;
      steps?: IYamlWorkflowStep[];
      /** Visual designer metadata for this step node */
      designer?: IStepDesignerMetadata;
    }

    /**
     * Known core step types (snake_case convention).
     * Extensible via `(string & {})` so modules can register custom step
     * types while preserving autocomplete for built-ins.
     */
    type CoreStepType =
      | 'log'
      | 'delay'
      | 'validation'
      | 'data_transformation'
      | 'api_call'
      | 'cli_command'
      | 'file_operation'
      | 'condition'
      | 'parallel'
      | 'join'
      | 'for_each'
      | 'while'
      | 'custom'
      | 'start'
      | 'end'
      | 'service_invoke'
      | 'task'
      | 'graphql'
      | 'grpc'
      | 'user_activity'
      | 'telemetry';

    type StepType = CoreStepType | (string & {});

    export interface IStepConfig {
      [key: string]: any;
    }

    // Step-specific configurations

    export interface ILogStepConfig extends IStepConfig {
      message: string;
      level?: 'debug' | 'info' | 'warn' | 'error';
      data?: Record<string, any>;
    }

    export interface IDelayStepConfig extends IStepConfig {
      duration: number;
      reason?: string;
    }

    export interface IValidationStepConfig extends IStepConfig {
      rules: IValidationRule[];
      stopOnFirstError?: boolean;
    }

    export interface IDataTransformationStepConfig extends IStepConfig {
      transformations: IDataTransformation[];
    }

    export interface IApiCallStepConfig extends IStepConfig {
      url: string;
      method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
      headers?: Record<string, string>;
      body?: string | object;
      authentication?: IAuthentication;
      expectedStatusCodes?: number[];
    }

    export interface ICliCommandStepConfig extends IStepConfig {
      command: string;
      arguments?: string[];
      workingDirectory?: string;
      environment?: Record<string, string>;
      expectedExitCodes?: number[];
    }

    export interface IFileOperationStepConfig extends IStepConfig {
      operation: 'read' | 'write' | 'copy' | 'move' | 'delete' | 'exists' | 'mkdir';
      source?: string;
      destination?: string;
      content?: string;
      encoding?: string;
      overwrite?: boolean;
    }

    export interface IConditionalStepConfig extends IStepConfig {
      condition: string;
      thenSteps?: IYamlWorkflowStep[];
      elseSteps?: IYamlWorkflowStep[];
    }

    export interface IParallelStepConfig extends IStepConfig {
      maxConcurrency?: number;
      failFast?: boolean;
      branches?: IParallelBranch[];
    }

    export interface IParallelBranch {
      name: string;
      steps: IYamlWorkflowStep[];
    }

    export interface IForEachStepConfig extends IStepConfig {
      items: string;
      itemVariable?: string;
      indexVariable?: string;
      maxConcurrency?: number;
      steps: IYamlWorkflowStep[];
    }

    export interface IWhileStepConfig extends IStepConfig {
      condition: string;
      maxIterations?: number;
      steps: IYamlWorkflowStep[];
    }

    // Parameter types

    export interface IInputParameter {
      type: 'string' | 'number' | 'boolean' | 'object' | 'array';
      description?: string;
      required?: boolean;
      default?: any;
      validation?: IParameterValidation;
    }

    export interface IOutputParameter {
      type: 'string' | 'number' | 'boolean' | 'object' | 'array';
      description?: string;
      source: string;
    }

    export interface IParameterValidation {
      pattern?: string;
      minLength?: number;
      maxLength?: number;
      minimum?: number;
      maximum?: number;
      enum?: (string | number)[];
    }

    // Supporting types

    export interface IValidationRule {
      field: string;
      type: 'required' | 'type' | 'pattern' | 'range' | 'custom';
      value?: string | number | object;
      message?: string;
    }

    export interface IDataTransformation {
      operation: 'map' | 'filter' | 'reduce' | 'sort' | 'group' | 'merge' | 'extract' | 'custom';
      source?: string;
      target?: string;
      config?: Record<string, any>;
    }

    export interface IAuthentication {
      type: 'none' | 'basic' | 'bearer' | 'apiKey' | 'oauth2';
      config?: Record<string, any>;
    }

    export interface IRetryPolicy {
      maxAttempts?: number;
      backoffStrategy?: 'fixed' | 'exponential' | 'linear';
      initialDelay?: number;
      maxDelay?: number;
      retryOnErrors?: string[];
    }

    export interface ISecuritySettings {
      requiresAuthentication?: boolean;
      permissions?: string[];
      roles?: string[];
    }

    // Designer metadata types

    export interface IPosition {
      x: number;
      y: number;
    }

    export interface ISize {
      width: number;
      height: number;
    }

    export interface IDesignerMetadata {
      canvas?: {
        zoom?: number;
        panX?: number;
        panY?: number;
        gridSize?: number;
        snapToGrid?: boolean;
      };
      connections?: IConnectionDesignerMetadata[];
      notes?: IDesignerNote[];
      groups?: IDesignerGroup[];
    }

    export interface IConnectionDesignerMetadata {
      id?: string;
      sourceStepId: string;
      sourcePort: string;
      targetStepId: string;
      targetPort: string;
      points?: IPosition[];
      style?: 'straight' | 'curved' | 'orthogonal';
      color?: string;
      label?: string;
    }

    export interface IDesignerNote {
      id: string;
      text: string;
      position: IPosition;
      size?: ISize;
      color?: string;
    }

    export interface IDesignerGroup {
      id: string;
      label: string;
      stepIds: string[];
      color?: string;
      collapsed?: boolean;
    }

    export interface IStepDesignerMetadata {
      position?: IPosition;
      size?: ISize;
      color?: string;
      icon?: string;
      collapsed?: boolean;
      helpText?: string;
      ports?: {
        inputs?: IPortDesignerMetadata[];
        outputs?: IPortDesignerMetadata[];
      };
    }

    export interface IPortDesignerMetadata {
      name: string;
      label?: string;
      position?: IPosition;
      dataType?: string;
    }

    // Step config type map

    export interface IJoinStepConfig extends IStepConfig {
      timeout?: number;
      strategy?: 'all' | 'any' | 'n_of';
      count?: number;
    }

    export interface IGraphQLStepConfig extends IStepConfig {
      query: string;
      variables?: Record<string, any>;
      endpoint?: string;
      headers?: Record<string, string>;
      operationType?: 'query' | 'mutation';
    }

    export interface IGRPCStepConfig extends IStepConfig {
      service: string;
      method: string;
      payload?: Record<string, any>;
      metadata?: Record<string, string>;
      protoFile?: string;
      deadline?: number;
    }

    export interface IUserActivityStepConfig extends IStepConfig {
      activityType: 'approval' | 'input' | 'review' | 'acknowledgement';
      assignee?: string;
      timeout?: number;
      formSchemaId?: string;
      message?: string;
    }

    export interface ITelemetryStepConfig extends IStepConfig {
      metricName: string;
      metricType: 'counter' | 'histogram' | 'gauge';
      value?: number;
      labels?: Record<string, string>;
      description?: string;
    }

    export type StepConfigMap = {
      log: ILogStepConfig;
      delay: IDelayStepConfig;
      validation: IValidationStepConfig;
      data_transformation: IDataTransformationStepConfig;
      api_call: IApiCallStepConfig;
      cli_command: ICliCommandStepConfig;
      file_operation: IFileOperationStepConfig;
      condition: IConditionalStepConfig;
      parallel: IParallelStepConfig;
      for_each: IForEachStepConfig;
      while: IWhileStepConfig;
      custom: IStepConfig;
      service_invoke: IStepConfig;
      start: IStepConfig;
      end: IStepConfig;
      task: IStepConfig;
      join: IJoinStepConfig;
      graphql: IGraphQLStepConfig;
      grpc: IGRPCStepConfig;
      user_activity: IUserActivityStepConfig;
      telemetry: ITelemetryStepConfig;
    };

    export type StepConfigForType<T extends StepType> = T extends keyof StepConfigMap
      ? StepConfigMap[T]
      : IStepConfig;

    // =========================================================================
    // Execution Engine Types (from ExecutionTypes.ts)
    // =========================================================================

    /**
     * Workflow execution states (string literal union — used in place of enum in .d.ts)
     */
    type ExecutionState = 'idle' | 'running' | 'completed' | 'failed' | 'cancelled';

    /**
     * Workflow execution context passed through the executor
     */
    export interface IExecutorWorkflowContext {
      /** Workflow inputs provided at execution time */
      inputs: Record<string, any>;

      /** Environment variables available to the workflow */
      environment: Record<string, any>;

      /** Outputs from previously executed steps */
      stepOutputs: Record<string, any>;

      /** Workflow metadata */
      workflow: {
        name: string;
        namespace: string;
        version: string;
        executionId: string;
      };

      /** Current execution state */
      execution: {
        startTime: Date;
        currentStep?: string;
        completedSteps: string[];
        totalSteps: number;
      };

      /** Reactory context for accessing services */
      reactoryContext?: Reactory.Server.IReactoryContext;
    }

    /**
     * Record of a single step execution with metadata
     */
    export interface IStepExecutionRecord {
      stepId: string;
      stepType: string;
      success: boolean;
      outputs: Record<string, any>;
      metadata: {
        startTime: Date;
        endTime: Date;
        duration: number;
        executionId: string;
      };
      error?: {
        message: string;
        stack?: string;
        code?: string;
      };
    }

    /**
     * Overall workflow execution result
     */
    export interface IWorkflowExecutionResult {
      success: boolean;
      cancelled?: boolean;
      executedSteps: IStepExecutionRecord[];
      outputs: Record<string, any>;
      metadata: {
        executionId: string;
        startTime: Date;
        endTime: Date;
        duration: number;
        totalSteps: number;
        completedSteps: number;
        failedSteps: number;
      };
      error?: {
        message: string;
        stack?: string;
        code?: string;
        stepId?: string;
      };
      errors?: Array<{
        stepId: string;
        message: string;
        stack?: string;
        code?: string;
      }>;
    }

    /**
     * Workflow validation result
     */
    export interface IWorkflowValidationResult {
      valid: boolean;
      errors: Array<{
        message: string;
        path?: string;
        code?: string;
        stepId?: string;
      }>;
      warnings?: Array<{
        message: string;
        path?: string;
        code?: string;
        stepId?: string;
      }>;
    }

    /**
     * Execution progress event types
     */
    type ProgressEventType =
      | 'workflow_started'
      | 'workflow_completed'
      | 'workflow_failed'
      | 'workflow_cancelled'
      | 'step_started'
      | 'step_completed'
      | 'step_failed'
      | 'step_skipped';

    /**
     * Progress event data
     */
    export interface IProgressEvent {
      type: ProgressEventType;
      timestamp: Date;
      progress: number;
      step?: {
        id: string;
        type: string;
        name?: string;
      };
      message?: string;
      data?: Record<string, any>;
    }

    /**
     * Execution options for workflow
     */
    export interface IExecutionOptions {
      onProgress?: (event: IProgressEvent) => void;
      continueOnError?: boolean;
      timeout?: number;
      inputs?: Record<string, any>;
      environment?: Record<string, any>;
      dryRun?: boolean;
      reactoryContext?: Reactory.Server.IReactoryContext;
    }

    /**
     * Current execution state snapshot
     */
    export interface IExecutionStateSnapshot {
      status: ExecutionState;
      currentStep: string | null;
      completedSteps: string[];
      failedSteps: string[];
      startTime: Date | null;
      progress: number;
      totalSteps: number;
      executionId: string | null;
    }

    /**
     * Dependency resolution result
     */
    export interface IDependencyResolutionResult {
      executionOrder: string[];
      valid: boolean;
      errors: Array<{
        message: string;
        stepId: string;
        dependency?: string;
      }>;
    }

    /**
     * Step creation error
     */
    export interface IStepCreationError {
      stepId: string;
      stepType: string;
      message: string;
      cause?: Error;
    }
  }
}
