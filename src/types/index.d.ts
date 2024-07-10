/* eslint-disable no-unused-vars */
import { ObjectId } from "mongodb";
import Mongoose from "mongoose";
import { MimeType } from "chartjs-node-canvas";
import { Request, Application } from "express";
import core from "express-serve-static-core";
import fs from "fs";
import ExcelJS from "exceljs";
import EventEmitter from "eventemitter3";
import { Stream } from "stream";
import moment, { Moment } from "moment";
import { v4 as uuid } from "uuid";
import { GraphQLSchema } from "graphql";
import { Strategy } from "passport";
import classNames from "classnames";
import ObjectMapper from "object-mapper";
import HumanNumner from "human-number";
import HumanDate from "human-date";
import i18n from "i18next";
import {
  ApolloClient,
  ApolloQueryResult,
  Resolvers,
  gql,
  DocumentNode,
  NormalizedCacheObject,
  FetchResult,
} from "@apollo/client";

import * as ApolloCoreAlias from "@apollo/client";
import * as ApolloReactAlias from "@apollo/client/react";
import * as ApolloHOCAlias from "@apollo/client/react/hoc";
import * as ApolloReactHooksAlias from "@apollo/client/react/hooks";
import * as ApolloReactComponentsAlias from "@apollo/client/react/components";
import d3Alias from "d3";
import d3ArrayAlias from "d3-array";
import d3CloudAlias from "d3-cloud";
import d3ColorAlias from "d3-color";
import d3ForceAlias from "d3-force";
import d3DelaunayAlias from "d3-delaunay";

import Module from "module";
import * as ReactAlias from "react";
import { Container } from "inversify";
import * as Lodash from "lodash";
import * as MaterialCoreAlias from "@mui/material";
import * as MaterialLabsAlias from "@mui/lab";
import * as MaterialStylesAlias from "@mui/styles";
import * as MaterialIconsAlias from "@mui/icons-material";
import * as ReactRouterAlias from "react-router";
import * as ReactRouterDomAlias from "react-router-dom";
import i18next from "i18next";
import { FilledInputProps, InputProps, OutlinedInputProps } from "@mui/material";
import { ReadLine } from "readline";

/// <reference path="global.d.ts" />

export = Reactory;
export as namespace Reactory;

declare namespace Reactory {
  /**
   * We export React via the Reactory name space so that
   * we only have to use Reactory refereces when working with
   * functional components that are injected via plugins.
   */
  export type React = typeof ReactAlias;

  /**
   * A basic key value pair interface
   */
  export interface IKeyValuePair<K, V> {
    key: K;
    value: V;
  }

  /**
   * FQN is an alias for string, but we use it to
   * indicate that the string represented needs to adhere
   * to a fully qualified name for a reactory object.
   * @example "namespace.ComponentName@1.0.0"
   */
  export type FQN = string;

  /**
   * FQN Key Value Pair
   */
  export type FQNKVP<V> = IKeyValuePair<FQN, V>;

  export type REACTORY_CORE_ROLES = "DEVELOPER" | "ADMIN" | "USER" | "ANON";

  /**
   * A user role type, this is essentially a string
   * but we use {@link REACTORY_CORE_ROLES} to provide
   * a set of predefined roles that can be used.
   * 
   * The user role can also be a fully qualified name
   * that represents a role function that will be used
   * to determine if a user has access to a component.
   * 
   * @example "namespace.RoleName@1.0.0"
   * 
   * The function should return a boolean value that indicates 
   * if the user has access to the component or not.
   * 
   * @example
   * ```typescript
   * // Example of a role function for the ADMIN role on the reactory server
   * const hasRoleForComponent = (props: Reactory.Server.RoleCheckProps) => { 
   *  const { user } = props.context;
   *  return user.roles.includes('ADMIN');
   * }
   * ```
   * 
   * The role function should be registered with the reactory server
   * and then the fully qualified name can be used to provide access
   * control to component access on the server side.
   * 
   * A similar function can be used on the client side to provide access
   * control to components on client applications.
   * 
   * @example
   * ```typescript
   * // Example of a role function for the ADMIN role on the reactory client
   * const hasRoleForComponent = (props: Reactory.Client.RoleCheckProps) => {
   * const { user } = props.reactory;
   * return user.roles.includes('ADMIN');
   */
  export type USER_ROLE = string | REACTORY_CORE_ROLES | FQN;

  /**
   * A valid date type.
   */
  export type ValidDate = Date | Moment | number | string;

  /**
   * Transform an object from one shape to another.
   * 
   * @param sourceObject - The source object that is being transformed
   * @param sourceKey - The key of the source object
   * @param targetObject - The target object that is being transformed
   * @param targetKey - The key of the target object
   * 
   * @returns The transformed object
   * 
   * @example
   * 
   * ```typescript
   * const transform = (sourceObject, sourceKey, targetObject, targetKey) => {
   *  targetObject[targetKey] = sourceObject[sourceKey];
   *  return targetObject;
   * }
   */
  export type TransformFunction<TIN, TOUT> = (
    sourceObject: TIN,
    sourceKey: string,
    targetObject: TOUT,
    targetKey: string) => TOUT | Promise<TOUT>;
  /**
   * Object Transform object is used for fine grained control over an object data set.
   */
  export interface ObjectTransform<TIN, TOUT>{
    key: string;
    transform(): TransformFunction<TIN, TOUT>;
    transformFQN?: FQN;
    defaultFQN?: FQN;
    default(): TransformFunction<TIN, TOUT>;
  }


  /**
   * Object Map Entry is used to map a source object to a target object.
   * example:
   * 
   * ```typescript
   * {
   * key: "sourceKey",
   * transform: (sourceObject, sourceKey, targetObject, targetKey) => { }
   */
  export type ObjectMapEntry = string | ObjectTransform<unknown, unknown>;
  /**
   * Object Map Multi Target Entry is used to map a source object to multiple target objects.
   */
  export type ObjectMapMultiTargetEntry = ObjectMapEntry[];
  /**
   * Object Map is used to map a source object to a target object.
   */
  export type ObjectMap = IKeyValuePair<string, ObjectMapEntry | ObjectMapMultiTargetEntry>;

  /**
   * Object Mapper interface.
   *
   * The object mapper is responsible fot mapping one object to another.
   *
   * For more details about object mapper see https://www.npmjs.com/package/object-mapper
   */
  export type ObjectMapper = {
    merge<TSource, TResult>(source: TSource, map: ObjectMap): TResult;
    merge<TSource, TResult>(source: TSource, destination: TResult, map: ObjectMap): TResult;
  };

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
   * A feature type
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
   * Defines a model feature for a given model
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
   * Describes a activator keyword argument.
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
   * IReactoryComponentDefintion<T> is the interface definition for a reactory component
   * that is being registered within the reactory eco system.
   *
   * Generic Paramter T is the type of the component that is
   * being defined.
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
    activate?: (kwargs: { key: string; value: unknown }, 
      context?: Reactory.Server.IReactoryContext) => T;
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
   * Simple interface type that provides the reactory sdk as a property
   */
  export interface IReactoryComponentProps {
    /**
     * We flag the reactory property
     * optional as the component could be autowired during registration
     */
    reactory: Client.IReactoryApi;
    [key: string]: unknown;
  }

  export namespace Client {
    export namespace Models {
      export interface IUser
        extends Reactory.Models.IUserBio,
          Reactory.Models.IUserContact,
          Reactory.Models.IUserDemographics {
        id?: string;
      }

      export type ReactoryUser = Partial<IUser>;
    }

    export type AMQEventData = unknown | unknown[];
    export type AMQEventHandler = (data: AMQEventData) => void;
    export interface AsyncMessageQueue {
      $chan: (name: string) => IChannelDefinition<unknown>;
      $sub: {
        def: (eventId: string, func: AMQEventHandler, channel?: string) => void;
        transactions: (eventId: string, func: AMQEventHandler) => void;
        file: (eventId: string, func: AMQEventHandler) => void;
        data: (eventId: string, func: AMQEventHandler) => void;
        metrics: (eventId: string, func: AMQEventHandler) => void;
        formCommand: (eventId: string, func: AMQEventHandler) => void;
        workFlow: (eventId: string, func: AMQEventHandler) => void;
        messageHandlerLoaded: (eventId: string, func: AMQEventHandler) => void;
        pluginLoaded: (eventId: string, func: AMQEventHandler) => void;
      };
      $pub: {
        def: (eventId: string, data: unknown, channel?: string) => void;
        transactions: (eventId: string, data?: AMQEventData) => void;
        file: (eventId: string, data?: AMQEventData) => void;
        data: (eventId: string, data?: AMQEventData) => void;
        metrics: (eventId: string, data?: AMQEventData) => void;
        formCommand: (eventId: string, formData: AMQEventData) => void;
        workFlow: (eventId: string, data: AMQEventData) => void;
        messageHandlerLoaded: (eventId: string, data: AMQEventData) => void;
        pluginLoaded: (eventId: string, data: AMQEventData) => void;
      };
      onTransactionEvent: (eventId: string, func: AMQEventHandler) => void;
      onFileEvent: (eventId: string, func: AMQEventHandler) => void;
      onDataEvent: (eventId: string, func: AMQEventHandler) => void;
      onMetricEvent: (eventId: string, func: AMQEventHandler) => void;
      onFormCommandEvent: (eventId: string, func: AMQEventHandler) => void;
      onMessageHandlerLoaded: (eventId: string, func: AMQEventHandler) => void;
      onReactoryPluginLoaded: (eventId: string, func: AMQEventHandler) => void;
      onReactoryPluginEvent: (eventId: string, func: AMQEventHandler) => void;
      raiseTransactionEvent: (eventId: string, data?: AMQEventData) => void;
      raiseFileEvent: (eventId: string, data?: AMQEventData) => void;
      raiseDataEvent: (eventId: string, data?: AMQEventData) => void;
      raiseMetricEvent: (eventId: string, data?: AMQEventData) => void;
      raiseFormCommand: (eventId: string, formData: AMQEventData) => void;
      raiseWorkFlowEvent: (eventId: string, data: AMQEventData) => void;
      raiseMessageHandlerLoadedEvent: (eventId: string, data: AMQEventData) => void;
      raiseReactoryPluginEvent: (eventId: string, data: AMQEventData) => void;
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

    export type ValidComponent<P, S, SS> =
      | React.FC<P>
      | Function
      | React.ForwardRefExoticComponent<P>
      | React.ForwardRefRenderFunction<P, unknown>
      | React.MemoExoticComponent<React.FC<P>>
      | React.NamedExoticComponent<P>
      | React.ComponentClass<P, S>
      | React.Component<P, S, SS>
      | React.FunctionComponent<P>
      | React.PureComponent<P, S, SS>;

    export type AnyValidComponent = ValidComponent<unknown, unknown, unknown> | "() => JSX.Element";

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
      templateObject: <T>(item: unknown, props: unknown) => T;
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
      [key: string]: IReactoryComponentRegistryEntry<unknown>;
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
      $func: {
        [key: string]: (kwargs: unknown[]) => unknown | Promise<unknown>;
      };
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
      formSchemaLastFetch: moment.Moment;
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
      i18n: typeof i18next;

      // [key: string | symbol]: unknown;

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
        functionReference: (args: unknown | unknown[]) => unknown,
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
       * publish stats flushes statistic data associated with the user and
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
      loadComponent(
        Component: ValidComponent<unknown, unknown, unknown>,
        props: unknown,
        target: unknown,
      ): void;

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
      forms(): void;

      /**
       * Loads a form with a gven id
       * @param id
       * @param onFormUpdated
       */
      form(
        id: string,
        onFormUpdated?: (form: Forms.IReactoryForm, error?: Error) => void,
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
       * @param componentFqns
       */
      getComponents<T>(componentFqns: unknown[]): T;
      /**
       * Returns a component for the given key.
       * @param fqn
       */
      getComponent<T>(fqn: string): T;

      /**
       * Returns a slice of all the components that match the type
       * @param type
       */
      getComponentsByType(type: string): IReactoryComponentRegister;

      /**
       *
       * @param notFoundComponentFqn Returns a component to use a
       */
      getNotFoundComponent(notFoundComponentFqn: string): ValidComponent<unknown, unknown, unknown>;

      getNotAllowedComponent(
        notAllowedComponentFqn: string,
      ): ValidComponent<unknown, unknown, unknown>;

      mountComponent(
        ComponentToMount: ValidComponent<unknown, unknown, unknown>,
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
        callback: (args: unknown | unknown[]) => unknown,
      ): void;

      showModalWithComponent(
        title: string,
        ComponentToMount: ValidComponent<unknown, unknown, unknown>,
        props: unknown,
        modalProps: unknown,
        domNode: unknown,
        theme: unknown,
        callback: (args: unknown | unknown[]) => unknown,
      ): void;

      createElement(
        ComponentToCreate: ValidComponent<unknown, unknown, unknown>,
        props: unknown,
      ): unknown;

      unmountComponent(node: unknown): boolean;

      logout(refreshStatus: boolean): void;

      getLastValidation(): number | unknown;

      getTokenValidated(): boolean | unknown;

      getUser(): Reactory.Models.IApiStatus;

      saveUserLoginCredentials(provider: string, props: unknown): Promise<unknown>;

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

      validateToken(token: string): void;

      resetPassword(resetProps: ResetPasswordProps): Promise<unknown>;

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
      formSchemaLastFetch: moment.Moment;
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
      loadComponent(
        Component: ValidComponent<unknown, unknown, unknown>,
        props: unknown,
        target: unknown,
      ): void;
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
      getComponents<T>(componentFqns: unknown[]): T;
      getComponent<T>(fqn: string): T;
      getComponentsByType(type: string): IReactoryComponentRegister;
      getNotFoundComponent(notFoundComponentFqn: string): ValidComponent<unknown, unknown, unknown>;
      getNotAllowedComponent(
        notAllowedComponentFqn: string,
      ): ValidComponent<unknown, unknown, unknown>;
      mountComponent(
        ComponentToMount: ValidComponent<unknown, unknown, unknown>,
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
        ComponentToMount: ValidComponent<unknown, unknown, unknown>,
        props: unknown,
        modalProps: unknown,
        domNode: unknown,
        theme: unknown,
        callback: (args: unknown) => unknown,
      ): void;
      createElement(
        ComponentToCreate: ValidComponent<unknown, unknown, unknown>,
        props: unknown,
      ): unknown;
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

    /**
     * The ReactoryFormComponent properties.
     */
    export interface IReactoryFormProps {
      ref?: (formRef: unknown) => void;
      uiSchemaKey?: string;
      uiSchemaId?: string;
      data?: unknown | unknown[];
      formData?: unknown | unknown[];
      formDef?: Reactory.Forms.IReactoryForm;
      formId?: string;
      helpTopics?: string[];
      helpTitle?: string;
      uiFramework?: string;
      mode?: string | "view" | "edit" | "new";
      formContext?: Partial<IReactoryFormContext<unknown>>;
      extendSchema?: (args: unknown | unknown[]) => Reactory.Forms.IReactoryForm;
      busy?: boolean;
      events?: {
        [key: string]: (args: unknown | unknown[]) => unknown;
      };
      query?: {
        [key: string]: unknown;
      };
      onChange?: (...args: unknown[]) => void | boolean;
      onSubmit?: (...args: unknown[]) => void | boolean;
      onError?: (...args: unknown[]) => void;
      onCommand?: (...args: unknown[]) => unknown;
      onMutateComplete?: (...args: unknown[]) => unknown;
      onQueryComplete?: (...args: unknown[]) => unknown;
      before?: React.Component | React.ReactNode | React.ReactNodeArray;
      children?: React.ReactNode | React.ReactNodeArray;
      $route?: unknown;
      $App?: unknown;
      validate?: (...args: unknown[]) => unknown;
      transformErrors?: (...args: unknown[]) => unknown;
      autoQueryDisabled?: boolean;
      routePrefix?: string;
      refCallback?: (formReference: unknown) => void;
      queryOnFormDataChange?: boolean;
      onBeforeMutation?: (...args: unknown[]) => void | boolean;
      onBeforeQuery?: (...args: unknown[]) => void | boolean;
      componentType?: string | "form" | "widget";
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
      onChange: (newFormData: T, errorSchema: IWidgetErrorSchema) => void;
      [key: string]: unknown;
    }

    export interface IReactoryClientRoute {
      path: string;
      caseSensitive?: boolean;
      key: React.Key;
      element: () => JSX.Element;
    }

    export namespace Web {
      export type d3 = typeof d3Alias;
      export type d3Array = typeof d3ArrayAlias;
      export type d3Cloud = typeof d3CloudAlias;
      export type d3Color = typeof d3ColorAlias;
      export type d3Force = typeof d3ForceAlias;
      export type d3Delaunay = typeof d3DelaunayAlias;
      
      export interface D3Package {
        d3: d3;
        d3Array: d3Array;
        d3Cloud: d3Cloud;
        d3Color: d3Color;
        d3Force: d3Force;
        d3Delaunay: d3Delaunay;
      }

      export type MaterialCore = typeof MaterialCoreAlias;
      export type MaterialStyles = typeof MaterialStylesAlias;
      export type MaterialLabs = typeof MaterialLabsAlias;
      export type MaterialIcons = typeof MaterialIconsAlias;
      

      export interface IMaterialModule {
        MaterialCore: MaterialCore;
        MaterialStyles: MaterialStyles;
        MaterialLabs: MaterialLabs;
        MaterialIcons: MaterialIcons;
      }
    }

    export namespace Components {
      export interface StaticContentProps {
        slug: string;
        editRoles?: string[];
        defaultValue?: JSX.Element;
        [key: string]: unknown;
      }

      type StaticContentWidget = (props: StaticContentProps) => JSX.Element;

      export interface IDropDownMenuItem {
        id?: string;
        key?: string;
        title?: string;
        icon?: string;
      }

      export interface DropDownMenuProps {
        menus: IDropDownMenuItem[];
        onSelect: (evt: React.SyntheticEvent, menu: IDropDownMenuItem) => void;
      }

      export type DropDownMenu = (props: DropDownMenuProps) => JSX.Element;

      export interface FullScreenModalProps {
        onClose: () => void;
        title: string;
        children: unknown;
        open: boolean;
        [key: string]: unknown;
      }

      export type FullScreenModal = (props: FullScreenModalProps) => JSX.Element;
      export interface TAny {
        id?: string;
        [key: string]: unknown;
      }

      export type MaterialListItemStyleFunction = (
        item: TAny,
        formContext: Reactory.Client.IReactoryFormContext<TAny>,
        index: number,
        items: TAny[],
      ) => StyleSheet;
      export type MaterialListItemObjectValueProvider = (
        item: TAny,
        formContext: Reactory.Client.IReactoryFormContext<TAny>,
        index: number,
        items: TAny[],
      ) => unknown;
      export type MaterialListItemStringValueProvider = (
        item: TAny,
        formContext: Reactory.Client.IReactoryFormContext<TAny>,
        index: number,
        items: TAny[],
      ) => string;
      export interface IMaterialListWidgetOptions {
        /**
         * String field template to use for primary text
         */
        primaryText?: string | MaterialListItemStringValueProvider;
        /**
         * String field template for secondary text
         */
        secondaryText?: string | MaterialListItemStringValueProvider;
        /**
         * String field template for avatar
         */
        avatar?: string | MaterialListItemStringValueProvider;

        /**
         * String field template for the avatar alt
         */
        avatarAlt?: string | MaterialListItemStringValueProvider;
        /**
         * position of the avatar
         */
        avatarPosition?: string | "right" | "left";
        /**
         * avatar source field. Use this field to specify which property
         * should be used on the item as the source for the avatar
         */
        avatarSrcField?: string | MaterialListItemStringValueProvider;

        /**
         * The alt field name or provider function
         */
        avatarAltField?: string | MaterialListItemStringValueProvider;
        /**
         * Dropdown field / action button for the list item
         */
        dropdown?: string | MaterialListItemStringValueProvider;
        /**
         * Boolean to indicate if the list data must be
         * fetched by the component
         */
        remoteData?: boolean;
        /**
         * variable map to use for the input
         */
        variables?: object;
        /**
         * Result map to use when converting the data
         */
        resultMap?: object;
        /**
         * Key to use for to extract the array from the result
         */
        resultKey?: string;
        /**
         * Properties to pass to the List object
         */
        listProps?: unknown;
        /**
         * The name of the query on the graphql definition
         */
        query?: string;
        /**
         * Pagination settings for the list item
         */
        pagination?: {
          /**
           * Page size
           */
          pageSize?: number;
          /**
           * the variant will determine how the paging is managed
           */
          variant?: string | "page" | "infinte";
          /**
           * The result key to use for extracting the pagination field
           */
          resultKey?: string;
          /**
           * Object map for mapping the result
           */
          resultMap?: ObjectMap;
        };
        /**
         * The icon property
         */
        icon?: string | MaterialListItemStringValueProvider;
        /**
         * Icon classname
         */
        iconClassname?: string | MaterialListItemStringValueProvider;
        /**
         * The field name on the item to be referenced for the icon
         */
        iconField?: string | MaterialListItemStringValueProvider;
        /**
         * a map that is used to map the value in the item field
         * to an icon
         */
        iconFieldMap?: {
          [key: string]: string | MaterialListItemStringValueProvider;
        };
        /**
         * Stylesheet for the icon formatting
         */
        iconStyle?: StyleSheet | MaterialListItemStyleFunction;
        /**
         * Position of icon
         */
        iconPosition?: string | "left" | "right";
        /**
         * unknown custom jss we want to use when creating the list item
         */
        jss?: unknown;
        /**
         * A custom component that we may want to use for the item instead of the default
         * list item.
         */
        listItemsComponent?: string;

        /**
         * Secondary Action options.
         *
         * The secondary action item can be rendered with a default interpretation.
         * Properties that apply to the default renderer
         * * label
         * * iconKey
         * * link
         * The secondary action can also be bound to a custom component
         */
        secondaryAction?: {
          /**
           * A label for the secondary action component.
           */
          label?: string | MaterialListItemStringValueProvider;
          /**
           * The icon key that will be used for
           */
          iconKey?: string | MaterialListItemStringValueProvider;
          /**
           * The component fqn that gets bound to the object
           */
          componentFqn?: string | MaterialListItemStringValueProvider;
          /**
           *
           */
          component?: MaterialListItemObjectValueProvider;
          action?: string | MaterialListItemStringValueProvider;
          actionData?: unknown | MaterialListItemObjectValueProvider;
          link?: string | MaterialListItemStringValueProvider;
          props?: unknown;
          propsMap?: unknown;
        };
        [key: string]: unknown;
      }

      export type MaterialTableWidgetColumnDefinition = {
        /**
         * Field title
         */
        title: string;
        /**
         * The field / property name on the data set
         */
        field: string;
        /**
         * A component to bind to the column
         */
        component?: string;
        /**
         * Array of components to bind
         */
        components?: { 
          component: string,
          props?: { 
            [key: string]: unknown;
          },
          propsMap?: ObjectMap;
         }[];
        /**
         * An array of components to bind to the column
         */
        propsMap?: unknown;
        /**
         *
         */
        props?: {
          actionButton?: {
            icon?: string;
            color?: string;
            size?: string | "small" | "medium" | "large";
            variant?: string | "text" | "outlined" | "contained";
            text?: string;
          };
          [key: string]: unknown;
        };
        /**
         *
         */
        sort?: boolean;
        /**
         *
         */
        total?: boolean;

        /**
         *
         */
        breakpoint?: string;

        aggregator?: (column: MaterialTableWidgetColumnDefinition, data: unknown[]) => unknown;
        [key: string]: unknown;
      };

      export interface IMaterialTableWidgetActionEvent {
        via?: string | "form" | "amq" | "component";
        /**
         * name of the event
         */
        name?: string;
        /**
         * Parameters to pass to the event
         */
        params?: {
          [key: string]: unknown;
        }
        /**
         * object map to use when mapping properties
         */
        paramsMap?: ObjectMap;
        /**
         * when the via is set to component
         * the event that is raised
         **/
        component?: string;

        [key: string]: unknown;
      }

      export interface IMaterialTableConfirmationDialogProps {
        key: string;

        icon?: string;
        iconProps?: {
          style?: React.CSSProperties;
          [key: string]: unknown;
        };

        title: string;
        titleProps?: {
          style?: React.CSSProperties;
          [key: string]: unknown;
        };

        content: string;
        contentProps?: {
          style?: React.CSSProperties;
          [key: string]: unknown;
        };

        acceptTitle: string;
        confirmProps?: {
          variant: string;
          style?: React.CSSProperties;
          [key: string]: unknown;
        };

        cancelTitle: string;
        cancelProps?: {
          variant: string;
          style?: React.CSSProperties;
          [key: string]: unknown;
        };

        /**
         * Mutation to execute
         */
        mutation?: string;
        /**
         * variable map to use for mapping
         * properties to mutation params.
         */
        variables?: unknown;
        /**
         * The result map to use (will se the default on associated with )
         */
        resultMap?: unknown;

        /**
         * The action to execute on completion
         */
        resultAction?: string | "refresh";
      }

      /**
       * Row action
       */
      export interface IMaterialTableWidgetAction {
        /**
         * The title to display
         */
        title?: string;
        /**
         * icon to use for row action
         */
        icon?: string;
        /**
         * the tooltip to display
         */
        tooltip?: string;
        /**
         * if a free action the action will display in the toolbar
         */
        isFreeAction?: boolean;
        /**
         * the key for the action
         */
        key: string;
        /**
         * Material Table Widget Action
         */
        event?: IMaterialTableWidgetActionEvent;

        /**
         * When defined it will render the component
         */
        componentFqn?: string;

        /**
         * The property map to use for the component
         */
        propsMap?: unknown;

        /**
         * The name of the mutation to invoke.
         */
        mutation?: string;

        /**
         * The confirmation dialog properties
         */
        confirmation?: IMaterialTableConfirmationDialogProps;

        [key: string]: unknown;
      }

      /**
       * Options interface for the Reactory Material Table Widget
       *
       */
      export interface IMaterialTableWidgetOptions {
        /**
         * If set to showLabel is set to false
         */
        showLabel?: boolean;
        /**
         * Allow Add. When set to true, the table will provide an add interface for the grid.
         */
        allowAdd?: boolean;

        /**
         * Allow delete. When set to true the table will provide
         * interfcae for the deleting of records.
         */
        allowDelete?: boolean;

        /**
         * Delete button properties
         */
        deleteButtonProps?: {
          icon?: string;
          tooltip?: string;
          color?: string;
          onClick?: string;
          onClickPropsMap?: unknown;
          onClickProps?: unknown;
          [key: string]: unknown;
        };

        /**
         * Add button properies
         */
        addButtonProps?: {
          icon?: string;
          tooltip?: string;
          color?: string;
          onClick?: string;
          onClickPropsMap?: unknown;
          onClickProps?: unknown;
          [key: string]: unknown;
        };

        /**
         * Column definition
         */
        columns: MaterialTableWidgetColumnDefinition[];
        /**
         * Is the data provided via remote query
         */
        remoteData?: boolean;
        /**
         * query name
         */
        query?: string;
        /**
         * localization options
         */
        localization?: unknown;

        /**
         * Refresh Events
         */
        refreshEvents?: { name: string }[];

        /**
         * The options for the the table interface
         */
        options?: {
          /**
           * Enables or disables grouping
           */
          grouping?: boolean;
          /**
           * Group by fields
           */
          groupBy?: string[];

          /**
           * Enable search in toolbar
           */
          search?: boolean;
          /**
           * Show title in field
           */
          showTitle?: boolean;
          /**
           * Show or hide toolbar
           */
          toolbar?: boolean;
          /**
           * Enable or disable selection
           */
          selection?: boolean;
          /**
           * Page size
           */
          pageSize?: number;
          /**
           * Page size options
           */
          pageSizeOptions?: number[];
          /**
           * allow ordering
           */
          allowOrder?: boolean;
          /**
           * The field that we want to use for ordering the result
           */
          orderField?: string;
          /**
           * Allow Sort
           */
          sortFields?: { field: string; direction?: "asc" | "desc" }[];

          [key: string]: unknown;
        };
        /**
         * The component map
         */
        componentMap?: {
          DetailsPanel?: string;
          Toolbar?: string;
        };
        actions?: IMaterialTableWidgetAction[];
        /**
         * Toolbar static props
         */
        toolbarProps?: {
          [key: string]: unknown;
        };
        /**
         * Toolbar property map
         */
        toolbarPropsMap?: {
          [key: string]: unknown;
        };
        /**
         * Where to place the toolbar
         */
        toolbarPosition?: string | "none" | "top" | "bottom";
        /**
         *
         */
        detailPanelPropsMap?: ObjectMap;
        /**
         * Static properties to pass to the detail panel
         */
        detailPanelProps?: {
          [key: string]: unknown;
        };
        /**
         *
         */
        resultMap?: ObjectMap;
        resultType?: string | "array" | "object";
        resultKey?: string;
        variables: ObjectMap;

        columnsProperty?: string

        columnsPropertyMap?: ObjectMap;

        headerStyle: {
          [key: string]: unknown;
        }

        rowStyle: {
          [key: string]: unknown;
        }

        selectedRowStyle: {
          [key: string]: unknown;
        }

        altRowStyle: {
          [key: string]: unknown;
        }

        conditionalRowStyling: {
          field: string;
          condition: string;
          style: {
            [key: string]: unknown;
          }
        }[]
        /**
         *
         */
        [key: string]: unknown;
      }

      export interface IAutoCompleteDropDownUIProps {
        multiSelect: boolean;
        onChangePropsMap: ObjectMap;
        nullValue: any;
        filterSelectedOptions: boolean;
        keyField: string;
        labelField: string;
        matchField: string;
        displayField: string;
        title: string;
      }

      export interface IAutoCompleteDropDownUISchema extends Reactory.Schema.IUISchema {
        "ui:options"?: IAutoCompleteDropDownUIProps;
      }

      export type SupportTicket = (props: {
        reference: string;
        mode: "view" | "edit" | "new";
      }) => JSX.Element;

      /**
       * ReactoryForm component type alias.
       */
      export type ReactoryForm = React.FunctionComponent<Reactory.Client.IReactoryFormProps>;

      /**
       *
       */
      export interface IDateWidgetUISchema extends Reactory.Schema.IUISchema {
        "ui:options"?: {
          InputProps?:
            | Partial<InputProps>
            | Partial<FilledInputProps>
            | Partial<OutlinedInputProps>;
          /**
           * the format for the date string
           */
          format?: string;
          /**
           * controls whether or not the field renders fullwidth, the default is set to true
           */
          fullWidth?: boolean;
          /**
           * Input mask for the date
           */
          mask?: string;
        };
      }

      /**
       * Represents a valid
       */
      export type WiredDateWidgetProps = Reactory.Client.IReactoryWidgetProps<
        ValidDate,
        unknown,
        IDateWidgetUISchema
      >;
    }

    export namespace ReactNative {}

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

  export namespace Excel {
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
      icon?: string;
      exportOptions?: unknown | IExcelExportOptions;
      disabled?: string;
    }
  }

  /**
   * The data namespace provides all Data related types and interfaces.
   * This includes generic SQL types that are used in generated interfaces
   */
  export namespace Data {
    export enum Operator {
      EQ = " == ",
      GT = " > ",
      GTEQ = " >= ",
      LT = " < ",
      LTEQ = " <= ",
      BETWEEN = " BETWEEN ",
      LIKE = " LIKE ",
      IN = " IN ",
    }

    export type SortDirection = "asc" | "ascending" | "desc" | "descending";

    export interface SQLColumn {
      field: string;
      type: string;
      title: string;
      widget: string;
    }

    export interface SQLFilter {
      field: string;
      value: unknown;
      operator: Operator;
    }

    export interface SQLContext {
      schema?: string;
      table?: string;
      commandText?: string;
      provider?: string;
      connectionId: string;
    }

    export interface SQLFilter {
      field: string;
      value: unknown;
      operator: Operator;
    }

    export interface PagingRequest {
      page: number;
      pageSize: number;
    }

    export interface PagingResult {
      total: number;
      page: number;
      hasNext: boolean;
      pageSize: number;
    }

    export interface SQLQueryResult {
      paging: PagingResult;
      columns: SQLColumn[];
      filters: SQLFilter[];
      context: SQLContext;
      data: unknown | unknown[];
    }

    export interface SQLInsertResult {
      columns: SQLColumn[];
      success: boolean;
      recordsAffected: number;
    }

    export interface SQLUpdateResult {
      success: boolean;
      recordsAffected: number;
    }

    export interface SQLDeleteResult {
      success: boolean;
      recordsAffected: number;
    }

    export interface SQLQuery {
      paging?: PagingRequest;
      columns?: SQLColumn[];
      filters?: SQLFilter[];
      context: SQLContext;
    }

    export interface SQLInsert {
      columns: SQLColumn[];
      values: unknown[];
      context: SQLContext;
    }

    export interface SQLUpdate {
      columns: SQLColumn[];
      values: unknown[];
      context: SQLContext;
    }

    export interface SQLDelete {
      filter: SQLFilter[];
      context: SQLContext;
    }

    export interface SQLParam {
      name: string;
      type: string;
      value: unknown;
    }

    export interface SQLProcedure {
      name: string;
      parameters: SQLParam[];
    }

    export interface QueryStringResultWithCount {
      query: string;
      count: number;
    }

    export interface QueryStringGenerator {
      fromQuery(queryCommand: SQLQuery): Promise<QueryStringResultWithCount>;
      fromInsert(insertCommand: SQLInsert): string;
      fromUpdate(updateCommand: SQLUpdate): string;
      fromDelete(deleteCommand: SQLDelete): string;
    }

    export interface IReactoryDatabase {
      Create: {
        [key: string]: (
          insertCommand: unknown | SQLInsert,
          request_context: Reactory.Server.IReactoryContext,
        ) => Promise<unknown>;
      };
      Read: {
        [key: string]: (
          queryCommand: unknown | SQLQuery,
          request_context: Reactory.Server.IReactoryContext,
        ) => Promise<unknown>;
      };
      Update: {
        [key: string]: SQLUpdate;
      };
      Delete: {
        [key: string]: SQLDelete;
      };
      StoredProcedures: {
        [key: string]: SQLProcedure;
      };
      Install?: {
        [key: string]: (context: Reactory.Server.IReactoryContext) => Promise<unknown>;
      };
    }

    /**
     * A generic paged data response
     */
    export type PagedDataResponse<TData, TQuery> = {
      /**
       * The paging information
       */
      paging: PagingResult;
      /**
       * The columns or fields of the data to use for sorting
       */
      sort: string[];
      /**
       * The sort direction for each column / field
       */
      sortDirection: SortDirection[];
      /**
       * The query that was used to retrieve the data
       */
      query: TQuery;
      /**
       * The data that was retrieved
       */
      data: TData[];
    };
  }

  export namespace Forms {
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
      fields?: {
        ArrayField: Reactory.Client.AnyValidComponent;
        BooleanField: Reactory.Client.AnyValidComponent;
        DescriptionField: Reactory.Client.AnyValidComponent;
        NumberField: Reactory.Client.AnyValidComponent;
        ObjectField: Reactory.Client.AnyValidComponent;
        SchemaField: Reactory.Client.AnyValidComponent;
        StringField: Reactory.Client.AnyValidComponent;
        TitleField: Reactory.Client.AnyValidComponent;
        GridLayout: Reactory.Client.AnyValidComponent;
        TabbedLayout: Reactory.Client.AnyValidComponent;
        UnsupportedField: Reactory.Client.AnyValidComponent;
        [key: string]: Reactory.Client.AnyValidComponent;
      };
      /**
       * A property containing custom widgets
       */
      widgets?: {
        [key: string]: Reactory.Client.AnyValidComponent;
      };
      /**
       * A property for field templates.
       */
      templates?: {
        ArrayFieldTemplate: Reactory.Client.AnyValidComponent;
        DateFieldTemplate: Reactory.Client.AnyValidComponent;
        FieldTemplate: Reactory.Client.AnyValidComponent;
        FormErrorList: Reactory.Client.AnyValidComponent;
        ObjectTemplate: Reactory.Client.AnyValidComponent;
        [key: string]: Reactory.Client.AnyValidComponent;
      };
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
    export type ReactoryFormActionHandlerType = "redirect" | "notification" | "function" | "refresh" | "none" | "component";

    export interface IReactoryFormQueryErrorHandlerDefinition {
      /**
       * The method to use when an error occurs.
       */
      onErrorMethod: ReactoryFormActionHandlerType;
      /**
       * The component fqn to use when the onErrorMethod is set to component or function
       * */
      componentRef?: string;
      /**
       * 
       */
      method: string;
    }

    /**
     * Defines the interface construct for a graph form result handler.
     * The handler properties are used by the reactory form engine to 
     * determine the appropriate action on completion of a graph query or mutation.
     */
    export interface IReactoryFormGraphResultHandler {
      /**
       * Indicates which method to use once the graph query or mutation has been executed.
       */
      onSuccessMethod?: ReactoryFormActionHandlerType;
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
      onSuccessMethod?: ReactoryFormActionHandlerType;
      
      /**
       * Response handlers key names should match the typename of the 
       * response data. i.e. if your graph type name is "Foo" then the
       * response handler key should be "Foo". This is used to map results for
       * queries or mutaions that have union types.
       */
      responseHandlers?: {
        [key: string]: IReactoryFormGraphResultHandler;
      }
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
      method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
      /**
       * Options to pass to the rest call
       */
      options: {
        /**
         * 
         */
        headers?: any;
        body?: any;
        [key: string]: any
      },
      optionsProvider: FQN;
      /**
       * The URL for the rest call. Can be a template string.
       * 
       * i.e. 
       * 
       * ${process.env.SOME_API_URL}/v1/customer/${formContext.queryObject.user_id}
       */
      url: string
    }

    /**
     * Interface for REST Definitions.
     */
    export interface IFormRESTDefinition {
      default?: string,
      queries?: { 
        [key: string]: IReactoryFormRESTCall,
      },
      mutations?: {
        [key: string]: IReactoryFormRESTCall,
      }
    }

    export interface IReactoryGRPCCall {

    }

    
    export interface IFormGrpcDefinition {

    }

    export interface IWidgetMap {
      component?: string | unknown;
      componentFqn: string;
      widget: string;
    }

    export interface IFieldMap {
      component: string | unknown;
      componentFqn: string;
      field: string;
    }

    export interface IObjectMap {
      [key: string]: string | Array<unknown> | object;
    }

    export interface IUISchemaMenuItem {
      id: string;
      title: string;
      key: string;
      description: string;
      icon: string;
      uiSchema: Schema.IFormUISchema;
      //used to override the graphql definitions for that view type
      graphql?: IFormGraphDefinition;
      modes?: string;
      sizes?: string[];
      minWidth?: number;
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

    /**
     *
     */
    export interface IUISchemaMenuItem {
      id: string;
      title: string;
      key: string;
      description: string;
      icon: string;
      uiSchema: Schema.IFormUISchema;
      //used to override the graphql definitions for that view type
      graphql?: IFormGraphDefinition;
      modes?: string;
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
    }

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

    /**
     * The main interface for the data structure that represents the Reactory Form.
     * Most properties are optional as the form only requires a schema and a few other basic
     * properties in order to run as a reactory form / component.
     */
    export interface IReactoryForm
      extends IReactoryFormBase,
        IReactoryFormArgs,
        IReactoryFormSchemas,
        IReactoryFormRuntime {
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
       * TODO: investigate use of the workflow
       */
      workflow?: unknown;
      /**
       * boolean property for indicating Html5 validation
       */
      noHtml5Validate?: boolean;
      /**
       * A form context data / properties that should be injected
       */
      formContext?: unknown;
      /**
       * fields for the form - TODO: investigate structure and use.
       */
      fields?: unknown;
      /**
       * Widgets for the form - TODO: investigate structure and use.
       */
      widgets?: unknown;
      /**
       *
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
    export type ReactoryFormGeneratorFunction<TOptions> = (options: TOptions) => Promise<IReactoryForm[]>;

    /**
     * ReactoryFormGeneratorFunctionSync is a function that will generate an array of forms
     */
    export type ReactoryFormGeneratorFunctionSync<TOptions> = (options: TOptions) => IReactoryForm[];

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
    
    export type TFormGeneratorProps<TOptions> = Reactory.Service.IReactoryServiceProps & IReactoryFormGeneratorConfig<TOptions>

    export class ReactoryFormGeneratorService<TFormGeneratorProps, 
      TContext> extends 
      Reactory.Service.ReactoryService<TFormGeneratorProps, TContext> {             
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
      }
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
      }
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
  }

  export namespace Graph {
    export type ReactoryResolverAsync = (
      parent: unknown,
      params: unknown,
      context: Reactory.Server.IReactoryContext,
      info: unknown,
    ) => Promise<unknown>;
    export type ReactoryResolverSync = (
      parent: unknown,
      params: unknown,
      context: Reactory.Server.IReactoryContext,
      info: unknown,
    ) => unknown;

    export type ReactoryResolverObject = {
      [key: symbol]: ReactoryResolverAsync | ReactoryResolverAsync;
    };

    export interface IGraphShape {
      [key: symbol]: ReactoryResolverAsync | ReactoryResolverObject;
      Query?: {
        [key: symbol]: (
          parent: unknown,
          params: unknown,
          context: Reactory.Server.IReactoryContext,
          info: unknown,
        ) => Promise<unknown>;
      };
      Mutation?: {
        [key: symbol]: (
          parent: unknown,
          params: unknown,
          context: Reactory.Server.IReactoryContext,
          info: unknown,
        ) => Promise<unknown>;
      };
      Subscription?: {
        [key: symbol]: (
          parent: unknown,
          params: unknown,
          context: Reactory.Server.IReactoryContext,
          info: unknown,
        ) => Promise<unknown>;
      };
    }

    /**
     * Defines an interface type for the GraphDirective Provider
     */
    export interface IGraphDirectiveProvider {
      /**
       * The directive name
       */
      name: string;
      /**
       * The transform that will transform the schema
       */
      transformer: (schema: GraphQLSchema) => GraphQLSchema;
    }

    export interface IGraphDefinitions {
      Resolvers: IGraphShape;
      Types: string[];
      Directives?: IGraphDirectiveProvider[];
    }

    export interface IResolverStruct {
      Query?: Resolvers;
      Mutation?: Resolvers;
      [key: symbol]: Resolvers;
    }

    export interface IReactoryResolver {
      resolver?: IGraphShape;
    }

    export interface IApolloPackage {
      core: typeof ApolloCoreAlias;
      components: typeof ApolloReactComponentsAlias;
      react: typeof ApolloReactAlias;
      hoc: typeof ApolloHOCAlias;
      hooks: typeof ApolloReactHooksAlias;
    }
  }

  export namespace I18n {
    /**
     * ISO 639-1 language codes with country names.
     */
    export enum Languages {
      aa = "aa", // Afar
      ab = "ab", // Abkhazian
      ae = "ae", // Avestan
      af = "af", // Afrikaans
      ak = "ak", // Akan
      am = "am", // Amharic
      an = "an", // Aragonese
      ar = "ar", // Arabic
      as = "as", // Assamese
      av = "av", // Avaric
      ay = "ay", // Aymara
      az = "az", // Azerbaijani
      ba = "ba", // Bashkir
      be = "be", // Belarusian
      bg = "bg", // Bulgarian
      bh = "bh", // Bihari languages
      bi = "bi", // Bislama
      bm = "bm", // Bambara
      bn = "bn", // Bengali
      bo = "bo", // Tibetan
      br = "br", // Breton
      bs = "bs", // Bosnian
      ca = "ca", // Catalan; Valencian
      ce = "ce", // Chechen
      ch = "ch", // Chamorro
      co = "co", // Corsican
      cr = "cr", // Cree
      cs = "cs", // Czech
      cu = "cu", // Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic
      cv = "cv", // Chuvash
      cy = "cy", // Welsh
      da = "da", // Danish
      de = "de", // German
      dv = "dv", // Divehi; Dhivehi; Maldivian
      dz = "dz", // Dzongkha
      ee = "ee", // Ewe
      el = "el", // Greek, Modern (1453-)
      en = "en", // English
      eo = "eo", // Esperanto
      es = "es", // Spanish; Castilian
      et = "et", // Estonian
      eu = "eu", // Basque
      fa = "fa", // Persian
      ff = "ff", // Fulah
      fi = "fi", // Finnish
      fj = "fj", // Fijian
      fo = "fo", // Faroese
      fr = "fr", // French
      fy = "fy", // Western Frisian
      ga = "ga", // Irish
      gd = "gd", // Gaelic; Scottish Gaelic
      gl = "gl", // Galician
      gn = "gn", // Guarani
      gu = "gu", // Gujarati
      gv = "gv", // Manx
      ha = "ha", // Hausa
      he = "he", // Hebrew
      hi = "hi", // Hindi
      ho = "ho", // Hiri Motu
      hr = "hr", // Croatian
      ht = "ht", // Haitian; Haitian Creole
      hu = "hu", // Hungarian
      hy = "hy", // Armenian
      hz = "hz", // Herero
      ia = "ia", // Interlingua (International Auxiliary Language Association)
      id = "id", // Indonesian
      ie = "ie", // Interlingue; Occidental
      ig = "ig", // Igbo
      ii = "ii", // Sichuan Yi; Nuosu
      ik = "ik", // Inupiaq
      io = "io", // Ido
      is = "is", // Icelandic
      it = "it", // Italian
      iu = "iu", // Inuktitut
      ja = "ja", // Japanese
      jv = "jv", // Javanese
      ka = "ka", // Georgian
      kg = "kg", // Kongo
      ki = "ki", // Kikuyu; Gikuyu
      kj = "kj", // Kuanyama; Kwanyama
      kk = "kk", // Kazakh
      kl = "kl", // Kalaallisut; Greenlandic
      km = "km", // Central Khmer
      kn = "kn", // Kannada
      ko = "ko", // Korean
      kr = "kr", // Kanuri
      ks = "ks", // Kashmiri
      ku = "ku", // Kurdish
      kv = "kv", // Komi
      kw = "kw", // Cornish
      ky = "ky", // Kirghiz; Kyrgyz
      la = "la", // Latin
      lb = "lb", // Luxembourgish; Letzeburgesch
      lg = "lg", // Ganda
      li = "li", // Limburgan; Limburger; Limburgish
      ln = "ln", // Lingala
      lo = "lo", // Lao
      lt = "lt", // Lithuanian
      lu = "lu", // Luba-Katanga
      lv = "lv", // Latvian
      mg = "mg", // Malagasy
      mh = "mh", // Marshallese
      mi = "mi", // Maori
      mk = "mk", // Macedonian
      ml = "ml", // Malayalam
      mn = "mn", // Mongolian
      mr = "mr", // Marathi
      ms = "ms", // Malay
      mt = "mt", // Maltese
      my = "my", // Burmese
      na = "na", // Nauru
      nb = "nb", // Bokmål, Norwegian; Norwegian Bokmål
      nd = "nd", // Ndebele, North; North Ndebele
      ne = "ne", // Nepali
      ng = "ng", // Ndonga
      nl = "nl", // Dutch; Flemish
      nn = "nn", // Norwegian Nynorsk; Nynorsk, Norwegian
      no = "no", // Norwegian
      nr = "nr", // Ndebele, South; South Ndebele
      nv = "nv", // Navajo; Navaho
      ny = "ny", // Chichewa; Chewa; Nyanja
      oc = "oc", // Occitan (post 1500)
      oj = "oj", // Ojibwa
      om = "om", // Oromo
      or = "or", // Oriya
      os = "os", // Ossetian; Osset
      pa = "pa", // Panjabi; Punjabi
      pi = "pi", // Pali
      pl = "pl", // Polish
      ps = "ps", // Pushto; Pashto
      pt = "pt", // Portuguese
      qu = "qu", // Quechua
      rm = "rm", // Romansh
      rn = "rn", // Rundi
      ro = "ro", // Romanian; Moldavian; Moldovan
      ru = "ru", // Russian
      rw = "rw", // Kinyarwanda
      sa = "sa", // Sanskrit
      sc = "sc", // Sardinian
      sd = "sd", // Sindhi
      se = "se", // Northern Sami
      sg = "sg", // Sango
      si = "si", // Sinhala; Sinhalese
      sk = "sk", // Slovak
      sl = "sl", // Slovenian
      sm = "sm", // Samoan
      sn = "sn", // Shona
      so = "so", // Somali
      sq = "sq", // Albanian
      sr = "sr", // Serbian
      ss = "ss", // Swati
      st = "st", // Southern Sotho
      su = "su", // Sundanese
      sv = "sv", // Swedish
      sw = "sw", // Swahili
      ta = "ta", // Tamil
      te = "te", // Telugu
      tg = "tg", // Tajik
      th = "th", // Thai
      ti = "ti", // Tigrinya
      tk = "tk", // Turkmen
      tl = "tl", // Tagalog
      tn = "tn", // Tswana
      to = "to", // Tonga (Tonga Islands)
      tr = "tr", // Turkish
      ts = "ts", // Tsonga
      tt = "tt", // Tatar
      tw = "tw", // Twi
      ty = "ty", // Tahitian
      ug = "ug", // Uighur; Uyghur
      uk = "uk", // Ukrainian
      ur = "ur", // Urdu
      uz = "uz", // Uzbek
      ve = "ve", // Venda
      vi = "vi", // Vietnamese
      vo = "vo", // Volapük
      wa = "wa", // Walloon
      wo = "wo", // Wolof
      xh = "xh", // Xhosa
      yi = "yi", // Yiddish
      yo = "yo", // Yoruba
      za = "za", // Zhuang; Chuang
      zh = "zh", // Chinese
      zu = "zu", // Zulu
    }
  }

  export namespace Models {
    /**
     * Decorator that creates a reactory model definition
     * @param options - the options for the model definition if not the provide
     * the system will attempt to generate a model definition using NLP processes.
     */
    export type ReactoryModelDecorator<T> = (
      options?: Partial<IReactoryComponentDefinition<T>>,
    ) => void;

    /**
     *
     */
    export type TUser = Reactory.Models.IUser | Reactory.Models.IUserDocument;
    export type TOrganization =
      | Reactory.Models.IOrganization
      | Reactory.Models.IOrganizationDocument;

    export type TObjectID = string | ObjectId | number;

    /**
     * Defines all the known reactory core model types that are shipped with the
     * core platform.
     */
    export type ReactoryKnownModel =
      | string
      | "User"
      | "Organization"
      | "BusinessUnit"
      | "Team"
      | "ReactoryModelMeta";

    export type ReactoryKnownModelMap = {
      User: "User";
      Organization: "Organization";
      BusinessUnit: "BusinessUnit";
      Team: "Team";
      ReactoryModelMeta: "ReactoryModelMeta";
      [key: string]: ReactoryKnownModel;
    };

    export type ReactoryKnownModels = ReactoryKnownModel[];

    /**
     *
     */
    export interface IReactoryModelMetaHistory<T> {
      when: Date;
      modelBefore?: T;
      modelAfter?: T;
      description: string;
      outcome?: string;
      errors?: string[];
      user?: TUser;
      activity: string;
    }

    /**
     * Defines the meta data model that can be used to track
     * changes to a model.
     */
    export interface IReactoryModelMeta<TMetaModel> {
      id?: TObjectID;

      /**
       * The meta data model for the model
       */
      meta: TMetaModel;

      /**
       * The version number for the model
       */
      version?: string;

      /**
       * audit of changes
       */
      history?: IReactoryModelMetaHistory<TMetaModel>[];

      /**
       * The date in utc when the model was firdst created
       */
      created: Date;
      /***
       * The time in utc when the record was updated
       */
      updated?: Date;
    }

    /**
     * Defines the base model type, to ensure we have certain
     * fields on all our data models.
     */
    export interface IReactoryModel<TMeta> {
      id?: TObjectID;
      /**
       * The date in utc when the record was created
       */
      created: Date;
      /**
       * The user that created the record
       */
      createdBy: TUser;
      /***
       * The time in utc when the record was updated
       */
      updated: Date;
      /**
       * The user that updated the record
       */
      updatedBy: TUser;

      /**
       * The model meta data for item
       */
      modelMeta?: IReactoryModelMeta<TMeta>;
    }

    export interface CoreSimpleResponse {
      success: boolean;
      message: string;
      payload?: unknown;
    }

    export interface ReactorySetRolesArgs {
      user_id: ObjectId;
      id: ObjectId;
      roles: string[];
    }

    export interface ReactoryCreateMembershipArgs {
      user_id: ObjectId;
      organization?: ObjectId;
      businessUnit?: ObjectId;
      roles: string[];
    }

    export interface IChartProps {
      folder: string;
      file: string;
      width?: number;
      height?: number;
      resolveCDN?: boolean;
      data: unknown;
      options?: unknown;
      mime?: MimeType;
      context: Server.IReactoryContext;
    }

    export interface IChartResult {
      file: string;
      additional?: {
        cdn: string;
      };
    }

    export interface ChartJSDataLabelContext {
      active: boolean;
      chart: unknown;
      dataIndex: number;
      dataset: unknown;
      datasetIndex: number;
    }

    /**
     * Type alias for logged in context execution action
     * if exec the client should must activate the component
     * given in the "nameSpace.name@version" and the data should be
     * passed as a data property.
     */
    export type TLoggedInContextExectionAction = "exec" | "mount" | "none";

    /**
     * Additional Data for the Reactory Logged in context
     */
    export interface IReactoryLoggedInContextAdditionalData {
      id: string;
      nameSpace: string;
      name: string;
      version: string;
      data: unknown;
      action: TLoggedInContextExectionAction;
    }

    /**
     * Represents the logged in context for the user. This includes the
     * organization, business unit and team data elements as well as
     * the roles and unknown additional data provided by the modules
     */
    export interface IReactoryLoggedInContext {
      id: string;
      user: IUser;
      memberships: IMembership[];
      organization: IOrganization;
      businessUnit: IBusinessUnit;
      team: ITeam;
      roles: string[];
      altRoles: string[];
      additional: IReactoryLoggedInContextAdditionalData[];
    }

    export interface INavigationComponentDefinition {
      id: string;
    }

    /**
     * Data structure that represents the Reactory Api Status
     */
    export interface IApiStatus {
      /**
       * a unique id
       */
      id: string;
      /**
       * The date and time when the status was created
       */
      when: Date;
      /**
       * The status for the server. If everything processed it
       * should return with API-OK
       */
      status: string;
      /**
       * @deprecated
       * * - use loggedIn property instead.
       */
      firstName: string;
      /**
       * @deprecated
       * * - use loggedIn property instead.
       */
      lastName: string;
      /**
       * @deprecated
       * - use loggedIn property instead.
       */
      email: string;
      /**
       * All user related context information
       * is kept in this object
       */
      loggedIn: IReactoryLoggedInContext;
      /**
       * Reactory menu entries for this user
       */
      menus: ObjectId[] | UX.IReactoryMenuConfig[];
      /**
       * Reactory navigation entries for this user
       */
      navigationComponents: INavigationComponentDefinition[];
      /**
       * Represent the routes the user has access to
       * */
      routes: Routing.IReactoryRoute[];
      /**
       * Name of the default theme in use for this application
       */
      theme: string;
      /**
       * Current Active Theme Object
       */
      activeTheme: Reactory.UX.IReactoryTheme;
      [key: string]: unknown;
    }

    /**
     *
     */
    export interface IAuthentication<T> {
      provider: string;
      props: T;
      lastLogin: Date;
    }

    export interface ITemplateParam {
      name: string;
      type: string;
    }

    export enum TemplateType {
      email = "email",
      widget = "widget",
      page = "page",
      css = "css",
      layout = "layout",
      content = "content",
      pdf = "pdf",
    }

    export interface IPartner {
      id: string;
      key: string;
      name: string;
    }

    /**
     * Interface for records that requires syncronization
     */
    export interface IRecordMeta<S> {
      /**
       * The source data as received from a remote system
       */
      source: S;
      /**
       * An owner string. Helps to identify the source system / ownership
       * of the record.
       */
      owner: string;
      /**
       * A unqiue reference on the remote system that is used to identify the
       * resource
       */
      reference: string;
      /**
       * The last time this record was fetched / synched
       */
      lastSync: Date;
      /**
       * The next date and time this record should be synchronized
       */
      nextSync?: Date;
      /**
       * A date and time at which this records is expired and must be
       * expunged from the system
       */
      expires?: Date;
      /**
       * A boolean indicator to show whether or not this record must synch
       */
      mustSync?: boolean;
      /**
       * A provider string that is responsible for synchrnozing this record
       */
      provider?: string;
      /**
       * An object with properties passed to the provider
       */
      options?: unknown;
    }

  
    export interface IReactoryClient extends Server.IReactoryClientConfig {
      createdAt?: Date;
      //deafult user accounts to create at startup
      updatedAt?: Date;
      colorScheme: (colorvalue: string) => string[];
      getSetting: <T>(
        name: string,
        defaultValue?: T,
        create?: boolean,
        componentFqn?: string,
      ) => { data: T };
      getDefaultUserRoles: () => string[];
      setPassword: (password: string) => void;
    }

    export class ReactoryClientDocument extends 
      Mongoose.Document<ObjectId, unknown, IReactoryClient> implements IReactoryClient
    { 
      constructor(client?: Partial<IReactoryClient>);
      
      [key: string]: unknown;
      createdAt?: Date;
      updatedAt?: Date;
      colorScheme: (colorvalue: string) => string[];
      getSetting: <T>(name: string, defaultValue?: T, create?: boolean, componentFqn?: string) => { data: T; };
      getDefaultUserRoles: () => string[];
      setPassword: (password: string) => void;
      key: string;
      name: string;
      username: string;
      email: string;
      salt: string;
      password: string;
      avatar: string;
      siteUrl: string;
      emailSendVia: string;
      emailApiKey: string;
      resetEmailRoute: string;
      menus: UX.IReactoryMenuConfig[];
      applicationRoles: string[];
      users?: Server.IStaticallyLoadedUser[];
      components?: unknown[];
      theme?: string;
      themes?: UX.IReactoryTheme[];
      plugins?: Platform.IReactoryApplicationPlugin[];
      billingType?: string;
      modules?: unknown[];
      routes: unknown[];
      forms?: any[];
      auth_config?: Server.IReactoryAuthConfiguration<unknown>[];
      settings?: Server.IReactoryClientSetting<unknown>[];
      featureFlags?: Server.IReactoryFeatureFlagValue<unknown>[];
      whitelist?: string[];
      allowCustomTheme?: boolean;
    }

    export interface IReactoryClientDocument extends Mongoose.Document<ObjectId, unknown, IReactoryClient>, IReactoryClient {
      new(): ReactoryClientDocument;
    }

    export type ReactoryClientModel = Mongoose.Model<IReactoryClient>;

    export type TReactoryClient = IReactoryClient | IReactoryClientDocument;

    export interface IReactoryTask {
      id?: string | ObjectId | number;
      title: string;
      description?: string;
      assignedTo?: string | ObjectId | IUser | IUserDocument;
      comments?: IReactoryComment[] | IReactoryCommentDocument;
      attachments?: IReactoryFile[] | IReactoryFileModel[];
      shortCode?: string;
      slug?: string;
      label: string[];
      percentComplete?: number;
      timeline?: ITimeline[];
      completionDate?: Date;
      startDate?: Date;
      dueDate?: Date;
      createdBy: string | ObjectId | IUser | IUserDocument;
      createdAt: Date;
      updatedAt?: Date;
    }

    export class ReactoryTaskDocument extends Mongoose.Document<ObjectId, unknown, IReactoryTask> {
      constructor(task?: Partial<IReactoryTask>);
    }
    export interface IReactoryTaskDocument
      extends Mongoose.Document<ObjectId, unknown, IReactoryTask> {
      new (): ReactoryTaskDocument;
    }

    export type TReactoryTask = IReactoryTask | IReactoryTaskDocument;

    /**
     * A Reactory Template Object
     */
    export interface ITemplate {
      enabled: boolean;
      organization?:
        | ObjectId
        | Reactory.Models.IOrganization
        | Reactory.Models.IOrganizationDocument;
      client: ObjectId | Reactory.Models.IReactoryClient | Reactory.Models.IReactoryClientDocument;
      businessUnit?:
        | ObjectId
        | Reactory.Models.IBusinessUnit
        | Reactory.Models.IBusinessUnitDocument;
      user?: ObjectId | Reactory.Models.IUser | Reactory.Models.IUserDocument;
      visiblity?: string | "user" | "public" | "businessUnit" | "organization" | "client";
      view: string;
      kind: TemplateType;
      format: string;
      content: string;
      description?: string;
      name?: string;
      locale?: string;
      elements: Array<ITemplate>;
      parameters: Array<ITemplateParam>;
      contentFromFile(): string;
      createdBy?: ObjectId;
      created?: Date;
      updated?: Date;
      updatedBy?: ObjectId;
      version?: number;
      [key: string]: unknown;
    }

    export interface IEmailTemplate {
      id: string;
      view: string;

      name?: string;
      description?: string;

      organization?: ObjectId;
      client: ObjectId;
      businessUnit?: ObjectId;
      userId?: ObjectId;
      visiblity?: string | "user" | "public" | "businessUnit" | "organization" | "client";

      subject: string;
      body: string;
      signature?: string;
    }

    /**
     * Represents the various types of content flags for user-generated content.
     */
    export enum IContentFlagTypes {
      Nudity = "Nudity",
      Violence = "Violence",
      HateSpeech = "Hate Speech",
      SexualContent = "Sexual Content",
      Spam = "Spam",
      MinorAbuse = "Minor Abuse",
      Harassment = "Harassment",
      Misinformation = "Misinformation",
      IntellectualProperty = "Intellectual Property",
    }

    /**
     * Represents a content flag for a user-generated content.
     */
    export interface IContentFlag {
      /**
       * The unique identifier of the content flag.
       */
      id?: unknown;

      /**
       * The user who flagged the content.
       * Could be either an ObjectId or a user object.
       */
      user: ObjectId | IUser | IUserDocument;

      /**
       * The flag types associated with the content flag.
       */
      flagTypes: IContentFlagTypes[];

      /**
       * The reason for flagging the content.
       */
      reason: string;
    }

    /**
     * A Reactory Comment Object.
     */
    export interface IReactoryComment {
      id?: unknown;
      /**
       * The user that created the comment
       */
      user: ObjectId | IUser | IUserDocument;
      /**
       * The user that moderated the comment
       */
      moderatedBy?: ObjectId | IUser | IUserDocument;
      /**
       * The text of the comment
       */
      text: string;
      /**
       * The context of the comment. The context
       * is a string that identifies the context of the comment.
       * For example, if the comment is on a blog post, the context
       * could be "blog" and the contextId could be the id of the blog post.
       */
      context: string;
      /**
       * The id of the context of the comment. The context
       * is a string that identifies the context of the comment.
       */
      contextId: string;
      /**
       * The date and time the comment was created
       */
      createdAt: Date;
      /**
       * Indicates if the comment has been published
       * */
      published: boolean;
      /**
       * The content flags that has been raised against the comment
       */
      flags: IContentFlag[];
      /**
       * Indicates if the comment has been flagged
       */
      flagged: boolean;
      /**
       * The users that upvoted the comment
       */
      upvoted: ObjectId[] | IUser[] | IUserDocument[];
      /**
       * Total number of upvotes
       */
      upvotes: number;
      /**
       * The users that downvoted the comment
       */
      downvoted: ObjectId[] | IUser[] | IUserDocument[];
      /**
       * Total number of downvotes
       */
      downvotes: number;
      /**
       * The users that favorited the comment
       */
      favorite: ObjectId[] | IUser[] | IUserDocument[];
      /**
       * Total number of favorites
       */
      favorites: number;
    }

    export type IReactoryCommentDocument = Mongoose.Document<IReactoryComment>;

    /**
     * A Reactory Content Translation Object.
     * Used to store translations of content.
     */
    export interface IReactoryContentTranslation {
      /**
       * The language code for the translation
       */
      lang: I18n.Languages;
      /**
       * The title of the content
       */
      title: string;
      /*
       * The description of the content
       */
      description: string;
      /**
       * The translated content
       */
      content: string;
    }

    /**
     * A Reactory Content Object.
     * The content object is the base object for all content in the system.
     */
    export interface IReactoryContent {
      id?: unknown;
      /**
       * Slug must be unique and is used to identify the content
       */
      slug: string;
      /**
       * Optional title for the content
       */
      title?: string;
      /**
       * Optional description for the content.
       */
      description?: string;
      /**
       * The default language for the content
       */
      content: string;
      /**
       * Translations for the content
       */
      translations?: IReactoryContentTranslation[];
      /**
       * Topics tags for the content
       */
      topics?: string[];
      /**
       * If true the content is treated
       * as a template
       */
      template?: boolean;
      /**
       * Which engine to use to render the content.
       * You can use lodash, or ejs or javascript template strings.
       */
      engine?: string;
      /**
       * Provide a form fqn to use as input form for
       * the properties when testing the content.
       */
      previewInputForm?: string;
      /**
       * The date the content was created
       */
      createdAt: Date;
      /**
       * The user that created the content
       */
      createdBy: ObjectId | IUser | IUserDocument;
      /**
       * The date the content was last updated
       */
      updatedAt: Date;
      /**
       * The user that last updated the content
       */
      updatedBy: ObjectId | IUser | IUserDocument;
      /**
       * The version of the content
       */
      version?: string;
      /**
       * indicates if the content is published
       */
      published: boolean;
      /**
       * A list of roles that can access the content
       * If null then it is assumed all users can access this content.
       */
      roles?: string[];
      /**
       * If true comments will be enabled for the content.
       * Default will be false if null.
       */
      commentsAllowed?: boolean;
      /**
       * A list of comments associated with the content.
       */
      comments?: ObjectId[] | IReactoryComment | IReactoryCommentDocument;
      /**
       * A list of roles that can comment on the content.
       */
      commentRoles?: string[];
      /**
       * The partner that owns the content.
       * If null the content is accessible by all partners.
       */
      partner?: IReactoryClient | IReactoryClientDocument | ObjectId;
      /**
       * The organization that owns the content.
       * If null the content is accessible to all organizations within the partner
       */
      organization?: IOrganization | IOrganizationDocument | ObjectId;
      /**
       * The business unit that owns the content.
       * If null the content is accessible to all business units within the partner
       */
      businessUnit?: IBusinessUnit | IBusinessUnitDocument | ObjectId;
      /**
       * The content flags that has been raised against the comment
       */
      flags?: IContentFlag[];
      /**
       * Indicates if the comment has been flagged
       */
      flagged?: boolean;
    }

    export class ReactoryContentDocument extends Mongoose.Document<
      ObjectId,
      unknown,
      IReactoryContent
    > {
      constructor(content?: Partial<IReactoryContent>);
    }
    export interface IReactoryContentDocument
      extends Mongoose.Document<ObjectId, unknown, IReactoryContent> {
      new (): ReactoryContentDocument;
    }

    export interface IContentTemplate {
      id: string;
    }

    export interface ToEmail {
      display: string;
      email: string;
    }

    export interface EmailAttachment {
      id: ObjectId;
      link: string;
      filename: string;
      original: string;
      path?: string;
      size: number;
      sizeString: string;
      mimetype: string;
      contentBytes: unknown;
      [key: string]: unknown;
    }

    export interface EmailSentResult {
      success: boolean;
      message: string;
    }

    export interface IEmailMessage {
      id?: string | ObjectId;
      userId: string;
      via: string | "reactory" | "microsoft" | "google";
      subject: string;
      contentType: string;
      body: string;
      to: ToEmail[];
      cc?: ToEmail[];
      bcc?: ToEmail[];
      attachments?: EmailAttachment[];
      saveToSentItems: boolean;
      context?: string;
      [key: string]: unknown;
    }

    export interface ITemplateDocument extends Mongoose.Document, ITemplate {}

    export interface IOrganizationSetting {
      name: string;
      componentFqn: string;
      data: unknown;
    }

    export interface IOrganizationDocument extends Mongoose.Document<ObjectId>, IOrganization {}

    export interface IBusinessUnit {
      [key: string]: unknown;
      id?: unknown;
      name: string;
      description?: string;
      avatar?: string;
      members: Reactory.Models.IUser[] | Reactory.Models.IUserDocument[];
      createdAt: Date;
      updatedAt: Date;
      owner?: Reactory.Models.IUser | Reactory.Models.IUserDocument;
    }

    export class BusinessUnitDocument extends Mongoose.Document<ObjectId, unknown, IBusinessUnit> {
      constructor(businessUnit?: Partial<IBusinessUnit>);
    }

    export interface IBusinessUnitDocument
      extends Mongoose.Document<ObjectId, unknown, IBusinessUnit> {
      new (): BusinessUnitDocument;
    }

    export type TBusinessUnit = IBusinessUnit | IBusinessUnitDocument;

    export interface IOrganization {
      [key: string]: unknown;
      name: string;
      code: string;
      logo: string;
      businessUnits: IBusinessUnit[] | IBusinessUnitDocument[] | unknown[];
      settings: IOrganizationSetting[] | unknown[];
      getSetting(name: string): IOrganizationSetting;
      setSetting(name: string, data: unknown, componentFqn: string): IOrganizationSetting;
    }

    export interface IMembership {
      id?: unknown;
      client?: IPartner;
      clientId: string | unknown;
      organization?: IOrganization | IOrganizationDocument;
      organizationId?: string | unknown;
      businessUnit?: IBusinessUnit | IBusinessUnitDocument;
      businessUnitId?: string | unknown;
      enabled?: boolean;
      authProvider?: string;
      providerId?: string;
      lastLogin?: Date;
      user?: IUserDocument;
      roles: string[];
    }

    export class MembershipDoucment extends Mongoose.Types.Subdocument<ObjectId> {
      constructor(membership: Partial<IMembership>);
    }

    export interface IMembershipDocument extends Mongoose.Types.Subdocument<ObjectId> {
      new (): MembershipDoucment;
    }

    export type TMembership = IMembership | IMembershipDocument;
    export interface ISessionInfo {
      id: ObjectId | string;
      host: string;
      client: string;
      jwtPayload: {
        iss: string;
        sub: string;
        exp: Date;
        aud: string[];
        iat: Date;
        userId: ObjectId | string;
        organizationId: ObjectId | string;
        refresh: string;
        roles: string[];
      };
    }

    export interface INotification {
      id: ObjectId;
      user: IUserDocument;
      title: string;
      text: string;
      link: string;
      createdAt: Date;
      read: boolean;
      details: unknown;
    }

    export interface IRegion {
      id?: unknown;
      key: string;
      title: string;
      description: string;
      icon: string;
      deleted: boolean;
      organization?: IOrganization | IOrganizationDocument;
      locations?: [
        {
          title: string;
          country: string;
          province: string;
          district: string;
          city: string;
        },
      ];
    }

    export interface IOperationalGroup {
      title: string;
    }

    export class RegionDocument extends Mongoose.Document<ObjectId, unknown, IRegion> {
      constructor();
    }

    export interface IRegionDocument extends Mongoose.Document<ObjectId, unknown, IRegion> {
      new (): RegionDocument;
      AddRegion(region: IRegion): void;
    }

    export interface ITeam {
      id?: unknown;
      title: string;
      name: string;
      description: string;
      avatar: string;
      deleted: boolean;
    }

    export class TeamDocument extends Mongoose.Document<ObjectId, unknown, ITeam> {
      constructor();
    }
    export interface ITeamDocument extends Mongoose.Document<ObjectId, unknown, ITeam> {
      new (): TeamDocument;
    }

    export interface IProject {
      id?: unknown;
      name: string;
      description?: string;
      vision?: string;
      goals?: string[];
      slug?: string;
      shortcode?: string;
      startDate?: Date | moment.Moment | number;
      endDate?: Date | moment.Moment | number;
      owner?: IUser | IUserDocument;
      avatar?: string;
      deleted: boolean;
    }

    export class ProjectDocument extends Mongoose.Document<ObjectId, unknown, IProject> {
      constructor();
    }
    export interface IProjectDocument extends Mongoose.Document<ObjectId, unknown, IProject> {
      new (): ProjectDocument;
    }

    export class OperationalGroup extends Mongoose.Document<ObjectId, unknown, IOperationalGroup> {
      constructor();
    }

    export interface IOperationalGroupDocument
      extends Mongoose.Document<ObjectId, unknown, IOperationalGroup> {
      new (): OperationalGroup;
    }

    export interface IReactoryLoginResponse {
      token: string;
      firstName: string;
      lastName: string;
    }

    export interface IUserBio {
      firstName: string;
      lastName: string;
      dateOfBirth?: Date;
      avatar?: string;
      avatarProvider?: string;
    }

    export interface IAnonUser extends IUserBio {
      id: number;
      memberships:
        | Reactory.Models.IMembership[]
        | Mongoose.Types.Array<Reactory.Models.IMembership>;
      roles: string[];
      anon: boolean;
    }

    export interface IUserContact {
      email?: string;
      mobileNumber?: string;
    }

    export interface IUserHelpers {
      fullName(email: boolean): string;
      setPassword(password: string): void;
      validatePassword(password: string): boolean;
      hasRole(
        clientId: string,
        role: string,
        organizationId?: string,
        businessUnitId?: string,
      ): boolean;
      hasAnyRole(clientId: string, organizationId?: string, businessUnitId?: string): boolean;
      addRole(
        clientId: string,
        role: string,
        organizationId?: string,
        businessUnitId?: string,
      ): Promise<IMembership[]>;
      removeRole(
        clientId: string,
        role: string,
        organizationId: string,
      ): Promise<IMembershipDocument[]>;
      removeAuthentication(provider: string): Promise<boolean>;
      getAuthentication<T>(provider: string): IAuthentication<T>;
      setAuthentication<T>(authentication: IAuthentication<T>): Promise<boolean>;
      getMembership(
        clientId: string | ObjectId,
        organizationId?: string | ObjectId,
        businessUnitId?: string | ObjectId,
      ): IMembershipDocument;
      setLocale(locale: string): Promise<unknown>;
    }

    /**
     * User create parameters
     */
    export interface IUserCreateParams extends IUserBio, IUserContact {
      organization?: TOrganization;
      roles? : string[];
      password?: string;
    }

    export interface IUserIl8n {
      /**
       * The active locale key code being used
       */
      locale: string;
      /**
       * unknown specific user overrides
       */
      overrides?: Models.IReactoryTranslation[];
      /**
       * Date format options
       */
      dateFormat?: string;
      /**
       * Time format
       */
      timeFormat?: string;
      /**
       *
       */
      dateTimeFormat?: string;
    }

    /**
     * Represents a user in the application.
     *
     * @interface
     * @extends {IUserBio}
     * @extends {IUserContact}
     * @extends {IUserHelpers}
     */
    export interface IUser extends IUserBio, IUserContact, IUserHelpers {
      /**
       * depending on whether or not the model is client side or server side
       */
      id?: any;

      /**
       * The username of the user.
       *
       * @type {(string | undefined)}
       */
      username?: string;

      /**
       * The salt used for password hashing.
       *
       * @type {(string | undefined)}
       */
      salt?: string;

      /**
       * The hashed password of the user.
       *
       * @type {(string | undefined)}
       */
      password?: string;

      /**
       * The organization the user belongs to.
       *
       * @type {(ObjectId | Reactory.Models.IOrganizationDocument | undefined)}
       */
      organization?: ObjectId | Reactory.Models.IOrganizationDocument;

      /**
       * An array of memberships the user belongs to.
       *
       * @type {(Reactory.Models.IMembership[] |
       * Mongoose.Types.Array<Reactory.Models.IMembership>|
       * undefined)}
       */
      memberships?:
        | Reactory.Models.IMembership[]
        | Mongoose.Types.Array<Reactory.Models.IMembership>;

      /**
       * An array of session information for the user.
       *
       * @type {(Reactory.Models.ISessionInfo[] | undefined)}
       */
      sessionInfo?: Reactory.Models.ISessionInfo[];

      /**
       * An array of authentication information for the user.
       *
       * @type {(Reactory.Models.IAuthentication<unknown>[] | undefined)}
       */
      authentications?: Reactory.Models.IAuthentication<unknown>[];

      /**
       * Indicates whether the user has been deleted.
       *
       * @type {(boolean | undefined)}
       */
      deleted?: boolean;

      /**
       * The date and time the user was created.
       *
       * @type {(Date | undefined)}
       */
      createdAt?: Date;

      /**
       * The date and time the user was last updated.
       *
       * @type {(Date | undefined)}
       */
      updatedAt?: Date;

      /**
       * An object containing internationalization information for the user.
       *
       * @type {(IUserIl8n | undefined)}
       */
      il8n?: IUserIl8n;

      /**
       * An object containing metadata information for the user.
       *
       * @type {(Reactory.Models.IRecordMeta<unknown> | undefined)}
       */
      meta?: Reactory.Models.IRecordMeta<unknown>;

      /**
       * An object containing additional properties that may be defined for the user.
       *
       * @type {Object}
       */
      [key: string]: unknown;
    }

    /**
     * Defines a standard demographic type
     */
    export interface IDemographic {
      id?: unknown;
      organization: string | ObjectId | Reactory.Models.IOrganization;
      type: string;
      key: string;
      icon?: string;
      title: string;
      description?: string;
      deleted: boolean;
    }

    export interface IAgeDemographic {
      id?: unknown;
      organization: string | ObjectId | Reactory.Models.IOrganization;
      title: string;
      ageStart: number;
      ageEnd: number;
      deleted: boolean;
    }

    export type IAgeDemographicDocument = Mongoose.Document<ObjectId, unknown, IAgeDemographic>;

    export class DemographicDocument extends Mongoose.Document<ObjectId, unknown, IDemographic> {
      constructor(demographic?: Partial<IDemographic>);
    }

    export interface IDemographicDocument
      extends Mongoose.Document<ObjectId, unknown, IDemographic> {
      new (): DemographicDocument;
    }

    //@ts-ignore
    export interface IUserDocument extends Mongoose.Document<ObjectId, {}, IUser>, IUser {
      memberships: Mongoose.Types.Array<Reactory.Models.IMembershipDocument>;
      validatePassword: (password: string) => Promise<boolean>;
    }

    export type ReactoryUserModel = Mongoose.Model<IUser, {}, { 
      validatePassword: (password: string) => Promise<boolean>
    }, Mongoose.Schema<IUser>>;

    export interface IUserDemographics {
      race: string | ObjectId | IDemographic | IDemographicDocument;
      gender: string | ObjectId | IDemographic | IDemographicDocument;
      ageGroup: string | ObjectId | IDemographic | IDemographicDocument;
      user: string | ObjectId | IUser | IUserDocument;
      team: string | ObjectId | ITeam | ITeamDocument;
      businessUnit: string | ObjectId | IBusinessUnit | IBusinessUnitDocument;
      region: string | ObjectId | IRegion | IRegionDocument;
      [key: string]: unknown;
    }

    export interface IUserDemographicDocument extends Mongoose.Document, IUserDemographics {}

    export interface IPeerEntry {
      user: ObjectId | Reactory.Models.IUserDocument;
      relationship: string;
      isInternal: boolean;
      inviteSent: boolean;
      confirmed?: boolean;
      confirmedAt?: Date;
    }

    export interface IOrganigram {
      organization: ObjectId | Reactory.Models.IOrganizationDocument;
      user: ObjectId | Reactory.Models.IUserDocument;
      businessUnit: ObjectId | Reactory.Models.IBusinessUnitDocument;
      position: string;
      allowEdit: boolean;
      peers: IPeerEntry[];
      createdAt: Date;
      updatedAt: Date;
      confirmedAt: Date;
    }

    export interface IOrganigramDocument extends Mongoose.Document, IOrganigram {}

    /** ReactoryFile Management Models Interface */
    export interface IReactoryFilePermissions {
      id?: ObjectId;
      roles: string[];
      partnersIncluded?: ObjectId[];
      partnersExcluded?: ObjectId[];
      usersIndcluded?: ObjectId[];
      usersExcluded?: ObjectId[];
    }

    export interface IReactoryFileRemoteEntry {
      id: string;
      url: string;
      name?: string;
      lastSync: Date;
      success: boolean;
      verified?: boolean;
      syncMessage: string;
      priority?: number;
      modified?: Date;
    }

    export interface ITimeline {
      timestamp: number;
      message: string;
    }

    export interface IReactoryFile extends Mongoose.Document {
      id: ObjectId;
      hash: number;
      partner: ObjectId;
      ttl?: number;
      path: string;
      alias: string;
      filename: string;
      alt: string[];
      algo: string;
      link: string;
      mimetype: string;
      size: number;
      created?: Date;
      uploadContext?: string;
      uploadedBy: ObjectId;
      owner: ObjectId;
      public?: boolean;
      published?: boolean;
      permissions?: IReactoryFilePermissions[];
      tags?: string[];
      remotes?: IReactoryFileRemoteEntry[];
      timeline?: ITimeline[];
      status?: string;
      deleted?: boolean;
      readLines(start: number, lines: number): Promise<string[]>;
      stats(): fs.Stats;
      exists(): boolean;
      getServerFilename(): string;
      [key: string]: unknown;
    }

    export interface IReactoryFileStatic {
      new (): IReactoryFile;
      getItem(link: string): Promise<IReactoryFile>;
      setItem(link: string, file: IReactoryFile): void;
      clean(): void;
    }

    export interface IReactoryFileModel extends IReactoryFile, IReactoryFileStatic {}

    export interface IReactoryTranslationRevision {
      id: unknown;
      changed: Date;
      translation: string;
      translator: IUser;
      reason: string;
    }

    export interface IReactoryTranslation {
      id?: unknown;
      partner: IReactoryClient | IReactoryClientDocument;
      organization: IOrganization | IOrganizationDocument;
      key: string;
      locale: string;
      created: Date;
      translator: IUser;
      namespace?: string;
      translation: string;
      resource?: unknown;
      version: number;
      revisions: IReactoryTranslationRevision[];
    }

    export class ReactoryTranslationDocument extends Mongoose.Document<
      ObjectId,
      unknown,
      IReactoryTranslation
    > {
      constructor();
    }

    export interface IReactoryTranslationDocument
      extends Mongoose.Document<ObjectId, unknown, IReactoryTranslation> {
      new (): ReactoryTranslationDocument;
    }

    export interface IReactoryI18nResource {
      id: string;
      ns: string;
      translations: {
        [key: string]: string;
      };
    }
    export interface IReactoryTranslations {
      id: string;
      locale: string;
      translations: IReactoryTranslation[];
      i18n: IReactoryI18nResource[];
      resources?: unknown;
    }

    export interface IReactorySupportTicketFilter {
      assignedTo: string[];
      createdBy: string;
      status: string[];
      reference: string[];
      searchString: string;
      searchFields: string[];
      startDate: Date;
      endDate: Date;
      dateFields: string[];
      formId: string;
    }

    export interface IReactorySupportTicketUpdate {
      request?: string;
      requestType?: string;
      description?: string;
      status?: string;
      comment?: string;
      assignTo?: string;
    }

    export interface IReactorySupportTicket {
      id?: unknown;
      request: string;
      requestType: string;
      description: string;
      status: string;
      reference: string;
      createdBy: ObjectId | IUser | IUserDocument;
      createdDate: Date;
      updatedDate: Date;
      assignedTo: ObjectId | IUser | IUserDocument;
      formId: string;
      comments: IReactoryComment[] | IReactoryCommentDocument[];
      documents: IReactoryFile[] | IReactoryFileModel[];
    }

    export class ReactorySupportDocument extends Mongoose.Document<
      ObjectId,
      unknown,
      IReactorySupportTicket
    > {
      constructor();
    }

    export interface IReactorySupportTicketDocument
      extends Mongoose.Document<ObjectId, unknown, IReactorySupportTicket> {
      new (): ReactorySupportDocument;
    }

    export interface IPagedReactorySupportTickets {
      paging: IPagingResult;
      tickets: IReactorySupportTicket[];
    }

    export interface IPagingRequest {
      page: number;
      pageSize: number;
    }

    export interface IPagingResult {
      total: number;
      page: number;
      hasNext: boolean;
      pageSize: number;
    }

    export interface IPagedResponse<T> {
      paging: IPagingResult;
      items: T[];
      [key: string]: unknown;
    }

    /**
     * Interface for the
     */
    export interface IFileImportProcessorEntry {
      id: string;
      name: string;
      order: number;
      serviceFqn: string;
      started?: Date;
      finished?: Date;
      status: string;
      responses: unknown[];
    }

    /**
     * Import file types that can potentially be supported
     */
    export type ImportFileEnums =
      | string
      | "application/json"
      | "text/csv"
      | "application/xml"
      | "application/octet";

    /**
     * Interface for the UserImportFile type.
     * Used in upload and processing user data from
     * external file sources.
     */
    export interface IImportFile extends Mongoose.Document {
      id: string;
      file: IReactoryFile | IReactoryFileModel;
      preview: unknown[];
      options?: {
        delimeter: string;
        textQualifier: string;
        firstRow: string;
        columnMappings: unknown[];
      };
      mime?: ImportFileEnums;
      status: string;
      processors: IFileImportProcessorEntry[];
      rows: number;
    }

    /**
     * Interface for User File Import
     */
    export interface IReactoryFileImportPackage {
      organization: unknown;
      owner: unknown;
      options?: {
        delimeter: string;
        textQualifier: string;
        firstRow: string;
        columnMappings: unknown[];
      };
      files: IImportFile[];
      status: string;
      processors: IFileImportProcessorEntry[];
      rows: number;
      started: Date;
    }

    export interface IReactoryFileImportPackageDocument
      extends Mongoose.Document,
        IReactoryFileImportPackage {}

    export type ReactoryFileImportPackageDocument =
      Mongoose.Model<IReactoryFileImportPackageDocument>;

    export interface IProcessorParams {
      import_package?: IReactoryFileImportPackageDocument;

      [key: string]: unknown;
    }

    interface IPackageManagerState {
      processors: IFileImportProcessorEntry[];
      file?: IImportFile;
      processor_index: number;
      busy: boolean;
      started: boolean;
      [key: string]: unknown;
    }

    export interface IReactoryMarkerData {
      id: string;
      type: string | "existing" | "google" | "bing" | "yahoo" | "apple";
      title: string;

      address?: unknown;
      place?: unknown;

      allow_move?: boolean;
      is_updating?: boolean;
      selected?: boolean;
      show_detail?: boolean;

      componentFqn?: string;
      componentProps?: unknown;
      propertyMap?: {
        [key: string]: string;
      };

      [property: string]: unknown;
    }
    /**
     * Model type for the social media reference and links
     */
    export interface IReactorySocialReference {
      /**
       *
       */
      id: string;
      /**
       *
       */
      provider: string;
      /**
       *
       */
      url: string;
      /**
       *
       */
      authenticated: boolean;
      /**
       *
       */
      scope: unknown;
      /**
       * The authentication
       */
      auth: unknown;
      /**
       *
       */
      valid: boolean;
      /**
       *
       */
      created: Date;
      /**
       *
       */
      updated: Date;
    }

    export interface IReactorySocialMeta {
      /**
       *
       */
      id: string;
      /**
       *
       */
      avatar: string;
      /**
       *
       */
      avatarProvider: string;
      /**
       *
       */
      headerBackground: string;
      /**
       *
       */
      headerBackgroundProvider: string;
      /**
       *
       */
      socials: IReactorySocialReference[];
    }

    /**
     * Defines a standard demographic type
     */
    export interface IOrganizationDemographicSettings {
      id?: unknown;
      organization: string | ObjectId | IOrganization;
      age: boolean;
      gender: boolean;
      race: boolean;
      region: boolean;
      operationalGroup: boolean;
      position: boolean;
      businessUnit: boolean;
      teams: boolean;
      deleted: boolean;
    }

    export interface IOrganizationDemographicSettingsDocument
      extends Document,
        IOrganizationDemographicSettings {}

    /**
     * Defines the natural language processing output for a tokenized
     * string input.
     */
    export interface INaturalTokenizedInput {
      /**
       * The input string
       */
      input: string;
      /**
       * The tokens that was extracted from the input string
       */
      tokens: string[];
      /**
       * The tokenizer results
       */
      tokenizer: string;
    }

    /**
     * Object representing the sentiment analysis of a given input
     * @interface
     * @property {string} lang - the ISO 639-1 language code used for analysis
     * @property {string} input - the input text that was analyzed
     * @property {number} score - a numerical score representing the sentiment
     * @property {NaturalSentimentVote} vote - a sentiment vote based on the score
     */
    export interface INaturalSentiment {
      lang: string;
      input: string;
      score: number;
      vote: string;
    }

    /**
     * Object representing a spell check correction for a misspelled word
     * @interface
     * @property {string} word - the misspelled word that was corrected
     * @property {string[]} suggestions - an array of suggested corrections for the word
     */
    export interface INaturalSpellCheckCorrection {
      word: string;
      suggestions: string[];
    }

    /**
     * Object representing the results of a spell check on a given input
     * @interface
     * @property {string} lang - the ISO 639-1 language code used for analysis
     * @property {string} input - the input text that was checked for spelling
     * @property {boolean} correct - a boolean indicating whether the input is spelled correctly
     * @property {INaturalSpellCheckCorrection[]} corrections - an array of spelling
     * corrections for unknown misspelled words
     */
    export interface INaturalSpellCheckResult {
      lang: string;
      input: string;
      correct: boolean;
      corrections: INaturalSpellCheckCorrection[];
    }

    /**
     * Interface for a frequency map object, mapping string tokens to frequency counts
     * @interface
     */
    export interface INaturalFrequencyMap {
      [token: string]: number;
    }

    export interface ISearchableBase {
      /**
       * The id of the searchable object must be a number or the hash of a string input.
       */
      id?: number;
      /**
       * A string id for the searchable object, this will be used and hashed using the default
       * hashing algorithm to generate the id for the searchable object.
       */
      idString?: string;
    }

    export interface ISearchableType {
      id: string
      /**
       * A descriptive name for the searchable type
       */
      name: string
    }

    export interface ISearchableMetric {

      name?: string

      value?: number

      unit: string
    }

    export interface ISearchable extends 
      ISearchableBase, 
      IComponentFqnDefinition {
      
        type: ISearchableType
        children?: Partial<ISearchable>[]
        source: string
        path: string
        metrics: ISearchableMetric[]
    }
  }

  /**
   * The mongo namespace should be used for mongo / mongoose related types only.
   */
  export namespace Mongo {
    /**
     * Project Mongoose model interface
     */
    export type IReactoryModelMetaDocument<T> = Models.IReactoryModelMeta<T>;

    /**
     * Interface definitions for instance functions for the IResourceManagerProject
     */
    export interface IReactoryModelMetaDocumenFunctions<TMeta> {
      /**
       * Updates the meta data for the given model
       * */
      updateMeta(meta: Models.IReactoryModelMeta<TMeta>): Promise<Models.IReactoryModelMeta<TMeta>>;
    }

    export interface IReactoryModelMetaDocumentQueryHelpers<TMeta> {
      /**
       * Returns the meta data for the given model
       * */
      getMeta(): Promise<Models.IReactoryModelMeta<TMeta>>;
      /**
       * Clears the meta data for the given model
       * */
      clearMeta(): Promise<void>;
    }

    export type ReactoryModelMetaDocument<TMeta> = Mongoose.Model<
      ObjectId,
      IReactoryModelMetaDocumenFunctions<TMeta>,
      IReactoryModelMetaDocumentQueryHelpers<TMeta>,
      IReactoryModelMetaDocument<TMeta>
    >;
  }

  export namespace Native {}

  export namespace UX {
    export enum UIFrameWork {
      material = "material",
      bootstrap = "bootstrap",
      office = "office",
      blueprint = "blueprint",
    }

    export type NAMED_PALETTE = "info" | "warning" | "error" | "primary" | "secondary";

    export interface IPalette {
      light: string;
      main: string;
      dark: string;
      contrastText: string;
      warning?: string;
      error?: string;
      info?: string;
      /**
       * Use the colors array for providing a list of
       */
      colors: string[];
      [key: string]: unknown;
    }

    export interface IThemePalette {
      mode: ApplicationThemeModeType;
      primary: IPalette;
      secondary: IPalette;
      report?: IPalette;
      info?: IPalette;
      warning?: IPalette;
      success?: IPalette;
      error?: IPalette;

      background?: {
        paper?: string;
        default?: string;
      };
      [key: string]: unknown;
    }

    export interface IReactoryColorSchemes {
      primary: string[];
      secondary: string[];
    }
    export interface ITheme {
      type: string;
      palette: IThemePalette;
    }

    /**
     * Supported Theme Types.
     * Other rendering libraries will be added over time and each will
     * have their owne configuration schema
     */
    export type ReactoryThemeType = "material" | "material_native";

    /**
     * The application them mode types that the themes can support
     * or it can indicate how the application can select the
     * default theme mode if there is more
     * than one theme mode available.
     */
    export type ApplicationThemeModeType = "light" | "dark" | "os";

    /**
     * Theme modes
     */
    export interface IReactoryThemeMode {
      /**
       * unique id for the theme mode
       */
      id?: string;

      /**
       * Application theme mode
       */
      mode: ApplicationThemeModeType;

      /**
       * A name for the theme mode
       * */
      name: string;

      /**
       * Theme mode description
       * */

      description?: string;

      /**
       * an icon for the application theme mode
       */
      icon?: string;

      /**
       *The options that is associated with this theme mode
       */
      options: ITheme;
    }

    export type ReactoryThemeAssetType = "script" | "image" | "css" | "json";

    export interface IReactoryThemeAsset {
      id?: string;
      name: string;
      assetType: ReactoryThemeAssetType;
      url: string;
      loader?: string;
      options?: unknown;
      data?: unknown;
    }

    /**
     * A layout represents a special type of schema that drives
     * the layout for a given route.
     */
    export interface IReactoryLayout {
      id?: string;
      nameSpace: string;
      name: string;
      version: string;
      description?: string;
      schema: Schema.ISchema;
      uiSchema?: Schema.IUISchema;
      default?: boolean;
      inherits?: string;
    }

    /**
     * The reactory theme wrapper is used to contain the theme
     * configuration for different theme types
     */
    export interface IReactoryTheme {
      id?: string;
      type: ReactoryThemeType;
      name?: string;
      nameSpace?: string;
      version?: string;
      description?: string;
      defaultThemeMode?: ApplicationThemeModeType;
      modes?: IReactoryThemeMode[];
      options?: unknown;
      assets?: IReactoryThemeAsset[];
      layouts?: IReactoryLayout[];
      colorSchemes?: IReactoryColorSchemes;
      /**
       * The current active palette for this context
       */
      palette?: Reactory.UX.IThemePalette;
      content?: unknown;
      /**
       * used for adding additional properties / icons / svgs etc to the theme.
       * these have to be added on the client side via an injectable component.
       */
      extensions?: unknown;
    }

    /**
     * Reactory Menu Item, used to define what menu entries are available
     * for a given client application.  Each item can have sub menus defined in the
     * items array property
     */
    export interface IMenuItem {
      /**
       * The ordinal position defines the order in which the menu items
       * are placed on the navigation surface. Lower numbers have higher
       * priority and will appear higher in the stack.
       */
      ordinal: number;
      /**
       * The menu title, can either be a standard string or translation key
       */
      title: string;
      /**
       * link for the menu item, these links need to map to a route defined in the
       * application routes otherwise the navigation won't go anywhere.
       *
       * If you want to raise an event instead of a navigation link then
       * add the link as "event://YourEventNameHere?param1=x&param2=y"
       * and the even will be raise through the reatory api with the parameters
       * specified in the query params.
       */
      link: string;
      /**
       * The icon to use for the menu item.
       */
      icon?: string;

      /**
       * Image property can be used when we want
       * the menu to render a particular image.
       * The format of this string is either a
       * full url link to the resource or a format string
       * that can be interpolated at runtime.
       * i.e.
       * static: https://somesite.com/imageref.png
       * interpoplated: ${reactory.user.avatar}
       */
      image?: string;

      /**
       * The roles that the user must have in order to access this menu.
       */
      roles?: string[];
      /**
       * The sub menu items for this menu item
       */
      items?: IMenuItem[];
      /**
       * FUTURE USE - map a service function to provide
       * a men item that is dynamic based on state and additional
       * logic, allows for async menu resolver
       *
       * format:
       * my-custom.MenuResolverService@1.0.0::myResolverHandle
       *
       * The resolver needs to be a registered service class type
       * that exposes a function that will run with a standard resolver
       * signature.
       */
      resolver?: string;
    }

    /**
     * Menu configuration item.
     */
    export interface IReactoryMenuConfig {
      /**
       * A user friendly name for the menu group
       */
      name: string;
      /**
       * A unqiue key for the menu group
       */
      key: string;
      /**
       * A target area for the menu group to bind itself to.
       * Each application can have a custom navigational system and
       * these navigational systems need to be aware of the menu configuration.
       */
      target: string;
      /**
       * The roles the user should have in order to access this menu item
       */
      roles: string[];
      /**
       * The menu entries associated with this group.
       */
      entries: IMenuItem[];
    }

    /**
     * A reactory component interface
     */
    export interface IReactoryComponent {
      id?: string;
      name: string;
      nameSpace: string;
      version: string;
      title?: string;
      description?: string;
      author?: string;
      roles?: string[];
      args?: Reactory.IKeyValuePair<string, unknown>[];
    }

    //
    // Utility type that can be used to provide
    // various styling options for graph elements
    //
    export interface UXMeta {
      // """
      // A background color that will provided in either HEX or rgba values.
      // """
      backgroundColor: string;
      //   """
      // A uri for a background image
      // """
      backgroundImage: string;
      //   """
      // A color for the element
      // """
      color: string;
      //   """
      // font to use
      //   """
      font: string;
      //   """
      // font size
      //   """
      fontSize: string;
      //   """
      // font styling
      //   """
      fontStyle: string;
      //   """
      // url for an avatar
      // """
      avatar: string;
      //   """
      // a material icon id
      //   """
      icon: string;
      //   """
      // A classname
      //   """
      className: string;
      //   """
      // custom jss that can be compiled by the client
      //   """
      jss: unknown;
      //   """
      // custom styled element data
      //   """
      styled: unknown;
    }

    export interface IThemedUXMeta {
      // """
      // theme name to which this applies
      // """
      theme: string;

      // """
      // Theme mode:
      // light / dark / os
      // """
      mode: ApplicationThemeModeType;

      // """
      // UX Meta entry
      // """
      uxmeta: UXMeta;
    }

    /**
     * Themed UX Meta object map.
     * default is required.
     */
    export type ThemedUXMeta = {
      light?: IThemedUXMeta;
      dark?: IThemedUXMeta;
      default: IThemedUXMeta;
    };

    /**
     * Array of themed UX meta
     */
    export type ThemedUXMetaArray = IThemedUXMeta[];

    export interface IDropDownMenuItem {
      id: string;
      key?: string;
      title?: string;
      icon?: string;
      iconProps?: unknown;
      disabled?: boolean;
      selected?: boolean;
      style?: unknown;
      [key: string]: unknown;
    }

    export interface IDataDropDownMenuItem<T> extends IDropDownMenuItem {
      data: T;
    }

    export interface IDropDownMenuProps {
      menus: Reactory.UX.IDropDownMenuItem[];
      id?: unknown;
      propertyMap?: unknown;
      tooltip?: string;
      onSelect?: (evt: React.SyntheticEvent, menu: IDropDownMenuItem) => void;
      style?: unknown;
      size?: "small" | "medium" | "large";
      iconStyle?: unknown;
      icon?: string;
    }
  }

  export namespace Routing {
    /**
     * Re export react router types
     */
    export type ReactRouter = typeof ReactRouterAlias;
    /**
     * Re export react router dom types
     */
    export type ReactRouterDom = typeof ReactRouterDomAlias;
    /**
     * Client route configuration
     */
    export interface IReactoryRoute {
      id?: string;

      /**
       * Human readable title for the route
       */
      title?: string;

      /**
       * A unique key for client reference
       * will default to id if no key is given.
       */
      key?: string;

      /**
       * The path for the route
       */
      path: string;
      /**
       * Indicates whether the route is
       * public or not
       */
      public: boolean;
      /**
       * The roles required for the route
       */
      roles: string[];
      /**
       * A component fqn to mount as the root component for the path
       */
      componentFqn: string;
      /**
       * The arguments for the route
       */
      args?: IKeyValuePair<string, unknown>[];

      /**
       * Properties to pass to the component
       */
      componentProps?: {
        [key: string]: unknown;
      };

      /**
       * indicates if the path should be
       * an exact match
       */
      exact?: boolean;
      /**
       * If set then this path will redirect to a different path
       */
      redirect?: string;
      /**
       * Component array that needs to be bound to the route.
       */
      components?: { componentFqn: string; props?: { [key: string]: unknown } }[];
    }

    /**
     * Route handler definition. Adds the render capability to the route handler.
     */
    export interface IReactoryRouteHandler extends IReactoryRoute {
      render: (
        props: Reactory.IReactoryComponentProps,
      ) => React.ReactElement<Reactory.IReactoryComponentProps>;
    }
  }

  /**
   * Platform namespace holds all interfaces and types that is
   * not specific to a partificular domain area and is considered
   * part of the platform scope.
   */
  export namespace Platform {
    export type ReactoryApplicationPluginPlatform = "web" | "ios" | "android" | "native";

    /**
     * The IReactoryClientPlugin defines the data elements required
     * by the client or a builder tool to download and install a
     * given plugin.
     */
    export interface IReactoryApplicationPlugin {
      id?: string;
      /**
       * The namespace for the plugin
       */
      nameSpace: string;
      /**
       * The name for the plugin
       */
      name: string;
      /**
       * The version of the plugin
       */
      version: string;
      /**
       * A user friendly description for the the
       */
      description: string;
      /**
       * Reactory Application Plugin Platform
       */
      platform: ReactoryApplicationPluginPlatform;
      /**
       * url for the plugin
       */
      url: string;
      /**
       * A loader fqn that can be used to process
       * the load request
       */
      loader?: string;
      /**
       * A valid mime type
       */
      mimeType?: string;
      /**
       * The options associated with the plugin
       */
      options?: unknown;
      /**
       * indicates whether or not the plugin is enabled.
       */
      enabled?: boolean;
      /**
       * A list of roles that has access to this
       */
      roles?: string[];
    }

    /**
     * Plugin definitions and options
     */
    export interface IReactoryPluginDefinition {
      nameSpace: string;
      name: string;
      version: string;
      roles?: string[];
      root?: string;
      disabled?: boolean;
      verified?: boolean;
      certificate?: string;
      license?: string;
    }

    export interface IReactoryPlugin extends IReactoryPluginDefinition {
      /**
       * A function call that receives the reactory api instance.
       * Using this instance the plugin must register and load
       * all componentns into the reactory registry.
       */
      component: (reactory: Client.IReactoryApi) => void;
    }
  }

  export namespace Pdf {
    export interface IReactoryPdfGenerator {
      enabled: boolean;
      key: string;
      name: string;
      description: string;
      content: (params: unknown, context: Server.IReactoryContext) => Promise<unknown>;
      resolver: (params: unknown, context: Server.IReactoryContext) => Promise<unknown>;
      props: {
        meta: {
          title: string;
          author: string;
          [key: string]: unknown;
        };
        fonts: {
          [key: string]: {
            normal: string;
            bold: string;
          };
        };
        defaultFont: string;
        fontSize: number;
      };
    }

    export interface IReactoryPdfComponent {
      nameSpace: string;
      name: string;
      version: string;
      component: IReactoryPdfGenerator;
    }
  }

  export namespace Service {
    export type SERVICE_LIFECYCLE = FQN | "instance" | "singleton";

    export type LOG_TYPE = string | "debug" | "warn" | "error" | "info";

    /**
     * The IProcessor interface is a simplistic data processing interface
     */
    export interface IProcessor extends Service.IReactoryContextAwareService {
      /**
       * Used to process a request with unknown params.
       * @param params - of unknown type, the processor itself has to be able to interpret the input
       * @param next - if the
       */
      process(params: unknown, next?: IProcessor): Promise<unknown>;
    }

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
      id: string;
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
      lifeCycle?: SERVICE_LIFECYCLE
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
        return `${this.nameSpace}.${this.name}${includeVersion ? `@${this.version}` : ''}`;
      };
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
          storage?: FormStore
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
      search(form: Partial<Reactory.Forms.IReactoryForm>, targetModule?: string, where?: FormStore[]): Promise<Reactory.Forms.IReactoryForm[]>;

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
      createRequest(
        request: string,
        description: string,
        requestType?: string,
        meta?: unknown,
        formId?: string,
      ): Promise<Models.IReactorySupportTicket | Models.IReactorySupportTicketDocument>;

      updateTicket(
        ticket_id: string,
        updates: Models.IReactorySupportTicketUpdate,
      ): Promise<Models.IReactorySupportTicket | Models.IReactorySupportTicketDocument>;

      attachDocument(
        ticket_id: string,
        file: File,
        name: string,
      ): Promise<Models.IReactorySupportTicket | Models.IReactorySupportTicketDocument>;

      pagedRequest(
        filter: Models.IReactorySupportTicketFilter,
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
      getContentBySlug(slug: string): Promise<Models.IReactoryContent>;

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
      search<T>(index: string, filter: string, fields?: string[], limit?: number, offset?: number): Promise<ISearchResults<T>>;
      index<T>(index: string, data: T[]): Promise<ISearchIndexResult>; 
      deleteIndex<T>(index: string): Promise<boolean>;
    }
  }

  export namespace Server {
    export interface ReactoryBaseEnvironment {
      /**
       * The path to the node_modules folder
       */
      NODE_PATH: string;
      /**
       * The environment the server is running in
       */
      NODE_ENV: string;
      /**
       * The application data root, is the mapped
       * network drive that represents the CDN data root that
       * the server uses to read and write CDN content to
       */
      APP_DATA_ROOT: string;
      /**
       * The mongoose connection string for the core backing DB
       */
      MONGOOSE: string;
      /**
       * mongoose connection details for workflow
       */
      WORKFLOW_MONGO: string;
      /**
       * The port number the server must run on
       */
      API_PORT: string | number;
      /**
       * The URI root for the API, this represent the full
       * root of server API, i.e. http://localhost:4000
       */
      API_URI_ROOT: string;
      /**
       * Intended for override the root of the
       * graph
       */
      API_GRAPHQL_URI: string;
      /**
       * CDN root as it will be used by connecting client
       * devices.
       */
      CDN_ROOT: string;
      /**
       * The mode that the server is running under
       * options are DEVELOP, QA, PRODUCTION
       */
      MODE: string;
      /**
       * The level of logging the application should use
       */
      LOG_LEVEL: string;
      /**
       * The root home folder for the application
       */
      REACTORY_HOME: string;
      /**
       * REACTORY_DATA folder is where the application stores
       * data that is not part of the core application.
       */
      REACTORY_DATA: string;
      /**
       * The root folder the server application 
       */
      REACTORY_SERVER: string;
      /**
       * The folder where the PWA client application is located
       */
      REACTORY_CLIENT: string;
      /**
       * The folder where PWA client plugins are located
       */
      REACTORY_PLUGINS: string;
      /**
       * Postgres host
       */
      REACTORY_POSTGRES_HOST: string
      /**
       * Postgres port
       */
      REACTORY_POSTGRES_PORT: string
      /**
       * Postgres user
       */
      REACTORY_POSTGRES_USER: string
      /**
       * Postgres password
       */
      REACTORY_POSTGRES_PASSWORD: string
      /**
       * Postgres database
       */
      REACTORY_POSTGRES_DB: string
      /**
       * Morgan middleware enabled state
       */
      MORGAN_MIDDLEWARE_ENABLED: boolean
      /**
       * Filters to apply when logging network requests
       */
      MORGAN_MIDDLEWARE_FILTERS: string
    }

    /**
     * Utility type for extending the environment with additional properties
     */
    export type ExtendedEnvironment<Additional extends unknown[]> = NodeJS.ProcessEnv & Additional[number];

    export interface ReactoryEmailEnvironment {
      /**
       * Send grid API key - this will be moved to
       * a per client key configuration.
       */
      SENDGRID_API_KEY: string;
      /**
       * The default method to use for sending email
       */
      REACTORY_EMAIL_SEND_VIA?: string | "postal" | "sendgrid" | "smtp" | "microsoft" | "google" | "mailgun" | "aws" | "sendmail" | "mandrill" | "postmark" | "sparkpost" | "elasticemail";
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
      protos: string[]
      // define the services for the module
      services: {
        [key: string]: unknown
      }
    }

    export type TReactoryForm = Forms.IReactoryForm;


    /**
     * The module data structure represents a collection of all the services,
     * workflows, forms, and PDF definitions.
     */
    export interface IReactoryModule {
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
      cli?: Reactory.IReactoryComponentDefinition<(kwargs: string[], context: Reactory.Server.IReactoryContext) => Promise<void>>[];
    }

    export type ReactoryServiceFilter = {
      id?: string;
      name?: string;
      type?: string;
      lifeCycle?: Reactory.Service.SERVICE_LIFECYCLE;
    }

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
      listServices(filter: ReactoryServiceFilter): Reactory.Service.IReactoryServiceDefinition<any>[];

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
      response?: Express.Response;
      /**
       * The current request object
       */
      request?: Express.Request;
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
        objectMapper: ObjectMapper;

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
      username?: string
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
      id: string | ObjectId
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
        viewer: string[],
        /**
         * The roles that are allowed to edit the feature flag
         */
        editor: string[],
        /**
         * The roles that are allowed to admin the feature flag
         */
        admin: string[]
      },
      /**
       * The form FQN to use for the feature flag data.
       */
      form: FQN      
    }

    /**
     * The IReactoryClientFeature
     */
    export interface IReactoryFeatureFlagValue<T> {
      /**
       * The feature reference. When using string, it either 
       * has to be the FQN string or the ObjectId string.
       */
      feature: string | ObjectId | IReactoryFeatureFlag
      /**
       * The partner for which this feature flag is configured. If null
       * it will mean the feature flag is configure for ALL partners.
       * 
       * When the partner value is set flag is applied to a specific 
       */
      partner?: string | ObjectId | Reactory.Models.IReactoryClient
      /**
       * The organization the feature flag is bound to
       */
      organization?: string | ObjectId | Reactory.Models.IOrganization
      /**
       * The business unit the feature flag is bound to
       */
      businessUnit?: string | ObjectId | Reactory.Models.IOrganization
      /**
       * The regions (2 digit iso country codes)
       */
      regions?: string[]
      /**
       * The application roles to which the feature flag applies
       */
      roles?: string[]
      /**
       * The users that the feature flag applies to
       */
      users?: string[] | ObjectId[] | Reactory.Models.IUser[]
      /**
       * The time zones to which the feature flag applies
       */
      timezones?: string[] 
      /**
       * The data value for the feature flag
       */
      value: T
    }


    export interface IReactoryClientSetting<T> {
      name: string
      componentFqn: string
      formSchema?: Reactory.Schema.ISchema
      data: T
    }

    /**
     * Known auth providers are provider that is provider
     * by the reactory platform. Additional providers can 
     * be implemented
     */
    export type ReactoryKnownAuthProvider = "local" |
      "google" | 
      "azure" |
      "facebook" |
      "linkedin" |
      "apple" |
      "okta";

      /**
       * Author configuration interface.
       */
      export interface IReactoryAuthConfiguration<TOptions> {
      provider: string | ReactoryKnownAuthProvider 
      enabled: boolean
      options: TOptions
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
      featureFlags?: IReactoryFeatureFlagValue<unknown>[]

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

  export namespace Schema {
    export namespace Reflection {
      type Primitive = string | number | boolean | null;

      type JSONSchema =
        | PrimitiveSchema
        | ArraySchema
        | ObjectSchema
        | CombinedSchema
        | ReferenceSchema;

      interface PrimitiveSchema {
        type:
          | "string"
          | "number"
          | "bigint"
          | "boolean"
          | "symbol"
          | "undefined"
          | "object"
          | "function";
      }

      interface ArraySchema {
        type: "array";
        items: JSONSchema;
      }

      interface ObjectSchema {
        type: "object";
        properties: { [key: string]: JSONSchema };
        required?: string[];
      }

      interface CombinedSchema {
        type: "string" | "number" | "integer" | "boolean";
        enum: Primitive[];
      }

      interface ReferenceSchema {
        $ref: string;
      }
    }

    export interface IDSchema {
      $id: string;
    }

    type GridSize = number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    export interface IGridLayout {
      [key: string]: {
        xs?: GridSize;
        sm?: GridSize;
        md?: GridSize;
        lg?: GridSize;
        xl?: GridSize;
        style?: unknown;
      };
    }

    export interface IGridOptions {
      spacing?: number;
      container?: string | "Paper" | "div";
      containerStyles?: React.CSSProperties;
    }

    export interface ITabLayout {
      field: string;
      icon?: string;
      title?: string;
      [key: string]: unknown;
    }

    export interface ITabOptions {
      textColor?: string | "primary" | "secondary";
    }

    //export type ReactoryFields = string | "ArrayField" | "BooleanField" | "TitleField" | ""

    /**
     * place holder for Accordian layout
     */
    export interface IAccordionLayout {
      [key: string]: unknown;
    }

    /**
     * Place holder interface
     */
    export interface IAccordionOptions {
      [key: string]: unknown;
    }

    /**
     * Place holder interface
     */
    export interface ISteppedLayout {
      [key: string]: unknown;
    }

    /**
     * Place holder interface
     */
    export interface ISteppedOptions {
      [key: string]: unknown;
    }

    /**
     * Place holder interface
     */
    export interface IListLayout {
      [key: string]: unknown;
    }

    /**
     * Place holder interface
     */
    export interface IListLayoutOptions {
      [key: string]: unknown;
    }

    /**
     * Place holder interface
     */
    export interface IPagedLayout {
      [key: string]: unknown;
    }

    /**
     * Place holder interface
     */
    export interface IPagedLayoutOptions {
      [key: string]: unknown;
    }

    /**
     * Function type that provides a format string / format result based on a function
     */
    export type TUIFormatProvider = (
      schema: ISchema,
      uiSchema: IUISchema,
      formData?: unknown,
      form?: Reactory.Forms.IReactoryForm,
      context?: Reactory.Server.IReactoryContext,
    ) => string;

    /**
     * Function type that provides a JSX structure
     */
    export type TUIJsxProvider = (
      schema: ISchema,
      uiSchema: IUISchema,
      formData?: unknown,
      form?: Reactory.Forms.IReactoryForm,
      context?: Reactory.Server.IReactoryContext,
    ) => unknown;

    /**
     * UX Schema options that are applied to the schema field using the
     * 'ui:options' property.
     */
    export interface IUISchemaOptions {
      [key: string | symbol]: unknown;
      /**
       * special string formatting instruction / expression
       */
      format?: string | TUIFormatProvider;
      /**
       * JSX that can be used by the component for style rules.
       * Not all components currently support this property, but
       * where it is available the component documentation will highlight
       * this feature.
       */
      jsx?: unknown | TUIJsxProvider;
    }

    /**
     * Default field options that apply the number field
     */
    export interface IUINumberFieldUIOptions extends IUISchemaOptions {
      type?: string | "int" | "float" | "double";
      title?: string;
    }

    /**
     * A schema that defines the 'ui:options' for a field that should render as a
     * label widget.
     *
     * These options apply to the LabelWidget component.
     */
    export interface IUILabelWidgetOptions extends IUISchemaOptions {
      /**
       * Title string for the label widget. This value can contain
       * a valid lodash template string.
       */
      title?: string;
      /**
       * Icon object
       */
      icon?: unknown;
      iconType?: string;
      iconPosition?: string | "left" | "right";
      variant?:
        | string
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
        | "caption"
        | "button"
        | "overline"
        | "inherit"
        | "subtitle1"
        | "subtitle2"
        | "body1"
        | "body2";
      iconProps?: { style: any, [key: string]: any };
      renderHtml?: boolean;
      titleProps?: { style: any, [key: string]: any };
      bodyProps?: { style: any, [key: string]: any };
      containerProps?: { style: any, [key: string]: any };
      componentFqn?: string;
      componentProps?: { style: any, [key: string]: any };
      componentPropsMap?: ObjectMap;
      /**
       * If true, the label will be rendered as a link that will copy the value
       * of the field to the clipboard.
       */
      copyToClipboard?: boolean;

      'ui:graphql'?: Reactory.Forms.IReactoryFormQuery;
    }

    export interface IUIUTextFieldOptions extends IUISchemaOptions {
      multiline?: boolean;
      /**
       * setting the renderer type html will render the text using an unsafe set html operation
       * markdown will use a markdown renderer, richtext will be dependent on the platform
       * provide the native richtext experience and text will be plain text.
       */
      renderer?: string | "html" | "markdown" | "richtext" | "text";
    }

    export type IUIBooleanFieldOptions = IUISchemaOptions;

    export type IUIDateFieldOptions = IUISchemaOptions;

    export type IUIObjectFieldOptions = IUISchemaOptions;

    export type IUIArrayFieldOptions = IUISchemaOptions;

    export type IUIAutoCompleteWidgetOptions = IUISchemaOptions;

    /**
     * Represents the form data for the AutoCompleteWidget component.
     * @typedef { unknown } AutoCompleteFormData
     */
    export type AutoCompleteFormData<T> = T;

    /**
    Represents the props for the AutoCompleteWidget component.
    @interface
    @property {AutoCompleteFormData} formData - The form data for the component.
    @property {Reactory.Schema.ISchema} schema - The JSON schema for the component.
    @property {Reactory.Schema.IDSchema} idSchema - The ID schema for the component.
    @property {Reactory.Schema.IUISchema} uiSchema - The UI schema for the component.
    @property {unknown} formContext - The form context for the component.
    @property {(formData: AutoCompleteFormData) => void} onChange - The callback function 
    for when the form data changes.
    */
    export interface IAutoCompleteWidgetProps<
      T,
      TSchema extends ISchema,
      TUISchema extends IUISchema,
      TContext extends Client.IReactoryFormContext<unknown>,
    > {
      formData: AutoCompleteFormData<T>;
      schema: TSchema;
      idSchema: {
        $id: string;
      };
      uiSchema: TUISchema;
      formContext: TContext;
      onChange: (formData: AutoCompleteFormData<T> | AutoCompleteFormData<T>[]) => void;
    }

    /**
     * The standard field options for the Reactory UI engines / components.
     */
    export type TReactoryFieldOptions =
      | IUIArrayFieldOptions
      | IUIObjectFieldOptions
      | IUIDateFieldOptions
      | IUIBooleanFieldOptions
      | IUIUTextFieldOptions
      | IUINumberFieldUIOptions
      | IUISchemaOptions;

    export type UISchemaStereotype = "grid" | "tab" | "accordion" | "stepped" | "list" | "paged" | "default" ; 

    /**
     * Place holder interface
     */
    export interface IUISchema {
      /**
       * The wiget tat will be used to render the data element. A widget definition takes priority
       * over other configurations. The widget must be a widget that is registered in the FORM
       * registry (this is different to the reactory component registry).
       * Components can be mapped to widgets using the widget map property on the form.
       */
      "ui:widget"?: string | "null";
      /**
       * This object is passed to the component that is rendering the element.
       * Each option element is unique
       * to the data type / widget
       * that is being used to render the schema element,
       */
      "ui:options"?: TReactoryFieldOptions | unknown | "null";
      /**
       * The ui:field property describes what layout field that is registered in the form registry.
       * GridLayout will use a standard grid mechanism
       */
      "ui:field"?:
        | string
        | "GridLayout"
        | "TabbedLayout"
        | "AccordionLayout"
        | "SteppedLayout"
        | "ListLayout"
        | "PagedLayout";
      /**
       * The grid layout structure. This breaks down the distribtution of properties over a grid.
       * This is generally the default layout
       * for object types.
       */
      "ui:grid-layout"?: IGridLayout[];
      /**
       * The options for the grid layout
       */
      "ui:grid-options"?: IGridOptions;
      /**
       * Provides a tabbed interface for a object type.
       * properties can be mapped to tabs
       */
      "ui:tab-layout"?: ITabLayout[];
      /**
       * Options for the tabbed layout
       */
      "ui:tab-options"?: ITabOptions;
      /**
       * Layout options for the Accordion
       */
      "ui:accordion-layout"?: IAccordionLayout[];
      /**
       * Accordion options
       */
      "ui:accordion-options"?: IAccordionOptions;
      /**
       * Stepped Layout - used where data properties are completed in steps
       */
      "ui:stepped-layout"?: ISteppedLayout[];
      /**
       * Stepped Layout options
       */
      "ui:stepped-options"?: ISteppedOptions;
      /**
       * List layout - used when object properties are displayed as list items
       */
      "ui:list-layout"?: IListLayout[];
      /**
       * List options
       */
      "ui:list-options"?: IListLayoutOptions;
      /**
       * Paged layout - used when object properties / array
       */
      "ui:paged-layout"?: IPagedLayout[];
      /**
       * Paged options
       */
      "ui:paged-options"?: IPagedLayoutOptions;
      /**
       * GraphQL form query overrides are used some widgets.
       * Widgets that use this feature are:
       * * core.LableComponent@1.0.0
       */
      "ui:graphql"?: Reactory.Forms.IReactoryFormQuery;
      [key: string]: IUISchema | unknown;
    }

    export interface ISchemaObjectProperties {
      [key: string]: ISchema;
    }

    export interface ISchema {
      /**
       * The type defines the field type of the Schema element.
       *
       * Valid input types are string inputs that can be:
       * - object
       * - string
       * - number
       * - boolean
       * - array
       * - null
       * - function
       * - promise
       * ### NOTE
       * function | promise !!warning - experimental feature do not use unless trained in the
       * art of function types and promises. The function type will allow you to bind
       * a function to an object using a FQN
       */
      type: string | "object" | "string" | "number" | "boolean" | "array" | "null" | string[];
      /**
       * This value will be automatically generated when using the Reactor.reflectSchema
       */
      $type?: string;
      /**
       * The title field for the schema object.
       */
      title?: string | undefined;
      /**
       * Field description for the schema object
       */
      description?: string | undefined;
      /**
       * default valueu for the schema element
       */
      default?: unknown | undefined;
      /**
       * Required indicator. When true then the field has to have a value
       */
      required?: unknown | undefined;
      /**
       * Schema Object Properties
       */
      properties?: ISchemaObjectProperties | unknown | undefined;
      /**
       * dependencies for the object
       */
      dependencies?: unknown | undefined;
      /**
       * Schema definitions
       */
      definitions?: unknown;
      /**
       * items schema
       */
      items?: ISchema;
      /**
       * format type
       */
      format?: string | "email" | "password" | "date" | "date-time";
      /**
       * valid enum values
       */
      enum?: string[];
      /**
       * When readonly then the field should not allow updates
       */
      readonly?: boolean;
      /**
       * The fully qualified name for the field. When left blank the system
       * will complete this item.
       *
       * eg: reactory.MyApplications@1.0.0/schema.applications.id
       *
       * When your field type is set to function / promise the FQN has to resolve
       * to the function id that must be bound to this object element.
       */
      fqn?: string;
    }

    /**
     * Reference schema elements
     */
    export interface IReferenceSchema {
      $ref: string;
    }

    /**
     *
     */
    export interface IStringSchema extends ISchema {
      type: string | "string";
      minLength?: number;
      maxLength?: number;
      pattern?: string | RegExp;
    }

    export interface INumberSchema extends ISchema {
      type: "number";
      minimum?: number;
      maximum?: number;
    }

    export interface IDateSchema extends ISchema {
      type: string | "string";
      format: "date";
      minimum?: number | string;
      maximum?: number | string;
    }

    export interface IDateTimeSchema extends ISchema {
      type: "string";
      format: "date-time";
      minimum?: number | string;
      maximum?: number | string;
    }

    export interface IObjectSchema extends ISchema {
      type: "object";
      properties?: ISchemaObjectProperties;
    }

    export interface IArraySchema extends ISchema {
      type: "array";
      items:
        | IObjectSchema
        | IDateTimeSchema
        | IDateSchema
        | INumberSchema
        | IStringSchema
        | ISchema;
    }

    export interface IObjectProperties {
      [field: string]: ISchema;
    }

    export type AnySchema = ISchema | IObjectSchema | IArraySchema;

    /**
     * Resolver interface that returns a schema
     */
    export type TServerSchemaResolver = (
      form: Forms.IReactoryForm,
      args: unknown,
      context: Server.IReactoryContext,
      info: unknown,
    ) => Promise<AnySchema>;

    /**
     * Client function interface that returns a client schema
     */
    export type TClientSchemaResolver = (
      form: Forms.IReactoryForm,
      reactory: Client.IReactoryApi,
    ) => Promise<AnySchema>;

    /**
     * UI Server side client uiSchema Resolver
     */
    export type TServerUISchemaResolver = (
      form: Forms.IReactoryForm,
      args: unknown,
      context: Server.IReactoryContext,
      info: unknown,
    ) => Promise<Schema.IFormUISchema>;

    /**
     * Client UI Schema Resolver
     */
    export type TClientUISchemaResolver = (
      form: Forms.IReactoryForm,
      reactory: Client.IReactoryApi,
    ) => Promise<Schema.IFormUISchema>;

    /**
     *
     */
    export interface IReactoryFormQueryErrorHandlerDefinition {
      componentRef: string;
      method: string;
    }

    export interface IFormUIOptions {
      submitIcon?: string;
      submitIconProps?: {
        color: string | "primary" | "secondary";
        [key: string]: unknown;
      };
      submitProps?: {
        variant?: string | "fab" | "contained" | "outlined" | "text";
        iconAlign?: string | "left" | "right";
        /**
         * If onClick is a string, form engine
         * will look up the component, then call the 
         * function with the following params.
         * (formData, formContext, formDefintion, onSubmit) => void 
         * 
         * This function can be used as a custom handler, or as an additional
         * handler that can call the onSubmit function when it has 
         * completed it's execution.
         * @returns 
         */
        onClick?: () => void | FQN;
        href: unknown;
        [key: string]: unknown;
      };
      showSubmit?: boolean;
      showHelp?: boolean;
      showRefresh?: boolean;
      toolbarStyle?: React.CSSProperties;
      toolbarPosition?: string;
      buttons?: unknown[];
      showSchemaSelectorInToolbar?: boolean;
      schemaSelector?: {
        variant?: string | "icon-button" | "dropdown";
        style?: React.CSSProperties;
        showTitle?: boolean;
        selectSchemaId?: string;
        buttonStyle?: React.CSSProperties;
        buttonVariant?: unknown;
        buttonTitle?: string;
        activeColor?: unknown;
        components?: string[];
      };
    }

    export interface UISchemaGridLayout {
      style?: unknown;
      [key: string]: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        doShow?: (e: { formData?: unknown; formContext?: unknown }) => boolean;
        rowProps?: {
          [key: string]: unknown;
        };
        render?: (props: unknown) => JSX.Element;
      };
    }
    export interface IFormUISchema extends IUISchema {
      /**
       * "ui:form" is prefered method to set Form specific settting.
       */
      "ui:form"?: IFormUIOptions;
    }
  }

  export namespace Web {}

  export namespace Workflow {
    export interface IWorkflow {
      id: string;
      nameSpace: string;
      name: string;
      version: string;
      component: unknown;
      category: string;
      autoStart?: boolean;
      props?: unknown;
    }
  }

  export namespace Git {
    export interface GitCredentials {
      /**
       * The public key to use. This should represent a file on disk.
       */
      publicKey?: string;
      /**
       * The username to use when submitting
       */
      username?: string;
      /**
       * The password to use when submitting
       */
      password?: string;
      /**
       * A token to use when submitting
       */
      token?: string;
      /**
       * Boolean indicator for ssh.
       */
      ssh?: boolean;
    }

    /**
     * Defines a git command structure
     */
    export interface GitCommand {
      /**
       * The the git command name. this must be a valid git command. i.e.
       * checkout develop,fetch origin develop, branch feature/featurename,commit
       */
      command: string;
      /**
       * If set to true command execution will stop if an error occurs
       */
      exitOnError?: boolean;
    }

    /**
     * The reactory git options
     */
    export interface GitOptions {
      /**
       * The branch name to use
       */
      branch?: string;

      /**
       * The git commands to execute
       */
      commands?: unknown[];

      /**
       * Credentials object for the user
       */
      credentials?: GitCredentials;
      /**
       * The credentials id for the logged in user
       * to use for credentials. If this is set the properties
       * on the crediential id will must support the
       * git credentials
       */
      credentialsId?: string;
      /**
       * Credentials pin. When credentials are
       * persisted with a pin number, then only the user
       * with the pin can access those credentials.
       *
       * If no pin is set, the user credentials are encrypted
       * using the default reactory encryption tools
       */
      credentialsPin?: string;
    }
  }
}
