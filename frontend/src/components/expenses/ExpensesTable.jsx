import React from "react";
import { Table, Button } from "react-bootstrap";

const ExpensesTable = ({ expenses, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Category</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.title}</td>
            <td>{parseFloat(expense.amount).toFixed(2)}</td>
            <td>{expense.date}</td>
            <td>{expense.category_name || "Uncategorized"}</td>
            <td>{expense.notes}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => onEdit(expense)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ExpensesTable;
