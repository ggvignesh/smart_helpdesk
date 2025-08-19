import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RecentTickets = ({ tickets, userRole }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'in-progress':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'resolved':
        return 'bg-success/10 text-success border-success/20';
      case 'closed':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {userRole === 'user' ? 'My Recent Tickets' : 'Recent Tickets'}
        </h3>
        <Link 
          to="/ticket-list" 
          className="text-sm text-primary hover:text-primary/80 transition-smooth"
        >
          View all
        </Link>
      </div>
      <div className="space-y-3">
        {tickets?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Ticket" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No tickets found</p>
            {userRole === 'user' && (
              <Link to="/create-ticket" className="text-primary hover:text-primary/80 text-sm">
                Create your first ticket
              </Link>
            )}
          </div>
        ) : (
          tickets?.map((ticket) => (
            <Link 
              key={ticket?.id} 
              to={`/ticket-detail?id=${ticket?.id}`}
              className="block"
            >
              <div className="p-4 border border-border rounded-lg hover:bg-muted transition-smooth">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground line-clamp-1">
                      #{ticket?.id} - {ticket?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {ticket?.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(ticket?.status)}`}>
                      {ticket?.status?.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Icon name="Tag" size={12} className="mr-1" />
                      {ticket?.category}
                    </span>
                    <span className={`flex items-center ${getPriorityColor(ticket?.priority)}`}>
                      <Icon name="AlertCircle" size={12} className="mr-1" />
                      {ticket?.priority}
                    </span>
                    {userRole !== 'user' && ticket?.assignedTo && (
                      <span className="flex items-center">
                        <Icon name="User" size={12} className="mr-1" />
                        {ticket?.assignedTo}
                      </span>
                    )}
                  </div>
                  <span>{formatDate(ticket?.updatedAt)}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTickets;