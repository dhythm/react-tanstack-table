import { ComponentMeta, ComponentStory } from "@storybook/react";
import { createData } from "./createData";
import { DataGrid } from "./DataGrid";
import { makeData } from "./makeData";

export default {
  title: "Component/DataGrid",
  component: DataGrid,
  argTypes: {},
} as ComponentMeta<typeof DataGrid>;

const PersonTemplate: ComponentStory<typeof DataGrid> = (args) => (
  <DataGrid
    rows={makeData(100000)}
    columns={[
      {
        header: "Name",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "firstName",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.lastName,
            id: "lastName",
            cell: (info) => info.getValue(),
            header: () => <span>Last Name</span>,
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "Info",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "age",
            header: () => "Age",
            footer: (props) => props.column.id,
          },
          {
            header: "More Info",
            columns: [
              {
                accessorKey: "visits",
                header: () => <span>Visits</span>,
                footer: (props) => props.column.id,
              },
              {
                accessorKey: "status",
                header: "Status",
                footer: (props) => props.column.id,
              },
              {
                accessorKey: "progress",
                header: "Profile Progress",
                footer: (props) => props.column.id,
              },
            ],
          },
          {
            accessorKey: "createdAt",
            header: "Created At",
          },
        ],
      },
    ]}
  />
);
export const $Person = PersonTemplate.bind({});

const DessertTemplate: ComponentStory<typeof DataGrid> = (args) => (
  <DataGrid
    rows={[
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
      createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
      createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
      createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
      createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
    ]}
    columns={[
      {
        header: "Dessert (100g serving)",
        accessorKey: "name",
        cell: ({ getValue }) => getValue(),
      },
      {
        header: "Calories",
        accessorKey: "calories",
        cell: ({ getValue }) => getValue(),
      },
      {
        header: "Fat (g)",
        accessorKey: "fat",
        cell: ({ getValue }) => getValue(),
      },
      {
        header: "Carbs (g)",
        accessorKey: "carbs",
        cell: ({ getValue }) => getValue(),
      },
      {
        header: "Protein (g)",
        accessorKey: "protein",
        cell: ({ getValue }) => getValue(),
      },
    ]}
  />
);
export const $Dessert = DessertTemplate.bind({});
