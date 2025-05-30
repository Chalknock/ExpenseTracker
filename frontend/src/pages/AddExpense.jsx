import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/AddExpense.css";
import api from "../Api";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories/list/");
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/expenses/list/", {
        title,
        amount: parseFloat(amount),
        date,
        category_id: category ? parseInt(category) : null,
        notes,
      });
      alert("Expense added successfully");
      // Optionally clear form
      setTitle("");
      setAmount("");
      setDate("");
      setCategory("");
      setNotes("");
    } catch (err) {
      console.error("Error response:", err.response?.data || err.message);
      alert("Failed to add expense");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">-- Select Category --</option>
        {loadingCategories ? (
          <option disabled>Loading categories...</option>
        ) : (
          categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))
        )}
      </select>

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>

      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;
