import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'ticket_created':
        return 'Plus';
      case 'ticket_updated':
        return 'Edit';
      case 'ticket_resolved':
        return 'CheckCircle';
      case 'ticket_closed':
        return 'X';
      case 'ai_response':
        return 'Bot';
      case 'agent_assigned':
        return 'UserCheck';
      case 'knowledge_base':
        return 'BookOpen';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'ticket_created':
        return 'text-primary';
      case 'ticket_updated':
        return 'text-warning';
      case 'ticket_resolved':
        return 'text-success';
      case 'ticket_closed':
        return 'text-muted-foreground';
      case 'ai_response':
        return 'text-accent';
      case 'agent_assigned':
        return 'text-primary';
      case 'knowledge_base':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return time?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity?.user}</span>
                  {' '}
                  <span>{activity?.action}</span>
                  {activity?.ticketId && (
                    <span className="text-primary">
                      {' '}ticket #{activity?.ticketId}
                    </span>
                  )}
                </p>
                {activity?.details && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {activity?.details}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTime(activity?.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;