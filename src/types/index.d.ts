import { ObjectId } from "mongodb";
import Mongoose from "mongoose";
import { MimeType } from 'chartjs-node-canvas';
import fs from 'fs';
import ExcelJS from 'exceljs';
import { Stream } from "stream";
import moment from "moment";
import { v4 as uuid } from 'uuid';
import { GraphQLSchema } from 'graphql';
import classNames from 'classnames';
import ObjectMapper from 'object-mapper';
import HumanNumner from 'human-number';
import HumanDate from 'human-date';
import i18n from "i18next";
import {
  ApolloClient,
  ApolloQueryResult, MutationResult,
  Resolvers, gql, DocumentNode, NormalizedCacheObject, FetchResult
} from '@apollo/client';

import * as ApolloCoreAlias from '@apollo/client';
import * as ApolloReactAlias from '@apollo/client/react';
import * as ApolloHOCAlias from '@apollo/client/react/hoc';
import * as ApolloReactHooksAlias from '@apollo/client/react/hooks';
import * as ApolloReactComponentsAlias from '@apollo/client/react/components';
import Module from 'module';
import * as ReactAlias from 'react';
import { Container } from "inversify";
import LocalForage from "localforage";
import * as Lodash from "lodash";
import * as MaterialCoreAlias from '@mui/material';
import * as MaterialLabsAlias from '@mui/lab';
import * as MaterialStylesAlias from '@mui/styles';
import * as MaterialIconsAlias from '@mui/icons-material'
import * as ReactRouterAlias from 'react-router';
import * as ReactRouterDomAlias from 'react-router-dom';
import i18next from "i18next";
import { JsxEmit } from "typescript";

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



  export interface IKeyValuePair<K, V> {
    key: K,
    value: V
  }

  /**
   * Object Transform object is used for fine grained control over an object data set.
   */
  export interface ObjectTransform { 
    key: string,
    transform<T>(sourceObject: any, sourceKey: string, targetObject: any, targetKey: string): T
    default: Function | string | number
  }

  export type ObjectMapEntry = string | ObjectTransform

  export type ObjectMapMultiTargetEntry = ObjectMapEntry[]

  export type ObjectMap = IKeyValuePair<string, ObjectMapEntry | ObjectMapMultiTargetEntry>

  export type ObjectMapper = {
    merge<TSource, TResult>(source: TSource, map: ObjectMap): TResult
    merge<TSource, TResult>(source: TSource, destination: TResult, map: ObjectMap): TResult
  }
  /**
   * A struct representation of IComponentFqnDefinition
   */
  export interface IComponentFqnDefinition {
    nameSpace: string
    name: string
    version: string
    toString?: (includeVersion?: boolean) => string
    [key: string]: any
  }

  /**
   * Simple interface type that provides the reactory sdk as a property
   */
  export interface IReactoryComponentProps {
    /**
     * We flag the reactory property
     * optional as the component could be autowired during registration
     */
    reactory: Client.IReactoryApi,
    [key: string]: any
  }


  export namespace Client {

    export interface LoadashTemplateExecutor {
      (data?: object): string;
      source: string;
    }


    export interface IFrameProperties {
      url: string
      height: string
      width: string
      styles: any
      method?: string
    }

    export interface IMessageHandler {
      id: string
      name: string
      type: string
      uri: string
      component: string
    }

    export interface IFramedWindowProperties {
      proxyRoot?: string
      frameProps?: IFrameProperties
      messageHandlers?: IMessageHandler[]
    }

    export interface NotificationProperties {
      title: string,
      options: NotificationOptions
    }

    export type ValidComponent<P, S, SS> = React.Component<P, S, SS> | React.FunctionComponent<P> | React.PureComponent<P, S, SS>;

    export type AnyValidComponent = ValidComponent<any, any, any> | Function

    export type ValidModule = AnyValidComponent | Object | Module;

    export interface IReactoryImports {
      [key: string]: ValidModule
    }

    export interface ResetPasswordProps {
      password: string,
      confirmPassword: string,
      resetToken: string
    }

    export interface ClientUtils {
      omitDeep(): any,
      queryString(): any,
      hashCode: (inputString: string) => any,
      injectResources(sources: any[]): void,
      componentFqn(fqn: Reactory.IComponentFqnDefinition): string,
      pluginDefinitionValid(definition: any): boolean,
      moment: moment.Moment,
      objectMapper(src: any, map: any): any,
      template(
        string?: string,
        options?: Lodash.TemplateOptions
      ): LoadashTemplateExecutor
      humanNumber(value: any | number): string
    }

    /**
     * Reactory Api utilities interface.
     */
    export interface IReactoryApiUtils {
      /**
       * Utility function that deep removes any properties matching the key input.
       */
      omitDeep: (obj: Object | Object[] | any | any[], key?: string) => any,
      /**
       * Query string utility
       */
      queryString: {
        parse: (queryString: string) => object,
        stringify: (props: object) => string
      },
      /**
       * Simple hash code generator
       */
      hashCode: (inputString: string) => number,
      /**
       * utility function that injects css and script resources into the application
       */
      injectResources: (sources: Forms.IReactoryFormResource[]) => void,
      /**
       * Function that will return a fqn string of a reactory component FQN.
       */
      componentFqn: (component: Reactory.IComponentFqnDefinition) => string,
      /**
       * Validation function to check if plugin passes validation
       */
      pluginDefinitionValid: (pluginDef: Reactory.Platform.IReactoryPluginDefinition) => boolean,
      /**
       * Moment interface
       */
      moment: typeof moment,
      /**
       * Object mappper utility used to convert objects from one shape to another
       */
      objectMapper: typeof ObjectMapper,
      /**
        * Creates a compiled template function that can interpolate data properties in "interpolate" delimiters,
        * HTML-escape interpolated data properties in "escape" delimiters, and execute JavaScript in "evaluate"
        * delimiters. Data properties may be accessed as free variables in the template. If a setting object is
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
      template: (templateString: string, templateOptions?: Lodash.TemplateOptions) => Lodash.TemplateExecutor,
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
      templateObject: <T>(item: Object, props: any) => T,
      /**
       * Function to provide easy to read humanized numbers.
       * i.e. 13000 -> 13K
       */
      humanNumber: typeof HumanNumner,
      /**
       * utility function to check if something is nil
       */
      nil: (o: any) => boolean,
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
        sanitize: (sanitizeSchema: any, data: any) => void,
        /**
         * Validate data against a validation schema
         */
        validate: (validationSchema: any, data: any) => any
      },
      /**
       * Shortcut to the gql document function
       */
      gql: typeof gql,
      /**
       * Human date short cut
       */
      humanDate: typeof HumanDate,
      /**
       * returns a slug version of input text. 
       * if limit param is > 0 then it will substring the text if it is longer
       * than the given limit.
       */
      slugify: (text: string, limit?: number) => string,
      /**
       * A function that compares if two objects/ arrays are equal.
       */
      deepEquals: (a: any, b: any, ca?: any[], cb?: any[]) => boolean
      /**
       * Lodash module
       */
      lodash: typeof Lodash,
      /**
       * generates class names 
       */
      classNames: typeof classNames,
      /**
       * Utility  function to generate a v4 uuid
       */
      uuid: typeof uuid,
      /**
       * Collects data from a collection of forms. This is useful when
       * you have several forms on a page and want collect all data 
       * from the forms programmatically.
       * 
       * Pass in a shape object that can be used by the ObjectMapper to 
       * translate the object into a desired shape.
       */
      collectData: <T>(forms: any[], shape: any) => T,
      /**
       * localForage
       */
      localForage: LocalForage
      /**
       * Utility function to check if a string is a valid email
       */
      isEmail: (email: string) => boolean,
      /**
       * Utility function to check if a password passes minimum required 
       * spec.
       */
      isValidPassword: (passw: string) => boolean
    }

    /**
     * Defines the interface definition for a component
     * that is registered in the client kernel.
     */
    export interface IReactoryComponentRegistryEntry<T> {
      nameSpace: string
      name: string
      version: string
      component: T
      tags?: string[]
      roles?: string[]
      connectors?: any[]
      componentType?: string | "form" | "module" | "function" | "class" | "component" | "widget" | "form-widget"
      title?: string,
      description?: string
    }

    /**
     * interface for the component register
     */
    export interface IReactoryComponentRegister {
      [key: string]: IReactoryComponentRegistryEntry<any>
    }

    export interface ILoginResult {
      user: {
        firstName: string,
        lastName: string,
        token: string
      }
    }

    export interface IReactoryApi {
      history: any;
      queries: any;
      mutations: any;
      props: any;
      componentRegister: IReactoryComponentRegister;
      client: ApolloClient<NormalizedCacheObject>;
      login: (email: string, password: string) => Promise<ILoginResult>;
      register: Function;
      reset: Function;
      forgot: Function;
      utils: IReactoryApiUtils;
      companyWithId: Function;
      $func: any;
      rest: any;
      tokenValidated: boolean;
      lastValidation: number;
      tokenValid: boolean;
      getAvatar: Function;
      getOrganizationLogo: Function;
      getUserFullName: Function;
      CDN_ROOT: string;
      API_ROOT: string;
      CLIENT_KEY: string;
      CLIENT_PWD: string;
      formSchemas: Forms.IReactoryForm[];
      formSchemaLastFetch: moment.Moment;
      assets: any;
      amq: any;
      statistics: any;
      __form_instances: any;
      flushIntervalTimer: any;
      __REACTORYAPI: boolean;
      publishingStats: boolean;
      reduxStore: any;
      muiTheme: any;
      queryObject: any;
      queryString: any;
      objectToQueryString: Function;
      i18n: typeof i18next

      [key: string]: any;


      /**
       * Clears local application cache.
       */
      clearCache(): void

      /**
       * 
       * @param title Central notification api call
       * @param notificationProperties 
       */
      createNotification(title: string, notificationProperties: NotificationProperties | any): void;

      /**
       * 
       * @param where 
       * @param state 
       */
      goto(where: string, state: any): void;

      /**
       * Registers a function with reactory component.
       * @param fqn 
       * @param functionReference 
       * @param requiresApi 
       */
      registerFunction(fqn: string, functionReference: Function, requiresApi: boolean): void;

      /**
       * central logging for the client
       * @param message 
       * @param params 
       * @param kind 
       */
      log(message: string, params?: any, kind?: string | "error" | "debug" | "warning" | "info"): void;

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
       * Use the stat() function to log any statistic you want persisted and associated with the user 
       * @param key - string key 
       * @param statistic - any data structure
       */
      stat(key: string, statistic: any): void;

      /**
       * 
       * @param formInstance 
       */
      trackFormInstance(formInstance: any): void;

      /**
       * Executes a graph mutation against the API
       * 
       * @param mutation 
       * @param variables 
       * @param options 
       */
      graphqlMutation<T, V>(mutation: DocumentNode | string, variables: V, options?: any): Promise<FetchResult<T>>;

      /**
       * Executes a graph query against the API
       * @param query - A graph document node or string.
       * @param variables - The variables object to use for the query
       * @param options - any additional options
       */
      graphqlQuery<T, V>(query: DocumentNode | string, variables: V, options?: any): Promise<ApolloQueryResult<T>>;

      /**
       * 
       * @param user A function call that is executed on login. 
       */
      afterLogin(user: Client.ILoginResult): Promise<Models.IApiStatus>;

      /**
       * 
       * @param Component 
       * @param props 
       * @param target 
       */
      loadComponent(Component: ValidComponent, props: any, target: any): void;

      /**
       * 
       * @param fqn 
       * @param props 
       * @param target 
       */
      loadComponentWithFQN(fqn: string, props: any, target: any): void;

      /**
       * ??
       * @param componentView 
       */
      renderForm(componentView: any): any;

      /**
       * Function call to render a reactory form component.
       * @param form 
       */
      reactoryForm(form: Forms.IReactoryForm): React.ReactElement;

      /**
       * Function call to reload the forms
       */
      forms(): void;

      raiseFormCommand(commandId: string, commandDef: any, formData: any): Promise<any>;

      startWorkFlow(workFlowId: string, data: any): void;

      onFormCommandEvent(commandId: string, func: Function): void;

      hasRole(
        itemRoles: string[],
        userRoles?: string[],
        organization?: Models.IOrganization,
        business_unit?: Models.IBusinessUnit,
        userMembership?: Models.IMembership[]): boolean;

      isAnon(): boolean;

      addRole(user: Reactory.Models.IUser,
        organization: Models.IOrganization,
        role: string): boolean;

      removeRole(user: Reactory.Models.IUser,
        organization: Models.IOrganization,
        role: string): boolean;

      getMenus(target: any): any[];

      getTheme(): any;

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
      getApplicationRoles(): any[];
      
      /**
       * Set the "User" object. This user object is technically an API response object that is 
       * constructed from the logged in user.
       * @param user
       */
      setUser(user: any): void;
      
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
        component: any,
        tags?: string[],
        roles?: string[],
        wrapWithApi?: boolean,
        connectors?: any[],
        componentType?: string): void;

      /**
       * Use getComponents to retrieve components from the registry.
       * @param componentFqns 
       */
      getComponents<T>(componentFqns: any[]): T;
      /**
       * Returns a component for the given key.
       * @param fqn 
       */
      getComponent<T>(fqn: string): T;
      
      /**
       * Returns a slice of all the components that match the type
       * @param type 
       */
      getComponentsByType(type: string): IReactoryComponentRegister

      /**
       * 
       * @param notFoundComponentFqn Returns a component to use a 
       */
      getNotFoundComponent(notFoundComponentFqn: string): ValidComponent;

      getNotAllowedComponent(notAllowedComponentFqn: string): ValidComponent;

      mountComponent(ComponentToMount: ValidComponent,
        props: any, domNode: any, theme: any, callback: Function): void;

      showModalWithComponentFqn(componentFqn: string, title: string, props: any,
        modalProps: any, domNode: any, theme: any, callback: Function): void;

      showModalWithComponent(title: string, ComponentToMount: ValidComponent,
        props: any, modalProps: any, domNode: any, theme: any, callback: Function): void;

      createElement(ComponentToCreate: ValidComponent, props: any): any;

      unmountComponent(node: any): boolean;

      logout(refreshStatus: boolean): void;

      getLastValidation(): number | any;

      getTokenValidated(): boolean | any;

      getUser(): Models.IApiStatus;

      saveUserLoginCredentials(provider: string, props: any): Promise<any>;

      getUserLoginCredentials(provider: string): Promise<any>;
      
      /**
       * Stores an Object With a Key
       * @param key - unique key to use for the item
       * @param objectToStore - the object to store
       * @param indexDB - if true will use localForage / index DB to store the data, default is false
       * @param cb - callback only applicable to indexDB true
       */
      storeObjectWithKey(key: string, objectToStore: any, indexDB?: boolean, cb?: (err: any) => void): Promise<void>;

      /**
       * Reads an object from local storage
       * @param key - the key to use for reading the storage
       * @param indexDB - boolean flag to indicate whether or not to use index db
       * @param cb  - callback for error handling
       */
      readObjectWithKey(key: string, indexDB?: boolean, cb?: (err: any) => void): Promise<any>;
      
      /**
       * deletes an object from local storage
       * @param key - the key to use for deleting 
       * @param indexDB - boolean to indicate if the key is indexDB
       * @param cb - callback for error handling
       */
      deleteObjectWithKey(key: string, indexDB?: boolean, cb?: (err: any) => void): Promise<void>;
      
      /**
       * Calls the API Status graph endpoint
       * @param options 
       */
      status(options: any): Promise<Models.IApiStatus>;

      validateToken(token: string): any;

      resetPassword(resetProps: ResetPasswordProps): Promise<any>;

      setViewContext(context: any): void;

      getViewContext(): any;

      extendClientResolver(resolver: any): void;

      setDevelopmentMode(enabled: boolean): void;

      isDevelopmentMode(): boolean;
    }

    export interface IReactoryWiredComponent {
      /**
       * The global reactory variable that represent the reactory api instance
       */
      reactory: IReactoryApi,
    }

    export interface IReactoryFormContext<T> {
      signature: string,
      version: number,
      formDef: Forms.IReactoryForm,
      formData: T,
      query: any,
      formInstanceId: string,
      $ref: any,
      refresh: (args: any) => void,
      setFormData: (formData: T, callback: () => void) => void,
      graphql: Forms.IFormGraphDefinition,
      getData: (data?: T) => void,
      reset: () => void,
      screenBreakPoint: string | "xs" | "sm" | "md" | "lg" | "xl",
      [key: string]: any
    }


    export interface IReactoryFormProps {
      ref?: (formRef: any) => void;
      uiSchemaKey?: string;
      uiSchemaId?: string;
      data?: any | any[];
      formData?: any | any[];
      formDef?: Reactory.Forms.IReactoryForm;
      formId?: string,
      helpTopics?: string[],
      helpTitle?: string,
      uiFramework?: string,
      mode?: string | "view" | "edit" | "new",
      formContext?: any,
      extendSchema?: Function,
      busy?: boolean,
      events?: Object,
      query?: Object,
      onChange?: Function,
      onSubmit?: Function,
      onError?: Function,
      onCommand?: Function,
      onMutateComplete?: Function,
      onQueryComplete?: Function,
      before?: React.Component | React.ReactNode | React.ReactNodeArray,
      children?: React.ReactNode | React.ReactNodeArray,
      $route?: any,
      $App?: any,
      validate?: Function,
      transformErrors?: Function,
      autoQueryDisabled?: boolean,
      routePrefix?: string,
      refCallback?: (formReference: any) => void,
      queryOnFormDataChange?: boolean,
      onBeforeMutation?: Function,
      onBeforeQuery?: Function,
      componentType?: string | "form" | "widget",
      watchList?: string[]
      [key: string]: any
    }

    /**
     * The base widget property set. Additional property type created 
     * by extending this interface for your specfic form type
     */
    export interface IReactoryWidgetProps<T> extends IReactoryWiredComponent {
      formData: T,
      schema: Schema.ISchema,
      uiSchema: any,
      idSchema: any,
      formContext: Reactory.Client.IReactoryFormContext<T>,
      [key: string]: any
    }

    export interface IReactoryClientRoute {
      path: string,
      caseSensitive?: boolean,
      key: any,
      element: (route: Routing.IReactoryRoute) => JSX.Element
    }


    export namespace Web {

      export type MaterialCore = typeof MaterialCoreAlias;
      export type MaterialStyles = typeof MaterialStylesAlias;
      export type MaterialLabs = typeof MaterialLabsAlias;
      export type MaterialIcons = typeof MaterialIconsAlias;

      export interface IMaterialModule {
        MaterialCore: MaterialCore,
        MaterialStyles: MaterialStyles,
        MaterialLabs: MaterialLabs,
        MaterialIcons: MaterialIcons
      }

    }

    export namespace Components {
      export interface StaticContentProps {
        slug: string
        editRoles?: string[]
        defaultValue?: JSX.Element
        [key: string]: any
      }

      type StaticContentWidget = (props: StaticContentProps) => JSX.Element;

      export interface IDropDownMenuItem { 
        id?: string, 
        key?: string, 
        title?: string, 
        icon?: string
      }

      export interface DropDownMenuProps {
        menus: IDropDownMenuItem[],
        onSelect: (evt: React.SyntheticEvent, menu: IDropDownMenuItem) => void 
      }

      export type DropDownMenu = (props: DropDownMenuProps) => JSX.Element;

      export interface FullScreenModalProps {
        onClose: () => void,
        title: string,
        children: any,
        open: boolean,
        [key: string]: any
      }

      export type FullScreenModal = (props: FullScreenModalProps) => JSX.Element;
      export interface TAny {
        id?: string,
        [key: string]: any
      }

      export type MaterialListItemStyleFunction = (item: TAny, formContext: Reactory.Client.IReactoryFormContext<TAny>, index: number, items: TAny[]) => StyleSheet;
      export type MaterialListItemObjectValueProvider = (item: TAny, formContext: Reactory.Client.IReactoryFormContext<TAny>, index: number, items: TAny[]) => any;
      export type MaterialListItemStringValueProvider = (item: TAny, formContext: Reactory.Client.IReactoryFormContext<TAny>, index: number, items: TAny[]) => string;
      export interface IMaterialListWidgetOptions<T> {
        /**
         * String field template to use for primary text
         */
        primaryText?: string | MaterialListItemStringValueProvider,
        /**
         * String field template for secondary text
         */
        secondaryText?: string | MaterialListItemStringValueProvider,
        /**
         * String field template for avatar
         */
        avatar?: string | MaterialListItemStringValueProvider,

        /**
         * String field template for the avatar alt
         */
        avatarAlt?: string | MaterialListItemStringValueProvider,
        /**
         * position of the avatar
         */
        avatarPosition?: string | "right" | "left",
        /**
         * avatar source field. Use this field to specify which property 
         * should be used on the item as the source for the avatar
         */
        avatarSrcField?: string | MaterialListItemStringValueProvider,

        /**
         * The alt field name or provider function
         */
        avatarAltField?: string | MaterialListItemStringValueProvider,
        /**
         * Dropdown field / action button for the list item
         */
        dropdown?: string | MaterialListItemStringValueProvider,
        /**
         * Boolean to indicate if the list data must be 
         * fetched by the component
         */
        remoteData?: boolean,
        /**
         * variable map to use for the input
         */
        variables?: object,
        /**
         * Result map to use when converting the data
         */
        resultMap?: object,
        /**
         * Key to use for to extract the array from the result
         */
        resultKey?: string,
        /**
         * Properties to pass to the List object
         */
        listProps?: any,
        /**
         * The name of the query on the graphql definition
         */
        query?: string,
        /**
         * Pagination settings for the list item
         */
        pagination?: {
          /**
           * Page size 
           */
          pageSize?: 25,
          /**
           * the variant will determine how the paging is managed
           */
          variant?: string | "page" | "infinte",
          /**
           * The result key to use for extracting the pagination field
           */
          resultKey?: string,
          /**
           * Object map for mapping the result
           */
          resultMap?: any
        },
        /**
         * The icon property
         */
        icon?: string | MaterialListItemStringValueProvider,
        /**
         * Icon classname 
         */
        iconClassname?: string | MaterialListItemStringValueProvider,
        /**
         * The field name on the item to be referenced for the icon
         */
        iconField?: string | MaterialListItemStringValueProvider,
        /**
         * a map that is used to map the value in the item field
         * to an icon
         */
        iconFieldMap?: {
          [key: string]: string | MaterialListItemStringValueProvider
        },
        /**
         * Stylesheet for the icon formatting
         */
        iconStyle?: StyleSheet | MaterialListItemStyleFunction,
        /**
         * Position of icon
         */
        iconPosition?: string | "left" | "right",
        /**
         * any custom jss we want to use when creating the list item
         */
        jss?: any,
        /**
         * A custom component that we may want to use for the item instead of the default 
         * list item.
         */
        listItemsComponent?: string,

        /**
         * Secondary Action options
         */
        secondaryAction?: {
          label?: string | MaterialListItemStringValueProvider,
          iconKey?: string | MaterialListItemStringValueProvider,
          componentFqn?: string | MaterialListItemStringValueProvider,
          component?: MaterialListItemObjectValueProvider,
          action?: string | MaterialListItemStringValueProvider,
          actionData?: any | MaterialListItemObjectValueProvider,
          link?: string | MaterialListItemStringValueProvider,
          props?: any,
          propsMap?: any
        },
        [key: string]: any
      }

      export type MaterialTableWidgetColumnDefinition = {
        /**
         * Field title
         */
        title: string,
        /**
         * The field / property name on the data set
         */
        field: string,
        /**
         * A component to bind to the column
         */
        component?: string,
        /**
         * Array of components to bind
         */
        components?: any[]
        /**
         * An array of components to bind to the column
         */
        propsMap?: any,
        /**
         * 
         */
        props?: any,
        /**
         * 
         */
        sort?: boolean,
        /**
         * 
         */
        total?: boolean,        

        /**
         * 
         */
        breakpoint?: string,

        aggregator?: (column: MaterialTableWidgetColumnDefinition, data: any[] ) => any,
        [key: string]: any
      }

      export interface IMaterialTableWidgetActionEvent {
        via?: string | "form" | "amq" | "component",
        /**
         * name of the event 
         */
        name?: string,
        /**
         * object map to use when mapping properties
         */
        paramsMap?: any,
        /**
         * when the via is set to component 
         * the event that is raised
         **/
        component?: string

        [key: string]: any
      }

      export interface IMaterialTableConfirmationDialogProps {
        key: string
        
        icon?: string
        iconProps?: {
          style?: React.CSSProperties
          [key: string]: any
        }
        
        title: string
        titleProps?: {
          style?: React.CSSProperties
          [key: string]: any
        }

        content: string,
        contentProps?: {
          style?: React.CSSProperties          
          [key: string]: any
        }
        
        acceptTitle: string
        confirmProps?: {
          variant: string
          style?: React.CSSProperties
          [key: string]: any
        }
        
        cancelTitle: string
        cancelProps?: {
          variant: string
          style?: React.CSSProperties
          [key: string]: any
        }

        /**
         * Mutation to execute
         */
        mutation?: string
        /**
         * variable map to use for mapping
         * properties to mutation params.
         */
        variables?: any,
        /**
         * The result map to use (will se the default on associated with )
         */
        resultMap?: any,

        /**
         * The action to execute on completion
         */
        resultAction?: string | "refresh" 
      }

      /**
       * Row action
       */
      export interface IMaterialTableWidgetAction {
        /**
         * icon to use for row action
         */
        icon?: string,
        /**
         * the tooltip to display
         */
        tooltip?: string,
        /**
         * if a free action the action will display in the toolbar
         */
        isFreeAction?: boolean,
        /**
         * the key for the action
         */
        key: string
        /**
         * Material Table Widget Action
         */
        event?: IMaterialTableWidgetActionEvent

        /**
         * When defined it will render the component
         */
        componentFqn?: string,

        /**
         * The property map to use for the component
         */
        propsMap?: any,

        /**
         * The name of the mutation to invoke.
         */
        mutation?: string

        /**
         * The confirmation dialog properties
         */
        confirmation?: IMaterialTableConfirmationDialogProps
                
        [key: string]: any
      }

      /**
       * Options interface for the Reactory Material Table Widget
       * 
       */
      export interface IMaterialTableWidgetOptions {
        /**
         * If set to showLabel is set to false
         */
        showLabel?: boolean,
        /**
         * Allow Add. When set to true, the table will provide an add interface for the grid.
         */
        allowAdd?: boolean,

        /**
         * Allow delete. When set to true the table will provide interfcae for the deleting of records.
         */
        allowDelete?: boolean,

        /**
         * Delete button properties
         */
        deleteButtonProps?: {
          icon?: string,
          tooltip?: string,
          color?: string,
          onClick?: string,
          onClickPropsMap?: any,
          onClickProps?: any
          [key: string]: any
        }

        /**
         * Add button properies
         */
        addButtonProps?: {
          icon?: string,
          tooltip?: string,
          color?: string,
          onClick?: string,
          onClickPropsMap?: any,
          onClickProps?: any
          [key: string]: any
        }
        
        /**
         * Column definition
         */
        columns: MaterialTableWidgetColumnDefinition[],
        /**
         * Is the data provided via remote query
         */
        remoteData?: boolean,
        /**
         * query name
         */
        query?: string,
        /**
         * localization options
         */
        localization?: any,

        /**
         * Refresh Events 
         */
        refreshEvents?: { name: string }[]
         
        /**
         * The options for the the table interface
         */        
        options?: {
          /**
           * Enables or disables grouping
           */
          grouping?: boolean,
          /**
           * Group by fields
           */
          groupBy?: string[],

          /**
           * Enable search in toolbar
           */
          search?: boolean,
          /**
           * Show title in field
           */
          showTitle?: boolean,
          /**
           * Show or hide toolbar
           */
          toolbar?: boolean
          /**
           * Enable or disable selection
           */
          selection?: boolean
          /**
           * Page size 
           */
          pageSize?: number,
          /**
           * Page size options
           */
          pageSizeOptions?: number[]
          /**
           * allow ordering
           */
          allowOrder?: boolean
          /**
           * The field that we want to use for ordering the result
           */
          orderField?: string,
          /**
           * Allow Sort
           */
          sortFields?: { field: string, direction?: "asc" | "desc" }[],

          [key: string]: any,
        },
        /**
         * The component map
         */
        componentMap?: {
          DetailsPanel?: string,
          Toolbar?: string
        },
        actions?: IMaterialTableWidgetAction[],
        /**
         * Toolbar static props
         */
        toolbarProps?: any,
        /**
         * Toolbar property map
         */ 
        toolbarPropsMap?: any,
        /**
         * Where to place the toolbar
         */
        toolbarPosition?: string | 'none' | 'top' | 'bottom',
        /**
         * 
         */
        detailPanelPropsMap?: any,
        /**
         * Static properties to pass to the detail panel
         */
        detailPanelProps?: any, 
        /**
         * 
         */
        resultMap?: any,
        resultType?: string | 'array' | 'object',
        resultKey?: string
        variables: any
        /**
         * 
         */
        [key: string]: any
      }


      export type SupportTicket = (props: { reference: string, mode: "view" | "edit" | "new" }) => JSX.Element
    }

    export namespace ReactNative {

    }

  }

  export namespace Excel {
    export interface IExcelColumnDefinition {
      title: string
      propertyField: string
      format: string
      type: string
      width?: number,
      key?: string,
      required: boolean,
      style?: any
    }

    export interface IExcelSheet {
      name: string
      index: number
      arrayField: string
      startRow: number
      columns: IExcelColumnDefinition[]
    }

    export interface IExcelExportOptions {
      filename: string
      sheets: IExcelSheet[]
    }


    export interface IExport extends Client.IFramedWindowProperties {
      title?: string
      engine?: string
      useClient?: boolean
      mappingType?: string
      mapping?: any
      icon?: string
      exportOptions?: any | IExcelExportOptions
      disabled?: string
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
      IN = " IN "
    }

    export type SortDirection = "asc" | "ascending" | "desc" | "descending"

    export interface SQLColumn {
      field: string,
      type: string,
      title: string,
      widget: string
    }

    export interface SQLFilter {
      field: string,
      value: any,
      operator: Operator
    }

    export interface SQLContext {
      schema?: string,
      table?: string,
      commandText?: string,
      provider?: string,
      connectionId: string
    }

    export interface SQLFilter {
      field: string
      value: any
      operator: Operator
    }

    export interface PagingRequest {
      page: number
      pageSize: number
    }

    export interface PagingResult {
      total: number
      page: number
      hasNext: boolean
      pageSize: number
    }

    export interface SQLQueryResult {
      paging: PagingResult
      columns: SQLColumn[]
      filters: SQLFilter[]
      context: SQLContext
      data: any | any[]
    }

    export interface SQLInsertResult {
      columns: SQLColumn[]
      success: boolean
      recordsAffected: number
    }

    export interface SQLUpdateResult {
      success: boolean
      recordsAffected: number
    }

    export interface SQLDeleteResult {
      success: boolean
      recordsAffected: number
    }

    export interface SQLQuery {
      paging?: PagingRequest
      columns?: SQLColumn[]
      filters?: SQLFilter[]
      context: SQLContext,
    }

    export interface SQLInsert {
      columns: SQLColumn[]
      values: any[]
      context: SQLContext
    }

    export interface SQLUpdate {
      columns: SQLColumn[]
      values: any[]
      context: SQLContext
    }

    export interface SQLDelete {
      filter: SQLFilter[]
      context: SQLContext
    }

    export interface SQLParam {
      name: string
      type: string
      value: any
    }

    export interface SQLProcedure {
      name: String,
      parameters: SQLParam[]
    }

    export interface QueryStringResultWithCount {
      query: string,
      count: number
    }

    export interface QueryStringGenerator {
      fromQuery(queryCommand: SQLQuery): Promise<QueryStringResultWithCount>;
      fromInsert(insertCommand: SQLInsert): string;
      fromUpdate(updateCommand: SQLUpdate): string;
      fromDelete(deleteCommand: SQLDelete): string;
    }


    export interface IReactoryDatabase {
      Create: {
        [key: string]: (insertCommand: any | SQLInsert, request_context: Reactory.Server.IReactoryContext) => Promise<any>
      },
      Read: {
        [key: string]: (queryCommand: any | SQLQuery, request_context: Reactory.Server.IReactoryContext) => Promise<any>
      },
      Update: {
        [key: string]: SQLUpdate
      },
      Delete: {
        [key: string]: SQLDelete
      }
      StoredProcedures: {
        [key: string]: SQLProcedure
      },
      Install?: {
        [key: string]: (context: Reactory.Server.IReactoryContext) => Promise<any>
      },
    }

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
      description: string,
      /**
       * A property containing the fields
       */
      fields?: {
        ArrayField: Reactory.Client.AnyValidComponent
        BooleanField: Reactory.Client.AnyValidComponent
        DescriptionField: Reactory.Client.AnyValidComponent
        NumberField: Reactory.Client.AnyValidComponent
        ObjectField: Reactory.Client.AnyValidComponent
        SchemaField: Reactory.Client.AnyValidComponent
        StringField: Reactory.Client.AnyValidComponent
        TitleField: Reactory.Client.AnyValidComponent
        GridLayout: Reactory.Client.AnyValidComponent
        TabbedLayout: Reactory.Client.AnyValidComponent
        UnsupportedField: Reactory.Client.AnyValidComponent
        [key: string]: Reactory.Client.AnyValidComponent
      },
      /**
       * A property containing custom widgets
       */
      widgets?: {
        [key: string]: Reactory.Client.AnyValidComponent
      },
      /**
       * A property for field templates. 
       */
      templates?: {
        ArrayFieldTemplate: Reactory.Client.AnyValidComponent
        DateFieldTemplate: Reactory.Client.AnyValidComponent
        FieldTemplate: Reactory.Client.AnyValidComponent
        FormErrorList: Reactory.Client.AnyValidComponent
        ObjectTemplate: Reactory.Client.AnyValidComponent
        [key: string]: Reactory.Client.AnyValidComponent
      },
      /**
       * for future use
       */
      assets?: any
      /**
       * for future use
       */
      resources?: any
      [key: string]: any
    }

    /**
     * Container for key pair of 
     */
    export interface ReactoryUxPackages extends Reactory.IKeyValuePair<Reactory.UX.UIFrameWork, IReactoryUxPackage> {

    }
    export interface IReactoryNotification extends NotificationOptions {
      inAppNotification?: boolean,
      title?: string,
      type?: string | "success" | "warning" | "danger" | "info",
      props?: any,
    }

    export interface IReactoryFormQueryErrorHandlerDefinition {
      componentRef: string,
      method: string
    }

    export interface IReactoryEvent {
      name: string,
      data?: any | undefined,
      dataMap?: any | undefined,
      spreadProps?: boolean,
      //when set to true, the form will refresh with each event, when not provided it will only execute the refresh once
      on?: boolean,
    }

    export interface IReactoryFormGraphElement {
      name: string,
      text: string,
      resultMap?: Object,
      resultType?: string,
      /**
       * Used when only want to extract a single value from the data result
       */
      resultKey?: string;

      formData?: any,
      variables?: Object,

      onSuccessMethod?: string | "redirect" | "notification" | "function",
      onSuccessEvent?: IReactoryEvent | undefined,

      mergeStrategy?: string | "merge" | "replace" | "function",
      mergeFunction?: string

      onError?: IReactoryFormQueryErrorHandlerDefinition,

      options?: any,
      /**
       * A throttle in ms, if this called is to be throttled. This is useful for queries or mutations that trigger on 
       * form change events.
       */
      throttle?: number
    }

    export interface IReactoryFormQuery extends IReactoryFormGraphElement {

      queryMessage?: string,

      props?: Object,

      edit?: boolean,
      new?: boolean,
      delete?: boolean,

      autoQuery?: boolean,
      //the number of milliseconds the autoQuery must be delayed for before executing
      autoQueryDelay?: number,
      waitUntil?: string,
      waitTimeout?: number,
      interval?: number,
      useWebsocket?: boolean,

      notification?: any,
      refreshEvents?: IReactoryEvent[] | undefined,
    }

    export interface IReactoryFormMutation extends IReactoryFormGraphElement {
      name: string,
      text: string,
      updateMessage?: string,


      refreshEvents?: IReactoryEvent[] | undefined
      onSuccessUrl?: string,
      onSuccessRedirectTimeout?: number,


      notification?: any,
      mergeStrategy?: string | "merge" | "replace" | "function",
      mergeFunction?: string
      handledBy?: string | 'onChange' | 'onSubmit'
      objectMap?: boolean,
    }

    export interface IReactoryFormMutations {
      new?: IReactoryFormMutation,
      edit?: IReactoryFormMutation,
      delete?: IReactoryFormMutation
      [key: string]: IReactoryFormMutation
    }

    export interface IReactoryFormQueries {
      [key: string]: IReactoryFormQuery,
    }

    export interface IFormGraphDefinition {
      query?: IReactoryFormQuery,
      mutation?: IReactoryFormMutations,
      queries?: IReactoryFormQueries,
      clientResolvers?: any
    }

    export interface IWidgetMap {
      component?: string | any;
      componentFqn: string,
      widget: string
    }

    export interface IFieldMap {
      component: string | any;
      componentFqn: string,
      field: string
    }

    export interface IObjectMap {
      [key: string]: string | Array<any> | object
    }

    export interface IUISchemaMenuItem {
      id: string,
      title: string,
      key: string,
      description: string,
      icon: string,
      uiSchema: Schema.IFormUISchema,
      //used to override the graphql definitions for that view type
      graphql?: IFormGraphDefinition,
      modes?: string
      sizes?: string[]
      minWidth?: number
    }

    export interface IReactoryComponentDefinition {
      fqn?: string,
      dependencies?: IReactoryComponentDefinition[]
      props?: any,
      propsMap?: any,
      componentType: string | "component" | "object" | "function" | "module" | "plugin"
    }

    export interface IReactoryPdfReport extends Client.IFramedWindowProperties {
      title?: string,
      report: string,
      folder: string,
      icon?: string,
      reportTitle?: string,
      waitingText?: string,
      dataMap?: IObjectMap
    }


    export interface IExcelColumnDefinition {
      title: string
      propertyField: string
      format: string
      type: string
      width?: number,
      key?: string,
      required: boolean
      style?: any
    }

    export interface IExcelSheet {
      name: string
      index: number
      arrayField: string
      startRow: number
      columns: IExcelColumnDefinition[]
    }

    export interface IExcelExportOptions {
      filename: string
      sheets: IExcelSheet[]
    }

    export interface IExport extends Client.IFramedWindowProperties {
      title?: string
      engine?: string
      useClient?: boolean
      mappingType?: string
      mapping?: any
      exportOptions?: any
      disabled?: string,
      icon?: string
    }

    /**
     * 
     */
    export interface IUISchemaMenuItem {
      id: string,
      title: string,
      key: string,
      description: string,
      icon: string,
      uiSchema: Schema.IFormUISchema,
      //used to override the graphql definitions for that view type
      graphql?: IFormGraphDefinition,
      modes?: string,
      /**
       * a regex pattern that matches the 
       * connecting client. This is to ensure
       * we only provide uiSchemas that are 
       * compatible with the target device / app 
       */
      userAgents?: string[]
    }

    export interface IReactoryComponentDefinition {
      fqn?: string,
      dependencies?: IReactoryComponentDefinition[]
      props?: any,
      propsMap?: any,
      componentType: string | "component" | "object" | "function" | "module" | "plugin"
    }


    /**
     * A reactory Event Bubble Action
     */
    export interface IEventBubbleAction {
      /**
       * The event name
       */
      eventName: string,
      /**
       * Action to take
       */
      action: string | "bubble" | "swallow" | "function",
      /**
       * The fuction FQN if set to function
       */
      functionFqn?: string,
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
      id: string,
      src?: string,
      url?: string,
      compiled?: boolean,
      signed?: boolean,
      signature?: string,
      compiler?: string | "npm" | "none" | "webpack" | "grunt" | "rollup"
      compilerOptions: any,
      /***
       * When roles are added the API will check the logged in user
       * credentials and will include or exclude the resource based on role 
       */
      roles?: string[],
      fileType?: string,
      components?: Client.IReactoryComponentRegistryEntry<any>[]
    }


    /**
     * Reactory Form Resource structure
     */
    export interface IReactoryFormResource {
      id?: string
      name: string
      type: string | "css" | "script"
      required?: boolean
      expr?: string
      signed?: boolean
      signature?: string
      signatureMethod?: string
      crossOrigin?: string
      uri: string
    }



    /**
    * The main interface for the data structure that represents the Reactory Form.
    * Most properties are optional as the form only requires a schema and a few other basic
    * properties in order to run as a reactory form / component.
    */
    export interface IReactoryForm {
      /**
       * A unique id for the form. This id, allows the form to be found
       * via the reactory.form(id)
       */
      id: string,
      /**
       * 
       */
      uiFramework?: string,
      /**
       * 
       */
      uiSupport?: string[],
      /**
       * 
       */
      uiResources?: any[],
      /**
       * 
       */
      title?: string,
      /**
       * 
       */
      tags?: string[],

      /**
       * avatar image for the form
       */
      avatar?: string

      /**
       * icon to use when representing the form
       */
      icon?: string

      /**
       * provides a schema when requiring input parameters to execute a graph action 
       */
      argsSchema?: Schema.AnySchema | Schema.TServerSchemaResolver | Schema.TClientSchemaResolver,
      /**
       * provides a ui schema when require input parameters to execute a graph action
       */
      argsUiSchema?: Schema.IFormUISchema | Schema.IUISchema | Schema.TServerUISchemaResolver | Schema.TClientUISchemaResolver,

      /**
       * provides the component id / fully qualified name to use for parameter input
       * The component FQN should take precendence over the argSchema and argUiSchema
       */
      argsComponentFqn?: string,

      /**
       * A list of help topics associated with the form.
       */
      helpTopics?: string[]
      /**
       * The schema that represents the form
       */
      schema: Schema.AnySchema | Schema.TServerSchemaResolver | Schema.TClientSchemaResolver,
      /**
       * A sanitzation schema. This schema will ensure that the data
       * produced by the form input conforms to a given standard.
       */
      sanitizeSchema?: Schema.AnySchema,
      /**
       * The default uiSchema to use
       */
      uiSchema?: Schema.IFormUISchema | Schema.IUISchema | Schema.TServerUISchemaResolver | Schema.TClientUISchemaResolver,
      /**
       * uiSchemas this is a list of uiSchemas that is available
       * to the connecting client.
       */
      uiSchemas?: IUISchemaMenuItem[],
      /**
       * 
       */
      defaultUiSchemaKey?: string
      /**
       * 
       */
      registerAsComponent?: boolean,
      /**
       * 
       */
      nameSpace: string,
      /**
       * 
       */
      name: string,
      /**
       * 
       */
      description?: string,
      /**
       * 
       */
      version: string,
      /**
       * 
       */
      roles?: string[],
      /**
       * 
       */
      components?: string[],
      /**
       * 
       */
      graphql?: IFormGraphDefinition,
      /**
       * 
       */
      defaultFormValue?: any,
      /**
       * 
       */
      defaultPdfReport?: IReactoryPdfReport,
      /**
       * 
       */
      defaultExport?: IExport,
      /**
       * 
       */
      reports?: IReactoryPdfReport[],
      /**
       * 
       */
      exports?: IExport[],
      /**
       * 
       */
      refresh?: any,
      /**
       * 
       */
      widgetMap?: IWidgetMap[],
      /**
       * 
       */
      fieldMap?: IFieldMap[];
      /**
       * 
       */
      backButton?: Boolean,
      /**
       * 
       */
      workflow?: Object,
      /**
       * 
       */
      noHtml5Validate?: boolean,
      /**
       * 
       */
      formContext?: any,
      /**
       * 
       */
      fields?: any,
      /**
       * 
       */
      widgets?: any,
      /**
       * 
       */
      wrap?: boolean,
      /**
       * 
       */
      eventBubbles?: IEventBubbleAction[],
      /**
       * A custom field template 
       */
      FieldTemplate?: Client.AnyValidComponent,
      /**
       * A custom Object Field Template that can be provided per form
       */
      ObjectFieldTemplate?: Client.AnyValidComponent,
      /**
       * components to mount in the componentDef propertie
       */
      componentDefs?: string[]
      /**
       * object map to use for mapping querystring.
       */
      queryStringMap?: any,

      /**
       * Array of dependencies this form or it's children 
       * may relay on in order to successfully load.
       */
      dependencies?: IReactoryComponentDefinition[],
      /**
       * An array of modules that the form may require. 
       * These modules are compiled and emitted at runtime to optimize 
       * best use of server resource and client resources
       */
      modules?: IReactoryFormModule[]
      /**
       * Boolean flag stored on the form to indicate if the full 
       * schema has been fetched yet.
       */
      __complete__?: Boolean
      [key: string]: any
    }

  }

  export namespace Graph {

    export type ReactoryResolverAsync = (parent: any, params: any, context: Reactory.Server.IReactoryContext, info: any) => Promise<any>;
    export type ReactoryResolverSync = (parent: any, params: any, context: Reactory.Server.IReactoryContext, info: any) => any;

    export type ReactoryResolverObject = {
      [key: string]: ReactoryResolverAsync | ReactoryResolverAsync
    }

    export interface IGraphShape {
      [key: string]: ReactoryResolverAsync | ReactoryResolverAsync | ReactoryResolverObject
      Query?: {
        [key: string]: (parent: any, params: any, context: Reactory.Server.IReactoryContext, info: any) => Promise<any>
      },
      Mutation?: {
        [key: string]: (parent: any, params: any, context: Reactory.Server.IReactoryContext, info: any) => Promise<any>
      },
      Subscription?: {
        [key: string]: (parent: any, params: any, context: Reactory.Server.IReactoryContext, info: any) => Promise<any>
      }
    }

    /**
     * Defines an interface type for the GraphDirective Provider
     */
    export interface IGraphDirectiveProvider {
      /**
       * The directive name
       */
      name: string,
      /**
       * The transform that will transform the schema
       */
      transformer: (schema: GraphQLSchema) => GraphQLSchema
    }

    export interface IGraphDefinitions {
      Resolvers: IGraphShape
      Types: string[]
      Directives?: IGraphDirectiveProvider[]
    }

    export interface IResolverStruct {
      Query?: Resolvers,
      Mutation?: Resolvers,
      [key: string]: Resolvers,
    }

    export interface IReactoryResolver {
      resolver?: IGraphShape
    }

    export interface IApolloPackage {
      core: typeof ApolloCoreAlias
      components: typeof ApolloReactComponentsAlias
      react: typeof ApolloReactAlias
      hoc: typeof ApolloHOCAlias
      hooks: typeof ApolloReactHooksAlias
    }
  }

  export namespace Models {

    export type TUser = Reactory.Models.IUser | Reactory.Models.IUserDocument
    export type TOrganization = Reactory.Models.IOrganization | Reactory.Models.IOrganizationDocument

    export type TObjectID = string | ObjectId | null



    /**
     * Defines all the known reactory core model types that are shipped with the 
     * core platform.  
     */
    export type ReactoryKnownModel = string | "User" | "Organization" | "BusinessUnit" | "Team" | "ReactoryModelMeta"

    export type ReactoryKnownModelMap = {
      User: "User",
      Organization: "Organization",
      BusinessUnit: "BusinessUnit",
      Team: "Team",
      ReactoryModelMeta: "ReactoryModelMeta"
      [key: string]: ReactoryKnownModel
    }

    export type ReactoryKnownModels = ReactoryKnownModel[]

    /**
     * 
     */
    export interface IReactoryModelMetaHistory {
      when: Date
      description: string
      outcome?: string
      errors?: string[]
    }

    export interface IReactoryModelMeta<T extends ReactoryKnownModel> {
      id?: TObjectID

      /**
       * The known model for associated with this entry
       */
      model: T

      /**
       * The version number for the model
       */
      version: string

      /**
       * audit of changes
       */
      history: IReactoryModelMetaHistory[]

      /**
       * The date in utc when the model was firdst created
       */
      created: Date
      /***
       * The time in utc when the record was updated
       */
      updated: Date
    }



    /**
     * Defines the base model type, to ensure we have certain
     * fields on all our data models.  
     */
    export interface IReactoryModel<T extends ReactoryKnownModel> {
      id?: TObjectID
      /**
       * The date in utc when the record was created
       */
      created: Date
      /**
       * The user that created the record
       */
      createdBy: TUser
      /***
       * The time in utc when the record was updated
       */
      updated: Date
      /**
       * The user that updated the record
       */
      updatedBy: TUser

      /**
       * The model meta data for item
       */
      modelMeta?: IReactoryModelMeta<T>
    }


    export interface CoreSimpleResponse {
      success: Boolean
      message: String
      payload?: any
    }

    export interface ReactorySetRolesArgs {
      user_id: ObjectId,
      id: ObjectId,
      roles: string[]
    }

    export interface ReactoryCreateMembershipArgs {
      user_id: ObjectId,
      organization?: ObjectId,
      businessUnit?: ObjectId,
      roles: string[]
    }


    export interface IChartProps {
      folder: string,
      file: string,
      width?: number,
      height?: number
      resolveCDN?: boolean,
      data: any,
      options?: any,
      mime?: MimeType,
      context: Server.IReactoryContext
    }

    export interface IChartResult {
      file: string,
      additional?: {
        cdn: string
      }
    }

    export interface ChartJSDataLabelContext {
      active: boolean,
      chart: any,
      dataIndex: number,
      dataset: any,
      datasetIndex: number
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
      id: string
      nameSpace: string
      name: string
      version: string
      data: any
      action: TLoggedInContextExectionAction
    }

    /**
   * Represents the logged in context for the user. This includes the 
   * organization, business unit and team data elements as well as 
   * the roles and any additional data provided by the modules
   */
    export interface IReactoryLoggedInContext {
      id: string
      user: IUser
      memberships: IMembership[]
      organization: IOrganization
      businessUnit: IBusinessUnit
      team: ITeam
      roles: string[]
      altRoles: string[]
      additional: IReactoryLoggedInContextAdditionalData[]
    }


    /**
   * Data structure that represents the Reactory Api Status
   */
    export interface IApiStatus {
      id: string,
      when: Date,
      status: string,
      /**
       * @deprecated 
       */
      firstName: string,
      /**
       * @deprecated
       */
      lastName: string,
      /**
       * All user related context information
       * is kept in this object
       */
      loggedIn: IReactoryLoggedInContext
      /**
       * Reactory menu entries for this user 
       */
      menus: ObjectId[] | UX.IReactoryMenuConfig[]
      [key: string]: any
    }

    /**
     * 
     */
    export interface IAuthentication<T> {
      provider: string
      props: T
      lastLogin: Date
    }

    export interface ITemplateParam {
      name: string
      type: string
    }

    export enum TemplateType {
      email = 'email',
      widget = 'widget',
      page = 'page',
      css = 'css',
      layout = 'layout',
      content = 'content',
      pdf = 'pdf'
    }

    export interface IPartner {
      id: string
      key: string
      name: string
    }


    /**
     * Interface for records that requires syncronization
     */
    export interface IRecordMeta<S> {
      /**
       * The source data as received from a remote system      
       */
      source: S,
      /**
       * An owner string. Helps to identify the source system / ownership
       * of the record.
       */
      owner: string
      /**
       * A unqiue reference on the remote system that is used to identify the 
       * resource
       */
      reference: string,
      /**
       * The last time this record was fetched / synched
       */
      lastSync: Date,
      /**
       * The next date and time this record should be synchronized
       */
      nextSync?: Date,
      /**
       * A date and time at which this records is expired and must be 
       * expunged from the system
       */
      expires?: Date,
      /**
       * A boolean indicator to show whether or not this record must synch
       */
      mustSync?: boolean,
      /**
       * A provider string that is responsible for synchrnozing this record
       */
      provider?: string
      /**
       * An object with properties passed to the provider
       */
      options?: any
    }

    export interface IReactoryClient extends Server.IReactoryClientConfig {
      createdAt?: Date,
      //deafult user accounts to create at startup
      updatedAt?: Date,
      colorScheme: (colorvalue: string) => string[]
      getSetting: (name: string, defaultValue?: any, create?: boolean, componentFqn?: string) => any;
      getDefaultUserRoles: () => string[];
      setPassword: (password: string) => void;
    }

    export interface IReactoryClientDocument extends Mongoose.Document, IReactoryClient { }

    export type TReactoryClient = IReactoryClient | IReactoryClientDocument;



    export interface IReactoryTask {
      id?: any
      title: string
      description?: string
      assignedTo?: string | ObjectId | IUser | IUserDocument
      comments?: IReactoryComment[] | IReactoryCommentDocument
      attachments?: IReactoryFile[] | IReactoryFileModel[]
      shortCode?: string
      slug?: string
      label: string[]
      percentComplete?: number
      timeline?: ITimeline[]
      completionDate?: Date
      startDate?: Date
      dueDate?: Date,
      createdBy: string | ObjectId | IUser | IUserDocument
      createdAt: Date
      updatedAt?: Date
    }

    export interface IReactoryTaskDocument extends Mongoose.Document, IReactoryTask {

    }

    export type TReactoryTask = IReactoryTask | IReactoryTaskDocument

    /**
     * A Reactory Template Object
     */
    export interface ITemplate {
      enabled: boolean
      organization?: ObjectId | Reactory.Models.IOrganization | Reactory.Models.IOrganizationDocument
      client: ObjectId | Reactory.Models.IReactoryClient | Reactory.Models.IReactoryClientDocument
      businessUnit?: ObjectId | Reactory.Models.IBusinessUnit | Reactory.Models.IBusinessUnitDocument
      user?: ObjectId | Reactory.Models.IUser | Reactory.Models.IUserDocument
      visiblity?: string | "user" | "public" | "businessUnit" | "organization" | "client"
      view: string
      kind: TemplateType
      format: string
      content: string
      description?: string
      name?: string
      locale?: string
      elements: Array<ITemplate>
      parameters: Array<ITemplateParam>
      contentFromFile(): string,
      createdBy?: ObjectId,
      created?: Date
      updated?: Date
      updatedBy?: ObjectId
      version?: number
      [key: string]: any
    }

    export interface IEmailTemplate {
      id: string,
      view: string

      name?: string
      description?: string

      organization?: ObjectId
      client: ObjectId
      businessUnit?: ObjectId
      userId?: ObjectId
      visiblity?: string | "user" | "public" | "businessUnit" | "organization" | "client"

      subject: string
      body: string
      signature?: string

    }

    export interface IReactoryComment {
      id?: any,
      user: ObjectId | IUser | IUserDocument,
      text: string,
      context: string,
      contextId: String,
      createdAt: string
      published: boolean,
      flagged: boolean,
      upvoted: ObjectId[] | IUser[] | IUserDocument[]
      upvotes: number,
      downvoted: ObjectId[] | IUser[] | IUserDocument[],
      downvotes: number,
      favorite: ObjectId[] | IUser[] | IUserDocument[],
      favorites: number,
    }

    export interface IReactoryCommentDocument extends Mongoose.Document<IReactoryComment> {

    }

    export interface IReactoryContent {
      id?: any,
      slug: string,
      title?: string,
      description?: string,
      content: string,
      topics?: string[],

      template?: boolean,
      engine?: string,
      previewInputForm?: string,

      createdAt: Date,
      createdBy: ObjectId | IUser | IUserDocument

      updatedAt: Date,
      updatedBy: ObjectId | IUser | IUserDocument

      version?: string
      published: boolean

      comments?: ObjectId[] | IReactoryComment | IReactoryCommentDocument
    }

    export interface IReactoryContentDocument extends Mongoose.Document, IReactoryContent {

    }

    export interface IContentTemplate {
      id: String,

    }

    export interface ToEmail {
      display: string,
      email: string
    }

    export interface EmailAttachment {
      id: ObjectId
      link: string,
      filename: string,
      original: string,
      path?: string,
      size: number,
      sizeString: string,
      mimetype: string,
      contentBytes: any,
      [key: string]: any
    }

    export interface EmailSentResult {
      success: boolean,
      message: string
    }

    export interface IEmailMessage {
      id?: string | ObjectId
      userId: string,
      via: string | 'reactory' | 'microsoft' | 'google';
      subject: string,
      contentType: string,
      body: string,
      to: ToEmail[],
      cc?: ToEmail[],
      bcc?: ToEmail[],
      attachments?: EmailAttachment[],
      saveToSentItems: boolean,
      context?: string,
      [key: string]: any
    }


    export interface ITemplateDocument extends Mongoose.Document, ITemplate { }

    export interface IOrganizationSetting {
      name: string,
      componentFqn: string,
      data: any
    }

    export interface IOrganizationDocument extends Mongoose.Document<ObjectId>, IOrganization { }

    export interface IBusinessUnit {
      [key: string]: any,
      id?: any,
      name: string
      description?: string,
      avatar?: string,
      members: Reactory.Models.IUser[] | Reactory.Models.IUserDocument[],
      createdAt: Date,
      updatedAt: Date,
      owner?: Reactory.Models.IUser | Reactory.Models.IUserDocument
    }

    export interface IBusinessUnitDocument extends Mongoose.Document, IBusinessUnit { }

    export type TBusinessUnit = IBusinessUnit | IBusinessUnitDocument

    export interface IOrganization {
      [key: string]: any
      name: string
      code: string
      logo: string
      businessUnits: IBusinessUnit[] | IBusinessUnitDocument[] | any[],
      settings: IOrganizationSetting[] | any[]
      getSetting(name: string): IOrganizationSetting
      setSetting(name: string, data: any, componentFqn: string): IOrganizationSetting
    }

    export interface IMembership {
      id?: any
      client?: IPartner
      clientId: string | any
      organization?: IOrganization | IOrganizationDocument,
      organizationId?: string | any
      businessUnit?: IBusinessUnitDocument,
      businessUnitId?: string | any
      enabled?: boolean
      authProvider?: string
      providerId?: string
      lastLogin?: Date,
      user?: IUserDocument
      roles: string[]
    }

    export interface IMembershipDocument extends Mongoose.Types.Subdocument, IMembership { }

    export type TMembership = IMembership | IMembershipDocument
    export interface ISessionInfo {
      id: ObjectId | string
      host: string
      client: string
      jwtPayload: {
        iss: string
        sub: string
        exp: Date
        aud: string[]
        iat: Date
        userId: ObjectId | string
        organizationId: ObjectId | string
        refresh: string
        roles: string[]
      }
    }

    export interface INotification {
      id: ObjectId,
      user: IUserDocument,
      title: String,
      text: String,
      link: String,
      createdAt: Date,
      read: Boolean,
      details: {},
    }

    export interface IRegion {
      id?: any,
      key: String,
      title: String,
      description: String,
      icon: String,
      deleted: Boolean,
      organization?: IOrganization | IOrganizationDocument,
      locations?: [
        {
          title: String,
          country: String,
          province: String,
          district: String,
          city: String
        }
      ],
    }

    export interface IOperationalGroup {
      title: String,
    }

    export interface IRegionDocument extends Mongoose.Document, IRegion {
      new(): IRegionDocument;
      AddRegion(region: IRegion): void;
    }




    export interface ITeam {
      id?: any,
      title: String
      name: String
      description: String
      avatar: String
      deleted: Boolean
    }

    export interface ITeamDocument extends Mongoose.Document, ITeam { }


    export interface IProject {
      id?: any,
      name: string
      description?: string
      vision?: string,
      goals?: string[],
      slug?: string,
      shortcode?: string
      startDate?: Date | moment.Moment | number,
      endDate?: Date | moment.Moment | number,
      owner?: IUser | IUserDocument
      avatar?: string
      deleted: Boolean
    }

    export interface IProjectDocument extends Mongoose.Document, IProject {

    }


    export interface IOperationalGroupDocument extends Mongoose.Document, IRegion { }

    export interface IReactoryLoginResponse {
      token: string,
      firstName: string,
      lastName: string,
    }

    export interface IUserBio {
      firstName: string,
      lastName: string,
      dateOfBirth?: Date,
      avatar?: string,
      avatarProvider?: string,
    }

    export interface IUserContact {
      email?: string,
      mobileNumber?: string,
    }

  
    export interface IUserHelpers {
      fullName(email: boolean): string,
      setPassword(password: string): void,
      validatePassword(password: string): boolean,
      hasRole(clientId: string, role: string, organizationId?: string, businessUnitId?: string): boolean,
      hasAnyRole(clientId: string, organizationId?: string, businessUnitId?: string): boolean,
      addRole(clientId: string, role: string, organizationId?: string, businessUnitId?: string): Promise<IMembership[]>
      removeRole(clientId: string, role: string, organizationId: string): Promise<IMembershipDocument[]>,
      removeAuthentication(provider: string): Promise<boolean>
      getAuthentication<T>(provider: string): IAuthentication<T>
      setAuthentication<T>(authentication: IAuthentication<T>): Promise<boolean>
      getMembership(clientId: string | ObjectId, organizationId?: string | ObjectId, businessUnitId?: string | ObjectId): IMembershipDocument
      setLocale(locale: string): Promise<any>
    }

    /**
     * User create parameters
     */
    export interface IUserCreateParams extends IUserBio, IUserContact { 
      organization?: TOrganization,
    }

    export interface IUserIl8n {
      /**
       * The active locale key code being used
       */
      locale: string,
      /**
       * any specific user overrides
       */
      overrides?: Models.IReactoryTranslation[],
      /**
       * Date format options
       */
      dateFormat?: string
      /**
       * Time format
       */
      timeFormat?: string
      /**
       * 
       */
      dateTimeFormat?: string
    }

    export interface IUser extends IUserBio,
      IUserContact,        
      IUserHelpers {
      
        username?: string,
        salt?: string,
        password?: string,      
        organization?: ObjectId | Reactory.Models.IOrganizationDocument,
        memberships?: Reactory.Models.IMembership[] | Mongoose.Types.Array<Reactory.Models.IMembership>,
        sessionInfo?: Reactory.Models.ISessionInfo,
        authentications?: Reactory.Models.IAuthentication<any>[],
        deleted?: boolean,
        createdAt?: Date,
        updatedAt?: Date,
        il8n?: IUserIl8n
        meta?: Reactory.Models.IRecordMeta<any>,
      
        [key: string]: any
    }

    /**
   * Defines a standard demographic type
   */
    export interface IDemographic {
      id?: any
      organization: string | ObjectId | Reactory.Models.IOrganization,
      type: string,
      key: string,
      icon?: string,
      title: string,
      description?: string,
      deleted: boolean
    }

    export interface IAgeDemographic {
      id?: any
      organization: String | ObjectId | Reactory.Models.IOrganization,
      title: String,
      ageStart: Number,
      ageEnd: Number,
      deleted: Boolean
    }

    export interface IAgeDemographicDocument extends Mongoose.Document, IAgeDemographic { }

    export interface IDemographicDocument extends Mongoose.Document, IDemographic {

    }

    export interface IUserDocument extends Mongoose.Document, IUser {
      memberships: Mongoose.Types.Array<Reactory.Models.IMembershipDocument>
    }

    export interface IUserDemographics {
      race: string | ObjectId | IDemographic | IDemographicDocument
      gender: string | ObjectId | IDemographic | IDemographicDocument
      ageGroup: string | ObjectId | IDemographic | IDemographicDocument
      user: string | ObjectId | IUser | IUserDocument
      team: string | ObjectId | ITeam | ITeamDocument
      businessUnit: string | ObjectId | IBusinessUnit | IBusinessUnitDocument,
      region: string | ObjectId | IRegion | IRegionDocument
      [key: string]: any
    }

    export interface IUserDemographicDocument extends Mongoose.Document, IUserDemographics {

    }

    export interface IPeerEntry {
      user: ObjectId | Reactory.Models.IUserDocument
      relationship: string
      isInternal: boolean
      inviteSent: boolean
      confirmed?: boolean
      confirmedAt?: Date
    }

    export interface IOrganigram {
      organization: ObjectId | Reactory.Models.IOrganizationDocument
      user: ObjectId | Reactory.Models.IUserDocument
      businessUnit: ObjectId | Reactory.Models.IBusinessUnitDocument
      position: string
      allowEdit: Boolean
      peers: IPeerEntry[]
      createdAt: Date
      updatedAt: Date
      confirmedAt: Date
    }

    export interface IOrganigramDocument extends Mongoose.Document, IOrganigram { }

    /** ReactoryFile Management Models Interface */
    export interface IReactoryFilePermissions {
      id?: ObjectId,
      roles: string[]
      partnersIncluded?: ObjectId[],
      partnersExcluded?: ObjectId[],
      usersIndcluded?: ObjectId[],
      usersExcluded?: ObjectId[]
    }

    export interface IReactoryFileRemoteEntry {
      id: string
      url: string
      name?: string,
      lastSync: Date
      success: boolean,
      verified?: boolean,
      syncMessage: string,
      priority?: number,
      modified?: Date
    }

    export interface ITimeline {
      timestamp: number,
      message: string
    }

    export interface IReactoryFile extends Mongoose.Document {
      id: ObjectId,
      hash: number,
      partner: ObjectId,
      ttl?: number,
      path: string,
      alias: string,
      filename: string,
      alt: string[],
      algo: string,
      link: string,
      mimetype: string,
      size: number,
      created?: Date,
      uploadContext?: string,
      uploadedBy: ObjectId,
      owner: ObjectId,
      public?: Boolean,
      published?: Boolean,
      permissions?: IReactoryFilePermissions[],
      tags?: string[],
      remotes?: IReactoryFileRemoteEntry[],
      timeline?: ITimeline[],
      status?: string,
      deleted?: boolean,
      readLines(start: number, lines: number): Promise<string[]>,
      stats(): fs.Stats,
      exists(): boolean,
      getServerFilename(): string
      [key: string]: any
    }

    export interface IReactoryFileStatic {
      new(): IReactoryFile
      getItem(link: string): Promise<IReactoryFile>
      setItem(link: string, file: IReactoryFile): void
      clean(): void
    }

    export interface IReactoryFileModel extends IReactoryFile, IReactoryFileStatic { }

    export interface IReactoryTranslationRevision {
      id: any
      changed: Date
      translation: string
      translator: IUser
      reason: string
    }

    export interface IReactoryTranslation {
      id?: any,
      partner: IReactoryClient | IReactoryClientDocument
      organization: IOrganization | IOrganizationDocument
      key: string,
      locale: string,
      created: Date,
      translator: IUser
      namespace?: string
      translation: string
      resource?: any
      version: number
      revisions: IReactoryTranslationRevision[]
    }

    export interface IReactoryTranslationDocument extends Mongoose.Document, IReactoryTranslation {
      
    }

    export interface IReactoryI18nResource {
      id: string
      ns: string
      translations: {
        [key: string]: string
      }
    }
    export interface IReactoryTranslations {
      id: string
      locale: string
      translations: IReactoryTranslation[]
      i18n: IReactoryI18nResource[]
      resources?: any
    }



    export interface IReactorySupportTicketFilter {
      assignedTo: string[],
      createdBy: string,
      status: string[],
      reference: string[],
      searchString: string,
      searchFields: string[],
      startDate: Date,
      endDate: Date,
      dateFields: string[]
      formId: string
    }

    export interface IReactorySupportTicketUpdate {
      request?: string
      requestType?: string
      description?: string
      status?: string
      comment?: string
      assignTo?: string
    }

    export interface IReactorySupportTicket {
      id?: any
      request: string
      requestType: string
      description: string
      status: string
      reference: string
      createdBy: ObjectId | IUser | IUserDocument
      createdDate: Date
      updatedDate: Date
      assignedTo: ObjectId | IUser | IUserDocument
      formId: string
      comments: IReactoryComment[] | IReactoryCommentDocument
      documents: IReactoryFile[] | IReactoryFileModel[]
    }

    export interface IReactorySupportTicketDocument extends Mongoose.Document, IReactorySupportTicket { }

    export interface IPagedReactorySupportTickets {
      paging: IPagingResult
      tickets: IReactorySupportTicket[]
    }

    export interface IPagingRequest {
      page: number
      pageSize: number
    }

    export interface IPagingResult {
      total: number
      page: number
      hasNext: boolean
      pageSize: number
    }

    export interface IPagedResponse<T> {
      paging: IPagingResult,
      items: T[]
      [key: string]: any
    }


    /**
     * Interface for the 
     */
    export interface IFileImportProcessorEntry {
      id: string
      name: string
      order: number
      serviceFqn: string
      started?: Date
      finished?: Date
      status: string
      responses: any[]
    }


    /**
     * Import file types that can potentially be supported
     */
    export type ImportFileEnums = string | "application/json" |
      "text/csv" | "application/xml" | "application/octet"

    /**
     * Interface for the UserImportFile type.
     * Used in upload and processing user data from 
     * external file sources.
     */
    export interface IImportFile extends Mongoose.Document {
      id: string
      file: IReactoryFile | IReactoryFileModel,
      preview: any[],
      options?: {
        delimeter: string
        textQualifier: string
        firstRow: string
        columnMappings: any[]
      }
      mime?: ImportFileEnums,
      status: string
      processors: IFileImportProcessorEntry[]
      rows: number
    }

    /**
     * Interface for User File Import
     */
    export interface IReactoryFileImportPackage {
      organization: any
      owner: any
      options?: {
        delimeter: string
        textQualifier: string
        firstRow: string
        columnMappings: any[]
      }
      files: IImportFile[]
      status: string,
      processors: IFileImportProcessorEntry[],
      rows: number,
      started: Date,
    }

    export interface IReactoryFileImportPackageDocument extends Mongoose.Document, IReactoryFileImportPackage { }

    export type ReactoryFileImportPackageDocument = Mongoose.Model<IReactoryFileImportPackageDocument>;

    export interface IProcessorParams {
      import_package?: IReactoryFileImportPackageDocument,

      [key: string]: any
    }

    interface IPackageManagerState {
      processors: IFileImportProcessorEntry[],
      file?: IImportFile,
      processor_index: number,
      busy: boolean
      started: boolean
      [key: string]: any
    }

    export interface IReactoryMarkerData {
      id: string,
      type: string | "existing" | "google" | "bing" | "yahoo" | "apple",
      title: string,

      address?: any,
      place?: any,

      allow_move?: boolean,
      is_updating?: boolean,
      selected?: boolean,
      show_detail?: boolean,

      componentFqn?: string,
      componentProps?: any,
      propertyMap?: {
        [key: string]: string,
      },

      [property: string]: any

    }
    /**
     * Model type for the social media reference and links
     */
    export interface IReactorySocialReference {
      /**
       * 
       */
      id: string
      /**
       * 
       */
      provider: string
      /**
       * 
       */
      url: string
      /**
       * 
       */
      authenticated: Boolean
      /**
       * 
       */
      scope: any
      /**
       * The authentication
       */
      auth: any
      /**
       * 
       */
      valid: Boolean
      /**
       * 
       */
      created: Date
      /**
       * 
       */
      updated: Date
    }

    export interface IReactorySocialMeta {
      /**
       * 
       */
      id: String
      /**
       * 
       */
      avatar: String
      /**
       * 
       */
      avatarProvider: String
      /**
       * 
       */
      headerBackground: String
      /**
       * 
       */
      headerBackgroundProvider: String
      /**
       * 
       */
      socials: IReactorySocialReference[]
    }


    /**
 * Defines a standard demographic type
 */
    export interface IOrganizationDemographicSettings {
      id?: any
      organization: string | ObjectId | IOrganization,
      age: boolean,
      gender: boolean,
      race: boolean,
      region: boolean,
      operationalGroup: boolean,
      position: boolean,
      businessUnit: boolean,
      teams: boolean,
      deleted: boolean
    }

    export interface IOrganizationDemographicSettingsDocument extends Document, IOrganizationDemographicSettings {
    }

  }

  /**
   * The mongo namespace should be used for mongo / mongoose related types only.
   */
  export namespace Mongo {

    /**
     * Project Mongoose model interface
     */
    export interface IReactoryModelMetaDocument<T extends Models.ReactoryKnownModel> extends Models.IReactoryModelMeta<T> { }

    /**
     * Interface definitions for instance functions for the IResourceManagerProject
     */
    export interface IResourceManagerProjectDocumentFunctions {

    }

    export interface IResourceManagerProjectDocumentQueryHelpers {

    }

    export type ReactoryModelMetaDocument = Mongoose.Model<IReactoryModelMetaDocument<"ReactoryModelMeta">,
      IResourceManagerProjectDocumentQueryHelpers,
      IResourceManagerProjectDocumentFunctions>

  }

  export namespace Native { }

  export namespace UX {

    export enum UIFrameWork {
      material = 'material',
      bootstrap = 'bootstrap',
      office = 'office',
      blueprint = 'blueprint'
    }

    export interface IPalette {
      light: string,
      main: string,
      dark: string,
      contrastText: string
    }

    export interface IThemePalette {
      primary1Color: string
      primary: IPalette
      secondary: IPalette
      report: IPalette
    }

    export interface ITheme {
      type: string
      palette: IThemePalette
    }

    /**
  * Supported Theme Types.  
  * Other rendering libraries will be added over time and each will 
  * have their owne configuration schema
  */
    export type ReactoryThemeType = "material" | "material_native"

    /**
     * The application them mode types that the themes can support
     * or it can indicate how the application can select the 
     * default theme mode if there is more
     * than one theme mode available.
     */
    export type ApplicationThemeModeType = "light" | "dark" | "os"

    /**
     * Theme modes
     */
    export interface IReactoryThemeMode {
      /**
       * unique id for the theme mode
       */
      id?: string

      /**
       * Application theme mode
       */
      mode: ApplicationThemeModeType

      /**
       * A name for the theme mode
       * */
      name: String

      /**
       * Theme mode description
       * */

      description?: String

      /**
       * an icon for the application theme mode
       */
      icon?: String

      /**
       *The options that is associated with this theme mode
      */
      options: any
    }

    export type ReactoryThemeAssetType = "script" | "image" | "css" | "json"

    export interface IReactoryThemeAsset {
      id?: string
      name: string
      assetType: ReactoryThemeAssetType,
      url: string
      loader?: string
      options?: any
      data?: any
    }

    /**
     * A layout represents a special type of schema that drives
     * the layout for a given route.
     */
    export interface IReactoryLayout {

      id?: string
      nameSpace: string
      name: string
      version: string
      description?: string
      schema: Schema.ISchema
      uiSchema?: Schema.IUISchema
      default?: boolean
      inherits?: string
    }

    export interface IReactoryColorSchemes {
      primary: string[],
      secondary: string[]
    }

    /**
     * The reactory theme wrapper is used to contain the theme 
     * configuration for different theme types
     */
    export interface IReactoryTheme {
      id?: string
      type: ReactoryThemeType
      name?: string
      nameSpace?: string
      version?: string
      description?: string
      defaultThemeMode?: ApplicationThemeModeType
      modes?: IReactoryThemeMode[]
      options?: any
      assets?: IReactoryThemeAsset[]
      layouts?: IReactoryLayout
      colorSchemes?: IReactoryColorSchemes
      content?: any
      il8n?: any
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
      ordinal: number
      /**
       * The menu title, can either be a standard string or translation key
       */
      title: string
      /**
       * link for the menu item, these links need to map to a route defined in the 
       * application routes otherwise the navigation won't go anywhere.
       * 
       * If you want to raise an event instead of a navigation link then
       * add the link as "event://YourEventNameHere?param1=x&param2=y" 
       * and the even will be raise through the reatory api with the parameters
       * specified in the query params.
       */
      link: string
      /**
       * The icon to use for the menu item.
       */
      icon?: string

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
      image?: string

      /**
       * The roles that the user must have in order to access this menu.
       */
      roles?: string[]
      /**
       * The sub menu items for this menu item
       */
      items?: IMenuItem[]
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
      resolver?: string
    }

    /**
     * Menu configuration item. 
     */
    export interface IReactoryMenuConfig {
      /**
       * A user friendly name for the menu group
       */
      name: string
      /**
       * A unqiue key for the menu group
       */
      key: string
      /**
       * A target area for the menu group to bind itself to.
       * Each application can have a custom navigational system and 
       * these navigational systems need to be aware of the menu configuration.
       */
      target: string
      /**
       * The roles the user should have in order to access this menu item
       */
      roles: string[]
      /**
       * The menu entries associated with this group.
       */
      entries: IMenuItem[]
    }

    /**
     * A reactory component interface
     */
    export interface IReactoryComponent {
      id?: string
      name: string
      nameSpace: string
      version: string
      title?: string
      description?: string
      author?: string
      roles?: string[]
      args?: Reactory.IKeyValuePair<string, any>[]
    }

    // 
    // Utility type that can be used to provide
    // various styling options for graph elements
    // 
    export interface UXMeta {
      // """
      // A background color that will provided in either HEX or rgba values.
      // """
      backgroundColor: String
      //   """
      // A uri for a background image
      // """
      backgroundImage: String
      //   """
      // A color for the element
      // """
      color: String
      //   """
      // font to use
      //   """
      font: String
      //   """
      // font size
      //   """
      fontSize: string
      //   """
      // font styling
      //   """
      fontStyle: string
      //   """
      // url for an avatar
      // """
      avatar: string
      //   """
      // a material icon id
      //   """
      icon: string
      //   """
      // A classname
      //   """
      className: string
      //   """
      // custom jss that can be compiled by the client
      //   """
      jss: any
      //   """
      // custom styled element data
      //   """
      styled: any
    }

    export interface IThemedUXMeta {
      // """
      // theme name to which this applies
      // """
      theme: String

      // """
      // Theme mode:
      // light / dark / os
      // """
      mode: ApplicationThemeModeType

      // """
      // UX Meta entry
      // """
      uxmeta: UXMeta
    }

    /**
     * Themed UX Meta object map.
     * default is required.
     */
    export type ThemedUXMeta = {
      light?: IThemedUXMeta
      dark?: IThemedUXMeta
      default: IThemedUXMeta
    }

    /**
     * Array of themed UX meta
     */
    export type ThemedUXMetaArray = IThemedUXMeta[]

    export interface IDropDownMenuItem {
      id: string,
      key?: string,
      title?: string,
      icon?: string,
      iconProps?: any,
      disabled?: boolean,
      selected?: boolean
      style?: any
      [key: string]: any
    }

    export interface IDataDropDownMenuItem<T> extends IDropDownMenuItem {
      data: T
    }

    export interface IDropDownMenuProps { 
      menus: Reactory.UX.IDropDownMenuItem[], 
      id?: any, 
      propertyMap?: any, 
      tooltip?: string,
      onSelect?: (evt: React.SyntheticEvent, menu: IDropDownMenuItem) => void 
      style?: any,
      size?: "small" | "medium" | "large",
      iconStyle?: any,
      icon?: string,
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
      id?: string

      /**
       * Human readable title for the route
       */
      title?: string

      /**
       * A unique key for client reference
       * will default to id if no key is given.
       */
      key?: string

      /**
       * The path for the route
       */
      path: string
      /**
       * Indicates whether the route is 
       * public or not
       */
      public: boolean
      /**
       * The roles required for the route
       */
      roles: string[]
      /**
       * A component fqn to mount as the root component for the path
       */
      componentFqn: string
      /**
       * The arguments for the route
       */
      args?: IKeyValuePair<string, any>[]

      /**
       * Properties to pass to the component
       */
      props?: {
        [key: string]: any
      }

      /**
       * indicates if the path should be 
       * an exact match
       */
      exact?: boolean
      /**
       * If set then this path will redirect to a different path
       */
      redirect?: string
      /**
       * Component array that needs to be bound to the route.
       */
      components?: { componentFqn: string, props?: { [key: string]: any}  }[]
    }

    /**
     * Route handler definition. Adds the render capability to the route handler.
     */
    export interface IReactoryRouteHandler extends IReactoryRoute {
      render: (props: Reactory.IReactoryComponentProps) => React.ReactElement<Reactory.IReactoryComponentProps>
    }
  }

  /**
   * Platform namespace holds all interfaces and types that is 
   * not specific to a partificular domain area and is considered
   * part of the platform scope.
   */
  export namespace Platform {

    export type ReactoryApplicationPluginPlatform = "web" | "ios" | "android" | "native"


    /**
     * The IReactoryClientPlugin defines the data elements required
     * by the client or a builder tool to download and install a 
     * given plugin.
     */
    export interface IReactoryApplicationPlugin {
      id?: string
      /**
       * The namespace for the plugin
       */
      nameSpace: string
      /**
       * The name for the plugin
       */
      name: string
      /**
       * The version of the plugin
       */
      version: string
      /**
       * A user friendly description for the the 
       */
      description: string
      /**
       * Reactory Application Plugin Platform
       */
      platform: ReactoryApplicationPluginPlatform
      /**
       * url for the plugin
       */
      url: string
      /**
       * A loader fqn that can be used to process
       * the load request
       */
      loader?: string
      /**
       * The options associated with the plugin
       */
      options?: any
      /**
       * indicates whether or not the plugin is enabled.
       */
      enabled?: boolean
      /**
       * A list of roles that has access to this
       */
      roles?: string[]
    }

    /**
     * Plugin definitions and options 
     */
    export interface IReactoryPluginDefinition {
      nameSpace: String,
      name: String,
      version: String,
      roles?: String[],
      root?: String,
      disabled?: Boolean,
      verified?: Boolean,
      certificate?: String,
      license?: String
    }

    export interface IReactoryPlugin extends IReactoryPluginDefinition {
      /** 
       * A function call that receives the reactory api instance.
       * Using this instance the plugin must register and load 
       * all componentns into the reactory registry. 
       */
      component: (reactory: Client.IReactoryApi) => void
    }
  }

  export namespace Pdf {

    export interface IReactoryPdfGenerator {
      enabled: boolean
      key: String
      name: String
      description: String
      content: (params: any, context: Server.IReactoryContext) => Promise<any>
      resolver: (params: any, context: Server.IReactoryContext) => Promise<any>,
      props: {
        meta: {
          title: String
          author: String
          [key: string]: any,
        },
        fonts: {
          [key: string]: {
            normal: String,
            bold: String,
          }
        },
        defaultFont: String
        fontSize: number
      }
    }

    export interface IReactoryPdfComponent {
      nameSpace: string
      name: string
      version: string
      component: IReactoryPdfGenerator
    }

  }

  export namespace Service {





    export type SERVICE_LIFECYCLE = "instance" | "singleton";

    export type LOG_TYPE = string | "debug" | "warn" | "error" | "info"

    /**
   * The IProcessor interface is a simplistic data processing interface
   */
    export interface IProcessor extends Service.IReactoryContextAwareService {
      /**
       * Used to process a request with any params.
       * @param params - of any type, the processor itself has to be able to interpret the input
       * @param next - if the  
       */
      process(params: any, next?: IProcessor): Promise<any>
    }


    export interface IReactoryImportPackageManager extends Service.IReactoryContextAwareService {

      state: Models.IPackageManagerState

      /**
       * Start a package and process all the data inputs
       * @param workload_id 
       * @param file_ids 
       * @param processors 
       */
      start(workload_id: string, file_ids: string[], processors: string[]): Promise<any>
      stop(workload_id: string, file_ids: string[]): Promise<any>
      delete(workload_id: string): Promise<any>
      addFile(workload_id: string, file: Models.IReactoryFileModel): Promise<any>
      removeFile(workload_id: string, file_id: string): Promise<any>
      previewFile(workload_id: string, file_id: string, processors: string[]): Promise<any>

      /**
       * Returns the next processor if the service is started.
       * Every time this function is called the internal state of the class is updated.
       */
      getNextProcessor(): Service.IProcessor
    }



    export interface IReactoryServiceResult<T> {
      data?: T,
      errors?: Error[],
    }

    export interface IReactoryResultService<T> {
      (props: any, context: any): IReactoryServiceResult<T>;
    }

    export interface IReactoryServiceProps {
      [key: string]: any,
      $services: IReactoryServiceRegister,
    }

    export type ReactoryServiceTypes = "file" | "data" | "iot" |
      "user" | "organization" | "businessunit" | "email" |
      "notification" | "workflow" | "devops" | "plugin" |
      "custom" | "context" | "integration" | "report";

    export interface IReactoryServiceDependency {
      /**
       * The full service id
       */
      id: string,
      /**
       * The service property alias.
       */
      alias: string
    }

    export type ServiceDependency = string | IReactoryServiceDependency;

    export type ReactoryServiceDependencies = ServiceDependency[]
    export interface IReactoryServiceDefinition {
      /**
       * The service id is similar to a component FQN, 
       * so ids, will be used as nameSpace.name@version
       */
      id: string
      /**
       * A easy to ready name.
       * i.e. My Fileservice
       */
      name: string
      /**
       * Longer description, what does the service do.
       * i.e. My Fileservice is a specific handler for persisting uploaded files to a 
       * backup folder.
       */
      description: string
      /***
       * A function that returns an instance of the service.  Your service 
       * can either run per execution or can run in the context of the service as a singleton
       * across all requests.  
       * 
       * The execution context of the startup account will be that of the server service account.
       * So using singleton instances should be done with care and it is advised to run all services
       * in the execution context of the user where possible.
       */
      service(props: IReactoryServiceProps, context: any): any,
      /**
       * An optional type definition
       */
      serviceType?: ReactoryServiceTypes
      /**
       * Depenency array ['core.FileService@1.0.0', { id: 'core.UserService@1.0.0', alias: 'myUserService' }]
       */
      dependencies?: ReactoryServiceDependencies
    }

    export interface IReactoryServiceRegister {
      [key: string]: IReactoryServiceDefinition
    }


    export interface IExcelReaderService {
      readFile(file: string): Promise<ExcelJS.Workbook>
    }

    export interface IExcelFormat {
      font: string
    }

    export interface IExcelWriterOptions {
      filename: string,
      query?: string,
      params?: any,
      output?: string,
      formatting?: IExcelFormat,
      stream?: Stream
    }

    export interface IReactoryService {
      name: string
      nameSpace: string
      version: string
    }
    export interface IReactoryStartupAwareService extends IReactoryService {
      onStartup(): Promise<any>
    }

    export interface IReactoryShutdownAwareService extends IReactoryService {
      onShutdown(): Promise<any>
    }

    /**
     * Base interface for a Context Aware Reactory Service.  These services have 
     * a 
     */
    export interface IReactoryContextAwareService extends IReactoryService {
      getExecutionContext(): Server.IReactoryContext
      setExecutionContext(executionContext: Server.IReactoryContext): boolean
    }


    export interface IExcelWriterService extends IReactoryContextAwareService {
      setCellRichText(cell: ExcelJS.Cell, cellProps: any): ExcelJS.Cell;
      writeAsFile(options: IExcelWriterOptions, appender: (workbook: ExcelJS.Workbook) => Promise<ExcelJS.Workbook>): Promise<Boolean>
      writeAsStream(options: IExcelWriterOptions, appender: (workbook: ExcelJS.Workbook) => Promise<ExcelJS.Workbook>): Promise<Boolean>
      writeToBuffer(options: IExcelWriterOptions, appender: (workbook: ExcelJS.Workbook) => Promise<ExcelJS.Workbook>): Promise<Buffer>
    }

    export interface ICoreEmailService extends IReactoryStartupAwareService, IReactoryContextAwareService {
      sendEmail(message: Reactory.Models.IEmailMessage): Promise<Reactory.Models.EmailSentResult>
    }

    export interface IErrorHandlerServer extends IReactoryContextAwareService {
      handle<T>(FunctionPointer: Promise<T>): T
    }

    export interface IReactoryDefaultService extends IReactoryStartupAwareService, IReactoryContextAwareService { }


    export interface ITemplateService extends IReactoryStartupAwareService, IReactoryContextAwareService {
      /**
       * Service function for rerturning a template objeect
       * @param view - string field that represents a unique element within the context of a view, reactory client id and organisation id
       * @param reactoryClientId - the reactory client id to use in the filter, default will be global.partner
       * @param organizationId - the organisation id to use in the filter, default is null, which means the template applies to organisation 
       * @param businessUnitId - the business unit id to use as part of the filter
       * @param userId - the user id to use as part of the filter
       */
      getTemplate(view: string, reactoryClientId: string, organizationId?: string, businessUnitId?: string, userId?: string): Promise<Models.ITemplate>

      /***
       * Service function to set a template for a given view, reactory client and organisation id
       * @param view - the view name to use - if found it will update the exsting one
       * @param reactoryClientId - the client id to use in the filter, default is global.partner
       * @param organizationId - the organization id the template will be linked to 
       * @param businessUnitId - the business unit id the template will be linked to 
       * @param userId - the user the template will be linked to
       */
      setTemplate(view: string, template: Models.ITemplate, reactoryClientId?: string | ObjectId, organizationId?: string | ObjectId, businessUnitId?: string | ObjectId, userId?: string | ObjectId): Promise<Models.ITemplate>
    }

    export interface IEmailTemplateService extends ITemplateService {
      /**
       * Template Service function that converts a standard ITemplate into a IEmailTemplate by extracting the 
       * subject, body and footer (if available) for this template
       * @param template The template to use as the basis of an email template
       */
      hydrateEmail(template: Models.ITemplate | Models.ITemplateDocument): Promise<Models.IEmailTemplate>

      /**
       * Template service function that converts the IEmailTemplate into an ITemplate
       * @param template The email template to convert to a standard ITemplate
       */
      dehydrateEmail(template: Models.IEmailTemplate): Promise<Models.ITemplate>
    }

    export interface ITemplateRenderingService extends IReactoryService {
      /**
       * 
       * @param template - can either be an object of type ITemplate or string.
       * @param properties - the property bag that is passed to the ejs engine to render the template
       */
      renderTemplate(template: Models.ITemplate | string, properties: any): string
    }

    export interface IReactoryTemplateService extends Reactory.Service.ITemplateService, Reactory.Service.ITemplateRenderingService, Reactory.Service.IEmailTemplateService { }

    export interface IFile {
      createReadStream: Function,
      filename: string,
      mimetype: string,
      encoding: string
    }
    export interface FileUploadArgs {
      file: IFile,
      rename: boolean
      catalog?: boolean
      uploadContext?: string
      isUserSpecific?: boolean
      virtualPath?: string
      filename?: string
    }


    export interface IReactoryFileService extends Reactory.Service.IReactoryDefaultService {

      uploadFile(uploadArgs: FileUploadArgs): Promise<Reactory.Models.IReactoryFileModel>

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
      getRemote(url: string, method: string, headers: HeadersInit, save: boolean, options?: { ttl?: number, sync?: boolean, owner?: ObjectId, permissions?: Models.IReactoryFilePermissions, public: boolean }): Promise<Models.IReactoryFileModel>

      setFileModel(file: Models.IReactoryFileModel): Promise<Reactory.Models.IReactoryFileModel>;

      getFileModel(id: string): Promise<Reactory.Models.IReactoryFileModel>;

      getFileSize(file: Models.IReactoryFileModel): number;

      sync(): Promise<Reactory.Models.IReactoryFileModel[]>;

      clean(): Promise<Reactory.Models.IReactoryFileModel[]>;

      deleteFile(fileModel: Reactory.Models.IReactoryFileModel): boolean

      catalogFile(filename: string, mimetype?: string, alias?: string,
        context?: string,
        partner?: Models.IReactoryClient | Models.IReactoryClientDocument,
        user?: Models.IUser | Models.IUserDocument): Promise<Models.IReactoryFileModel>;

      generateFileChecksum(filename: string, algo: string): Promise<string>
    }

    export type OrganizationImageType = string | "logo" | "avatar";
    export interface IReactoryOrganizationService extends Reactory.Service.IReactoryDefaultService {

      setOrganization(id: string, updates: { name?: string, code?: string, color?: string, logo?: string }): Promise<Models.IOrganizationDocument>

      uploadOrganizationImage(id: string, file: IFile, imageType: OrganizationImageType): Promise<Models.IOrganizationDocument>

      get(id: string): Promise<Models.IOrganizationDocument>

      findWithName(name: string): Promise<Models.IOrganizationDocument>

      create(name: string): Promise<Models.IOrganizationDocument>

      findBusinessUnit(organization_id: string | number | ObjectId, search: string | number | ObjectId): Promise<Models.IBusinessUnitDocument>

      createBusinessUnit(organization_id: string | number | ObjectId, name: string): Promise<Models.IBusinessUnitDocument>

      findTeam(organization_id: string | number | ObjectId, search: string | number | ObjectId): Promise<Reactory.Models.ITeamDocument>

      createTeam(organization_id: string | number | ObjectId, search: string | number | ObjectId): Promise<Reactory.Models.ITeamDocument>
    }

    /**
     * interface definition for a form service that will manage access to forms for users.
     */
    export interface IReactoryFormService extends Reactory.Service.IReactoryDefaultService {
      /**
       * Provide a list of forms for the current logged in user context / partner context
       */
      list(): Promise<Reactory.Forms.IReactoryForm[]>

      /***
       * Returns a list of globals that are available in the eco system
       */
      globals(): Promise<Reactory.Forms.IReactoryForm[]>

      /**
       * Return a form with a given id
       * @param id 
       */
      get(id: string): Promise<Reactory.Forms.IReactoryForm>;

      /**
       * Persists the form to storage
       * @param form 
       */
      save(form: Reactory.Forms.IReactoryForm, user_options?: any): Reactory.Forms.IReactoryForm;

      /**
       * Delete a form from the data store
       * @param form 
       */
      delete(form: Reactory.Forms.IReactoryForm): boolean

      /**
       * 
       * @param form Returns an array of resources for the form
       */
      getResources(form: Reactory.Forms.IReactoryForm): Promise<Reactory.Forms.IReactoryFormResource[]>
    }

    export interface IReactoryModuleCompilerService extends Reactory.Service.IReactoryDefaultService {

      /**
       * 
       * @param module Compiles a ReactoryFormModule
       */
      compileModule(module: Reactory.Forms.IReactoryFormModule): Promise<Reactory.Forms.IReactoryFormResource>
    }

    export interface IReactoryUserService extends Reactory.Service.IReactoryDefaultService {

      createUser(userInput: Reactory.Models.IUserCreateParams): Promise<Reactory.Models.IUserDocument>;

      updateUser(userInput: Reactory.Models.IUser): Promise<Reactory.Models.IUserDocument>

      findUserWithEmail(email: string): Promise<Reactory.Models.IUserDocument>

      findUserById(id: string | number | ObjectId): Promise<Reactory.Models.IUserDocument>

      getUserPeers(id: string | number | ObjectId, organization_id: string | ObjectId): Promise<Reactory.Models.IOrganigramDocument>

      setUserPeers(user: Models.IUserDocument, peers: any, organization: Models.IOrganizationDocument, allowEdit: boolean, confirmedAt?: Date): Promise<Models.IOrganigramDocument>

      setUserDemographics(userId: string, organisationId: string, membershipId?:
        string, dob?: Date, businessUnit?: string, gender?: string, operationalGroup?: string,
        position?: string, race?: string, region?: string, team?: string): Promise<Reactory.Models.IUserDemographics | Reactory.Models.IUserDemographicDocument>

    }

    export interface IReactoryUserDemographicsService extends Reactory.Service.IReactoryDefaultService {

      setUserDemographics(demographics: Reactory.Models.IUserDemographics, user: Reactory.Models.IUser): Promise<Models.IUserDemographicDocument>

    }

    export interface IReactoryWorkflowService extends Reactory.Service.IReactoryDefaultService {
      startWorkflow(workflow_id: string, input: any): Promise<any>
      stopWorkflow(worflow_id: string, instance: string): Promise<any>
      workflowStatus(worflow_id: string, instance: string): Promise<any>
      clearWorkflows(): Promise<any>
    }

    export interface IFetchAuthenticationProvder {

      /**
       * Authenticates a fetch request before the call is made.
       * This would be used to set headers for which 
       * we already have the request data.
       * @param request 
       */
      authenticateRequestSync(request: any): void;

      /**
       * Authenticates a fetch request asynchronously
       * @param request 
       */
      authenticateRequest(request?: any): Promise<any>

    }


    export interface IFetchHeaderProvider {

      /**
       * Decorates a Fetch request with any custom headers
       * @param request 
       */
      decorateRequestHeaderSync(request: any): void;

      /**
       * decorates a fetch request with custom headers asynch
       * @param request 
       */
      decorateRequestHeader(request: any): Promise<any>;

    }


    export interface IFetchService extends Reactory.Service.IReactoryDefaultService {

      /**
       * 
       * @param provider 
       */
      setAuthenticationProvider(provider: IFetchAuthenticationProvder): void

      /**
       * 
       * @param provider 
       */
      setHeaderProvider(provider: IFetchHeaderProvider): void;

      getJSON<T>(url: string,
        args?: any, authenticate?: boolean,
        charset?: string): Promise<T>

      postJSON<T>(url: string,
        args?: any, authenticate?: boolean,
        charset?: string): Promise<T>

      putJSON<T>(url: string,
        args?: any, authenticate?: boolean,
        charset?: string): Promise<T>

      deleteJSON<T>(url: string,
        args?: any, authenticate?: boolean,
        charset?: string): Promise<T>


      fetch<T>(url: string,
        args?: any,
        authenticate?: boolean,
        contentType?: string,
        defaultHeaders?: boolean
      ): Promise<Response | T>
    }


    export interface IPDFStyleDefinition {
      alignment?: string | "left" | "right" | "justify" | "center"
      font?: string
      fontSize?: string
      margin?: [number, number?, number?, number?]
      lineHeight?: number,
      bold?: boolean,
      italics?: boolean,
      color?: string
      [key: string]: any,
    }
    export interface IPDFContentNode {
      style?: string[],
      margin?: [number] | [number, number] | [number, number, number] | [number, number, number, number]
      [key: string]: any
    }

    export interface IPDFTableLayout {
      fillColor: (rowIndex: number, node: any, columnIndex: number) => any
    }

    export interface IPDFDocumentDefinition {
      filename: string,
      info?: {
        title?: string,
        author?: string,
        subject?: string,
        keywords?: string,
      },
      content: IPDFContentNode[],
      header?: (currentPage: number, pageCount: number) => IPDFContentNode[],
      footer?: (currentPage: number, pageCount: number, pageSize: number) => IPDFContentNode[],
      images?: {
        [key: string]: string | Buffer,
      },
      pageMargins: [number, number, number, number],
      styles: {
        [key: string]: IPDFStyleDefinition
      },
      tableLayoutOut: {
        [key: string]: IPDFTableLayout
      }
    }

    /**
     * Pdf service that generates PDFs using PDF make 
     */
    export interface IReactoryPdfService extends Reactory.Service.IReactoryDefaultService {

      generate(definition: any, stream: any): Promise<any>

      pdfDefinitions(): Reactory.Pdf.IReactoryPdfComponent

    }

    export interface IReactorySupportService extends Reactory.Service.IReactoryDefaultService {

      createRequest(request: string, description: string, requestType?: string, meta?: any, formId?: string): Promise<Models.IReactorySupportTicket | Models.IReactorySupportTicketDocument>

      updateTicket(ticket_id: string, updates: Models.IReactorySupportTicketUpdate): Promise<Models.IReactorySupportTicket | Models.IReactorySupportTicketDocument>

      attachDocument(ticket_id: string, file: File, name: string): Promise<Models.IReactorySupportTicket | Models.IReactorySupportTicketDocument>

      pagedRequest(filter: Models.IReactorySupportTicketFilter, paging: Models.IPagingRequest): Promise<Models.IPagedReactorySupportTickets>
    }

    export interface IReactorySupportServiceStatic {
      new(): IReactorySupportServiceStatic,
      reactory: IReactoryServiceDefinition
    }

    export type TReactorySupportService = IReactorySupportService & IReactorySupportServiceStatic

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
      getReactoryClient(id: string | ObjectId, populate?: string[]): Promise<Models.TReactoryClient>;

      /**
       * Returns a list of cients based on a query input
       * @param query 
       */
      getReactoryClients(query: any): Promise<Models.TReactoryClient[]>

      /**
       * returns a list of menus for a given ReactoryClient 
       * @param client 
       */
      getMenusForClient(client: Models.TReactoryClient): Promise<UX.IReactoryMenuConfig[]>
      /**
       * Run a graphql query against the graph.
       * @param query 
       * @param variables 
       */
      query(query: string, variables: any): Promise<any>
      /**
       * Run a graphql mutation against the graph.
       * @param query
       * @param variables
       */
      mutate(mutation: string, variables: any): Promise<any>
    }

    export interface IReactoryTranslationService extends Reactory.Service.IReactoryDefaultService {
      /**
       * Initializes the i18n next component for the logged in user context.
       * Loads system and module defined translations and loads any user defined translations into the user context.
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
      getTranslations(locale?: string): Promise<Models.IReactoryTranslations>

      /**
       * Sets a translation item. When using the default service the data will 
       * be validated before being added to the resource collection
       * @param translation
       */
      setTranslation(translation: Models.IReactoryTranslation): Promise<Models.IReactoryTranslation>
      /**
       * Removes a particular translation
       * @param translation
       */
      removeTranslation(translation: Models.IReactoryTranslation): Promise<Models.IReactoryTranslation>

      /**
       * Creates a object from the key structure
       * @param translation
       */
      getResource(translation: Models.IReactoryTranslation): Promise<any>

      /**
       * Creates an object from all the items in translations set
       * @param translations 
       */
      getResources(translations: Models.IReactoryTranslations): Promise<any>
      
      /**
       * Set translations package for a given languge. If present it must replace 
       * a given translation. 
       * @param translations 
       */
      setTranslations(translations: Models.IReactoryTranslations): Promise<Models.IReactoryTranslations>

      /**
       * Translates a key and merges with a given parameter set.
       * @param key 
       */
      translate(key: string, params?: any): string
      
    }

    export interface IReactoryTranslationServiceStatic {
      new(): IReactorySupportServiceStatic,
      reactory: IReactoryServiceDefinition
    }

    export type TReactoryTranslationService = IReactoryTranslationService & IReactoryTranslationServiceStatic
  }

  export namespace Server {

    export interface ReactoryEnvironment {
      [key: string]: string | number | boolean
      NODE_PATH: string
      NODE_ENV: string
      APP_DATA_ROOT: string
      MONGOOSE: string
      WORKFLOW_MONGO: string
      API_PORT: number
      SENDGRID_API_KEY: string
      API_URI_ROOT: string
      API_GRAPHQL_URI: string
      CDN_ROOT: string
      MODE: string
      LOG_LEVEL: string
      OAUTH_APP_ID: string
      OAUTH_APP_PASSWORD: string
      OAUTH_REDIRECT_URI: string
      OAUTH_SCOPES: string
      OAUTH_AUTHORITY: string
      OAUTH_ID_METADATA: string
      OAUTH_AUTHORIZE_ENDPOINT: string
      OAUTH_TOKEN_ENDPOINT: string
    }


    export interface IReactoryModuleDefinition {
      id: string
      name: string
      key: string
      fqn: string
      license: string
      moduleEntry: string
      shop: string
    }

    /**
  * The module data structure represents a collection of all the services, 
  * workflows, forms, pdf definition 
  */
    export interface IReactoryModule {
      nameSpace: string
      name: string
      version: string
      dependencies?: string[]
      priority: number,      
      graphDefinitions?: Graph.IGraphDefinitions,
      workflows?: Workflow.IWorkflow[],
      forms?: Forms.IReactoryForm[],
      pdfs?: Pdf.IReactoryPdfComponent[]
      services?: Service.IReactoryServiceDefinition[],
      clientPlugins?: Platform.IReactoryPluginDefinition,
      translations?: Models.IReactoryTranslations[]      
    }


    /**
  * The IReactoryContext is the object should be passed through to all levels of the execution.
  * It contains the logged in user, the memberships and several shortcut utilities that allows
  * all code to be executed with a specific user / application context details.
  */
    export interface IReactoryContext {
      id: string,
      /**
       * The user account that is associated with this execution 
       */
      user: Reactory.Models.IUserDocument
      /**
       * The partner / application that is currently executing
       */
      partner: Reactory.Models.IReactoryClientDocument
      /**
       * Service activator function that creates / returns a service with the given fqn (fully qualified name)
       * @param fqn - the FQN for the service to activate. 
       * @param props - any properties to pass to the service if required.
       * @param context - a specific context if you want to execute as different user, otherwise current context is used
       * @param lifeCycle - the lifecycle type for the service, either instance or singleton
       */
      getService<T extends Reactory.Service.IReactoryService>(fqn: string, props?: any, context?: Server.IReactoryContext, lifeCycle?: Service.SERVICE_LIFECYCLE): T,
      /**
       * Logging method to write logs.
       * @param message - the message to log
       * @param meta - any meta data
       * @param type - "error", "info", "debug" or "warning"
       * @param clazz - the class or component id
       */
      log(message: string, meta?: any, type?: Service.LOG_TYPE, clazz?: string): void
      /**
       * Logs a debug message to the console / log output
       * @param message - message to log out
       * @param meta - any meta data
       * @param clazz - the class or component id
       */
      debug(message: string, meta?: any, clazz?: string): void
      /**
       * Logs a warning message to the console / log output
       * @param message - message to log out     
       * @param meta - any meta data
       * @param clazz - the class or component id
       */
      warn(message: string, meta?: any, clazz?: string): void
      /**
       * Logs an error message to the console / log output
       * @param message - message to log out
       * @param meta - any meta data
       * @param clazz - the class or component id
       */
      error(message: string, meta?: any, clazz?: string): void
      /**
       * Write an info message to the console / log output
       * @param message - message to log out
       * @param meta - any meta data
       * @param clazz - the class or component id
       */
      info(message: string, meta?: any, clazz?: string): void
      state: {
        [key: string]: any
      },
      /**
       * The current response object
       */
      $response: Response,
      /**
       * The current request object
       */
      $request: Request,
      /**
       * current color palette
       */
      colors: any,
      /**
       * IoC container
       */
      container: Container,
      /**
       * Modules that are currently available for this 
       * instance
       */
      modules: Server.IReactoryModule[]
      /**
       * utility tools
       */
      utils: {
        /**
         * creates a hash from an object
         */
        hash: (obj: any) => number

        /**
         * Object mapper utility
         */
        objectMapper: ObjectMapper,

        /**
         * lodash utility for array management
         */
        lodash: typeof Lodash,
      },
      /**
       * Function to help check for specific permission
       */
      hasRole: (role: string, partner?: Models.IPartner, organization?: Models.IOrganizationDocument, businessUnit?: Models.IBusinessUnitDocument) => boolean,

      /**
       * Internationalisation Service / Translation Service.
       */
      i18n: typeof i18n,

      /**
       * Current language 
       */
      lang: string,

      /**
       * Supported languages
       */
      languages: string[],

      [key: string]: any
    }


    /**
   * The user structure that we permit in the base client config. This is useful for
   * administrator account / system accounts that need to interact with other services.
   */
    export interface IStaticallyLoadedUser {
      /**
       * Email address
       */
      email: string
      /**
       * The roles granted to this user
       */
      roles: string[]
      /**
       * Firstname for the user
       */
      firstName: string
      /**
       * Lastname for the user
       */
      lastName: string
    }



    /**
     * The reactory client config structure that is used for base configuration options
     */
    export interface IReactoryClientConfig {
      [key: string]: any
      /**
       * key for the client. This key is used by other processed
       * to determine cross application access
       */
      key: string,
      /**
       * The name of the of the application
       */
      name: string,
      /**
       * The username for the application
       */
      username: string,
      /**
       * A system email for the application
       */
      email: string,
      /**
       * set to "generate" in order for the system to 
       * automatically generate a salt for your password
       */
      salt: string,
      /**
       * The password for the application.  This password is
       * used in the header of the client request in order to request
       * access to the system.
       */
      password: string,
      /**
       * An avatar for the application
       */
      avatar: string, // application avatar
      /**
       * The site url where the api is expecting
       * the client application to be served from
       */
      siteUrl: string,
      /**
       * Email send via is the key of the email provider
       * that you want to use in order to send emails.
       */
      emailSendVia: string,
      /**
       * The email api key for the application
       */
      emailApiKey: string,
      /**
       * DEPRECATED - not to be used
       */
      resetEmailRoute: string,
      /**
       * The menu configuration for the application
       */
      menus: UX.IReactoryMenuConfig[],
      /**
       * The roles that your application will expose when in use.
       * A logged in user, will automatically be assigned the role USER
       * and an anonymous user will be assigned the ANON role. So your
       * application should at the very least have the following 
       * two applicationRoles ["USER", "ANON"]
       */
      applicationRoles: string[],
      /**
       * An array of users that should be automatically loaded / linked to this application
       */
      users?: IStaticallyLoadedUser[],

      /**
       * Used to expose a list of all the components 
       * that ship with this client config. At the moment
       * this is not being used anywhere but the react-native
       * client cannot as easily ingest dynamic external libraries
       * so we will rely on a server component registry during build
       * time to include / download any components into our
       * source tree during compilation.
       */
      components?: any[],

      /**
       * The title of the current active theme for the user Api status call.
       */
      theme?: string,
      /**
       * Available themes that the application can provide
       */
      themes?: UX.IReactoryTheme[]

      /**
       * A full list of application plugins that 
       * that the application will load into the client
       * during runtime / compile time.
       */
      plugins?: Platform.IReactoryApplicationPlugin[]
      /**
       * The billing type structure for this application partner
       * These will only apply to application where there is a billing model
       * associated with the application access
       */
      billingType?: string,
      /**
       * The built in modules for the application. These are modules that 
       * are configured for the application the application can compile 
       * these at runtime.
       */
      modules?: any[],
      /**
       * The configured routes for the application
       */
      routes: any[],

      /**
       * enabled authentication configuration
       */
      auth_config?: any[],
      /**
       * 
       */
      settings?: any[],

      /**
       * A whitelist of referring sites that are permitted for this application 
       * configuration.
       */
      whitelist?: string[]

      /**
       * If set to true to the client should be permitted to enable custom themes
       */
      allowCustomTheme?: boolean,

    }

  }

  export namespace Schema {

    export interface IDSchema {
      $id: string,
    }

    type GridSize = number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    export interface IGridLayout {
      [key: string]: {
        xs?: GridSize,
        sm?: GridSize,
        md?: GridSize,
        lg?: GridSize,
        xl?: GridSize,
        style?: any
      }
    }

    export interface IGridOptions {
      spacing?: number,
      container?: string | "Paper" | "div",
      containerStyles?: React.CSSProperties,
    }

    export interface ITabLayout {
      field: string,
      icon?: string,
      title?: string,
      [key: string]: any
    }

    export interface ITabOptions {
      textColor?: string | "primary" | "secondary"
    }

    //export type ReactoryFields = string | "ArrayField" | "BooleanField" | "TitleField" | ""

    export interface IUISchema {
      'ui:widget'?: string | "null",
      'ui:options'?: object | "null",
      'ui:field'?: string | "GridLayout" | "TabbedLayout" | "AccordionLayout" | "SteppedLayout",
      'ui:grid-layout'?: IGridLayout[],
      'ui:grid-options'?: IGridOptions,
      'ui:tab-layout'?: IGridLayout[],
      'ui:tab-options'?: IGridOptions,
      [key: string]: IUISchema | any,
    }

    export interface ISchemaObjectProperties {
      [key: string]: ISchema
    }

    export interface ISchema {
      type: string | "object" | "string" | "number" | "boolean" | "array" | "null",
      title?: string | undefined,
      description?: string | undefined,
      default?: any | undefined,
      required?: any | undefined,
      properties?: ISchemaObjectProperties | any | undefined,
      dependencies?: any | undefined,
      definitions?: any,
      items?: ISchema,
      format?: string | "email" | "password" | "date" | "date-time",
      enum?: string[]
    }

    export interface IStringSchema extends ISchema {
      type: string | "string",
      minLength?: number,
      maxLength?: number
    }

    export interface INumberSchema extends ISchema {
      type: "number",
      min?: number,
      max?: number
    }

    export interface IDateSchema extends ISchema {
      type: string | "string",
      format: "date",
      min?: number | string,
      max?: number | string
    }

    export interface IDateTimeSchema extends ISchema {
      type: "string",
      format: "date-time"
    }

    export interface IObjectSchema extends ISchema {
      type: "object",
      properties?: ISchemaObjectProperties,
    }

    export interface IArraySchema extends ISchema {
      type: "array",
      items: IObjectSchema | IDateTimeSchema | IDateSchema | INumberSchema | IStringSchema | ISchema
    }

    export interface IObjectProperties {
      [field: string]: ISchema
    }


    export type AnySchema = ISchema | IObjectSchema | IArraySchema

    /**
     * Resolver interface that returns a schema
     */
    export type TServerSchemaResolver = (form: Forms.IReactoryForm, args: any, context: Server.IReactoryContext, info: any) => Promise<AnySchema>

    /**
     * Client function interface that returns a client schema
     */
    export type TClientSchemaResolver = (form: Forms.IReactoryForm, reactory: Client.IReactoryApi) => Promise<AnySchema>

    /**
     * UI Server side client uiSchema Resolver
     */
    export type TServerUISchemaResolver = (form: Forms.IReactoryForm, args: any, context: Server.IReactoryContext, info: any) => Promise<Schema.IFormUISchema>

    /**
     * Client UI Schema Resolver
     */
    export type TClientUISchemaResolver = (form: Forms.IReactoryForm, reactory: Client.IReactoryApi) => Promise<Schema.IFormUISchema>

    /**
     * 
     */
    export interface IReactoryFormQueryErrorHandlerDefinition {
      componentRef: string,
      method: string
    }

    export interface IFormUIOptions {
      submitIcon?: string,
      submitIconProps?: {
        color: string | "primary" | "secondary",
        [key: string]: any
      },
      submitProps?: {
        variant?: string | "fab" | "contained" | "outlined" | "text" ,
        iconAlign?: string | "left" | "right";
        onClick: () => void,
        href: any,
        [key: string]: any
      },
      showSubmit?: boolean,
      showHelp?: boolean,
      showRefresh?: boolean,
      toolbarStyle?: React.CSSProperties,
      toolbarPosition?: string,
      buttons?: any[],
      showSchemaSelectorInToolbar?: boolean,
      schemaSelector?: {
        variant?: string | "icon-button" | "dropdown",
        style?: React.CSSProperties,
        showTitle?: boolean,
        selectSchemaId?: string,
        buttonStyle: React.CSSProperties,
        buttonVariant: any,
        buttonTitle: string,
        activeColor?: any,
        components: string[]
      },
    }

    export interface UISchemaGridLayout {
      style?: any,
      [key: string]: {
        xs?: number,
        sm?: number,
        md?: number,
        lg?: number,
        xl?: number,
        doShow?: (e: { formData?: any, formContext?: any }) => boolean,
        rowProps?: {
          [key: string]: any
        },
        render?: (props: any) => JSX.Element
      }
    }
    export interface IFormUISchema {
      'ui:form'?: IFormUIOptions,
      /**
       * "ui:form" is prefered method to set Form specific settting.
       * 
       */
      'ui:options'?: IFormUIOptions | any,
      /**
       * what field layout mechanism to use
       */
      'ui:field'?: string | "GridLayout" | "TabbedLayout" | "AccordionLayout" | "SteppedLayout",
      'ui:widget'?: string,
      'ui:grid-layout'? : UISchemaGridLayout[]

      [key: string]: IUISchema | any
    }
  }

  export namespace Web { }

  export namespace Workflow {

    export interface IWorkflow {
      id: string
      nameSpace: string
      name: string
      version: string
      component: any
      category: string,
      autoStart?: boolean
      props?: any
    }


  }

}

