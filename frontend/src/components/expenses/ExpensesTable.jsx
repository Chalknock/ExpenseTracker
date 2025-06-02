import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";

const ExpensesTable = ({
  expenses,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage = 10,
  totalCount,
}) => {
  const handleChangePage = (event, newPage) => {
    onPageChange(newPage + 1); // MUI page is zero-based, API page is 1-based
  };

  const handleChangeRowsPerPage = (event) => {
    // If you want to support changing rows per page, implement this
    // For now, ignoring since you fixed at 10 rows per page
  };

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="expenses table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{parseFloat(expense.amount).toFixed(2)}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.category_name || "Uncategorized"}</TableCell>
                <TableCell>{expense.notes}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={() => onEdit(expense)}
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => onDelete(expense.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount} // total items count from API
        page={currentPage - 1} // zero based
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]} // disable changing rows per page
      />
    </Paper>
  );
};

export default ExpensesTable;
