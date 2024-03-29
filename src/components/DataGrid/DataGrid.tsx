import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row as RowType,
  RowData,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useMemo, useReducer, useState } from "react";

type Props<T extends RowData = any> = {
  rows: T[];
  columns: ColumnDef<T>[];
};
export const DataGrid = <T extends RowData>({
  rows,
  columns: _columns,
}: Props<T>) => {
  const rerender = useReducer(() => ({}), {})[1];
  const columns = useMemo(() => _columns, []);
  return <CollapsibleTable rows={rows} columns={columns} />;
};

const CollapsibleTable = <T extends RowData>({ rows, columns }: Props<T>) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable<T>({
    data: rows,
    columns,
    state: {
      sorting,
      expanded,
    },
    onSortingChange: setSorting,
    manualExpanding: true,
    enableExpanding: true,
    onExpandedChange: setExpanded,
    // getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  console.log({ expanded });

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableCell />
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {typeof header.column.getIsSorted() === "string" ? (
                            header.column.getIsSorted() === "asc" ? (
                              <ArrowUpwardIcon />
                            ) : (
                              <ArrowDownwardIcon />
                            )
                          ) : null}
                        </>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Row
                  key={row.id}
                  row={row}
                  onClick={() => {
                    if (!row.getIsExpanded()) {
                      table.toggleAllRowsExpanded(false);
                    }
                    row.toggleExpanded(!row.getIsExpanded());
                  }}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => table.setPageIndex(page)}
        onRowsPerPageChange={(event) => table.setPageSize(+event.target.value)}
      />
    </Paper>
  );
};

type RowProps<T extends RowData = any> = {
  row: RowType<T>;
  onClick: () => void;
} & CollapsedComponentProps<T>;
const Row: FC<RowProps> = ({ row, onClick }) => {
  const open = row.getIsExpanded();
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={onClick}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <CollapsedComponent row={row} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

type CollapsedComponentProps<T extends RowData = RowData> = {
  row: RowType<T>;
};
const CollapsedComponent: FC<CollapsedComponentProps> = ({ row }) => (
  <Box sx={{ margin: 1 }}>
    <Typography variant="h6" gutterBottom component="div">
      History
    </Typography>
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell align="right">Total price ($)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody></TableBody>
    </Table>
  </Box>
);
