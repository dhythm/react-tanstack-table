import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DataGrid } from "./DataGrid";

export default {
  title: "Component/DataGrid",
  component: DataGrid,
  argTypes: {},
} as ComponentMeta<typeof DataGrid>;

const Template: ComponentStory<typeof DataGrid> = (args) => (
  <DataGrid
    rows={[...rows, ...rows, ...rows, ...rows, ...rows]}
    columns={[
      {
        header: "A",
        columns: [
          {
            accessorFn: (row) => row.name,
            id: "name",
            cell: (info) => info.getValue(),
            header: () => <span>Name</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.calories,
            id: "calories",
            cell: (info) => info.getValue(),
            header: () => <span>Calories</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.fat,
            id: "fat",
            cell: (info) => info.getValue(),
            header: () => <span>Fat</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.carbs,
            id: "carbs",
            cell: (info) => info.getValue(),
            header: () => <span>Carbs</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.protein,
            id: "protein",
            cell: (info) => info.getValue(),
            header: () => <span>Protein</span>,
            footer: (props) => props.column.id,
          },
          //   {
          //     accessorFn: (row) => row.price,
          //     id: "price",
          //     cell: (info) => info.getValue(),
          //     header: () => <span>Price</span>,
          //     footer: (props) => props.column.id,
          //   },
        ],
      },
      {
        header: "Price",
        columns: [
          {
            accessorFn: (row) => row.price,
            id: "price",
            cell: (info) => info.getValue(),
            // header: () => <span>Price</span>,
            // footer: (props) => props.column.id,
          },
        ],
      },
    ]}
  />
);

const rows = [
  {
    name: "Frozen yoghurt",
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
    price: 3.99,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3,
    price: 4.99,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16,
    carbs: 24,
    protein: 6,
    price: 3.79,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    price: 2.5,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16,
    carbs: 49,
    protein: 3.9,
    price: 1.5,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },
];

export const $DataGrid = Template.bind({});
