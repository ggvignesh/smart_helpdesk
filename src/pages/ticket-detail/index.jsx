import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import TicketHeader from './components/TicketHeader';
import ConversationThread from './components/ConversationThread';
import TicketSidebar from './components/TicketSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TicketDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const ticketId = searchParams?.get('id');
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Mock user data
  const user = {
    id: 'agent1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'agent',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'New ticket assigned',
      message: 'Ticket #1234 has been assigned to you',
      time: '5 minutes ago',
      read: false,
      type: 'info',
      ticketId: '1234'
    },
    {
      id: 2,
      title: 'SLA breach warning',
      message: 'Ticket #5678 is approaching SLA deadline',
      time: '15 minutes ago',
      read: false,
      type: 'warning',
      ticketId: '5678'
    }
  ];

  // Mock ticket data
  useEffect(() => {
    const fetchTicketData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTicket = {
        id: ticketId || 'TKT-2024-001',
        title: 'Unable to access premium features after subscription upgrade',
        description: `Hi there,\n\nI upgraded my subscription to Premium yesterday, but I'm still unable to access the premium features. I've tried logging out and back in, clearing my browser cache, and even tried from a different device, but the issue persists.\n\nMy subscription shows as active in the billing section, and the payment went through successfully. Could you please help me resolve this issue?\n\nThanks!`,
        status: 'in-progress',
        priority: 'high',
        category: 'billing',
        customer: {
          id: 'cust_001',
          name: 'Alex Thompson',
          email: 'alex.thompson@email.com',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        },
        assignedAgent: {
          id: 'agent1',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@company.com'
        },
        createdAt: '2025-01-19T10:30:00Z',
        updatedAt: '2025-01-19T13:45:00Z',
        attachments: [
          {
            name: 'screenshot-billing-page.png',
            url: 'https://example.com/attachments/screenshot-billing-page.png',
            size: '245 KB'
          }
        ],
        auditTrail: [
          {
            id: 1,
            action: 'Ticket created by customer',
            author: 'Alex Thompson',
            timestamp: '2025-01-19T10:30:00Z',
            traceId: 'trace_001'
          },
          {
            id: 2,
            action: 'Auto-assigned to Sarah Johnson based on category',
            author: 'System',
            timestamp: '2025-01-19T10:31:00Z',
            traceId: 'trace_002'
          },
          {
            id: 3,
            action: 'Status changed to In Progress',
            author: 'Sarah Johnson',
            timestamp: '2025-01-19T11:15:00Z',
            traceId: 'trace_003'
          },
          {
            id: 4,
            action: 'AI response generated with 85% confidence',
            author: 'AI Assistant',
            timestamp: '2025-01-19T11:16:00Z',
            traceId: 'trace_004'
          }
        ]
      };

      const mockMessages = [
        {
          id: 1,
          type: 'ai-generated',
          author: {
            id: 'ai',
            name: 'AI Assistant',
            role: 'system'
          },
          content: `Hi Alex,\n\nThank you for contacting us about the premium features access issue. I understand how frustrating this must be after upgrading your subscription.\n\nBased on your description, this appears to be a common issue that can occur due to account synchronization delays. Here are the steps I recommend:\n\n1. **Account Refresh**: Please try logging out completely and logging back in\n2. **Cache Clear**: Clear your browser cache and cookies for our domain\n3. **Permission Sync**: Wait 10-15 minutes for our systems to fully sync your new subscription status\n\nIf these steps don't resolve the issue, there might be a backend synchronization problem that requires manual intervention. I'll escalate this to our technical team for immediate review.\n\nI'll monitor your account status and update you within the next hour with a resolution.\n\nBest regards,\nAI Assistant`,timestamp: '2025-01-19T11:16:00Z',
          confidence: 0.85,
          isInternal: false,
          kbArticles: [
            {
              id: 'kb_001',title: 'Subscription Upgrade Issues - Troubleshooting Guide',
              relevanceScore: 0.92
            },
            {
              id: 'kb_002',title: 'Premium Features Access Problems',
              relevanceScore: 0.88
            }
          ]
        },
        {
          id: 2,
          type: 'agent',
          author: {
            id: 'agent1',name: 'Sarah Johnson',role: 'agent'
          },
          content: `Hi Alex,\n\nI've reviewed the AI response above and it covers the standard troubleshooting steps well. I've also checked your account backend and can see that your subscription upgrade is indeed active.\n\nI've manually triggered a permission sync for your account, which should resolve the access issue immediately. Please try accessing the premium features now and let me know if you're still experiencing any problems.\n\nIf you continue to have issues, I'll personally ensure this gets resolved today.\n\nBest regards,\nSarah Johnson\nCustomer Success Team`,
          timestamp: '2025-01-19T12:30:00Z',
          isInternal: false,
          editHistory: []
        },
        {
          id: 3,
          type: 'customer',
          author: {
            id: 'cust_001',
            name: 'Alex Thompson',
            role: 'customer'
          },
          content: `Hi Sarah,\n\nThank you so much for the quick response! I just tried accessing the premium features and everything is working perfectly now. I can see all the advanced analytics and export options that weren't available before.\n\nI really appreciate both the AI's initial troubleshooting suggestions and your manual intervention to fix the backend sync issue. The customer service has been excellent!\n\nThanks again for resolving this so quickly.`,
          timestamp: '2025-01-19T13:45:00Z',
          isInternal: false
        },
        {
          id: 4,
          type: 'agent',
          author: {
            id: 'agent1',
            name: 'Sarah Johnson',
            role: 'agent'
          },
          content: `Internal note: Customer confirmed resolution. Backend sync issue was caused by a delay in the subscription service API. I've documented this for the engineering team to prevent similar issues in the future. Will mark as resolved after confirming customer satisfaction.`,
          timestamp: '2025-01-19T13:50:00Z',
          isInternal: true
        }
      ];

      const mockRelatedArticles = [
        {
          id: 'kb_001',
          title: 'Subscription Upgrade Issues - Troubleshooting Guide',
          excerpt: 'Common solutions for subscription upgrade and premium feature access problems.',
          relevanceScore: 0.92,
          tags: ['billing', 'subscription', 'premium']
        },
        {
          id: 'kb_002',
          title: 'Premium Features Access Problems',
          excerpt: 'Step-by-step guide to resolve premium feature access issues after subscription changes.',
          relevanceScore: 0.88,
          tags: ['premium', 'features', 'access']
        },
        {
          id: 'kb_003',
          title: 'Account Synchronization Delays',
          excerpt: 'Understanding and resolving account sync issues between billing and feature systems.',
          relevanceScore: 0.75,
          tags: ['sync', 'account', 'technical']
        }
      ];

      setTicket(mockTicket);
      setMessages(mockMessages);
      setRelatedArticles(mockRelatedArticles);
      setLoading(false);
    };

    fetchTicketData();
  }, [ticketId]);

  const handleStatusChange = (newStatus) => {
    setTicket(prev => ({
      ...prev,
      status: newStatus,
      updatedAt: new Date()?.toISOString()
    }));
  };

  const handleAssignmentChange = (agentId) => {
    const agents = {
      'agent1': { id: 'agent1', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
      'agent2': { id: 'agent2', name: 'Mike Chen', email: 'mike.chen@company.com' },
      'agent3': { id: 'agent3', name: 'Emily Rodriguez', email: 'emily.rodriguez@company.com' },
      'unassigned': null
    };

    setTicket(prev => ({
      ...prev,
      assignedAgent: agents?.[agentId],
      updatedAt: new Date()?.toISOString()
    }));
  };

  const handlePriorityChange = (newPriority) => {
    setTicket(prev => ({
      ...prev,
      priority: newPriority,
      updatedAt: new Date()?.toISOString()
    }));
  };

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: messages?.length + 1,
      type: 'agent',
      author: messageData?.author,
      content: messageData?.content,
      timestamp: new Date()?.toISOString(),
      isInternal: messageData?.isInternal,
      editHistory: []
    };

    setMessages(prev => [...prev, newMessage]);
    setTicket(prev => ({
      ...prev,
      updatedAt: new Date()?.toISOString()
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} notifications={notifications} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} user={user} />
        
        <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
          <div className="flex items-center justify-center h-96">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-muted-foreground">Loading ticket details...</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} notifications={notifications} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} user={user} />
        
        <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <Icon name="AlertCircle" size={48} className="text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Ticket Not Found</h2>
            <p className="text-muted-foreground mb-6">The ticket you're looking for doesn't exist or you don't have permission to view it.</p>
            <Button onClick={() => navigate('/ticket-list')} iconName="ArrowLeft" iconPosition="left">
              Back to Tickets
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} notifications={notifications} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} user={user} />
      
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="h-[calc(100vh-4rem)] flex flex-col">
          {/* Ticket Header */}
          <TicketHeader
            ticket={ticket}
            onStatusChange={handleStatusChange}
            onAssignmentChange={handleAssignmentChange}
            user={user}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Conversation Thread - Left Panel */}
            <div className="flex-1 flex flex-col min-w-0">
              <ConversationThread
                ticket={ticket}
                messages={messages}
                onSendMessage={handleSendMessage}
                user={user}
              />
            </div>

            {/* Ticket Sidebar - Right Panel */}
            <div className="hidden lg:block">
              <TicketSidebar
                ticket={ticket}
                relatedArticles={relatedArticles}
                onAssignmentChange={handleAssignmentChange}
                onPriorityChange={handlePriorityChange}
                user={user}
              />
            </div>
          </div>

          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden fixed bottom-4 right-4 z-1000">
            <Button
              variant="default"
              size="icon"
              className="rounded-full shadow-floating"
              iconName="Info"
            >
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TicketDetail;