import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import TicketForm from './components/TicketForm';
import TicketPreview from './components/TicketPreview';
import HelpSection from './components/HelpSection';
import SuccessModal from './components/SuccessModal';
import Icon from '../../components/AppIcon';

const CreateTicket = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdTicket, setCreatedTicket] = useState(null);
  const [formData, setFormData] = useState({});
  const [suggestedCategory, setSuggestedCategory] = useState('');
  const [suggestedArticles, setSuggestedArticles] = useState([]);

  // Mock user data
  const user = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "Ticket Update",
      message: "Your ticket #TK-001234 has been resolved",
      type: "success",
      time: "2 minutes ago",
      read: false,
      ticketId: "TK-001234"
    },
    {
      id: 2,
      title: "New Knowledge Article",
      message: "How to Reset Your Password - Updated guide available",
      type: "info",
      time: "1 hour ago",
      read: false
    }
  ];

  // Mock knowledge base articles for suggestions
  const mockKnowledgeBase = [
    {
      id: 1,
      title: "How to Process Refunds and Returns",
      excerpt: "Step-by-step guide for processing customer refunds through our billing system.",
      tags: ["billing", "refund", "payment"],
      category: "billing"
    },
    {
      id: 2,
      title: "Troubleshooting Login Issues",
      excerpt: "Common solutions for users experiencing problems logging into their accounts.",
      tags: ["login", "authentication", "password"],
      category: "technical"
    },
    {
      id: 3,
      title: "Tracking Shipments and Delivery Updates",
      excerpt: "How to track packages and understand delivery status notifications.",
      tags: ["shipping", "tracking", "delivery"],
      category: "shipping"
    },
    {
      id: 4,
      title: "Understanding Your Invoice",
      excerpt: "Detailed explanation of billing cycles, charges, and payment methods.",
      tags: ["billing", "invoice", "charges"],
      category: "billing"
    },
    {
      id: 5,
      title: "Browser Compatibility and Performance",
      excerpt: "Optimizing your browser settings for the best experience with our platform.",
      tags: ["technical", "browser", "performance"],
      category: "technical"
    }
  ];

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // AI-powered description analysis
  const analyzeDescription = (description) => {
    if (!description || description?.length < 10) {
      setSuggestedCategory('');
      setSuggestedArticles([]);
      return;
    }

    const lowerDesc = description?.toLowerCase();
    let category = '';
    let relevantArticles = [];

    // Simple keyword-based categorization
    if (lowerDesc?.includes('payment') || lowerDesc?.includes('billing') || lowerDesc?.includes('invoice') || lowerDesc?.includes('refund') || lowerDesc?.includes('charge')) {
      category = 'billing';
    } else if (lowerDesc?.includes('login') || lowerDesc?.includes('password') || lowerDesc?.includes('error') || lowerDesc?.includes('bug') || lowerDesc?.includes('not working')) {
      category = 'technical';
    } else if (lowerDesc?.includes('shipping') || lowerDesc?.includes('delivery') || lowerDesc?.includes('package') || lowerDesc?.includes('tracking')) {
      category = 'shipping';
    } else {
      category = 'other';
    }

    // Find relevant articles based on keywords
    const keywords = lowerDesc?.split(' ')?.filter(word => word?.length > 3);
    relevantArticles = mockKnowledgeBase?.filter(article => {
      const articleText = (article?.title + ' ' + article?.excerpt + ' ' + article?.tags?.join(' '))?.toLowerCase();
      return keywords?.some(keyword => articleText?.includes(keyword)) || article?.category === category;
    })?.slice(0, 3);

    setSuggestedCategory(category);
    setSuggestedArticles(relevantArticles);
  };

  const handleDescriptionChange = (description) => {
    setFormData(prev => ({ ...prev, description }));
    
    // Debounce the AI analysis
    const timer = setTimeout(() => {
      analyzeDescription(description);
    }, 500);

    return () => clearTimeout(timer);
  };

  const getEstimatedResponseTime = (category, priority) => {
    const baseTime = {
      'urgent': '15 minutes',
      'high': '2 hours',
      'medium': '4-8 hours',
      'low': '24-48 hours'
    };

    const categoryModifier = {
      'billing': ' (Priority queue)',
      'technical': '',
      'shipping': ' (Business hours)',
      'other': ''
    };

    return baseTime?.[priority] + (categoryModifier?.[category] || '');
  };

  const generateAutoTags = (title, description, category) => {
    const tags = [];
    const text = (title + ' ' + description)?.toLowerCase();

    // Add category-based tags
    if (category === 'billing') tags?.push('billing');
    if (category === 'technical') tags?.push('technical');
    if (category === 'shipping') tags?.push('shipping');

    // Add keyword-based tags
    if (text?.includes('urgent') || text?.includes('asap')) tags?.push('urgent');
    if (text?.includes('error') || text?.includes('bug')) tags?.push('bug');
    if (text?.includes('payment') || text?.includes('card')) tags?.push('payment');
    if (text?.includes('login') || text?.includes('password')) tags?.push('authentication');

    return [...new Set(tags)]; // Remove duplicates
  };

  const handleSubmit = async (ticketData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const ticketId = `TK-${Date.now()?.toString()?.slice(-6)}`;
      const estimatedResponse = getEstimatedResponseTime(ticketData?.category, ticketData?.priority);
      const autoTags = generateAutoTags(ticketData?.title, ticketData?.description, ticketData?.category);
      
      const newTicket = {
        id: ticketId,
        ...ticketData,
        status: 'open',
        createdAt: new Date()?.toISOString(),
        estimatedResponse,
        autoTags,
        aiProcessing: true
      };

      setCreatedTicket(newTicket);
      setShowSuccessModal(true);
      
      // Clear form data
      setFormData({});
      setSuggestedCategory('');
      setSuggestedArticles([]);
      
    } catch (error) {
      console.error('Error creating ticket:', error);
      // Handle error state here
    } finally {
      setLoading(false);
    }
  };

  const autoGeneratedTags = formData?.title && formData?.description ? 
    generateAutoTags(formData?.title, formData?.description, formData?.category) : [];

  const estimatedResponseTime = formData?.category && formData?.priority ? 
    getEstimatedResponseTime(formData?.category, formData?.priority) : null;

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
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <span>Support</span>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground">Create Ticket</span>
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              Create Support Ticket
            </h1>
            <p className="text-muted-foreground mt-1">
              Submit a detailed support request and get help from our AI-powered system
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="xl:col-span-2 space-y-6">
              <TicketForm
                onSubmit={handleSubmit}
                loading={loading}
                onDescriptionChange={handleDescriptionChange}
                suggestedCategory={suggestedCategory}
                suggestedArticles={suggestedArticles}
              />
            </div>

            {/* Right Column - Preview and Help */}
            <div className="space-y-6">
              <TicketPreview
                formData={formData}
                estimatedResponseTime={estimatedResponseTime}
                autoGeneratedTags={autoGeneratedTags}
              />
              
              <div className="hidden lg:block">
                <HelpSection />
              </div>
            </div>
          </div>

          {/* Mobile Help Section */}
          <div className="lg:hidden mt-8">
            <HelpSection />
          </div>
        </div>
      </main>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        ticketData={createdTicket}
      />
    </div>
  );
};

export default CreateTicket;