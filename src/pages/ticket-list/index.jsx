import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterBar from './components/FilterBar';
import TicketTable from './components/TicketTable';
import BulkActions from './components/BulkActions';
import Pagination from './components/Pagination';

const TicketList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortConfig, setSortConfig] = useState({ column: 'createdAt', direction: 'desc' });
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    assignedAgent: '',
    confidence: '',
    dateFrom: '',
    dateTo: '',
    priority: ''
  });

  // Mock user data
  const user = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "admin"
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "New High Priority Ticket",
      message: "Ticket #TK-2024-001 requires immediate attention",
      type: "warning",
      time: "2 minutes ago",
      read: false,
      ticketId: "TK-2024-001"
    },
    {
      id: 2,
      title: "Ticket Resolved",
      message: "Ticket #TK-2024-002 has been successfully resolved",
      type: "success",
      time: "15 minutes ago",
      read: false,
      ticketId: "TK-2024-002"
    }
  ];

  // Mock tickets data
  const mockTickets = [
    {
      id: "TK-2024-001",
      title: "Unable to access billing dashboard after recent update",
      description: "Customer reports that they cannot access their billing dashboard since the latest system update. Error message appears when trying to log in.",
      status: "open",
      category: "billing",
      priority: "high",
      createdAt: "2025-01-19T10:30:00Z",
      updatedAt: "2025-01-19T11:15:00Z",
      customerName: "John Smith",
      customerEmail: "john.smith@email.com",
      assignedAgent: "Sarah Johnson",
      aiConfidence: 0.85,
      tags: ["billing", "dashboard", "login"]
    },
    {
      id: "TK-2024-002",
      title: "Product not delivered despite tracking showing delivered status",
      description: "Customer ordered a laptop on January 15th. Tracking shows delivered but customer hasn\'t received the package. Need to investigate with shipping partner.",
      status: "in-progress",
      category: "shipping",
      priority: "medium",
      createdAt: "2025-01-19T09:45:00Z",
      updatedAt: "2025-01-19T10:20:00Z",
      customerName: "Emily Davis",
      customerEmail: "emily.davis@email.com",
      assignedAgent: "Mike Chen",
      aiConfidence: 0.92,
      tags: ["shipping", "delivery", "tracking"]
    },
    {
      id: "TK-2024-003",
      title: "Application crashes when uploading large files",
      description: "Users experience application crashes when trying to upload files larger than 50MB. This affects productivity for teams working with large design files.",
      status: "pending",
      category: "technical",
      priority: "urgent",
      createdAt: "2025-01-19T08:20:00Z",
      updatedAt: "2025-01-19T09:10:00Z",
      customerName: "Alex Rodriguez",
      customerEmail: "alex.rodriguez@email.com",
      assignedAgent: "Emily Davis",
      aiConfidence: 0.78,
      tags: ["technical", "upload", "crash", "performance"]
    },
    {
      id: "TK-2024-004",
      title: "Request for refund on cancelled subscription",
      description: "Customer cancelled their premium subscription but was still charged for the next month. Requesting a full refund for the unwanted charge.",
      status: "resolved",
      category: "billing",
      priority: "low",
      createdAt: "2025-01-18T16:30:00Z",
      updatedAt: "2025-01-19T08:45:00Z",
      customerName: "Maria Garcia",
      customerEmail: "maria.garcia@email.com",
      assignedAgent: "Sarah Johnson",
      aiConfidence: 0.95,
      tags: ["billing", "refund", "subscription"]
    },
    {
      id: "TK-2024-005",
      title: "Feature request: Dark mode for mobile app",
      description: "Multiple users have requested a dark mode option for the mobile application to reduce eye strain during nighttime usage.",
      status: "open",
      category: "general",
      priority: "low",
      createdAt: "2025-01-18T14:15:00Z",
      updatedAt: "2025-01-18T14:15:00Z",
      customerName: "David Wilson",
      customerEmail: "david.wilson@email.com",
      assignedAgent: null,
      aiConfidence: null,
      tags: ["feature-request", "mobile", "ui"]
    },
    {
      id: "TK-2024-006",
      title: "Password reset email not being received",
      description: "Customer is unable to receive password reset emails. Checked spam folder and confirmed email address is correct. May be an issue with email delivery system.",
      status: "in-progress",
      category: "technical",
      priority: "medium",
      createdAt: "2025-01-18T13:45:00Z",
      updatedAt: "2025-01-19T07:30:00Z",
      customerName: "Lisa Thompson",
      customerEmail: "lisa.thompson@email.com",
      assignedAgent: "Alex Rodriguez",
      aiConfidence: 0.67,
      tags: ["technical", "email", "password", "authentication"]
    },
    {
      id: "TK-2024-007",
      title: "Duplicate charges on credit card statement",
      description: "Customer reports seeing duplicate charges for the same transaction on their credit card statement. Need to investigate payment processing logs.",
      status: "closed",
      category: "billing",
      priority: "high",
      createdAt: "2025-01-17T11:20:00Z",
      updatedAt: "2025-01-18T16:45:00Z",
      customerName: "Robert Brown",
      customerEmail: "robert.brown@email.com",
      assignedAgent: "Mike Chen",
      aiConfidence: 0.88,
      tags: ["billing", "payment", "duplicate", "credit-card"]
    },
    {
      id: "TK-2024-008",
      title: "Wrong item shipped - received blue instead of red",
      description: "Customer ordered a red backpack but received a blue one instead. Need to arrange return shipping and send the correct item.",
      status: "pending",
      category: "shipping",
      priority: "medium",
      createdAt: "2025-01-17T09:30:00Z",
      updatedAt: "2025-01-18T10:15:00Z",
      customerName: "Jennifer Lee",
      customerEmail: "jennifer.lee@email.com",
      assignedAgent: "Emily Davis",
      aiConfidence: 0.91,
      tags: ["shipping", "wrong-item", "return", "exchange"]
    }
  ];

  // Filter and sort tickets
  const getFilteredAndSortedTickets = () => {
    let filtered = mockTickets?.filter(ticket => {
      if (filters?.status && ticket?.status !== filters?.status) return false;
      if (filters?.category && ticket?.category !== filters?.category) return false;
      if (filters?.assignedAgent) {
        if (filters?.assignedAgent === 'unassigned' && ticket?.assignedAgent) return false;
        if (filters?.assignedAgent !== 'unassigned' && ticket?.assignedAgent !== filters?.assignedAgent) return false;
      }
      if (filters?.confidence) {
        const confidence = ticket?.aiConfidence;
        if (filters?.confidence === 'high' && (confidence === null || confidence < 0.8)) return false;
        if (filters?.confidence === 'medium' && (confidence === null || confidence < 0.5 || confidence >= 0.8)) return false;
        if (filters?.confidence === 'low' && (confidence === null || confidence >= 0.5)) return false;
        if (filters?.confidence === 'no-ai' && confidence !== null) return false;
      }
      if (filters?.dateFrom) {
        const ticketDate = new Date(ticket.createdAt);
        const fromDate = new Date(filters.dateFrom);
        if (ticketDate < fromDate) return false;
      }
      if (filters?.dateTo) {
        const ticketDate = new Date(ticket.createdAt);
        const toDate = new Date(filters.dateTo);
        toDate?.setHours(23, 59, 59, 999);
        if (ticketDate > toDate) return false;
      }
      if (filters?.priority && ticket?.priority !== filters?.priority) return false;
      return true;
    });

    // Sort tickets
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.column];
      let bValue = b?.[sortConfig?.column];

      if (sortConfig?.column === 'createdAt' || sortConfig?.column === 'updatedAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue === null || aValue === undefined) aValue = '';
      if (bValue === null || bValue === undefined) bValue = '';

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const filteredTickets = getFilteredAndSortedTickets();
  const totalPages = Math.ceil(filteredTickets?.length / itemsPerPage);
  const paginatedTickets = filteredTickets?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (searchTerm) => {
    if (searchTerm?.trim()) {
      // In a real app, this would trigger an API call with search parameters
      console.log('Searching for:', searchTerm);
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      category: '',
      assignedAgent: '',
      confidence: '',
      dateFrom: '',
      dateTo: '',
      priority: ''
    });
    setCurrentPage(1);
  };

  const handleSelectTicket = (ticketId, selected) => {
    if (selected) {
      setSelectedTickets([...selectedTickets, ticketId]);
    } else {
      setSelectedTickets(selectedTickets?.filter(id => id !== ticketId));
    }
  };

  const handleSelectAll = (selected) => {
    if (selected) {
      setSelectedTickets(paginatedTickets?.map(ticket => ticket?.id));
    } else {
      setSelectedTickets([]);
    }
  };

  const handleSort = (newSortConfig) => {
    setSortConfig(newSortConfig);
  };

  const handleQuickAction = (action, ticketId) => {
    console.log(`Quick action: ${action} on ticket ${ticketId}`);
    // In a real app, this would trigger appropriate API calls
  };

  const handleBulkAction = (action, value) => {
    console.log(`Bulk action: ${action}`, { tickets: selectedTickets, value });
    // In a real app, this would trigger appropriate API calls
    setSelectedTickets([]); // Clear selection after action
  };

  const handleClearSelection = () => {
    setSelectedTickets([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedTickets([]); // Clear selection when changing pages
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setSelectedTickets([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        notifications={notifications}
      />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        user={user}
      />
      <main className={`pt-16 transition-medium ${
        sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Ticket Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage and track all customer support tickets
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => console.log('Export all tickets')}
                >
                  Export
                </Button>
                
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => window.location.href = '/create-ticket'}
                >
                  Create Ticket
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="Ticket" size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tickets</p>
                    <p className="text-xl font-semibold text-foreground">{mockTickets?.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Open Tickets</p>
                    <p className="text-xl font-semibold text-foreground">
                      {mockTickets?.filter(t => ['open', 'in-progress', 'pending']?.includes(t?.status))?.length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Resolved Today</p>
                    <p className="text-xl font-semibold text-foreground">
                      {mockTickets?.filter(t => t?.status === 'resolved')?.length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Icon name="TrendingUp" size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. AI Score</p>
                    <p className="text-xl font-semibold text-foreground">
                      {Math.round(mockTickets?.filter(t => t?.aiConfidence)?.reduce((acc, t) => acc + t?.aiConfidence, 0) / mockTickets?.filter(t => t?.aiConfidence)?.length * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <FilterBar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onSearch={handleSearch}
            onClearFilters={handleClearFilters}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedCount={selectedTickets?.length}
            onBulkAction={handleBulkAction}
            onClearSelection={handleClearSelection}
          />

          {/* Tickets Table */}
          <TicketTable
            tickets={paginatedTickets}
            selectedTickets={selectedTickets}
            onSelectTicket={handleSelectTicket}
            onSelectAll={handleSelectAll}
            sortConfig={sortConfig}
            onSort={handleSort}
            onQuickAction={handleQuickAction}
          />

          {/* Pagination */}
          {filteredTickets?.length > 0 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredTickets?.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          )}

          {/* Empty State */}
          {filteredTickets?.length === 0 && (
            <div className="bg-surface border border-border rounded-lg p-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Search" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No tickets found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or filters to find what you're looking for.
              </p>
              <div className="flex items-center justify-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Clear Filters
                </Button>
                <Button
                  variant="default"
                  onClick={() => window.location.href = '/create-ticket'}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Create New Ticket
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TicketList;