import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HelpSection = () => {
  const [expandedTip, setExpandedTip] = useState(null);

  const helpTips = [
    {
      id: 1,
      title: "Writing Effective Ticket Titles",
      icon: "FileText",
      summary: "Create clear, specific titles that help agents understand your issue quickly",
      details: `Good examples:\n• "Unable to process payment with Visa card ending in 1234"\n• "Website loading slowly on Chrome browser"\n• "Missing items from order #12345"\n\nAvoid vague titles like:\n• "Help needed"\n• "Problem with website"\n• "Not working"`
    },
    {
      id: 2,
      title: "Providing Detailed Descriptions",
      icon: "MessageSquare",
      summary: "Include steps to reproduce, error messages, and relevant context",
      details: `Include these details:\n• What you were trying to do\n• What actually happened\n• Error messages (exact text)\n• Browser/device information\n• Screenshots or URLs when helpful\n• Steps to reproduce the issue\n\nThe more context you provide, the faster we can help!`
    },
    {
      id: 3,
      title: "Choosing the Right Category",
      icon: "Tag",
      summary: "Select the most appropriate category to route your ticket correctly",
      details: `Category guidelines:\n• Billing: Payment issues, invoices, refunds, subscription problems\n• Technical: Website bugs, login issues, feature problems\n• Shipping: Delivery questions, tracking, damaged packages\n• General: Account questions, feature requests, other inquiries\n\nOur AI will suggest a category based on your description!`
    },
    {
      id: 4,
      title: "Setting Priority Levels",
      icon: "AlertTriangle",
      summary: "Choose priority based on business impact and urgency",
      details: `Priority guidelines:\n• Urgent: System down, security issues, critical business impact\n• High: Major features broken, significant user impact\n• Medium: Minor bugs, feature requests, general questions\n• Low: Cosmetic issues, suggestions, non-urgent requests\n\nBe honest about priority to help us serve you better!`
    }
  ];

  const quickActions = [
    {
      title: "Search Knowledge Base",
      description: "Find instant answers to common questions",
      icon: "Search",
      action: () => window.open('/knowledge-base', '_blank')
    },
    {
      title: "Check System Status",
      description: "See if there are any known issues",
      icon: "Activity",
      action: () => window.open('/status', '_blank')
    },
    {
      title: "Contact Sales",
      description: "For billing and account questions",
      icon: "Phone",
      action: () => window.open('/contact-sales', '_blank')
    }
  ];

  const toggleTip = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Quick Actions
        </h3>
        <div className="space-y-3">
          {quickActions?.map((action, index) => (
            <button
              key={index}
              onClick={action?.action}
              className="w-full flex items-center space-x-3 p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-smooth text-left"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={action?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {action?.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {action?.description}
                </p>
              </div>
              <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
      {/* Help Tips */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Tips for Better Support
        </h3>
        <div className="space-y-3">
          {helpTips?.map((tip) => (
            <div key={tip?.id} className="border border-border rounded-lg">
              <button
                onClick={() => toggleTip(tip?.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-smooth"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={tip?.icon} size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {tip?.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {tip?.summary}
                    </p>
                  </div>
                </div>
                <Icon 
                  name={expandedTip === tip?.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </button>
              
              {expandedTip === tip?.id && (
                <div className="px-4 pb-4">
                  <div className="bg-muted/30 rounded-lg p-3 ml-11">
                    <p className="text-sm text-foreground whitespace-pre-line">
                      {tip?.details}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Need Immediate Help?
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Icon name="Phone" size={16} className="text-primary mt-1" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Emergency Support
              </p>
              <p className="text-sm text-muted-foreground">
                Call +1 (555) 123-4567 for urgent issues
              </p>
              <p className="text-xs text-muted-foreground">
                Available 24/7 for critical problems
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="MessageCircle" size={16} className="text-primary mt-1" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Live Chat
              </p>
              <p className="text-sm text-muted-foreground">
                Chat with our support team in real-time
              </p>
              <p className="text-xs text-muted-foreground">
                Monday-Friday, 9 AM - 6 PM EST
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => window.open('/chat', '_blank')}
            fullWidth
          >
            Start Live Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;