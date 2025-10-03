/* eslint-disable no-unused-vars */
/// <reference path="../global.d.ts" />

declare namespace Reactory {
  export namespace Platform {
    /**
     * Plugin loader options interface
     */
    export interface IPluginLoaderOptions {
      // Add plugin loader options here
    }

    /**
     * Reactory Application Plugin Platform enum
     */
    export enum ReactoryApplicationPluginPlatform {
      "web",
      "mobile",
      "desktop",
      "server"
    }

    /**
     * Reactory Resource Loader
     */
    export type ReactoryPluginLoader = (options: IPluginLoaderOptions) => Promise<void>;

    /**
     * Known reactory plugin events
     */
    export type KnownReactoryPluginEvents = "loaded" | "error" | "unloaded";
    
    /**
     * The IReactoryPluginEvent interface defines the data elements required
     * to define a plugin event that can be emitted by a plugin.
     * 
     * The event must be raised via the Reactory SDK and it can be consumed
     * by any other plugin and system listeners that is listening.
     */
    export interface IReactoryPluginEvent<T> {
      /**
       * The name of the event that is emitted by the plugin.
       */
      name: string | KnownReactoryPluginEvents;
      /**
       * Indicates whether or not the event should only be bound / consumed once.
       **/
      once?: boolean;
      /**
       * The max number of times the event should be consumer
       * */
      limit?: number;
      /**
       * The throttle time in milliseconds
       */
      throttleMs?: number;
    }
    /**
     * Event raised when a plugin encounters an error
     */
    export type ReactoryPluginErrorEvent = IReactoryPluginEvent<Error> & { name: "error" };

    /**
     * Event raised when a plugin is unloaded
     */
    export type ReactoryPluginUnloadedEvent = IReactoryPluginEvent<IReactoryApplicationPlugin> & { name: "unloaded" };

    /**
     * Event raised when a plugin is loaded
     */
    export type ReactoryPluginLoadedEvent = IReactoryPluginEvent<IReactoryApplicationPlugin> & { name: "loaded" };

    /**
     * Known plugin events
     */
    export type ReactoryKnownPluginEvents = ReactoryPluginErrorEvent | ReactoryPluginUnloadedEvent | ReactoryPluginLoadedEvent;
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
       * The icon for the plugin
       * */
      icon?: string;
      /**
       * Reactory Application Plugin Platform
       */
      platform: ReactoryApplicationPluginPlatform;
      /**
       * uri for the plugin
       */
      uri: string;
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
      /**
       * A list of events that the plugin can emit
       */
      events?: IReactoryPluginEvent<ReactoryKnownPluginEvents>[];
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
}