import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AIInsights = ({ insights, userRole }) => {
  const confidenceData = [
    { name: 'High (0.8-1.0)', value: insights?.highConfidence, color: '#10B981' },
    { name: 'Medium (0.5-0.8)', value: insights?.mediumConfidence, color: '#F59E0B' },
    { name: 'Low (0.0-0.5)', value: insights?.lowConfidence, color: '#EF4444' }
  ];

  const categoryData = [
    { category: 'Billing', resolved: 45, pending: 12 },
    { category: 'Technical', resolved: 38, pending: 18 },
    { category: 'Shipping', resolved: 52, pending: 8 },
    { category: 'Other', resolved: 23, pending: 15 }
  ];

  if (userRole === 'user') {
    return (
      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4">Support Insights</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{insights?.avgResponseTime}</p>
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{insights?.resolutionRate}%</p>
            <p className="text-sm text-muted-foreground">Resolution Rate</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">AI Performance Insights</h3>
        <Icon name="Bot" size={20} className="text-accent" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confidence Distribution */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Confidence Distribution</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={confidenceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {confidenceData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {confidenceData?.map((item, index) => (
              <div key={index} className="flex items-center text-xs">
                <div 
                  className="w-3 h-3 rounded-full mr-1" 
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-muted-foreground">{item?.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Resolution by Category</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="category" 
                  tick={{ fontSize: 12 }}
                  stroke="#64748B"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#64748B" />
                <Tooltip />
                <Bar dataKey="resolved" fill="#10B981" name="Resolved" />
                <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{insights?.autoResolved}</p>
          <p className="text-sm text-muted-foreground">Auto-resolved</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{insights?.avgConfidence}</p>
          <p className="text-sm text-muted-foreground">Avg Confidence</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{insights?.accuracyRate}%</p>
          <p className="text-sm text-muted-foreground">Accuracy Rate</p>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;