import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterBar = ({ filters, onFiltersChange, onSearch, onClearFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'pending', label: 'Pending' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'billing', label: 'Billing' },
    { value: 'technical', label: 'Technical' },
    { value: 'shipping', label: 'Shipping' },
    { value: 'general', label: 'General' },
    { value: 'other', label: 'Other' }
  ];

  const agentOptions = [
    { value: '', label: 'All Agents' },
    { value: 'sarah-johnson', label: 'Sarah Johnson' },
    { value: 'mike-chen', label: 'Mike Chen' },
    { value: 'emily-davis', label: 'Emily Davis' },
    { value: 'alex-rodriguez', label: 'Alex Rodriguez' },
    { value: 'unassigned', label: 'Unassigned' }
  ];

  const confidenceOptions = [
    { value: '', label: 'All Confidence Levels' },
    { value: 'high', label: 'High (0.8+)' },
    { value: 'medium', label: 'Medium (0.5-0.8)' },
    { value: 'low', label: 'Low (<0.5)' },
    { value: 'no-ai', label: 'No AI Response' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleClearAll = () => {
    setSearchTerm('');
    onClearFilters();
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            type="search"
            placeholder="Search tickets by ID, title, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="pl-10 pr-20"
          />
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            Search
          </Button>
        </div>
      </form>
      {/* Quick Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />
        
        <Select
          label="Category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => handleFilterChange('category', value)}
        />
        
        <Select
          label="Assigned Agent"
          options={agentOptions}
          value={filters?.assignedAgent}
          onChange={(value) => handleFilterChange('assignedAgent', value)}
        />
        
        <Select
          label="AI Confidence"
          options={confidenceOptions}
          value={filters?.confidence}
          onChange={(value) => handleFilterChange('confidence', value)}
        />
      </div>
      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          iconName={showAdvancedFilters ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          Advanced Filters
        </Button>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {Object.values(filters)?.filter(Boolean)?.length} filters active
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        </div>
      </div>
      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Date From"
              type="date"
              value={filters?.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
            />
            
            <Input
              label="Date To"
              type="date"
              value={filters?.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
            />
            
            <Select
              label="Priority"
              options={[
                { value: '', label: 'All Priorities' },
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'urgent', label: 'Urgent' }
              ]}
              value={filters?.priority}
              onChange={(value) => handleFilterChange('priority', value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;