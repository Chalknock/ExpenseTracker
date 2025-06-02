import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import api from "../Api";

import AddCategoryModal from "../components/category/AddCategoryModal";
import EditCategoryModal from "../components/category/EditCategoryModal";
import DeleteCategoryModal from "../components/category/DeleteCategoryModal";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    const res = await api.get("/categories/list/");
    setCategories(res.data.results);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    try {
      await api.post("/categories/list/", newCategory);
      setShowAddModal(false);
      setNewCategory({ name: "", description: "" });
      fetchCategories();
    } catch {
      alert("Failed to add category");
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/categories/${selectedCategory.id}/`, selectedCategory);
      setShowEditModal(false);
      fetchCategories();
    } catch {
      alert("Failed to update category");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/categories/${selectedCategory.id}/`);
      setShowDeleteModal(false);
      fetchCategories();
    } catch {
      alert("Failed to delete category");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Manage Categories</h2>
      <Button onClick={() => setShowAddModal(true)} className="mb-3">
        Add Category
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th style={{ width: "200px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.description || "-"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddCategoryModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleAdd={handleAdd}
      />

      <EditCategoryModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        category={selectedCategory}
        setCategory={setSelectedCategory}
        handleUpdate={handleUpdate}
      />

      <DeleteCategoryModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        category={selectedCategory}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ManageCategories;
