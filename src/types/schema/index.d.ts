/* eslint-disable no-unused-vars */
/// <reference path="../global.d.ts" />
/// <reference path="../forms/index.d.ts" />
/// <reference path="../server/index.d.ts" />
/// <reference path="../ux/index.d.ts" />
/// <reference path="../web/index.d.ts" />
/// <reference path="../client/index.d.ts" />
/// <reference path="../i18n/index.d.ts" />
/// <reference path="../data/index.d.ts" />
/// <reference path="../core/index.d.ts" />
/// <reference path="../mongo/index.d.ts" />
/// <reference path="../native/index.d.ts" />

import * as MaterialCoreAlias from '@mui/material';

declare namespace Reactory {
  export namespace Schema {
    export namespace Reflection {
      type Primitive = string | number | boolean | null;

      type JSONSchema =
        | PrimitiveSchema
        | ArraySchema
        | ObjectSchema
        | CombinedSchema
        | ReferenceSchema;

      interface PrimitiveSchema {
        type:
          | "string"
          | "number"
          | "bigint"
          | "boolean"
          | "symbol"
          | "undefined"
          | "object"
          | "function";
      }

      interface ArraySchema {
        type: "array";
        items: JSONSchema;
      }

      interface ObjectSchema {
        type: "object";
        properties: { [key: string]: JSONSchema };
        required?: string[];
      }

      interface CombinedSchema {
        type: "string" | "number" | "integer" | "boolean";
        enum: Primitive[];
      }

      interface ReferenceSchema {
        $ref: string;
      }
    }

    export interface IDSchema {
      $id: string;
    }

    export interface IErrorSchema {
      [key: string]: any;
    }

    export type GridSize = number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

    export interface IGridFieldLayout {
      xs?: GridSize;
      sm?: GridSize;
      md?: GridSize;
      lg?: GridSize;
      xl?: GridSize;
      style?: unknown;
      render?: React.ComponentType<any> | React.FC<any>;
      doShow?: (formData: unknown) => boolean;
    }
    export interface IGridLayout {
      [key: string]: IGridFieldLayout;
    }

    export interface IGridOptions {
      spacing?: number;
      container?: string | "Paper" | "div";
      containerStyles?: React.CSSProperties;
      jss?: unknown;
      sx?: MaterialCoreAlias.SxProps<MaterialCoreAlias.Theme>;
      [key: string]: unknown;
    }

    export interface ITabLayout {
      field: string;
      icon?: string;
      title?: string;
      [key: string]: unknown;
    }

    export interface ITabOptions {
      textColor?: string | "primary" | "secondary";
      path?: string;
      useRouter?: boolean;
      tabsProps?: {
        variant?: string | "fullWidth" | "scrollable";
        style?: React.CSSProperties;
        indicatorColor?: string | "primary" | "secondary";
        [key: string]: unknown;
      };
    }

    //export type ReactoryFields = string | "ArrayField" | "BooleanField" | "TitleField" | ""

    /**
     * place holder for Accordian layout
     */
    export interface IAccordionLayout {
      [key: string]: unknown;
    }

    /**
     * Place holder interface
     */
    export interface IAccordionOptions {
      [key: string]: unknown;
    }

    /**
     * Place holder interface
     */
    export interface ISteppedLayout {
      [key: string]: unknown;
    }

    /**
     * Place holder interface
     */
    export interface ISteppedOptions {
      [key: string]: unknown;
    }

    /**
     * Place holder interface
     */
    export interface IListLayout {
      [key: string]: unknown;
    }

    /**
     * Place holder interface
     */
    export interface IListLayoutOptions {
      [key: string]: unknown;
    }

    /**
     * Place holder interface
     */
    export interface IPagedLayout {
      [key: string]: unknown;
    }

    /**
     * Place holder interface
     */
    export interface IPagedLayoutOptions {
      [key: string]: unknown;
    }

    /**
     * Place holder interface for the column layout
     */
    export interface IColumnLayoutOptions {
      [fieldName: string]: {
        title: string;
        width: number;
        align?: "left" | "right" | "center";
        draggable?: boolean;
        resizable?: boolean;
        sortable?: boolean;
      };
    }

    /**
     * Function type that provides a format string / format result based on a function
     */
    export type TUIFormatProvider = (
      schema: ISchema,
      uiSchema: IUISchema,
      formData?: unknown,
      form?: Reactory.Forms.IReactoryForm,
      context?: Reactory.Server.IReactoryContext,
    ) => string;

    /**
     * Function type that provides a JSX structure
     */
    export type TUIJssProvider = (
      schema: ISchema,
      uiSchema: IUISchema,
      formData?: unknown,
      form?: Reactory.Forms.IReactoryForm,
      context?: Reactory.Server.IReactoryContext,
    ) => unknown;

    /**
     * UX Schema options that are applied to the schema field using the
     * 'ui:options' property.
     */
    export interface IUISchemaOptions {
      [key: string | symbol]: unknown;
      /**
       * special string formatting instruction / expression
       */
      format?: string | TUIFormatProvider;
      /**
       * JSX that can be used by the component for style rules.
       * Not all components currently support this property, but
       * where it is available the component documentation will highlight
       * this feature.
       */
      jss?: unknown | TUIJssProvider;

      /**
       * Style rules for the UISchema options
       */
      style?: React.CSSProperties;

      sx?: MaterialCoreAlias.SxProps<MaterialCoreAlias.Theme>;
      /**
       * Boolean indicating if the field should be hidden
       */
      hidden?: boolean;
    }

    /**
     * Default field options that apply the number field
     */
    export interface IUINumberFieldUIOptions extends IUISchemaOptions {
      type?: string | "int" | "float" | "double";
    }

    /**
     * A schema that defines the 'ui:options' for a field that should render as a
     * label widget.
     *
     * These options apply to the LabelWidget component.
     */
    export interface IUILabelWidgetOptions extends IUISchemaOptions {
      /**
       * Title string for the label widget. This value can contain
       * a valid lodash template string.
       */
      title?: string;
      /**
       * Icon object
       */
      icon?: unknown;
      iconType?: string;
      iconPosition?: string | "left" | "right";
      variant?:
        | string
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
        | "caption"
        | "button"
        | "overline"
        | "inherit"
        | "subtitle1"
        | "subtitle2"
        | "body1"
        | "body2";
      iconProps?: { style: any; [key: string]: any };
      renderHtml?: boolean;
      titleProps?: { style: any; [key: string]: any };
      bodyProps?: { style: any; [key: string]: any };
      containerProps?: { style: any; [key: string]: any };
      componentFqn?: string;
      componentProps?: { style: any; [key: string]: any };
      componentPropsMap?: ObjectMap;
      /**
       * If true, the label will be rendered as a link that will copy the value
       * of the field to the clipboard.
       */
      copyToClipboard?: boolean;
      /**
       * Text to display when the formData value is null, undefined or empty.
       * Useful for ensuring labels are properly displayed even with no data.
       */
      emptyText?: string;
      /**
       * When true, forces the InputLabel to be in the shrunk state even when
       * the field has no value. Useful for LabelWidget with empty/null values.
       */
      forceShrinkLabel?: boolean;
    }
    
    export interface IUILinkWidgetOptions extends IUISchemaOptions {
      /**
       * Link text format string. Can include template variables.
       */
      format?: string;
      
      /**
       * Title for the link text
       */
      title?: string;
      
      /**
       * Icon to show with the link
       */
      icon?: string;
      
      /**
       * Icon type/category
       */
      iconType?: string;
      
      /**
       * Icon position - 'left', 'right', or 'inline'
       */
      iconPosition?: 'left' | 'right' | 'inline';
      
      /**
       * Button variant - 'text', 'contained', 'outlined'
       */
      variant?: 'text' | 'contained' | 'outlined';
      
      /**
       * Additional properties for the icon
       */
      iconProps?: { [key: string]: any };
      
      /**
       * Component type to render - 'button', 'fab', 'iconbutton', 'label', 'link'
       */
      component?: 'button' | 'fab' | 'iconbutton' | 'label' | 'link';
      
      /**
       * Size of the button/component
       */
      size?: 'small' | 'medium' | 'large';
      
      /**
       * Whether to show the label
       */
      showLabel?: boolean;
      
      /**
       * Whether to use React Router for navigation
       */
      useRouter?: boolean;
      
      /**
       * Material UI system styles
       */
      sx?: any;
      
      /**
       * Container styles
       */
      containerSx?: any;
      
      /**
       * Container type - 'Box' or 'FormControl'
       */
      containerType?: 'Box' | 'FormControl';
      
      /**
       * Whether to open links in a new window
       */
      openInNewWindow?: boolean;
      
      /**
       * When true, forces the InputLabel to be in the shrunk state even when
       * the field has no value. Useful for LinkWidget with empty/null values.
       */
      forceShrinkLabel?: boolean;

      "ui:graphql"?: Reactory.Forms.IReactoryFormQuery;
    }

    export interface IUIUTextFieldOptions extends IUISchemaOptions {
      multiline?: boolean;
      /**
       * setting the renderer type html will render the text using an unsafe set html operation
       * markdown will use a markdown renderer, richtext will be dependent on the platform
       * provide the native richtext experience and text will be plain text.
       */
      renderer?: string | "html" | "markdown" | "richtext" | "text";
    }

    export interface IUIBooleanFieldOptions extends IUISchemaOptions {
      readonly?: boolean;
      yesLabel?: string;
      noLabel?: string;
      showLabels?: boolean;
      yesIcon?: string;
      yesIconOptions?: {
        color?: string;
        fontSize?: number;
        position?: "left" | "right" | "top" | "bottom";
        jss?: unknown;
        sx?: MaterialCoreAlias.SxProps<MaterialCoreAlias.Theme>;
      };
      noIcon?: string;
      noIconOptions?: {
        color?: string;
        fontSize?: number;
        position?: "left" | "right" | "top" | "bottom";
        jss?: unknown;
        sx?: MaterialCoreAlias.SxProps<MaterialCoreAlias.Theme>;
      };
    }

    export type IUIDateFieldOptions = IUISchemaOptions;

    export type IUIObjectFieldOptions = IUISchemaOptions;

    export type IUIArrayFieldOptions = IUISchemaOptions;

    export type IUIAutoCompleteWidgetOptions = IUISchemaOptions;

    /**
     * Represents the form data for the AutoCompleteWidget component.
     * @typedef { unknown } AutoCompleteFormData
     */
    export type AutoCompleteFormData<T> = T;

    /**
    Represents the props for the AutoCompleteWidget component.
    @interface
    @property {AutoCompleteFormData} formData - The form data for the component.
    @property {Reactory.Schema.ISchema} schema - The JSON schema for the component.
    @property {Reactory.Schema.IDSchema} idSchema - The ID schema for the component.
    @property {Reactory.Schema.IUISchema} uiSchema - The UI schema for the component.
    @property {unknown} formContext - The form context for the component.
    @property {(formData: AutoCompleteFormData) => void} onChange - The callback function 
    for when the form data changes.
    */
    export interface IAutoCompleteWidgetProps<
      T,
      TSchema extends ISchema,
      TUISchema extends IUISchema,
      TContext extends Client.IReactoryFormContext<unknown>,
    > {
      formData: AutoCompleteFormData<T>;
      schema: TSchema;
      idSchema: {
        $id: string;
      };
      uiSchema: TUISchema;
      formContext: TContext;
      onChange: (formData: AutoCompleteFormData<T> | AutoCompleteFormData<T>[]) => void;
    }

    export interface ILineChartUIOptions {
      bounds: {
        width?: number;
        height?: number;
      };
      xKey?: string;
      yKey?: string;
      line?: {
        type?: string;
        dataKey?: string;
        stroke?: string;
      };
      series?: any[];
      xAxis?: {
        dataKey?: string;
        label?: string;
      };
      yAxis?: {
        dataKey?: string;
        label?: string;
      };
    }

    export interface ILineChartUISchema extends Reactory.Schema.IUISchema {
      "ui:widget": "LineChartWidget";
      "ui:title"?: string;
      "ui:options"?: ILineChartUIOptions;
    }

    export interface ILineChartWidgetProps {
      formData?: any[];
      schema?: any;
      uiSchema?: ILineChartUISchema;
      formContext?: any;
      reactory?: Reactory.Client.ReactorySDK;
    }

    /**
     * The standard field options for the Reactory UI engines / components.
     */
    export type TReactoryFieldOptions =
      | IUIArrayFieldOptions
      | IUIObjectFieldOptions
      | IUIDateFieldOptions
      | IUIBooleanFieldOptions
      | IUIUTextFieldOptions
      | IUINumberFieldUIOptions
      | IUISchemaOptions
      | ILineChartUIOptions
      | any;

    export type UISchemaStereotype =
      | "grid"
      | "tab"
      | "accordion"
      | "stepped"
      | "list"
      | "paged"
      | "default";

    export interface TextUIElementdOptions {
      /**
       * The title for the field, this can be a i18n key, i18n-object or string
       */
      title: string | { key: string; options: I18nFormatOptions };
      /**
       * A tooltip to provide for the text UI element
       */
      tooltip: string | { key: string; options: I18nFormatOptions };
      /**
       * A class name for the field
       */
      className?: string;
      /**
       * JSS styles for the field
       */
      jss?: unknown;
      /**
       * The icon for the field. This is a string that represents the icon
       * resources that are available for the active theme.
       * */
      icon?: string;
      /**
       * The icon options for the field.
       */
      iconOptions?: Partial<{
        color: string;
        fontSize: number;
        position: "left" | "right" | "top" | "bottom";
        jss: unknown;
        [key: string]: unknown;
      }>;

      /**
       * the color to use for the element
       */
      color?:
        | "default"
        | "secondary"
        | "inherit"
        | "primary"
        | "error"
        | "info"
        | "success"
        | "warning";

      /**
       * The field component to be used for the title field
       */
      field?: string | FQN;
      /**
       * The field options for the title field
       * */
      fieldOptions?: any;
    }

    /**
     * The title field options interface.
     * Defines the options for the "ui:title" uiSchema field.
     */
    export interface UITitleFieldOptions extends TextUIElementdOptions {}

    export interface UIDescriptionFieldOptions extends TextUIElementdOptions {}

    export interface UIErrorFieldOptions extends TextUIElementdOptions {}
    export interface UIFieldToolbarButton extends TextUIElementdOptions {
      id: string;
      command: string | FQN;
      objectMap?: ObjectMap;
      buttonProps?: MaterialCoreAlias.ButtonProps | any;
    }
    export interface UIFieldToolbarOptions {
      buttons: UIFieldToolbarButton[];
    }

    export interface UIAIOptions {
      /**
       * The persona ID to use for the AI model.
       */
      personaId?: string; 

      /**
       * Additional options for the AI persona.
       */
      options?: Record<string, any>;
    }

    /**
     * Place holder interface
     */
    export interface IUISchema {
      /**
       * The title field for the schema element.
       *
       * The title field can be a string or a UITitleFieldOptions object.
       */
      "ui:title"?: string | UITitleFieldOptions;

      /**
       * Field description for the schema object
       *
       * The description field can be a string or a UIDescriptionFieldOptions object.
       */
      "ui:description"?: string | UIDescriptionFieldOptions;

      /**
       * The order in which to render the properties.
       */
      "ui:order"?: string[];

      /**
       * Any additional props that needs to be passed to the ui component.
       */
      "ui:props"?: any;

      /**
       * Toolbar UI Schema options
       */
      "ui:toolbar"?: UIFieldToolbarOptions;
      /**
       * The wiget tat will be used to render the data element. A widget definition takes priority
       * over other configurations. The widget must be a widget that is registered in the FORM
       * registry (this is different to the reactory component registry).
       * Components can be mapped to widgets using the widget map property on the form.
       */
      "ui:widget"?: string | FQN | "null";
      /**
       * This object is passed to the component that is rendering the element.
       * Each option element is unique
       * to the data type / widget
       * that is being used to render the schema element,
       */
      "ui:options"?: TReactoryFieldOptions | "null";
      /**
       * The ui:field property describes what layout field that is registered in the form registry.
       * GridLayout will use a standard grid mechanism
       */
      "ui:field"?:
        | string
        | FQN
        | "GridLayout"
        | "TabbedLayout"
        | "AccordionLayout"
        | "SteppedLayout"
        | "ListLayout"
        | "ColumnLayout"
        | "PagedLayout";

      /**
       * The field options for the field. Use this when not using any of the
       * pre-defined layouts.
       */
      "ui:field-options"?: unknown;
      /**
       * The grid layout structure. This breaks down the distribtution of properties over a grid.
       * This is generally the default layout
       * for object types.
       */
      "ui:grid-layout"?: IGridLayout[];
      /**
       * The options for the grid layout
       */
      "ui:grid-options"?: IGridOptions;
      /**
       * Provides a tabbed interface for a object type.
       * properties can be mapped to tabs
       */
      "ui:tab-layout"?: ITabLayout[];
      /**
       * Options for the tabbed layout
       */
      "ui:tab-options"?: ITabOptions;
      /**
       * Layout options for the Accordion
       */
      "ui:accordion-layout"?: IAccordionLayout[];
      /**
       * Accordion options
       */
      "ui:accordion-options"?: IAccordionOptions;
      /**
       * Stepped Layout - used where data properties are completed in steps
       */
      "ui:stepped-layout"?: ISteppedLayout[];
      /**
       * Stepped Layout options
       */
      "ui:stepped-options"?: ISteppedOptions;
      /**
       * List layout - used when object properties are displayed as list items
       */
      "ui:list-layout"?: IListLayout[];
      /**
       * List options
       */
      "ui:list-options"?: IListLayoutOptions;
      /**
       * Paged layout - used when object properties / array
       */
      "ui:paged-layout"?: IPagedLayout[];
      /**
       * Paged options
       */
      "ui:paged-options"?: IPagedLayoutOptions;
      /**
       * When using columns for layout
       */
      "ui:column-options"?: unknown;

      /**
       * Options for error display for this field
       */
      "ui:error"?: string | UIErrorFieldOptions;
      /**
       * GraphQL form query overrides are used some widgets.
       * Widgets that use this feature are:
       * * core.LableComponent@1.0.0
       */
      "ui:graphql"?: Reactory.Forms.IReactoryFormQuery;

      "ui:ai"?: UIAIOptions
      [key: string]: IUISchema | unknown;
    }

    export interface ISchemaObjectProperties {
      [key: string]: ISchema;
    }

    /**
     * Reference schema elements
     */
    export interface IReferenceSchema {
      /**
       * The reference to the schema element that represents this schema element.
       */
      $ref: string;
    }

    export interface ISchema {
      /**
       * The type defines the field type of the Schema element.
       *
       * Valid input types are string inputs that can be:
       * - object
       * - string
       * - number
       * - boolean
       * - array
       * - null
       */
      type: string | "object" | "string" | "number" | "boolean" | "array" | "null" | string[];
      /**
       * This value will be automatically generated when using the Reactor.reflectSchema
       */
      $type?: string;
      /**
       * The title field for the schema object.
       */
      title?: string | undefined;
      /**
       * Field description for the schema object
       */
      description?: string | undefined;
      /**
       * default value for the schema element
       */
      default?: unknown | undefined;
      /**
       * Required indicator. When true then the field has to have a value
       */
      required?: unknown | undefined;
      /**
       * Schema Object Properties
       */
      properties?: ISchemaObjectProperties | unknown | undefined;
      /**
       * dependencies for the object
       */
      dependencies?: unknown | undefined;
      /**
       * Schema definitions
       */
      definitions?: unknown;
      /**
       * format type
       */
      format?:
        | string
        | "email"
        | "password"
        | "date"
        | "date-time"
        | "phone"
        | "url"
        | "uri"
        | "uuid"
        | "ipv4"
        | "ipv6";
      /**
       * valid enum values
       */
      enum?: string[];
      /**
       * When readonly then the field should not allow updates
       */
      readonly?: boolean;
      /**
       * The fully qualified name for the field. When left blank the system
       * will complete this item.
       *
       * eg: reactory.MyApplications@1.0.0/schema.applications.id
       *
       * When your field type is set to function / promise the FQN has to resolve
       * to the function id that must be bound to this object element.
       */
      fqn?: string;
      /**
       * additional properties that may be added to the object
       */
      additionalProperties?: ISchema;
    }

    /**
     *
     */
    export interface IStringSchema extends ISchema {
      type: string | "string";
      minLength?: number;
      maxLength?: number;
      pattern?: string | RegExp;
    }

    export interface IBooleanSchema extends ISchema {
      type: "boolean";
      default?: boolean;
    }

    export interface INumberSchema extends ISchema {
      type: "number";
      minimum?: number;
      maximum?: number;
      default?: number;
    }

    export interface IDateSchema extends ISchema {
      type: string | "string";
      format: "date";
      minimum?: number | string;
      maximum?: number | string;
      default?: number | string;
    }

    export interface IDateTimeSchema extends ISchema {
      type: "string";
      format: "date-time";
      minimum?: number | string;
      maximum?: number | string;
      default?: number | string;
    }

    export interface IObjectSchema extends ISchema {
      type: "object";
      properties: ISchemaObjectProperties;
      default?: object | unknown;
    }

    export interface IArraySchema extends ISchema {
      type: "array";
      items:
        | IObjectSchema
        | IDateTimeSchema
        | IDateSchema
        | INumberSchema
        | IStringSchema
        | ISchema;
    }

    export interface IObjectProperties {
      [field: string]: AnySchema;
    }

    export type AnySchema =
      | ISchema
      | IStringSchema
      | INumberSchema
      | IDateSchema
      | IDateTimeSchema
      | IObjectSchema
      | IArraySchema;

    /**
     * Resolver interface that returns a schema
     */
    export type TServerSchemaResolver = (
      form: Forms.IReactoryForm,
      args: unknown,
      context: Server.IReactoryContext,
      info: unknown,
    ) => Promise<AnySchema>;

    /**
     * Client function interface that returns a client schema
     */
    export type TClientSchemaResolver = (
      form: Forms.IReactoryForm,
      reactory: Client.IReactoryApi | Client.ReactorySDK,
    ) => Promise<AnySchema>;

    /**
     * UI Server side client uiSchema Resolver
     */
    export type TServerUISchemaResolver = (
      form: Forms.IReactoryForm,
      args: unknown,
      context: Server.IReactoryContext,
      info: unknown,
    ) => Promise<Schema.IFormUISchema>;

    /**
     * Client UI Schema Resolver
     */
    export type TClientUISchemaResolver = (
      form: Forms.IReactoryForm,
      reactory: Client.IReactoryApi,
    ) => Promise<Schema.IFormUISchema>;

    /**
     *
     */
    export interface IReactoryFormQueryErrorHandlerDefinition {
      componentRef: string;
      method: string;
    }

    export interface IFormUIOptions {
      componentType?:
        | "form"
        | "div"
        | "section"
        | "paper"
        | "card"
        | "grid"
        | "article"
        | "paragraph";
      className?: string;
      style?: React.CSSProperties;
      submitIcon?: string;
      submitIconProps?: {
        color: string | "primary" | "secondary";
        [key: string]: unknown;
      };
      submitProps?: {
        variant?: string | "fab" | "contained" | "outlined" | "text";
        iconAlign?: string | "left" | "right";
        /**
         * If onClick is a string, form engine
         * will look up the component, then call the
         * function with the following params.
         * (formData, formContext, formDefintion, onSubmit) => void
         *
         * This function can be used as a custom handler, or as an additional
         * handler that can call the onSubmit function when it has
         * completed it's execution.
         * @returns
         */
        onClick?: () => void | FQN;
        href: unknown;
        [key: string]: unknown;
      };
      /**
       * Indicates whether or not the submit button should be shown
       */
      showSubmit?: boolean;
      /**
       * Indicates whether or not the Help button should be visible.
       */
      showHelp?: boolean;
      /**
       * Indicates if support request is available
       * for this form.
       *
       * Default is true.
       */
      allowSupportRequest?: boolean;
      /**
       * Indicates if the refresh button is visible by default
       */
      showRefresh?: boolean;
      /**
       *
       */
      toolbarStyle?: React.CSSProperties;
      /**
       * The position of the toolbar. This can be set to
       * "top", "bottom" or "both"
       */
      toolbarPosition?: string | "top" | "bottom" | "both";
      /**
       * Command button definitions. These are buttons that
       * that are made available in the toolbar as additional
       * actions.
       */
      buttons?: UIFieldToolbarButton[];
      /**
       * Toggles whether or not a schema selector should be shown in the toolbar.
       */
      showSchemaSelectorInToolbar?: boolean;
      /**
       * The schema selector options
       */
      schemaSelector?: {
        variant?: string | "icon-button" | "dropdown";
        style?: React.CSSProperties;
        showTitle?: boolean;
        selectSchemaId?: string;
        buttonStyle?: React.CSSProperties;
        buttonVariant?: unknown;
        buttonTitle?: string;
        activeColor?: unknown;
        components?: string[];
      };
    }

    export interface UISchemaGridLayout {
      style?: unknown;
      [key: string]: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        doShow?: (e: { formData?: unknown; formContext?: unknown }) => boolean;
        rowProps?: {
          [key: string]: unknown;
        };
        render?: (props: unknown) => JSX.Element;
      };
    }
    export interface IFormUISchema extends IUISchema {
      /**
       * "ui:form" is prefered method to set Form specific settting.
       */
      "ui:form"?: IFormUIOptions;
    }
  }
}
