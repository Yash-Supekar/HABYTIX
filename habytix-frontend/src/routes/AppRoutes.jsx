import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import TenantDashboard from "../pages/tenant/Dashboard";
import TenantTickets from "../pages/tenant/Tickets";
import NewRequest from "../pages/tenant/NewRequest";
import TicketDetails from "../pages/tenant/TicketDetails";
import TenantProfile from "../pages/tenant/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Tenant Routes */}
      <Route path="/tenant/dashboard" element={<TenantDashboard />} />
      <Route path="/tenant/tickets" element={<TenantTickets />} />
      <Route path="/tenant/tickets/new" element={<NewRequest />} />
      <Route path="/tenant/tickets/:id" element={<TicketDetails />} />
      <Route path="/tenant/profile" element={<TenantProfile />} />

    </Routes>
  );
}
