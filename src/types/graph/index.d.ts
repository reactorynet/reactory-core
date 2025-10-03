/* eslint-disable no-unused-vars */
/// <reference path="../../global.d.ts" />

declare namespace Reactory {
  export namespace Graph {
;

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

    export type TReactoryGraphPlugin = ApolloServerAlias.ApolloServerPlugin<Reactory.Server.IReactoryContext>;

    /**
     * Defines a Graph Plugin component
     */
    export interface IGraphPlugin extends Reactory.IReactoryComponentDefinition<TReactoryGraphPlugin> {
      ordinal: number      
    }

    export interface IGraphDefinitions {
      Resolvers: IGraphShape;
      Types: string[];
      Directives?: IGraphDirectiveProvider[];
      Plugins?: IGraphPlugin[];
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
  }