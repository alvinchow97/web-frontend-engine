import { ArgsTable, Description, Heading, PRIMARY_STORY, Stories, Title } from "@storybook/addon-docs";
import { Meta, Story } from "@storybook/react/types-6-0";
import { IWrapperSchema } from "../../../components/elements/wrapper";
import { CommonFieldStoryProps, FrontendEngine, SUBMIT_BUTTON_SCHEMA } from "../../common";

export default {
	title: "Custom/Filter",
	parameters: {
		docs: {
			page: () => (
				<>
					<Title>Filter</Title>
					<Description>
						This component acts as a wrapper for filter component
					</Description>
					<Heading>Props</Heading>
					<Description>
						This component also inherits the
						[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) attributes.
					</Description>
					<ArgsTable story={PRIMARY_STORY} />
					<Stories includePrimary={true} title="Examples" />
				</>
			),
		},
	},
	argTypes: {
		label: { table: { disable: true } },
		referenceKey: {
			description: "Actual HTML element type to render the component as",
			table: {
				type: {
					summary: "filter",
				},
			},
			type: { name: "string", required: true },
			options: ["filter"],
			control: {
				type: "select",
			},
		},
		children: {
			description: "Elements or string that is the descendant of this component",
			table: {
				type: {
					summary: "TFrontendEngineFieldSchema | string | (string | TFrontendEngineFieldSchema)[]",
				},
			},
			type: { name: "object", value: {}, required: true },
		},
	},
} as Meta;

const Template = (id: string) =>
	((args) => (
		<FrontendEngine
			data={{
				sections: {
					section: {
						uiType: "section",
						children: {
							[id]: args,
						},
					},
				},
			}}
		/>
	)) as Story<IWrapperSchema>;

export const FilterWrapper = Template("wrapper-default").bind({});
FilterWrapper.args = {
	uiType: "div",
	children: {
		name: {
			label: "What is your name",
			uiType: "textarea",
			validation: [{ required: true }, { max: 5, errorMessage: "Maximum length of 5" }],
			chipTexts: ["John", "Doe"],
		},
		...SUBMIT_BUTTON_SCHEMA,
	},
};

export const FilterItem = Template("wrapper-default").bind({});
FilterItem.args = {
	uiType: "div",
	children: {
		name: {
			label: "What is your name",
			uiType: "textarea",
			validation: [{ required: true }, { max: 5, errorMessage: "Maximum length of 5" }],
			chipTexts: ["John", "Doe"],
		},
		...SUBMIT_BUTTON_SCHEMA,
	},
};

export const FilterCheckBoxItem = Template("wrapper-default").bind({});
FilterWrapper.args = {
	uiType: "div",
	children: {
		name: {
			label: "What is your name",
			uiType: "textarea",
			validation: [{ required: true }, { max: 5, errorMessage: "Maximum length of 5" }],
			chipTexts: ["John", "Doe"],
		},
		...SUBMIT_BUTTON_SCHEMA,
	},
};
