import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import api from "../../Api";
const EditExpenseModal = ({ show, onClose, expense, onExpenseUpdated }) => {
  const [formData, setFormData] = useState(expense || {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setFormData(expense || {});
  }, [expense]);

  useEffect(() => {
    api
      .get("/categories/list/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await api.put(`/expenses/${formData.id}/`, formData);
      onExpenseUpdated(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update expense.");
    }
  };

  if (!formData) return null;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={formData.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={formData.amount || ""}
              onChange={(e) => handleChange("amount", e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={formData.date || ""}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={formData.category || ""}
              onChange={(e) => handleChange("category", e.target.value)}
            >
              <option value="">Uncategorized</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.notes || ""}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditExpenseModal;
