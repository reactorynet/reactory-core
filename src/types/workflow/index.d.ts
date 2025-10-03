/* eslint-disable no-unused-vars */
/// <reference path="../global.d.ts" />

declare namespace Reactory {
  export namespace Workflow {
    /**
     * Workflow step interface
     */
    export interface IWorkflowStep {
      id: string;
      name: string;
      description?: string;
      type: string;
      data?: unknown;
    }

    /**
     * Workflow definition interface
     */
    export interface IWorkflowDefinition {
      id: string;
      name: string;
      description?: string;
      steps: IWorkflowStep[];
    }
  }
}