import React from 'react';
import Icon from '../../../components/AppIcon';

const ConfidenceBadge = ({ confidence, size = 'default' }) => {
  const getConfidenceConfig = (confidence) => {
    if (confidence === null || confidence === undefined) {
      return {
        label: 'No AI',
        className: 'bg-gray-100 text-gray-600 border-gray-200',
        icon: 'Minus',
        iconColor: 'text-gray-500'
      };
    }

    const score = parseFloat(confidence);
    
    if (score >= 0.8) {
      return {
        label: `${Math.round(score * 100)}%`,
        className: 'bg-green-100 text-green-800 border-green-200',
        icon: 'TrendingUp',
        iconColor: 'text-green-600'
      };
    } else if (score >= 0.5) {
      return {
        label: `${Math.round(score * 100)}%`,
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: 'Minus',
        iconColor: 'text-yellow-600'
      };
    } else {
      return {
        label: `${Math.round(score * 100)}%`,
        className: 'bg-red-100 text-red-800 border-red-200',
        icon: 'TrendingDown',
        iconColor: 'text-red-600'
      };
    }
  };

  const config = getConfidenceConfig(confidence);
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

export default ConfidenceBadge;