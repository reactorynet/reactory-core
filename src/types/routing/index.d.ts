/* eslint-disable no-unused-vars */
/// <reference path="../global.d.ts" />

declare namespace Reactory {
  export namespace Routing {
    /**
     * Route configuration interface
     */
    export interface IReactoryRoute {
      /**
       * The path for the route
       */
      path: string;
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
       * Configuration for the header
       */
      header?: Partial<{
        show: boolean;
        title: string;
        componentFqn: string;
        props: { [key: string]: unknown };
        propsMap: { [key: string]: unknown };
      }>;

      /**
       * Configuration for footer component
       */
      footer?: Partial<{
        show: boolean;
        title: string;
        componentFqn: string;
        props: { [key: string]: unknown };
        propsMap: { [key: string]: unknown };
      }>;

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
        props: unknown,
      ) => unknown;
    }
  }
}