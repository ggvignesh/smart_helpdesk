import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import StatsCard from './components/StatsCard';
import QuickActions from './components/QuickActions';
import RecentTickets from './components/RecentTickets';
import ActivityFeed from './components/ActivityFeed';
import AIInsights from './components/AIInsights';
import SystemHealth from './components/SystemHealth';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data - in real app, this would come from authentication context
  const mockUsers = {
    admin: {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "admin"
    },
    agent: {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      role: "agent"
    },
    user: {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      role: "user"
    }
  };

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      title: "New ticket assigned",
      message: "Ticket #1234 has been assigned to you",
      type: "info",
      time: "2 minutes ago",
      read: false,
      ticketId: "1234"
    },
    {
      id: 2,
      title: "AI response ready",
      message: "AI has generated a response for ticket #1235",
      type: "success",
      time: "5 minutes ago",
      read: false,
      ticketId: "1235"
    },
    {
      id: 3,
      title: "System maintenance",
      message: "Scheduled maintenance completed successfully",
      type: "info",
      time: "1 hour ago",
      read: true
    }
  ];

  // Mock recent tickets
  const mockTickets = [
    {
      id: "1234",
      title: "Unable to process payment",
      description: "Customer experiencing issues with credit card payment processing during checkout",
      status: "in-progress",
      priority: "high",
      category: "billing",
      assignedTo: "Mike Chen",
      createdAt: "2025-01-19T10:30:00Z",
      updatedAt: "2025-01-19T12:15:00Z"
    },
    {
      id: "1235",
      title: "Login page not loading",
      description: "Website login page shows blank screen after entering credentials",
      status: "open",
      priority: "medium",
      category: "technical",
      assignedTo: "Sarah Johnson",
      createdAt: "2025-01-19T09:45:00Z",
      updatedAt: "2025-01-19T11:20:00Z"
    },
    {
      id: "1236",
      title: "Order delivery delayed",
      description: "Package was supposed to arrive yesterday but tracking shows no updates",
      status: "resolved",
      priority: "low",
      category: "shipping",
      assignedTo: "Mike Chen",
      createdAt: "2025-01-18T14:20:00Z",
      updatedAt: "2025-01-19T08:30:00Z"
    }
  ];

  // Mock activity feed
  const mockActivities = [
    {
      id: 1,
      user: "AI Assistant",
      action: "generated response for",
      type: "ai_response",
      ticketId: "1234",
      details: "Confidence score: 0.85 - Payment processing troubleshooting steps provided",
      timestamp: "2025-01-19T13:45:00Z"
    },
    {
      id: 2,
      user: "Mike Chen",
      action: "was assigned to",
      type: "agent_assigned",
      ticketId: "1235",
      details: "Technical issue escalated to senior agent",
      timestamp: "2025-01-19T13:30:00Z"
    },
    {
      id: 3,
      user: "Emily Davis",
      action: "created",
      type: "ticket_created",
      ticketId: "1237",
      details: "New shipping inquiry submitted",
      timestamp: "2025-01-19T13:15:00Z"
    },
    {
      id: 4,
      user: "Sarah Johnson",
      action: "updated knowledge base article",
      type: "knowledge_base",
      details: "Payment troubleshooting guide - Added new section for mobile payments",
      timestamp: "2025-01-19T12:50:00Z"
    }
  ];

  // Mock AI insights
  const mockAIInsights = {
    highConfidence: 65,
    mediumConfidence: 25,
    lowConfidence: 10,
    autoResolved: 142,
    avgConfidence: "0.78",
    accuracyRate: 89,
    avgResponseTime: "2.3 min",
    resolutionRate: 94
  };

  // Mock system health
  const mockSystemHealth = {
    overall: "healthy",
    aiService: "healthy",
    knowledgeBase: "healthy",
    emailService: "warning",
    database: "healthy",
    responseTime: 245,
    activeUsers: 127,
    queueSize: 8
  };

  useEffect(() => {
    // Simulate authentication check
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Simulate user role detection - in real app, decode JWT token
    const userRole = localStorage.getItem('userRole') || 'user';
    setUser(mockUsers?.[userRole] || mockUsers?.user);
    setLoading(false);
  }, [navigate]);

  const getStatsForRole = (role) => {
    switch (role) {
      case 'admin':
        return [
          {
            title: "Total Tickets",
            value: "1,247",
            change: "+12%",
            changeType: "increase",
            icon: "Ticket",
            color: "primary"
          },
          {
            title: "Active Agents",
            value: "23",
            change: "+2",
            changeType: "increase",
            icon: "Users",
            color: "success"
          },
          {
            title: "AI Accuracy",
            value: "89%",
            change: "+3%",
            changeType: "increase",
            icon: "Bot",
            color: "primary"
          },
          {
            title: "Avg Resolution",
            value: "4.2h",
            change: "-15min",
            changeType: "increase",
            icon: "Clock",
            color: "success"
          }
        ];
      case 'agent':
        return [
          {
            title: "Assigned Tickets",
            value: "18",
            change: "+3",
            changeType: "increase",
            icon: "UserCheck",
            color: "primary"
          },
          {
            title: "Resolved Today",
            value: "7",
            change: "+2",
            changeType: "increase",
            icon: "CheckCircle",
            color: "success"
          },
          {
            title: "AI Drafts Pending",
            value: "5",
            change: "-2",
            changeType: "increase",
            icon: "MessageSquare",
            color: "warning"
          },
          {
            title: "Avg Response Time",
            value: "12min",
            change: "-3min",
            changeType: "increase",
            icon: "Clock",
            color: "success"
          }
        ];
      default:
        return [
          {
            title: "My Tickets",
            value: "4",
            change: "+1",
            changeType: "increase",
            icon: "Ticket",
            color: "primary"
          },
          {
            title: "Resolved",
            value: "12",
            change: "+2",
            changeType: "increase",
            icon: "CheckCircle",
            color: "success"
          },
          {
            title: "Avg Response",
            value: "2.3h",
            change: "-30min",
            changeType: "increase",
            icon: "Clock",
            color: "success"
          },
          {
            title: "Satisfaction",
            value: "4.8/5",
            change: "+0.2",
            changeType: "increase",
            icon: "Star",
            color: "warning"
          }
        ];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = getStatsForRole(user?.role);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        notifications={mockNotifications}
      />
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        user={user}
      />
      <main className={`pt-16 transition-medium ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.name?.split(' ')?.[0]}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's what's happening with your {user?.role === 'admin' ? 'system' : user?.role === 'agent' ? 'tickets' : 'support requests'} today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats?.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <QuickActions userRole={user?.role} />
            </div>

            {/* Recent Tickets */}
            <div className="lg:col-span-2">
              <RecentTickets tickets={mockTickets} userRole={user?.role} />
            </div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Activity Feed */}
            <ActivityFeed activities={mockActivities} />

            {/* AI Insights or System Health */}
            {user?.role === 'admin' ? (
              <SystemHealth healthData={mockSystemHealth} />
            ) : (
              <AIInsights insights={mockAIInsights} userRole={user?.role} />
            )}
          </div>

          {/* Full Width AI Insights for Admin */}
          {user?.role === 'admin' && (
            <div className="mb-8">
              <AIInsights insights={mockAIInsights} userRole={user?.role} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;