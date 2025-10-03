/* eslint-disable no-unused-vars */
/// <reference path="../../types/global.d.ts" />

declare namespace Reactory {
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
}
