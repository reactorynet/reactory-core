/* eslint-disable no-unused-vars */
/// <reference path="../../global.d.ts" />

declare namespace Reactory {
  export namespace Ux {
export type NAMED_PALETTE = "info" | "warning" | "error" | "primary" | "secondary";

    export interface IPalette {
      light: string;
      main: string;
      dark: string;
      contrastText: string;
      warning?: string;
      error?: string;
      info?: string;
      /**
       * Use the colors array for providing a list of
       */
      colors: string[];
      [key: string]: unknown;
    }

    export interface IThemePalette {
      mode: ApplicationThemeModeType;
      primary: IPalette;
      secondary: IPalette;
      report?: IPalette;
      info?: IPalette;
      warning?: IPalette;
      success?: IPalette;
      error?: IPalette;

      background?: {
        paper?: string;
        default?: string;
      };
      [key: string]: unknown;
    }

    export interface IReactoryColorSchemes {
      primary: string[];
      secondary: string[];
    }
    export interface ITheme {
      type: string;
      palette: IThemePalette;
    }

    /**
     * Supported Theme Types.
     * Other rendering libraries will be added over time and each will
     * have their owne configuration schema
     */
    export type ReactoryThemeType = "material" | "material_native";

    /**
     * The application them mode types that the themes can support
     * or it can indicate how the application can select the
     * default theme mode if there is more
     * than one theme mode available.
     */
    export type ApplicationThemeModeType = "light" | "dark" | "os";

    /**
     * Theme modes
     */
    export interface IReactoryThemeMode {
      /**
       * unique id for the theme mode
       */
      id?: string;

      /**
       * Application theme mode
       */
      mode: ApplicationThemeModeType;

      /**
       * A name for the theme mode
       * */
      name: string;

      /**
       * Theme mode description
       * */

      description?: string;

      /**
       * an icon for the application theme mode
       */
      icon?: string;

      /**
       *The options that is associated with this theme mode
       */
      options: ITheme;
    }

    export type ReactoryThemeAssetType = "script" | "image" | "css" | "json";

    export interface IReactoryThemeAsset {
      id?: string;
      name: string;
      assetType: ReactoryThemeAssetType;
      url: string;
      loader?: string;
      options?: unknown;
      data?: unknown;
    }

    /**
     * A layout represents a special type of schema that drives
     * the layout for a given route.
     */
    export interface IReactoryLayout {
      id?: string;
      nameSpace: string;
      name: string;
      version: string;
      description?: string;
      schema: Schema.ISchema;
      uiSchema?: Schema.IUISchema;
      default?: boolean;
      inherits?: string;
    }

    /**
     * The reactory theme wrapper is used to contain the theme
     * configuration for different theme types
     */
    export interface IReactoryTheme {
      id?: string;
      type: ReactoryThemeType;
      name?: string;
      nameSpace?: string;
      version?: string;
      description?: string;
      defaultThemeMode?: ApplicationThemeModeType;
      modes?: IReactoryThemeMode[];
      options?: unknown;
      assets?: IReactoryThemeAsset[];
      layouts?: IReactoryLayout[];
      colorSchemes?: IReactoryColorSchemes;
      /**
       * The current active palette for this context
       */
      palette?: Reactory.UX.IThemePalette;
      content?: unknown;
      /**
       * used for adding additional properties / icons / svgs etc to the theme.
       * these have to be added on the client side via an injectable component.
       */
      extensions?: unknown;
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
      ordinal: number;
      /**
       * The menu title, can either be a standard string or translation key
       */
      title: string;
      /**
       * link for the menu item, these links need to map to a route defined in the
       * application routes otherwise the navigation won't go anywhere.
       *
       * If you want to raise an event instead of a navigation link then
       * add the link as "event://YourEventNameHere?param1=x&param2=y"
       * and the even will be raise through the reatory api with the parameters
       * specified in the query params.
       */
      link: string;
      /**
       * The icon to use for the menu item.
       */
      icon?: string;

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
      image?: string;

      /**
       * The roles that the user must have in order to access this menu.
       */
      roles?: string[];
      /**
       * The sub menu items for this menu item
       */
      items?: IMenuItem[];
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
      resolver?: string;
    }

    /**
     * Menu configuration item.
     */
    export interface IReactoryMenuConfig {
      /**
       * A user friendly name for the menu group
       */
      name: string;
      /**
       * A unqiue key for the menu group
       */
      key: string;
      /**
       * A target area for the menu group to bind itself to.
       * Each application can have a custom navigational system and
       * these navigational systems need to be aware of the menu configuration.
       */
      target: string;
      /**
       * The roles the user should have in order to access this menu item
       */
      roles: string[];
      /**
       * The menu entries associated with this group.
       */
      entries: IMenuItem[];
    }

    /**
     * A reactory component interface
     */
    export interface IReactoryComponent {
      id?: string;
      name: string;
      nameSpace: string;
      version: string;
      title?: string;
      description?: string;
      author?: string;
      roles?: string[];
      args?: Reactory.IKeyValuePair<string, unknown>[];
    }

    //
    // Utility type that can be used to provide
    // various styling options for graph elements
    //
    export interface UXMeta {
      // """
      // A background color that will provided in either HEX or rgba values.
      // """
      backgroundColor: string;
      //   """
      // A uri for a background image
      // """
      backgroundImage: string;
      //   """
      // A color for the element
      // """
      color: string;
      //   """
      // font to use
      //   """
      font: string;
      //   """
      // font size
      //   """
      fontSize: string;
      //   """
      // font styling
      //   """
      fontStyle: string;
      //   """
      // url for an avatar
      // """
      avatar: string;
      //   """
      // a material icon id
      //   """
      icon: string;
      //   """
      // A classname
      //   """
      className: string;
      //   """
      // custom jss that can be compiled by the client
      //   """
      jss: unknown;
      //   """
      // custom styled element data
      //   """
      styled: unknown;
    }

    export interface IThemedUXMeta {
      // """
      // theme name to which this applies
      // """
      theme: string;

      // """
      // Theme mode:
      // light / dark / os
      // """
      mode: ApplicationThemeModeType;

      // """
      // UX Meta entry
      // """
      uxmeta: UXMeta;
    }

    /**
     * Themed UX Meta object map.
     * default is required.
     */
    export type ThemedUXMeta = {
      light?: IThemedUXMeta;
      dark?: IThemedUXMeta;
      default: IThemedUXMeta;
    };

    /**
     * Array of themed UX meta
     */
    export type ThemedUXMetaArray = IThemedUXMeta[];

    export interface IDropDownMenuItem {
      id: string;
      key?: string;
      title?: string;
      icon?: string;
      iconProps?: unknown;
      disabled?: boolean;
      selected?: boolean;
      style?: unknown;
      [key: string]: unknown;
    }

    export interface IDataDropDownMenuItem<T> extends IDropDownMenuItem {
      data: T;
    }

    export interface IDropDownMenuProps {
      menus: Reactory.UX.IDropDownMenuItem[];
      id?: unknown;
      propertyMap?: unknown;
      tooltip?: string;
      onSelect?: (evt: React.SyntheticEvent, menu: IDropDownMenuItem) => void;
      style?: unknown;
      size?: "small" | "medium" | "large";
      iconStyle?: unknown;
      icon?: string;
    }
  }
  }