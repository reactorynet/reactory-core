/* eslint-disable no-unused-vars */
/// <reference path="../../types/global.d.ts" />

declare namespace Reactory {
  export namespace Components {
type StaticContentWidget = (props: StaticContentProps) => JSX.Element;

      export interface IDropDownMenuItem {
        id?: string;
        key?: string;
        title?: string;
        icon?: string;
      }

      export interface DropDownMenuProps {
        menus: IDropDownMenuItem[];
        onSelect: (evt: React.SyntheticEvent, menu: IDropDownMenuItem) => void;
      }

      export type DropDownMenu = (props: DropDownMenuProps) => JSX.Element;

      export interface FullScreenModalProps {
        onClose: () => void;
        title: string;
        children: unknown;
        open: boolean;
        [key: string]: unknown;
      }

      export type FullScreenModal = (props: FullScreenModalProps) => JSX.Element;
      export interface TAny {
        id?: string;
        [key: string]: unknown;
      }

      export type MaterialListItemStyleFunction = (
        item: TAny,
        formContext: Reactory.Client.IReactoryFormContext<TAny>,
        index: number,
        items: TAny[],
      ) => StyleSheet;
      export type MaterialListItemObjectValueProvider = (
        item: TAny,
        formContext: Reactory.Client.IReactoryFormContext<TAny>,
        index: number,
        items: TAny[],
      ) => unknown;
      export type MaterialListItemStringValueProvider = (
        item: TAny,
        formContext: Reactory.Client.IReactoryFormContext<TAny>,
        index: number,
        items: TAny[],
      ) => string;
      export interface IMaterialListWidgetOptions {
        /**
         * String field template to use for primary text
         */
        primaryText?: string | MaterialListItemStringValueProvider;
        /**
         * String field template for secondary text
         */
        secondaryText?: string | MaterialListItemStringValueProvider;
        /**
         * String field template for avatar
         */
        avatar?: string | MaterialListItemStringValueProvider;

        /**
         * String field template for the avatar alt
         */
        avatarAlt?: string | MaterialListItemStringValueProvider;
        /**
         * position of the avatar
         */
        avatarPosition?: string | "right" | "left";
        /**
         * avatar source field. Use this field to specify which property
         * should be used on the item as the source for the avatar
         */
        avatarSrcField?: string | MaterialListItemStringValueProvider;

        /**
         * The alt field name or provider function
         */
        avatarAltField?: string | MaterialListItemStringValueProvider;
        /**
         * Dropdown field / action button for the list item
         */
        dropdown?: string | MaterialListItemStringValueProvider;
        /**
         * Boolean to indicate if the list data must be
         * fetched by the component
         */
        remoteData?: boolean;
        /**
         * variable map to use for the input
         */
        variables?: object;
        /**
         * Result map to use when converting the data
         */
        resultMap?: object;
        /**
         * Key to use for to extract the array from the result
         */
        resultKey?: string;
        /**
         * Properties to pass to the List object
         */
        listProps?: unknown;
        /**
         * The name of the query on the graphql definition
         */
        query?: string;
        /**
         * Pagination settings for the list item
         */
        pagination?: {
          /**
           * Page size
           */
          pageSize?: number;
          /**
           * the variant will determine how the paging is managed
           */
          variant?: string | "page" | "infinte";
          /**
           * The result key to use for extracting the pagination field
           */
          resultKey?: string;
          /**
           * Object map for mapping the result
           */
          resultMap?: ObjectMap;
        };
        /**
         * The icon property
         */
        icon?: string | MaterialListItemStringValueProvider;
        /**
         * Icon classname
         */
        iconClassname?: string | MaterialListItemStringValueProvider;
        /**
         * The field name on the item to be referenced for the icon
         */
        iconField?: string | MaterialListItemStringValueProvider;
        /**
         * a map that is used to map the value in the item field
         * to an icon
         */
        iconFieldMap?: {
          [key: string]: string | MaterialListItemStringValueProvider;
        };
        /**
         * Stylesheet for the icon formatting
         */
        iconStyle?: StyleSheet | MaterialListItemStyleFunction;
        /**
         * Position of icon
         */
        iconPosition?: string | "left" | "right";
        /**
         * unknown custom jss we want to use when creating the list item
         */
        jss?: unknown;
        /**
         * A custom component that we may want to use for the item instead of the default
         * list item.
         */
        listItemsComponent?: string;

        /**
         * Secondary Action options.
         *
         * The secondary action item can be rendered with a default interpretation.
         * Properties that apply to the default renderer
         * * label
         * * iconKey
         * * link
         * The secondary action can also be bound to a custom component
         */
        secondaryAction?: {
          /**
           * A label for the secondary action component.
           */
          label?: string | MaterialListItemStringValueProvider;
          /**
           * The icon key that will be used for
           */
          iconKey?: string | MaterialListItemStringValueProvider;
          /**
           * The component fqn that gets bound to the object
           */
          componentFqn?: string | MaterialListItemStringValueProvider;
          /**
           *
           */
          component?: MaterialListItemObjectValueProvider;
          action?: string | MaterialListItemStringValueProvider;
          actionData?: unknown | MaterialListItemObjectValueProvider;
          link?: string | MaterialListItemStringValueProvider;
          props?: unknown;
          propsMap?: unknown;
        };
        [key: string]: unknown;
      }

      export type MaterialTableWidgetColumnDefinition = {
        /**
         * Field title
         */
        title: string;
        /**
         * The field / property name on the data set
         */
        field: string;
        /**
         * A component to bind to the column
         */
        component?: string;
        /**
         * Array of components to bind
         */
        components?: {
          component: string;
          props?: {
            [key: string]: unknown;
          };
          propsMap?: ObjectMap;
        }[];
        /**
         * An array of components to bind to the column
         */
        propsMap?: unknown;
        /**
         *
         */
        props?: {
          actionButton?: {
            icon?: string;
            color?: string;
            size?: string | "small" | "medium" | "large";
            variant?: string | "text" | "outlined" | "contained";
            text?: string;
          };
          [key: string]: unknown;
        };
        /**
         *
         */
        sort?: boolean;
        /**
         *
         */
        total?: boolean;

        /**
         *
         */
        breakpoint?: string;

        aggregator?: (column: MaterialTableWidgetColumnDefinition, data: unknown[]) => unknown;
        [key: string]: unknown;
      };

      export interface IMaterialTableWidgetActionEvent {
        via?: string | "form" | "amq" | "component";
        /**
         * name of the event
         */
        name?: string;
        /**
         * Parameters to pass to the event
         */
        params?: {
          [key: string]: unknown;
        };
        /**
         * object map to use when mapping properties
         */
        paramsMap?: ObjectMap;
        /**
         * when the via is set to component
         * the event that is raised
         **/
        component?: string;

        [key: string]: unknown;
      }

      export interface IMaterialTableConfirmationDialogProps {
        key: string;

        icon?: string;
        iconProps?: {
          style?: React.CSSProperties;
          [key: string]: unknown;
        };

        title: string;
        titleProps?: {
          style?: React.CSSProperties;
          [key: string]: unknown;
        };

        content: string;
        contentProps?: {
          style?: React.CSSProperties;
          [key: string]: unknown;
        };

        acceptTitle: string;
        confirmProps?: {
          variant: string;
          style?: React.CSSProperties;
          [key: string]: unknown;
        };

        cancelTitle: string;
        cancelProps?: {
          variant: string;
          style?: React.CSSProperties;
          [key: string]: unknown;
        };

        /**
         * Mutation to execute
         */
        mutation?: string;
        /**
         * variable map to use for mapping
         * properties to mutation params.
         */
        variables?: unknown;
        /**
         * The result map to use (will se the default on associated with )
         */
        resultMap?: unknown;

        /**
         * The action to execute on completion
         */
        resultAction?: string | "refresh";
      }

      /**
       * Row action
       */
      export interface IMaterialTableWidgetAction {
        /**
         * The title to display
         */
        title?: string;
        /**
         * icon to use for row action
         */
        icon?: string;
        /**
         * the tooltip to display
         */
        tooltip?: string;
        /**
         * if a free action the action will display in the toolbar
         */
        isFreeAction?: boolean;
        /**
         * the key for the action
         */
        key: string;
        /**
         * Material Table Widget Action
         */
        event?: IMaterialTableWidgetActionEvent;

        /**
         * When defined it will render the component
         */
        componentFqn?: string;

        /**
         * The property map to use for the component
         */
        propsMap?: unknown;

        /**
         * The name of the mutation to invoke.
         */
        mutation?: string;

        /**
         * The confirmation dialog properties
         */
        confirmation?: IMaterialTableConfirmationDialogProps;

        [key: string]: unknown;
      }

      /**
       * Options interface for the Reactory Material Table Widget
       *
       */
      export interface IMaterialTableWidgetOptions {
        /**
         * If set to showLabel is set to false
         */
        showLabel?: boolean;
        /**
         * Allow Add. When set to true, the table will provide an add interface for the grid.
         */
        allowAdd?: boolean;

        /**
         * Allow delete. When set to true the table will provide
         * interfcae for the deleting of records.
         */
        allowDelete?: boolean;

        /**
         * Delete button properties
         */
        deleteButtonProps?: {
          icon?: string;
          tooltip?: string;
          color?: string;
          onClick?: string;
          onClickPropsMap?: unknown;
          onClickProps?: unknown;
          [key: string]: unknown;
        };

        /**
         * Add button properies
         */
        addButtonProps?: {
          icon?: string;
          tooltip?: string;
          color?: string;
          onClick?: string;
          onClickPropsMap?: unknown;
          onClickProps?: unknown;
          [key: string]: unknown;
        };

        /**
         * Column definition
         */
        columns: MaterialTableWidgetColumnDefinition[];
        /**
         * Is the data provided via remote query
         */
        remoteData?: boolean;
        /**
         * query name
         */
        query?: string;
        /**
         * localization options
         */
        localization?: unknown;

        /**
         * Refresh Events
         */
        refreshEvents?: { name: string }[];

        /**
         * The options for the the table interface
         */
        options?: {
          /**
           * Enables or disables grouping
           */
          grouping?: boolean;
          /**
           * Group by fields
           */
          groupBy?: string[];

          /**
           * Enable search in toolbar
           */
          search?: boolean;
          /**
           * Show title in field
           */
          showTitle?: boolean;
          /**
           * Show or hide toolbar
           */
          toolbar?: boolean;
          /**
           * Enable or disable selection
           */
          selection?: boolean;
          /**
           * Page size
           */
          pageSize?: number;
          /**
           * Page size options
           */
          pageSizeOptions?: number[];
          /**
           * allow ordering
           */
          allowOrder?: boolean;
          /**
           * The field that we want to use for ordering the result
           */
          orderField?: string;
          /**
           * Allow Sort
           */
          sortFields?: { field: string; direction?: "asc" | "desc" }[];

          [key: string]: unknown;
        };
        /**
         * The component map
         */
        componentMap?: {
          DetailsPanel?: string;
          Toolbar?: string;
        };
        actions?: IMaterialTableWidgetAction[];
        /**
         * Toolbar static props
         */
        toolbarProps?: {
          [key: string]: unknown;
        };
        /**
         * Toolbar property map
         */
        toolbarPropsMap?: {
          [key: string]: unknown;
        };
        /**
         * Where to place the toolbar
         */
        toolbarPosition?: string | "none" | "top" | "bottom";
        /**
         *
         */
        detailPanelPropsMap?: ObjectMap;
        /**
         * Static properties to pass to the detail panel
         */
        detailPanelProps?: {
          [key: string]: unknown;
        };
        /**
         *
         */
        resultMap?: ObjectMap;
        resultType?: string | "array" | "object";
        resultKey?: string;
        variables: ObjectMap;

        columnsProperty?: string;

        columnsPropertyMap?: ObjectMap;

        headerStyle: {
          [key: string]: unknown;
        };

        rowStyle: {
          [key: string]: unknown;
        };

        selectedRowStyle: {
          [key: string]: unknown;
        };

        altRowStyle: {
          [key: string]: unknown;
        };

        conditionalRowStyling: {
          field: string;
          condition: string;
          style: {
            [key: string]: unknown;
          };
        }[];
        /**
         *
         */
        [key: string]: unknown;
      }

      export interface IAutoCompleteDropDownUIProps {
        multiSelect: boolean;
        onChangePropsMap: ObjectMap;
        nullValue: any;
        filterSelectedOptions: boolean;
        keyField: string;
        labelField: string;
        matchField: string;
        displayField: string;
        title: string;
      }

      export interface IAutoCompleteDropDownUISchema extends Reactory.Schema.IUISchema {
        "ui:options"?: IAutoCompleteDropDownUIProps;
      }

      export type SupportTicket = (props: {
        reference: string;
        mode: "view" | "edit" | "new";
      }) => JSX.Element;

      /**
       * ReactoryForm component type alias.
       */
      export type ReactoryForm = React.FunctionComponent<Reactory.Client.IReactoryFormProps>;

      /**
       *
       */
      export interface IDateWidgetUISchema extends Reactory.Schema.IUISchema {
        "ui:options"?: {
          InputProps?:
            | Partial<InputProps>
            | Partial<FilledInputProps>
            | Partial<OutlinedInputProps>;
          /**
           * the format for the date string
           */
          format?: string;
          /**
           * controls whether or not the field renders fullwidth, the default is set to true
           */
          fullWidth?: boolean;
          /**
           * Input mask for the date
           */
          mask?: string;
        };
      }

      /**
       * Represents a valid
       */
      export type WiredDateWidgetProps = Reactory.Client.IReactoryWidgetProps<
        ValidDate,
        unknown,
        IDateWidgetUISchema
      >;
    }
  }