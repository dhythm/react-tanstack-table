import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DataGrid } from "./DataGrid";
import { SampleTable } from "./SampleTable";

export default {
  title: "Component/DataGrid",
  component: DataGrid,
  argTypes: {},
} as ComponentMeta<typeof DataGrid>;

const Template: ComponentStory<typeof DataGrid> = (args) => (
  <SampleTable {...args} />
);

export const $Sample = Template.bind({});
