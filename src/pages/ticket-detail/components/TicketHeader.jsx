import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TicketHeader = ({ ticket, onStatusChange, onAssignmentChange, user }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-warning text-warning-foreground';
      case 'in-progress': return 'bg-primary text-primary-foreground';
      case 'resolved': return 'bg-success text-success-foreground';
      case 'closed': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const statusOptions = [
    { value: 'open', label: 'Open', icon: 'AlertCircle' },
    { value: 'in-progress', label: 'In Progress', icon: 'Clock' },
    { value: 'resolved', label: 'Resolved', icon: 'CheckCircle' },
    { value: 'closed', label: 'Closed', icon: 'XCircle' }
  ];

  return (
    <div className="bg-surface border-b border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-foreground">
              #{ticket?.id} - {ticket?.title}
            </h1>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket?.status)}`}>
              {ticket?.status?.replace('-', ' ')?.toUpperCase()}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="User" size={16} />
              <span>Created by {ticket?.customer?.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={16} />
              <span>{new Date(ticket.createdAt)?.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Tag" size={16} />
              <span className="capitalize">{ticket?.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="AlertTriangle" size={16} />
              <span className={`capitalize font-medium ${getPriorityColor(ticket?.priority)}`}>
                {ticket?.priority} Priority
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1">
            {statusOptions?.map((status) => (
              <Button
                key={status?.value}
                variant={ticket?.status === status?.value ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusChange(status?.value)}
                iconName={status?.icon}
                iconPosition="left"
                iconSize={16}
              >
                {status?.label}
              </Button>
            ))}
          </div>
          
          {user?.role === 'admin' && (
            <Button
              variant="outline"
              size="sm"
              onClick={onAssignmentChange}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={16}
            >
              Reassign
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketHeader;