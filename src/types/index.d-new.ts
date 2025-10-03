/* eslint-disable no-unused-vars */
/// <reference path="global.d.ts" />
import moment, { Moment } from "moment";

declare namespace Reactory {
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
   * @example "system.ComponentA@1.0.0"
   */
  export type FQN = string;

  /**
   * A version string that is used to represent a version.
   * @example "1.0.0" or "1.0.0-alpha" or "1.0.0-beta" etc.
   */
  export type VERSION = string;

  /**
   * FQN Key Value Pair
   */
  export type FQNKVP<V> = IKeyValuePair<FQN, V>;

  /**
   * These are the core roles that are used by the reactory.
   * The roles are used to provide access control to components and are 
   * used in the core system.
   */
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
   * }
   * ```
   */
  export type USER_ROLE = string | REACTORY_CORE_ROLES | FQN;

  /**
   * A valid date type.
   */
  export type ValidDate = Date | moment.Moment | number | string;

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
   * ```
   */
  export type TransformFunction<TIN, TOUT> = (
    sourceObject: TIN,
    sourceKey: string,
    targetObject: TOUT,
    targetKey: string,
  ) => TOUT | Promise<TOUT>;

  /**
   * Transform an object from one shape to another asynchronously.
   * @param sourceObject - The source object that is being transformed
   * @param sourceKey - The key of the source object
   * @param targetObject - The target object that is being transformed
   * @param targetKey - The key of the target object
   * @returns The transformed object
   * @example
   * 
   * ```typescript
   * const transform = async (sourceObject, sourceKey, targetObject, targetKey) => {
   *  targetObject[targetKey] = await someAsyncFunction(sourceObject[sourceKey]);
   *  return targetObject;
   * }
   * ```
   */
  export type TransformFunctionAsync<TIN, TOUT> = (
    sourceObject: TIN,
    sourceKey: string,
    targetObject: TOUT,
    targetKey: string,
  ) => Promise<TOUT>;

  /**
   * Object Transform object is used for fine grained control over an object data set.
   */
  export interface ObjectTransform<TIN, TOUT> {
    /**
     * key is the key of the source object that is being transformed.
     */
    key: string;
    transform: TransformFunction<TIN, TOUT> | TransformFunctionAsync<TIN, TOUT>;
    transformFQN?: FQN;
    defaultFQN?: FQN;
    async?: boolean;
    default: TransformFunction<TIN, TOUT> | TransformFunctionAsync<TIN, TOUT>;
  }

  /**
   * Object Map Entry is used to map a source object to a target object.
   * example:
   *
   * ```typescript
   * {
   *   key: "sourceKey",
   *   transform: (sourceObject, sourceKey, targetObject, targetKey) => { }
   * }
   * 
   * // or
   * {
   *   key: "sourceKeyAsync",
   *   transform: async (sourceObject, sourceKey, targetObject, targetKey) => { }
   * }
   * ```
   */
  export type ObjectMapEntry = string | ObjectTransform<unknown, unknown>;

  /**
   * Object Map Multi Target Entry is used to map a source object to multiple target objects.
   */
  export type ObjectMapMultiTargetEntry = ObjectMapEntry[];
  /**
   * Object Map is used to map a source object to a target object.
   */
  export type ObjectMap = { [key: string]: ObjectMapEntry | ObjectMapMultiTargetEntry };
}

// Import all namespace files
import './core';
import './client';
import './models';
import './web';
import './components';
import './react-native';
import './excel';
import './data';
import './forms';
import './graph';
import './i18n';
import './mongo';
import './native';
import './ux';
import './routing';
import './platform';
import './pdf';
import './service';
import './server';
import './schema';
import './workflow';
import './git';

export = Reactory;
export as namespace Reactory;
