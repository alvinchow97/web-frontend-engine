/**
 * custom elements / fields are components that are defined by the `referenceKey` instead of `uiType` in the schema
 * these are typically components that are more opinionated and do not fit into the generic components
 */
import type { IYupValidationRule, TFrontendEngineFieldSchema } from "../frontend-engine";
import type { TRenderRules } from "../frontend-engine/yup";
import type { IFilterSchema } from "./filter/filter/types";

/**
 * custom element types
 * - components that do not have uiType and have specific schema to render
 */
export enum ECustomElementType {
	FILTER = "Filter",
	"FILTER-ITEM" = "FilterItem",
}

/**
 * custom fields types
 */
export enum ECustomFieldType {
	"FILTER-CHECKBOX" = "FilterCheckbox",
}

/**
 * union type to represent all custom elements / fields schema
 */
export type TCustomComponentSchema = ICustomElementJsonSchema<string> | IFilterSchema;

/**
 * base schema for custom elements
 */
export interface ICustomElementJsonSchema<T> {
	referenceKey: T;
	uiType?: never | undefined;
}

/**
 * base schema for custom fields
 */
export interface ICustomFieldJsonSchema<T, V = undefined, U = undefined> extends ICustomElementJsonSchema<T> {
	validation?: (V | U | IYupValidationRule)[];
	/** render conditions
	 * - need to fulfil at least 1 object in array (OR condition)
	 * - in order for an object to be valid, need to fulfil all conditions in that object (AND condition) */
	showIf?: TRenderRules[] | undefined;
}

/**
 * common props for all custom elements / fields
 */
export interface IGenericCustomFieldProps<T = TFrontendEngineFieldSchema> {
	id: string;
	schema: T;
}
