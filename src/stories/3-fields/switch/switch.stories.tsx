import { ArgsTable, Description, Heading, PRIMARY_STORY, Stories, Title } from "@storybook/addon-docs";
import { Meta } from "@storybook/react";
import { ISwitchSchema } from "../../../components/fields/switch/types";
import {
	CommonFieldStoryProps,
	DefaultStoryTemplate,
	OVERRIDES_ARG_TYPE,
	OverrideStoryTemplate,
	ResetStoryTemplate,
} from "../../common";

const meta: Meta = {
	title: "Field/Switch",
	parameters: {
		docs: {
			page: () => (
				<>
					<Title>Switch Toggle Button</Title>
					<Description>This component provides a set of switch toggle buttons for user to select</Description>
					<Heading>Props</Heading>
					<ArgsTable story={PRIMARY_STORY} />
					<Stories includePrimary={true} title="Examples" />
				</>
			),
		},
	},
	argTypes: {
		...CommonFieldStoryProps("switch"),
		disabled: {
			description: "Specifies if the switch buttons should be disabled",
			table: {
				type: {
					summary: "boolean",
				},
				defaultValue: { summary: false },
			},
			options: [true, false],
			control: {
				type: "boolean",
			},
		},
		customOptions: {
			description: "<ul><li>`border` show/hide border,`true` by default.</li></ul>",
			table: {
				type: {
					summary: `{border?: boolean}`,
				},
			},
			type: { name: "object", value: {} },
		},
	},
};
export default meta;

export const Default = DefaultStoryTemplate<ISwitchSchema>("switch-default").bind({});
Default.args = {
	uiType: "switch",
	label: "Switch",
};

export const DefaultValue = DefaultStoryTemplate<ISwitchSchema, boolean>("switch-default-value").bind({});
DefaultValue.args = {
	uiType: "switch",
	label: "Switch",
	defaultValues: true,
};
DefaultValue.argTypes = {
	defaultValues: {
		description: "Default value for the field, this is declared outside `sections`",
		table: {
			type: {
				summary: "boolean",
			},
		},
		control: {
			type: "boolean",
		},
	},
};

export const Disabled = DefaultStoryTemplate<ISwitchSchema>("switch-disabled").bind({});
Disabled.args = {
	uiType: "switch",
	label: "Switch",
	disabled: true,
};

export const WithValidation = DefaultStoryTemplate<ISwitchSchema>("switch-with-validation").bind({});
WithValidation.args = {
	uiType: "switch",
	label: "Switch",
	validation: [{ required: true }],
};

export const WithoutBorder = DefaultStoryTemplate<ISwitchSchema>("switch-without-border").bind({});
WithoutBorder.args = {
	uiType: "switch",
	label: "Switch",
	customOptions: {
		border: false,
	},
};

export const Reset = ResetStoryTemplate<ISwitchSchema>("switch-reset").bind({});
Reset.args = {
	uiType: "switch",
	label: "Switch",
};

export const ResetWithDefaultValues = ResetStoryTemplate<ISwitchSchema, boolean>("switch-reset-default-values").bind(
	{}
);
ResetWithDefaultValues.args = {
	uiType: "switch",
	label: "Switch",
	defaultValues: true,
};

export const Overrides = OverrideStoryTemplate<ISwitchSchema>("switch-overrides").bind({});
Overrides.args = {
	uiType: "switch",
	label: "Switch",
	overrides: {
		label: "Overridden",
	},
};
Overrides.argTypes = OVERRIDES_ARG_TYPE;
