import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../Api";

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Toast state
  const [toast, setToast] = useState({ show: false, message: "", bg: "" });

  // Fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get("/expenses/list/");
        setExpenses(res.data);
      } catch (err) {
        console.error(
          "Error fetching expenses:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories/list/");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  const toggleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const showToast = (message, bg = "success") => {
    setToast({ show: true, message, bg });
    setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;

    try {
      await api.delete(`/expenses/${id}/`);
      setExpenses(expenses.filter((exp) => exp.id !== id));
      showToast("Expense deleted successfully!", "success");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      showToast("Failed to delete expense.", "danger");
    }
  };

  const handleEditSubmit = async () => {
    try {
      const res = await api.put(
        `/expenses/${selectedExpense.id}/`,
        selectedExpense
      );
      const updatedExpense = res.data;
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
      );
      setShowModal(false);
      showToast("Expense updated successfully!", "success");
    } catch (err) {
      console.error("Edit failed:", err.response?.data || err.message);
      showToast("Failed to update expense.", "danger");
    }
  };

  // Sort expenses
  const sortedExpenses = [...expenses].sort((a, b) => {
    const valA =
      sortField === "amount" ? parseFloat(a.amount) : new Date(a.date);
    const valB =
      sortField === "amount" ? parseFloat(b.amount) : new Date(b.date);
    return sortDirection === "asc" ? valA - valB : valB - valA;
  });

  // Filter expenses by search and date range
  const filteredExpenses = sortedExpenses
    .filter(
      (exp) =>
        exp.title.toLowerCase().includes(searchQuery) ||
        (exp.category_name &&
          exp.category_name.toLowerCase().includes(searchQuery))
    )
    .filter((exp) => {
      const expDate = new Date(exp.date);
      const afterStart = startDate ? expDate >= new Date(startDate) : true;
      const beforeEnd = endDate ? expDate <= new Date(endDate) : true;
      return afterStart && beforeEnd;
    });

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Your Expenses</h2>

      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            placeholder="Search by title or category"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
        </div>
        <div className="col-md-3 mb-2">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredExpenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th
                onClick={() => toggleSort("amount")}
                style={{ cursor: "pointer" }}
              >
                Amount{" "}
                {sortField === "amount"
                  ? sortDirection === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                onClick={() => toggleSort("date")}
                style={{ cursor: "pointer" }}
              >
                Date{" "}
                {sortField === "date"
                  ? sortDirection === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th>Category</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.title}</td>
                <td>${parseFloat(exp.amount).toFixed(2)}</td>
                <td>{exp.date}</td>
                <td>{exp.category_name || "Uncategorized"}</td>
                <td>{exp.notes || "-"}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setSelectedExpense(exp);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(exp.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedExpense && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedExpense.title}
                  onChange={(e) =>
                    setSelectedExpense({
                      ...selectedExpense,
                      title: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedExpense.amount}
                  onChange={(e) =>
                    setSelectedExpense({
                      ...selectedExpense,
                      amount: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedExpense.date}
                  onChange={(e) =>
                    setSelectedExpense({
                      ...selectedExpense,
                      date: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedExpense.category || ""}
                  onChange={(e) =>
                    setSelectedExpense({
                      ...selectedExpense,
                      category: e.target.value
                        ? parseInt(e.target.value)
                        : null,
                    })
                  }
                >
                  <option value="">Uncategorized</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedExpense.notes || ""}
                  onChange={(e) =>
                    setSelectedExpense({
                      ...selectedExpense,
                      notes: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast container */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          bg={toast.bg}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default ViewExpenses;
