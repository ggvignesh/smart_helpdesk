import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealth = ({ healthData }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'critical':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const services = [
    {
      name: 'AI Processing',
      status: healthData?.aiService,
      description: 'Ticket classification and response generation',
      uptime: '99.9%'
    },
    {
      name: 'Knowledge Base',
      status: healthData?.knowledgeBase,
      description: 'Article search and retrieval',
      uptime: '99.8%'
    },
    {
      name: 'Email Service',
      status: healthData?.emailService,
      description: 'Notification delivery system',
      uptime: '99.5%'
    },
    {
      name: 'Database',
      status: healthData?.database,
      description: 'Data storage and retrieval',
      uptime: '99.9%'
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">System Health</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>
      <div className="space-y-4">
        {services?.map((service, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${getStatusColor(service?.status)}`}>
                <Icon name={getStatusIcon(service?.status)} size={16} />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{service?.name}</h4>
                <p className="text-sm text-muted-foreground">{service?.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{service?.uptime}</p>
              <p className="text-xs text-muted-foreground">Uptime</p>
            </div>
          </div>
        ))}
      </div>
      {/* Overall System Status */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Server" size={20} className="text-primary" />
            <span className="font-medium text-foreground">Overall Status</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(healthData?.overall)}`}>
            {healthData?.overall?.charAt(0)?.toUpperCase() + healthData?.overall?.slice(1)}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-foreground">{healthData?.responseTime}ms</p>
            <p className="text-xs text-muted-foreground">Avg Response</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">{healthData?.activeUsers}</p>
            <p className="text-xs text-muted-foreground">Active Users</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">{healthData?.queueSize}</p>
            <p className="text-xs text-muted-foreground">Queue Size</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;