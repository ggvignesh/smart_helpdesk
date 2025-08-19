import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import StatusBadge from './StatusBadge';
import ConfidenceBadge from './ConfidenceBadge';
import PriorityBadge from './PriorityBadge';

const TicketTable = ({ 
  tickets, 
  selectedTickets, 
  onSelectTicket, 
  onSelectAll, 
  sortConfig, 
  onSort,
  onQuickAction 
}) => {
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, ticketId: null });

  const handleSort = (column) => {
    const direction = sortConfig?.column === column && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    onSort({ column, direction });
  };

  const getSortIcon = (column) => {
    if (sortConfig?.column !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleContextMenu = (e, ticketId) => {
    e?.preventDefault();
    setContextMenu({
      show: true,
      x: e?.clientX,
      y: e?.clientY,
      ticketId
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ show: false, x: 0, y: 0, ticketId: null });
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength = 50) => {
    return text?.length > maxLength ? `${text?.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={selectedTickets?.length === tickets?.length && tickets?.length > 0}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  indeterminate={selectedTickets?.length > 0 && selectedTickets?.length < tickets?.length}
                />
              </th>
              
              <th className="px-4 py-3 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('id')}
                  iconName={getSortIcon('id')}
                  iconPosition="right"
                  className="font-medium text-foreground hover:text-primary"
                >
                  Ticket ID
                </Button>
              </th>
              
              <th className="px-4 py-3 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('title')}
                  iconName={getSortIcon('title')}
                  iconPosition="right"
                  className="font-medium text-foreground hover:text-primary"
                >
                  Title
                </Button>
              </th>
              
              <th className="px-4 py-3 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('status')}
                  iconName={getSortIcon('status')}
                  iconPosition="right"
                  className="font-medium text-foreground hover:text-primary"
                >
                  Status
                </Button>
              </th>
              
              <th className="px-4 py-3 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('category')}
                  iconName={getSortIcon('category')}
                  iconPosition="right"
                  className="font-medium text-foreground hover:text-primary"
                >
                  Category
                </Button>
              </th>
              
              <th className="px-4 py-3 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('priority')}
                  iconName={getSortIcon('priority')}
                  iconPosition="right"
                  className="font-medium text-foreground hover:text-primary"
                >
                  Priority
                </Button>
              </th>
              
              <th className="px-4 py-3 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('createdAt')}
                  iconName={getSortIcon('createdAt')}
                  iconPosition="right"
                  className="font-medium text-foreground hover:text-primary"
                >
                  Created
                </Button>
              </th>
              
              <th className="px-4 py-3 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('assignedAgent')}
                  iconName={getSortIcon('assignedAgent')}
                  iconPosition="right"
                  className="font-medium text-foreground hover:text-primary"
                >
                  Agent
                </Button>
              </th>
              
              <th className="px-4 py-3 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('aiConfidence')}
                  iconName={getSortIcon('aiConfidence')}
                  iconPosition="right"
                  className="font-medium text-foreground hover:text-primary"
                >
                  AI Score
                </Button>
              </th>
              
              <th className="px-4 py-3 text-center w-32">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-border">
            {tickets?.map((ticket) => (
              <tr
                key={ticket?.id}
                className="hover:bg-muted/50 transition-smooth"
                onContextMenu={(e) => handleContextMenu(e, ticket?.id)}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedTickets?.includes(ticket?.id)}
                    onChange={(e) => onSelectTicket(ticket?.id, e?.target?.checked)}
                  />
                </td>
                
                <td className="px-4 py-3">
                  <Link
                    to={`/ticket-detail?id=${ticket?.id}`}
                    className="font-mono text-sm text-primary hover:text-primary/80 transition-smooth"
                  >
                    #{ticket?.id}
                  </Link>
                </td>
                
                <td className="px-4 py-3">
                  <div className="max-w-xs">
                    <Link
                      to={`/ticket-detail?id=${ticket?.id}`}
                      className="font-medium text-foreground hover:text-primary transition-smooth block"
                    >
                      {truncateText(ticket?.title, 40)}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {truncateText(ticket?.description, 60)}
                    </p>
                  </div>
                </td>
                
                <td className="px-4 py-3">
                  <StatusBadge status={ticket?.status} size="sm" />
                </td>
                
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary/10 text-secondary">
                    {ticket?.category}
                  </span>
                </td>
                
                <td className="px-4 py-3">
                  <PriorityBadge priority={ticket?.priority} size="sm" />
                </td>
                
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <div className="text-foreground">{formatDate(ticket?.createdAt)}</div>
                    <div className="text-muted-foreground">by {ticket?.customerName}</div>
                  </div>
                </td>
                
                <td className="px-4 py-3">
                  {ticket?.assignedAgent ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-foreground">
                          {ticket?.assignedAgent?.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-foreground">{ticket?.assignedAgent}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Unassigned</span>
                  )}
                </td>
                
                <td className="px-4 py-3">
                  <ConfidenceBadge confidence={ticket?.aiConfidence} size="sm" />
                </td>
                
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.location.href = `/ticket-detail?id=${ticket?.id}`}
                      title="View Details"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onQuickAction('assign', ticket?.id)}
                      title="Assign Agent"
                    >
                      <Icon name="UserPlus" size={16} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onQuickAction('status', ticket?.id)}
                      title="Change Status"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4 p-4">
        {tickets?.map((ticket) => (
          <div key={ticket?.id} className="border border-border rounded-lg p-4 bg-surface">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedTickets?.includes(ticket?.id)}
                  onChange={(e) => onSelectTicket(ticket?.id, e?.target?.checked)}
                />
                <Link
                  to={`/ticket-detail?id=${ticket?.id}`}
                  className="font-mono text-sm text-primary hover:text-primary/80"
                >
                  #{ticket?.id}
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <StatusBadge status={ticket?.status} size="sm" />
                <PriorityBadge priority={ticket?.priority} size="sm" />
              </div>
            </div>
            
            <Link
              to={`/ticket-detail?id=${ticket?.id}`}
              className="block mb-2"
            >
              <h3 className="font-medium text-foreground hover:text-primary transition-smooth">
                {ticket?.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {truncateText(ticket?.description, 100)}
              </p>
            </Link>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <span>{ticket?.category}</span>
              <span>{formatDate(ticket?.createdAt)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {ticket?.assignedAgent ? (
                  <>
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {ticket?.assignedAgent?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-foreground">{ticket?.assignedAgent}</span>
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">Unassigned</span>
                )}
              </div>
              
              <div className="flex items-center space-x-1">
                <ConfidenceBadge confidence={ticket?.aiConfidence} size="sm" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.location.href = `/ticket-detail?id=${ticket?.id}`}
                >
                  <Icon name="Eye" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Context Menu */}
      {contextMenu?.show && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={handleCloseContextMenu}
          />
          <div
            className="fixed z-50 bg-popover border border-border rounded-lg shadow-elevation-3 py-2 min-w-48"
            style={{ left: contextMenu?.x, top: contextMenu?.y }}
          >
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-smooth flex items-center space-x-2"
              onClick={() => {
                window.location.href = `/ticket-detail?id=${contextMenu?.ticketId}`;
                handleCloseContextMenu();
              }}
            >
              <Icon name="Eye" size={16} />
              <span>View Details</span>
            </button>
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-smooth flex items-center space-x-2"
              onClick={() => {
                onQuickAction('assign', contextMenu?.ticketId);
                handleCloseContextMenu();
              }}
            >
              <Icon name="UserPlus" size={16} />
              <span>Assign Agent</span>
            </button>
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-smooth flex items-center space-x-2"
              onClick={() => {
                onQuickAction('status', contextMenu?.ticketId);
                handleCloseContextMenu();
              }}
            >
              <Icon name="Edit" size={16} />
              <span>Change Status</span>
            </button>
            <hr className="my-2 border-border" />
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-smooth flex items-center space-x-2 text-error"
              onClick={() => {
                onQuickAction('delete', contextMenu?.ticketId);
                handleCloseContextMenu();
              }}
            >
              <Icon name="Trash2" size={16} />
              <span>Delete Ticket</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketTable;