import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [showActions, setShowActions] = useState(false);
  const [bulkStatus, setBulkStatus] = useState('');
  const [bulkAgent, setBulkAgent] = useState('');

  const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'pending', label: 'Pending' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const agentOptions = [
    { value: 'sarah-johnson', label: 'Sarah Johnson' },
    { value: 'mike-chen', label: 'Mike Chen' },
    { value: 'emily-davis', label: 'Emily Davis' },
    { value: 'alex-rodriguez', label: 'Alex Rodriguez' },
    { value: 'unassigned', label: 'Unassigned' }
  ];

  const handleBulkStatusUpdate = () => {
    if (bulkStatus) {
      onBulkAction('status', bulkStatus);
      setBulkStatus('');
      setShowActions(false);
    }
  };

  const handleBulkAssignment = () => {
    if (bulkAgent) {
      onBulkAction('assign', bulkAgent);
      setBulkAgent('');
      setShowActions(false);
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              {selectedCount} ticket{selectedCount > 1 ? 's' : ''} selected
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowActions(!showActions)}
            iconName={showActions ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Bulk Actions
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          iconName="X"
          iconPosition="left"
        >
          Clear Selection
        </Button>
      </div>

      {showActions && (
        <div className="mt-4 pt-4 border-t border-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Update */}
            <div className="space-y-2">
              <Select
                label="Update Status"
                options={[{ value: '', label: 'Select status...' }, ...statusOptions]}
                value={bulkStatus}
                onChange={setBulkStatus}
              />
              <Button
                variant="default"
                size="sm"
                onClick={handleBulkStatusUpdate}
                disabled={!bulkStatus}
                fullWidth
              >
                Update Status
              </Button>
            </div>

            {/* Agent Assignment */}
            <div className="space-y-2">
              <Select
                label="Assign Agent"
                options={[{ value: '', label: 'Select agent...' }, ...agentOptions]}
                value={bulkAgent}
                onChange={setBulkAgent}
              />
              <Button
                variant="default"
                size="sm"
                onClick={handleBulkAssignment}
                disabled={!bulkAgent}
                fullWidth
              >
                Assign Agent
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Quick Actions</label>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onBulkAction('priority', 'high')}
                  iconName="ArrowUp"
                  iconPosition="left"
                  fullWidth
                >
                  Mark High Priority
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onBulkAction('export', 'csv')}
                  iconName="Download"
                  iconPosition="left"
                  fullWidth
                >
                  Export Selected
                </Button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-error">Danger Zone</label>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onBulkAction('archive', true)}
                  iconName="Archive"
                  iconPosition="left"
                  fullWidth
                  className="border-orange-200 text-orange-700 hover:bg-orange-50"
                >
                  Archive Selected
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onBulkAction('delete', true)}
                  iconName="Trash2"
                  iconPosition="left"
                  fullWidth
                >
                  Delete Selected
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;