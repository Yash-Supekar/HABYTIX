import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ProtectedRoute from "../components/ProtectedRoute";

import TenantDashboard from "../pages/tenant/Dashboard";
import TenantTickets from "../pages/tenant/Tickets";
import NewRequest from "../pages/tenant/NewRequest";
import TicketDetails from "../pages/tenant/TicketDetails";
import TenantProfile from "../pages/tenant/Profile";
import EditProfile from "../pages/tenant/EditProfile";

import ManagerDashboard from "../pages/manager/Dashboard";
import ManagerTickets from "../pages/manager/Tickets";
import AssignTicket from "../pages/manager/AssignTicket";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Tenant Routes */}
      <Route
        path="/tenant/dashboard"
        element={
          <ProtectedRoute role="TENANT">
            <TenantDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/tickets"
        element={
          <ProtectedRoute role="TENANT">
            <TenantTickets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/tickets/new"
        element={
          <ProtectedRoute role="TENANT">
            <NewRequest />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/tickets/:id"
        element={
          <ProtectedRoute role="TENANT">
            <TicketDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/profile"
        element={
          <ProtectedRoute role="TENANT">
            <TenantProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/profile/edit"
        element={
          <ProtectedRoute role="TENANT">
            <EditProfile />
          </ProtectedRoute>
        }
      />

      {/* Manager Routes */}
      <Route
        path="/manager/dashboard"
        element={
          <ProtectedRoute role="MANAGER">
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/tickets"
        element={
          <ProtectedRoute role="MANAGER">
            <ManagerTickets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/tickets/:id"
        element={
          <ProtectedRoute role="MANAGER">
            <AssignTicket />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
