// src/components/ExpenseReport.jsx
import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import api from "../Api";

const ExpenseReport = () => {const [data, setData] = useState([]);

  useEffect(() => {
    api.get("expenses/report/monthly/")
      .then((res) => {
        const formatted = res.data.map((item, index) => ({
          id: index,
          value: parseFloat(item.total),
          label: item["category__name"],
        }));
        setData(formatted);
      })
      .catch((err) => {
        console.error("Error fetching category report:", err);
      });
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto" }}>
      <h2 style={{ textAlign: "center" }}>Expenses by Category</h2>
      <PieChart
        series={[{ data }]}
        width={500}
        height={400}
      />
    </div>
  );
};

export default ExpenseReport;
