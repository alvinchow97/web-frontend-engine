import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FrontendEngine } from "../../../../components";
import { IMultiSelectSchema } from "../../../../components/fields";
import { IFrontendEngineData } from "../../../../components/frontend-engine";
import { TestHelper } from "../../../../utils";
import { ERROR_MESSAGE, SUBMIT_BUTTON_ID, TOverrideField, TOverrideSchema } from "../../../common";

const submitFn = jest.fn();
const componentId = "field";
const fieldType = "multi-select";
const componentTestId = TestHelper.generateId(componentId, fieldType);

const renderComponent = (overrideField?: TOverrideField<IMultiSelectSchema>, overrideSchema?: TOverrideSchema) => {
	const json: IFrontendEngineData = {
		id: "test",
		fields: {
			[componentId]: {
				label: "Multiselect",
				fieldType,
				options: [
					{ label: "A", value: "Apple" },
					{ label: "B", value: "Berry" },
				],
				...overrideField,
			},
			[SUBMIT_BUTTON_ID]: {
				label: "Submit",
				fieldType: "submit",
			},
		},
		...overrideSchema,
	};
	return render(<FrontendEngine data={json} onSubmit={submitFn} />);
};

describe(fieldType, () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("should be able to render the field", () => {
		renderComponent();
		expect(screen.getByTestId(componentTestId)).toBeInTheDocument();
	});

	it("should be able to support default values", async () => {
		const defaultValues = ["Apple"];
		renderComponent(undefined, { defaultValues: { [componentId]: defaultValues } });

		await waitFor(() => fireEvent.click(screen.getByTestId(SUBMIT_BUTTON_ID)));

		expect(
			screen
				.getByTestId("dropdown-list")
				.querySelectorAll("li")
				.forEach((list) => {
					if (defaultValues.includes(list.textContent)) {
						expect(list.querySelector("input")).toBeChecked();
					}
				})
		);
		expect(submitFn).toBeCalledWith(expect.objectContaining({ [componentId]: defaultValues }));
	});

	it("should be able to support validation schema", async () => {
		renderComponent({ validation: [{ required: true, errorMessage: ERROR_MESSAGE }] });

		await waitFor(() => fireEvent.click(screen.getByTestId(SUBMIT_BUTTON_ID)));

		expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
	});

	it("should be disabled if configured", async () => {
		renderComponent({ disabled: true });

		expect(screen.getByTestId(componentTestId)).toHaveAttribute("disabled");
	});

	it("should be able to support custom list style width", () => {
		const width = "24rem";
		renderComponent({ listStyleWidth: width });

		expect(screen.getByTestId("dropdown-list")).toHaveStyle({ width });
	});

	it("should be able to support custom placeholder", () => {
		const placeholder = "select item";
		renderComponent({ placeholder });

		expect(screen.getByText(placeholder)).toBeInTheDocument();
	});

	it("should be able to toggle the checkboxes", async () => {
		renderComponent();
		const dropdownButtons = screen.getAllByTestId("list-item");

		await waitFor(() => fireEvent.click(dropdownButtons[0]));
		await waitFor(() => fireEvent.click(dropdownButtons[1]));
		await waitFor(() => fireEvent.click(screen.getByTestId(SUBMIT_BUTTON_ID)));
		expect(submitFn).toBeCalledWith(expect.objectContaining({ [componentId]: ["Apple", "Berry"] }));

		await waitFor(() => fireEvent.click(dropdownButtons[0]));
		await waitFor(() => fireEvent.click(screen.getByTestId(SUBMIT_BUTTON_ID)));
		expect(submitFn).toBeCalledWith(expect.objectContaining({ [componentId]: ["Berry"] }));

		await waitFor(() => fireEvent.click(dropdownButtons[1]));
		await waitFor(() => fireEvent.click(screen.getByTestId(SUBMIT_BUTTON_ID)));
		expect(submitFn).toBeCalledWith(expect.objectContaining({ [componentId]: [] }));
	});

	it("should be able to toggle all the checkboxes at once", async () => {
		renderComponent();
		const selectAllButton = screen.getByText("Select all");

		await waitFor(() => fireEvent.click(selectAllButton));
		expect(submitFn).toBeCalledWith(expect.objectContaining({ [componentId]: ["Apple", "Berry"] }));

		await waitFor(() => fireEvent.click(selectAllButton));
		expect(submitFn).toBeCalledWith(expect.objectContaining({ [componentId]: [] }));
	});
});
