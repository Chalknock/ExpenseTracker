import React, { useState } from "react";
import Table from "react-bootstrap/Table";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const Overview = () => {
  const sampleData = [
    {
      details: "Mark",
      category: "meryenda",
      amount: "200",
      date: "05-23-2025",
    },
    {
      details: "John Doe",
      category: "guns",
      amount: "200",
      date: "05-23-2025",
    },
    {
      details: "Jane",
      category: "Roses",
      amount: "200",
      date: "05-23-2025",
    },
  ];

  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Active", value: "1" },
    { name: "Radio", value: "2" },
    { name: "Radio", value: "3" },
  ];
  return (
    <div>
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-success" : "outline-danger"}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Details</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((data) => (
            <tr>
              <td>{data.details}</td>
              <td>{data.category}</td>
              <td>{data.amount}</td>
              <td>{data.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Overview;
