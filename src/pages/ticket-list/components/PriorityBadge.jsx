import React from 'react';
import Icon from '../../../components/AppIcon';

const PriorityBadge = ({ priority, size = 'default' }) => {
  const getPriorityConfig = (priority) => {
    const configs = {
      'low': {
        label: 'Low',
        className: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: 'ArrowDown',
        iconColor: 'text-blue-600'
      },
      'medium': {
        label: 'Medium',
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: 'Minus',
        iconColor: 'text-yellow-600'
      },
      'high': {
        label: 'High',
        className: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: 'ArrowUp',
        iconColor: 'text-orange-600'
      },
      'urgent': {
        label: 'Urgent',
        className: 'bg-red-100 text-red-800 border-red-200',
        icon: 'AlertTriangle',
        iconColor: 'text-red-600'
      }
    };

    return configs?.[priority] || configs?.['medium'];
  };

  const config = getPriorityConfig(priority);
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 12,
    default: 14,
    lg: 16
  };

  return (
    <span className={`inline-flex items-center space-x-1 font-medium rounded-full border ${config?.className} ${sizeClasses?.[size]}`}>
      <Icon 
        name={config?.icon} 
        size={iconSizes?.[size]} 
        className={config?.iconColor}
      />
      <span>{config?.label}</span>
    </span>
  );
};

export default PriorityBadge;