import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import api from "../Api"; 
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

const Report = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await api.get("/expenses/report/monthly/");
      setExpenses(res.data);
    };

    fetchExpenses();
  }, []);

  // Aggregation for PieChart and BarChart
  const categoryTotals = expenses.reduce((acc, exp) => {
    const cat = exp.category_name || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + parseFloat(exp.amount);
    return acc;
  }, {});

  const chartData = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total,
  }));

  const lineData = expenses
    .map((exp) => ({
      date: exp.date,
      amount: parseFloat(exp.amount),
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Expense Reports</h2>

      <div className="row">
        <div className="col">
          <h3>Pie Chart - Expense Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="col">
          <h3>Bar Chart - Expense by Category</h3>
          <BarChart width={500} height={300} data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#007bff" />
          </BarChart>
        </div>
        <div className="col">
          <h3>Line Chart - Expenses Over Time</h3>
          <LineChart width={600} height={300} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Report;
