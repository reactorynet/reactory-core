"use strict";
import { SERVER_ENVIRONMENT, VERSION } from "./constants";


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
  "bigint"
}

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
 * Reactory class is a container / static holder
 * for low level / core features.
 */
class Reactory {
  static REACTORY_VERSION = VERSION;
  static REACTORY_ENVIRONMENT = SERVER_ENVIRONMENT;

  /**
   * Some core forms that are part of the system
   */
  static Forms = {};

  static FeatureType = FeatureType;

  static ComponentDomain = ComponentDomain;
}

export default Reactory;
