import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ isOpen, onClose, ticketData }) => {
  if (!isOpen) return null;

  const handleViewTicket = () => {
    window.location.href = `/ticket-detail?id=${ticketData?.id}`;
  };

  const handleCreateAnother = () => {
    onClose();
    window.location?.reload();
  };

  const handleGoToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1200 p-4">
      <div className="bg-surface rounded-lg border border-border max-w-md w-full p-6 shadow-floating">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Ticket Created Successfully!
          </h2>
          <p className="text-sm text-muted-foreground">
            Your support request has been submitted and is being processed by our AI system.
          </p>
        </div>

        {/* Ticket Information */}
        <div className="bg-muted/30 rounded-lg p-4 mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Ticket ID:</span>
            <span className="text-sm font-mono text-primary">#{ticketData?.id}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Category:</span>
            <span className="text-sm text-foreground capitalize">{ticketData?.category}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Priority:</span>
            <span className={`text-sm px-2 py-1 rounded-full ${
              ticketData?.priority === 'urgent' ? 'bg-error/10 text-error' :
              ticketData?.priority === 'high' ? 'bg-warning/10 text-warning' :
              ticketData?.priority === 'medium'? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
            }`}>
              {ticketData?.priority?.charAt(0)?.toUpperCase() + ticketData?.priority?.slice(1)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Est. Response:</span>
            <span className="text-sm text-foreground">{ticketData?.estimatedResponse}</span>
          </div>
        </div>

        {/* AI Processing Status */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Bot" size={14} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                AI Processing in Progress
              </p>
              <p className="text-xs text-muted-foreground">
                Our AI is analyzing your ticket, searching for solutions, and preparing an initial response. You'll receive updates via email and in your dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">What happens next?</h3>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-xs text-muted-foreground">
                AI analyzes your ticket and searches our knowledge base
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-xs text-muted-foreground">
                If a solution is found, you'll receive an automated response
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-xs text-muted-foreground">
                Otherwise, a human agent will review and respond personally
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-xs text-muted-foreground">
                You can track progress and add updates anytime
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="default"
            onClick={handleViewTicket}
            iconName="Eye"
            iconPosition="left"
            fullWidth
          >
            View Ticket Details
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleCreateAnother}
              iconName="Plus"
              iconPosition="left"
            >
              Create Another
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleGoToDashboard}
              iconName="Home"
              iconPosition="left"
            >
              Dashboard
            </Button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-smooth"
        >
          <Icon name="X" size={16} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;