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
import { ChangeEvent, ComponentProps, FC, useReducer, useState } from "react";

type Props = Pick<ComponentProps<typeof CollapsibleTable>, "header" | "rows">;

export const DataGrid: FC<Props> = ({ header, rows }) => {
  const rerender = useReducer(() => ({}), {})[1];
  return <CollapsibleTable header={header} rows={rows} />;
};

type RowProps<T extends { name: string } = any> = T;
const Row: FC<{ row: RowProps }> = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
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

type CollapsedComponentProps<T extends { name: string } = any> = {
  row: RowProps<T>;
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
      <TableBody>
        {row.history.map((historyRow) => (
          <TableRow key={historyRow.date}>
            <TableCell component="th" scope="row">
              {historyRow.date}
            </TableCell>
            <TableCell>{historyRow.customerId}</TableCell>
            <TableCell align="right">{historyRow.amount}</TableCell>
            <TableCell align="right">
              {Math.round(historyRow.amount * row.price * 100) / 100}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);

type Header = { name: string }[];
type TableProps<T extends { name: string } = any> = {
  header: Header;
  rows: RowProps<T>[];
};

const CollapsibleTable: FC<TableProps> = ({ header, rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              {header.map((element) => (
                <TableCell>{element.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
