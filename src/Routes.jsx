import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import TicketList from './pages/ticket-list';
import Register from './pages/register';
import TicketDetail from './pages/ticket-detail';
import CreateTicket from './pages/create-ticket';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CreateTicket />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ticket-list" element={<TicketList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ticket-detail" element={<TicketDetail />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
