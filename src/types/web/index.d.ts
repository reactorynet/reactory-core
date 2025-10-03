/* eslint-disable no-unused-vars */
/// <reference path="../global.d.ts" />
import * as MaterialCoreAlias from '@mui/material';
import * as MaterialStylesAlias from '@mui/styles';
import * as MaterialLabsAlias from '@mui/lab';
import * as MaterialIconsAlias from '@mui/icons-material';

declare namespace Reactory {
  export namespace Web {
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
  }