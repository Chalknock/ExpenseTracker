import React, { useEffect, useState } from "react";
import axios from "axios";
import AddExpenseModal from "../components/expenses/AddExpenseModal";
import EditExpenseModal from "../components/expenses/EditExpenseModal";
import ExpensesTable from "../components/expenses/ExpensesTable";
import { Button, Container } from "react-bootstrap";
import api from "../Api";
const ManageExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const rowsPerPage = 10;
  
  const fetchExpenses = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/expenses/list/?page=${page}`);
      setExpenses(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 10)); // Adjust based on page size
      setCurrentPage(page);
      setTotalCount(res.data.count);
    } catch (err) {
      console.error("Failed to load expenses", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchExpenses(1);
  }, []);

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleEditClick = (expense) => {
    setExpenseToEdit(expense);
    setShowEditModal(true);
  };

  const handleExpenseUpdated = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
    );
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;
    try {
      await api.delete(`/expenses/${id}/`);
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
      console.error("Failed to delete expense", err);
      alert("Failed to delete expense");
    }
  };

  return (
    <Container>
      <h1>Manage Expenses</h1>
      <Button onClick={() => setShowAddModal(true)} className="mb-3">
        Add Expense
      </Button>

      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <ExpensesTable
          expenses={expenses}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => fetchExpenses(page)}

          totalCount={totalCount}
          rowsPerPage={rowsPerPage}
        />
      )}

      <AddExpenseModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onExpenseAdded={handleAddExpense}
      />

      <EditExpenseModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        expense={expenseToEdit}
        onExpenseUpdated={handleExpenseUpdated}
      />
    </Container>
  );
};

export default ManageExpenses;
