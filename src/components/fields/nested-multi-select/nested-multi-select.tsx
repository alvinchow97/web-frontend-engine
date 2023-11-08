import { Form } from "@lifesg/react-design-system/form";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useDeepCompareEffect from "use-deep-compare-effect";
import * as Yup from "yup";
import { IGenericFieldProps } from "..";
import { TestHelper } from "../../../utils";
import { useValidationConfig } from "../../../utils/hooks";
import { ERROR_MESSAGES } from "../../shared";
import { ISelectOption } from "../select/types";
import { INestedMultiSelectOption, INestedMultiSelectSchema } from "./types";

export const NestedMultiSelect = (props: IGenericFieldProps<INestedMultiSelectSchema>) => {
	// =============================================================================
	// CONST, STATE, REFS
	// =============================================================================
	const {
		schema: { label, validation, options, ...otherSchema },
		id,
		value,
		onChange,
		error,
		...otherProps
	} = props;

	const { setValue } = useFormContext();
	const [stateValue, setStateValue] = useState<string[]>(value || []);
	const { setFieldValidationConfig } = useValidationConfig();

	// =============================================================================
	// EFFECTS
	// =============================================================================
	useEffect(() => {
		const isRequiredRule = validation?.find((rule) => "required" in rule);

		setFieldValidationConfig(
			id,
			Yup.array()
				.of(Yup.string())
				.test(
					"is-empty-array",
					isRequiredRule?.errorMessage || ERROR_MESSAGES.COMMON.REQUIRED_OPTION,
					(value) => {
						if (!value || !isRequiredRule?.required) return true;

						return value.length > 0;
					}
				),
			validation
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [validation]);

	useDeepCompareEffect(() => {
		const updatedValues = value?.filter((v) => options.find((option) => option.value === v));
		setValue(id, updatedValues);
	}, [options]);

	useEffect(() => {
		setStateValue(value || []);
	}, [value]);

	// =============================================================================
	// HELPER FUNCTIONS
	// =============================================================================
	// const getSelectOptions = (): INestedMultiSelectOption[] => options.filter((option) => stateValue.includes(option.value));

	// =============================================================================
	// EVENT HANDLERS
	// =============================================================================
	const handleChange = (options: ISelectOption[]): void => {
		const parsedValues = options.map((option) => option.value);
		onChange({ target: { value: parsedValues } });
	};

	// =============================================================================
	// RENDER FUNCTIONS
	// =============================================================================
	return (
		<Form.NestedMultiSelect
			{...otherSchema}
			{...otherProps}
			id={id}
			data-testid={TestHelper.generateId(id)}
			label="This is the nested select field"
			options={options}
		/>
	);
};
