/* eslint-disable no-unused-vars */
/// <reference path="../../global.d.ts" />

declare namespace Reactory {
  export namespace Git {
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