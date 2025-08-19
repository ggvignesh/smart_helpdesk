import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TicketSidebar = ({ ticket, relatedArticles, onAssignmentChange, onPriorityChange, user }) => {
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);

  const agents = [
    { value: 'agent1', label: 'Sarah Johnson' },
    { value: 'agent2', label: 'Mike Chen' },
    { value: 'agent3', label: 'Emily Rodriguez' },
    { value: 'unassigned', label: 'Unassigned' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const calculateSLAStatus = () => {
    const createdAt = new Date(ticket.createdAt);
    const now = new Date();
    const hoursElapsed = (now - createdAt) / (1000 * 60 * 60);
    
    const slaHours = ticket?.priority === 'high' ? 4 : ticket?.priority === 'medium' ? 8 : 24;
    const remainingHours = Math.max(0, slaHours - hoursElapsed);
    
    return {
      total: slaHours,
      remaining: remainingHours,
      isBreached: remainingHours === 0,
      percentage: Math.min(100, (hoursElapsed / slaHours) * 100)
    };
  };

  const sla = calculateSLAStatus();

  const formatTimeRemaining = (hours) => {
    if (hours === 0) return 'SLA Breached';
    if (hours < 1) return `${Math.round(hours * 60)}m remaining`;
    if (hours < 24) return `${Math.round(hours)}h remaining`;
    return `${Math.round(hours / 24)}d remaining`;
  };

  return (
    <div className="w-full lg:w-80 bg-surface border-l border-border overflow-y-auto">
      {/* Ticket Metadata */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Ticket Details</h3>
        
        <div className="space-y-4">
          {/* Status */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">Status</label>
            <div className="mt-1 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                ticket?.status === 'open' ? 'bg-warning' :
                ticket?.status === 'in-progress' ? 'bg-primary' :
                ticket?.status === 'resolved' ? 'bg-success' : 'bg-secondary'
              }`} />
              <span className="text-sm font-medium text-foreground capitalize">
                {ticket?.status?.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">Priority</label>
            {user?.role !== 'customer' ? (
              <Select
                options={priorityOptions}
                value={ticket?.priority}
                onChange={onPriorityChange}
                className="mt-1"
              />
            ) : (
              <div className="mt-1">
                <span className={`text-sm font-medium capitalize ${
                  ticket?.priority === 'high' ? 'text-error' :
                  ticket?.priority === 'medium' ? 'text-warning' : 'text-success'
                }`}>
                  {ticket?.priority} Priority
                </span>
              </div>
            )}
          </div>

          {/* Assigned Agent */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">Assigned Agent</label>
            <div className="mt-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {ticket?.assignedAgent ? (
                  <>
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {ticket?.assignedAgent?.name?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-foreground">{ticket?.assignedAgent?.name}</span>
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">Unassigned</span>
                )}
              </div>
              {user?.role === 'admin' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAssignmentModal(true)}
                  iconName="Edit"
                  iconSize={14}
                />
              )}
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">Customer</label>
            <div className="mt-1 flex items-center gap-2">
              <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-secondary-foreground">
                  {ticket?.customer?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{ticket?.customer?.name}</div>
                <div className="text-xs text-muted-foreground">{ticket?.customer?.email}</div>
              </div>
            </div>
          </div>

          {/* Created Date */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">Created</label>
            <div className="mt-1 text-sm text-foreground">
              {new Date(ticket.createdAt)?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>

          {/* Last Updated */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
            <div className="mt-1 text-sm text-foreground">
              {new Date(ticket.updatedAt)?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </div>
      {/* SLA Status */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">SLA Status</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Response Time</span>
            <span className={`text-sm font-medium ${
              sla?.isBreached ? 'text-error' : sla?.remaining < 2 ? 'text-warning' : 'text-success'
            }`}>
              {formatTimeRemaining(sla?.remaining)}
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                sla?.isBreached ? 'bg-error' : sla?.percentage > 75 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${Math.min(100, sla?.percentage)}%` }}
            />
          </div>
          
          <div className="text-xs text-muted-foreground">
            Target: {sla?.total}h • Elapsed: {Math.round((sla?.total - sla?.remaining) * 10) / 10}h
          </div>
        </div>
      </div>
      {/* Related Articles */}
      {relatedArticles && relatedArticles?.length > 0 && (
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Related Articles</h3>
          
          <div className="space-y-3">
            {relatedArticles?.map((article) => (
              <div key={article?.id} className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-smooth">
                <a
                  href={`/knowledge-base/${article?.id}`}
                  className="block"
                >
                  <div className="flex items-start gap-2">
                    <Icon name="BookOpen" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
                        {article?.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {article?.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">
                          {Math.round(article?.relevanceScore * 100)}% match
                        </span>
                        <div className="flex gap-1">
                          {article?.tags?.slice(0, 2)?.map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Audit Trail */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Audit Trail</h3>
        
        <div className="space-y-3">
          {ticket?.auditTrail?.map((entry) => (
            <div key={entry?.id} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm text-foreground">
                  {entry?.action}
                </div>
                <div className="text-xs text-muted-foreground">
                  {entry?.author} • {new Date(entry.timestamp)?.toLocaleString()}
                </div>
                {entry?.traceId && (
                  <div className="text-xs text-muted-foreground font-mono">
                    Trace: {entry?.traceId}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Assignment Modal */}
      {showAssignmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1200">
          <div className="bg-surface rounded-lg p-6 w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold text-foreground mb-4">Reassign Ticket</h3>
            
            <Select
              label="Select Agent"
              options={agents}
              value={ticket?.assignedAgent?.id || 'unassigned'}
              onChange={(value) => {
                onAssignmentChange(value);
                setShowAssignmentModal(false);
              }}
              className="mb-4"
            />
            
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowAssignmentModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketSidebar;