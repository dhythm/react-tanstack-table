import { ComponentStory, Meta } from "@storybook/react";
import { ExpandableTable } from "./ExpandableTable";
import { SortableTable } from "./SortableTable";

export default {
  title: "Component/SampleTable",
  argTypes: {},
} as Meta;

const ExpandableTableTemplate: ComponentStory<typeof ExpandableTable> = (
  args
) => <ExpandableTable {...args} />;

export const $Expandable = ExpandableTableTemplate.bind({});

const SortableTableTemplate: ComponentStory<typeof SortableTable> = (args) => (
  <SortableTable {...args} />
);
export const $Sortable = SortableTableTemplate.bind({});
