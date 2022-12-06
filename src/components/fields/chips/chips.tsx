import { Form } from "@lifesg/react-design-system/form";
import clone from "lodash/clone";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useValidationSchema } from "../../../utils/hooks";
import { IGenericFieldProps } from "../../frontend-engine";
import { Chip, ERROR_MESSAGES } from "../../shared";
import { IWrapperSchema, Wrapper } from "../wrapper";
import { IChipsSchema } from "./types";

export const Chips = (props: IGenericFieldProps<IChipsSchema>) => {
	// =============================================================================
	// CONST, STATE, REFS
	// =============================================================================
	const {
		schema: { label, validation, options, textarea, multi = true, resizable, maxLength, rows, ...otherSchema },
		id,
		value,
		onChange,
		...otherProps
	} = props;

	const [stateValue, setStateValue] = useState<string[]>(value || []);
	const [showTextArea, setShowTextArea] = useState<boolean>(false);
	const { setFieldValidationConfig } = useValidationSchema();

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

	useEffect(() => {
		setStateValue(value || []);
	}, [value]);

	// =============================================================================
	// HELPER FUNCTIONS
	// =============================================================================
	const isChipSelected = (text: string): boolean => {
		return multi && stateValue.includes(text);
	};

	// =============================================================================
	// EVENT HANDLERS
	// =============================================================================
	const handleChange = (text: string): void => {
		let updatedStateValues = clone(stateValue); // Prevent mutation to original state value
		const isExistingValue = updatedStateValues.includes(text);

		// Removal of value from state
		if (isExistingValue) {
			updatedStateValues = updatedStateValues.filter((value) => value !== text);
			onChange({ target: { value: updatedStateValues } });
			return;
		}

		// Adding values to state
		if (multi) {
			updatedStateValues.push(text);
		} else {
			updatedStateValues = [text];
		}
		onChange({ target: { value: updatedStateValues } });
	};

	const handleTextareaChipClick = (name: string) => {
		handleChange(name);
		setShowTextArea(!showTextArea);
	};

	// =============================================================================
	// RENDER FUNCTIONS
	// =============================================================================
	const renderChips = (): JSX.Element[] => {
		return options.map((option, index) => (
			<Chip
				{...otherSchema}
				key={index}
				onClick={() => handleChange(option.value)}
				isActive={isChipSelected(option.value)}
			>
				{option.label}
			</Chip>
		));
	};

	const renderTextAreaChip = (): JSX.Element => {
		if (!textarea && !textarea?.name) {
			return;
		}
		return (
			<Chip
				{...otherSchema}
				id={id}
				onClick={() => handleTextareaChipClick(textarea.name)}
				isActive={isChipSelected(textarea.name)}
			>
				{textarea.name}
			</Chip>
		);
	};

	const renderTextArea = (): JSX.Element => {
		if (!textarea && !textarea?.name) {
			return;
		}
		const textAreaId = `chips-${textarea.name}`;
		const wrapperSchema: IWrapperSchema = {
			fieldType: "div",
			children: {
				[textAreaId]: {
					fieldType: "textarea",
					label: textarea.name,
					maxLength,
					rows,
					resizable,
					...(textarea?.validation?.length > 0 && {
						validation: textarea.validation,
					}),
				},
			},
		};
		return showTextArea && <Wrapper id={id} schema={wrapperSchema} />;
	};

	return (
		<Form.CustomField label={label} errorMessage={otherProps?.error?.message} {...otherProps}>
			<div>
				{renderChips()}
				{renderTextAreaChip()}
				{renderTextArea()}
			</div>
		</Form.CustomField>
	);
};
