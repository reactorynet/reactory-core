/* eslint-disable no-unused-vars */
/// <reference path="../global.d.ts" />

declare namespace Reactory {
  export namespace Core {
    /**
     * Basic construct of a fully qualified name
     */
    export interface IFQNObject {
      /**
       * nameSpace is used as large grouping. Cannot contain "."
       */
      nameSpace: string;
      /**
       * The name part of the component id
       */
      name: string;
      /**
       * The version part of the component id
       * follows semver format
       */
      version: string;
    }

    /**
     * A struct representation of IComponentFqnDefinition
     */
    export interface IComponentFqnDefinition extends IFQNObject {
      /**
       * toString function to provide a string formatted version of the
       * component id.
       * @param includeVersion
       */
      toString?(includeVersion?: boolean): string;
    }

    /**
     * A function decorator that can be used to decorate a function with a fully qualified name.
     * @param nameSpace - The namespace of the FQN
     * @param name - The name of the FQN
     * @param version - The version of the FQN, if not provided the system will assume 1.0.0
     */
    export type FqnDecorator = (nameSpace: string, name: string, version?: string) => void;

    /**
     * A component domain is an enum that is used to identify the
     * domain of function for the component
     */
    export enum ComponentDomain {
      "model",
      "service",
      "component",
      "plugin",
      "module",
      "function",
      "object",
      "enum",
      "interface",
      "type",
      "directive",
      "schema",
      "query",
      "mutation",
      "subscription",
      "resolver",
      "action",
      "event",
      "eventHandler",
      "eventListener",
      "eventEmitter",
      "eventDispatcher",
      "eventSubscriber",
      "eventPublisher",
      "eventProducer",
      "eventConsumer",
    }

    /**
     * Feature type enum for component features
     */
    export enum FeatureType {
      "string",
      "number",
      "boolean",
      "date",
      "object",
      "array",
      "function",
      "symbol",
      "bigint",
    }

    /**
     * Interface for component features
     */
    export interface IReactoryComponentFeature {
      /**
       * The feature name, when automatically generated this will be the
       * name of the property on the model.
       */
      feature: string;
      /**
       * The root name of the feature. i.e. if your feature is called "getListForOrganization"
       * the stem of the would be "Organization"
       */
      stem?: string;
      /**
       * The action that represent the feature i.e. ["get", "list"]
       */
      action?: string[];
      /**
       * The description for the feature. If not provided the system will attempt to
       * generate a description based on the feature name.
       */
      description?: string;
      /**
       * The type of the feature.  This can be used to provide additional information
       * */
      featureType: string | FeatureType;
    }

    /**
     * Interface for activation keyword arguments
     */
    export interface IActivationKwarg {
      /**
       * the key for the parameter
       */
      key: string;
      /**
       * A human friendly name for the argument
       */
      name: string;
      /**
       * indicates if the argument is required
       */
      required?: boolean;
      /**
       * A description of the argument
       */
      description?: string;
      /**
       * The type of the argument
       */
      type?: string;
      /**
       * A default value for the argument
       */
      default?: unknown;
      /**
       * An async provider for the argument
       * @returns
       */
      provider?: () => Promise<unknown>;
    }

    /**
     * Interface for Reactory component definition
     */
    export interface IReactoryComponentDefinition<T = unknown> extends IComponentFqnDefinition {
      /**
       * Longer description, what does the component do.
       * i.e. BackupFileservice is a specific service for persisting uploaded files to a
       * backup folder. The service will also provide a mechanism for retrieving files
       * from the backup folder that can be used by restore service.
       */
      description?: string;
      /**
       * A string array of that can used to identify the model
       */
      tags?: string[];
      /**
       * The name is the root name or the "stem" of the model name
       */
      stem?: string;
      /**
       * The component reference.
       * Use these when using React components etc which will be activated
       * using the <Component /> syntax.
       */
      component?: T;
      /**
       * A component activator function that can be used to activate the component.
       * @param kwargs
       * @returns
       */
      activate?: (
        kwargs: { key: string; value: unknown },
        context?: Reactory.Server.IReactoryContext,
      ) => T;
      /**
       * activation kwargs descriptors
       */
      activateKwargs?: [];

      /**
       * Provides a list of features for the component.  This can be used to
       * provide additional information about the component.
       */
      features?: IReactoryComponentFeature[];
      /**
       * Indicates whether or not to overwrite an existing component
       */
      overwrite?: boolean;

      /**
       * If the component needs to be aware of the reactory
       * startup process then this function can be used to
       * provide a hook into the startup process.
       * @returns Promise<void>
       */
      onStartup?: (context: Reactory.Server.IReactoryContext) => Promise<void>;
      /**
       * If the component needs to be aware of the reactory
       * shutdown process then this function can be used to
       * provide a hook into the shutdown process.
       * @returns Promise<void>
       */
      onShutdown?: (context: Reactory.Server.IReactoryContext) => Promise<void>;
      /**
       * The roles that are allowed to access this component
       * if not provided the system will assume that the component
       * is public or that security is handled by the component, or
       * the containing component.
       */
      roles?: string[];
      /**
       * The component domain is a string that is used to identify
       * the domain of function for the component
       */
      domain?: string | ComponentDomain;
    }

    /**
     * Interface for Reactory component props
     */
    export interface IReactoryComponentProps {
      /**
       * We flag the reactory property
       * optional as the component could be autowired during registration
       */
      reactory: Client.IReactoryApi;
      [key: string]: unknown;
    }
  }
}