import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppLayout from "./AppLayout";

import Overview from "./pages/Overview";
import Summary from "./pages/Summary";
import AddExpense from "./pages/AddExpense";
import ViewExpenses from "./pages/ViewExpenses";
import CategoryBreakdown from "./pages/CategoryBreakdown";
import ManageCategories from "./pages/ManageCategories";
import MonthlyReport from "./pages/MonthlyReport";
import AnnualReport from "./pages/AnnualReport";
import ProfileSettings from "./components/settings/ProfileSettings";
import PreferencesSettings from "./components/settings/PreferencesSettings";
import ManageExpenses from "./pages/ManageExpenses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/overview" />} />
            <Route
              path="overview"
              element={
                <ProtectedRoute>
                  <Overview />
                </ProtectedRoute>
              }
            />
            <Route
              path="summary"
              element={
                <ProtectedRoute>
                  <Summary />
                </ProtectedRoute>
              }
            />
            <Route
              path="expenses/manage"
              element={
                <ProtectedRoute>
                  <ManageExpenses />
                </ProtectedRoute>
              }
            />
            <Route
              path="categories/manage"
              element={
                <ProtectedRoute>
                  <ManageCategories />
                </ProtectedRoute>
              }
            />
            <Route
              path="reports/monthly"
              element={
                <ProtectedRoute>
                  <MonthlyReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="reports/annual"
              element={
                <ProtectedRoute>
                  <AnnualReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings/profile"
              element={
                <ProtectedRoute>
                  <ProfileSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings/preferences"
              element={
                <ProtectedRoute>
                  <PreferencesSettings />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
