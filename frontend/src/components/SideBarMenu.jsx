import React, { useContext } from "react";
import { Accordion, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaList,
  FaChartPie,
  FaCog,
  FaFileAlt,
} from "react-icons/fa";
import { useAuth } from "./AuthContext"; 

const SidebarMenu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="bg-light p-3" style={{ width: "250px", height: "100vh" }}>
      <h4 className="mb-4">Expense Tracker</h4>

      <Accordion defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FaTachometerAlt className="me-2" /> Dashboard
          </Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/overview">
                Overview
              </Nav.Link>
              <Nav.Link as={Link} to="/summary">
                Summary
              </Nav.Link>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <FaPlusCircle className="me-2" /> Expenses
          </Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/expenses/manage">
                Manage Expense
              </Nav.Link>
              {/* <Nav.Link as={Link} to="/expenses/view">
                View All
              </Nav.Link> */}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <FaChartPie className="me-2" /> Categories
          </Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              {/* <Nav.Link as={Link} to="/categories">
                View Breakdown
              </Nav.Link> */}
              <Nav.Link as={Link} to="/categories/manage">
                Manage Categories
              </Nav.Link>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <FaFileAlt className="me-2" /> Reports
          </Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/reports/monthly">
                Monthly
              </Nav.Link>
              <Nav.Link as={Link} to="/reports/annual">
                Annual
              </Nav.Link>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <FaCog className="me-2" /> Settings
          </Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/settings/profile">
                Profile
              </Nav.Link>
              <Nav.Link as={Link} to="/settings/preferences">
                Preferences
              </Nav.Link>
              <Nav.Link as="button" onClick={handleLogout} className="text-start">
                Logout
              </Nav.Link>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default SidebarMenu;
