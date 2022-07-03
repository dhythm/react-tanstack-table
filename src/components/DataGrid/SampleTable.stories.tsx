import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SampleTable } from "./SampleTable";

export default {
  title: "Component/SampleTable",
  component: SampleTable,
  argTypes: {},
} as ComponentMeta<typeof SampleTable>;

const Template: ComponentStory<typeof SampleTable> = (args) => (
  <SampleTable {...args} />
);

export const $Sample = Template.bind({});
