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
import ProfileSettings from "./pages/ProfileSettings";
import PreferencesSettings from "./pages/PreferencesSettings";
import ManageExpenses from "./pages/ManageExpenses";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/overview" />} />
          <Route path="overview" element={<Overview />} />
          <Route path="summary" element={<Summary />} />
          <Route path="expenses/manage" element={<ManageExpenses />} />
          {/* <Route path="expenses/view" element={<ViewExpenses />} /> */}
          {/* <Route path="categories" element={<CategoryBreakdown />} /> */}
          <Route path="categories/manage" element={<ManageCategories />} />
          <Route path="reports/monthly" element={<MonthlyReport />} />
          <Route path="reports/annual" element={<AnnualReport />} />
          <Route path="settings/profile" element={<ProfileSettings />} />
          <Route path="login/" element={<Login />} />
          <Route path="register/" element={<Register />} />
          <Route
            path="settings/preferences"
            element={<PreferencesSettings />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
