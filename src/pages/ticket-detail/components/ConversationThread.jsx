import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConversationThread = ({ ticket, messages, onSendMessage, user }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleSendMessage = () => {
    if (!newMessage?.trim()) return;
    
    onSendMessage({
      content: newMessage,
      isInternal,
      author: user
    });
    
    setNewMessage('');
    setIsInternal(false);
  };

  const handleEditMessage = (messageId) => {
    const message = messages?.find(m => m?.id === messageId);
    setEditingMessage(messageId);
    setEditContent(message?.content);
  };

  const handleSaveEdit = (messageId) => {
    // Handle edit save logic here
    setEditingMessage(null);
    setEditContent('');
  };

  const getMessageTypeIcon = (type) => {
    switch (type) {
      case 'ai-generated': return 'Bot';
      case 'agent': return 'User';
      case 'customer': return 'MessageCircle';
      case 'system': return 'Settings';
      default: return 'MessageCircle';
    }
  };

  const getMessageTypeColor = (type) => {
    switch (type) {
      case 'ai-generated': return 'border-l-primary bg-primary/5';
      case 'agent': return 'border-l-accent bg-accent/5';
      case 'customer': return 'border-l-secondary bg-secondary/5';
      case 'system': return 'border-l-muted bg-muted/5';
      default: return 'border-l-muted bg-muted/5';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date?.toLocaleDateString() + ' ' + date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Original Ticket */}
        <div className="border-l-4 border-l-warning bg-warning/5 p-4 rounded-r-lg">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="Ticket" size={20} className="text-warning" />
              <span className="font-medium text-foreground">Original Request</span>
              <span className="text-sm text-muted-foreground">
                {formatTimestamp(ticket?.createdAt)}
              </span>
            </div>
          </div>
          <div className="text-foreground whitespace-pre-wrap">
            {ticket?.description}
          </div>
          {ticket?.attachments && ticket?.attachments?.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-2">Attachments:</p>
              <div className="space-y-1">
                {ticket?.attachments?.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-smooth"
                  >
                    <Icon name="Paperclip" size={16} />
                    {attachment?.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Conversation Messages */}
        {messages?.map((message) => (
          <div
            key={message?.id}
            className={`border-l-4 p-4 rounded-r-lg ${getMessageTypeColor(message?.type)} ${
              message?.isInternal ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon name={getMessageTypeIcon(message?.type)} size={20} />
                <span className="font-medium text-foreground">
                  {message?.author?.name}
                  {message?.isInternal && (
                    <span className="ml-2 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                      Internal Note
                    </span>
                  )}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatTimestamp(message?.timestamp)}
                </span>
                {message?.type === 'ai-generated' && message?.confidence && (
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                    {Math.round(message?.confidence * 100)}% confidence
                  </span>
                )}
              </div>
              
              {message?.type === 'ai-generated' && user?.role !== 'customer' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditMessage(message?.id)}
                  iconName="Edit"
                  iconSize={16}
                >
                  Edit
                </Button>
              )}
            </div>

            {editingMessage === message?.id ? (
              <div className="space-y-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e?.target?.value)}
                  className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={4}
                />
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleSaveEdit(message?.id)}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingMessage(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-foreground whitespace-pre-wrap">
                {message?.content}
              </div>
            )}

            {message?.kbArticles && message?.kbArticles?.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-2">Referenced Articles:</p>
                <div className="space-y-1">
                  {message?.kbArticles?.map((article) => (
                    <a
                      key={article?.id}
                      href={`/knowledge-base/${article?.id}`}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-smooth"
                    >
                      <Icon name="BookOpen" size={16} />
                      {article?.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {message?.editHistory && message?.editHistory?.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <details className="text-sm">
                  <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                    Edit History ({message?.editHistory?.length})
                  </summary>
                  <div className="mt-2 space-y-2">
                    {message?.editHistory?.map((edit, index) => (
                      <div key={index} className="pl-4 border-l-2 border-muted">
                        <div className="text-xs text-muted-foreground mb-1">
                          Edited by {edit?.author} on {formatTimestamp(edit?.timestamp)}
                        </div>
                        <div className="text-muted-foreground">{edit?.content}</div>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Message Input */}
      {user?.role !== 'customer' && (
        <div className="border-t border-border p-6 bg-surface">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isInternal}
                  onChange={(e) => setIsInternal(e?.target?.checked)}
                  className="rounded border-border"
                />
                Internal Note (visible to agents only)
              </label>
            </div>
            
            <div className="flex gap-3">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e?.target?.value)}
                placeholder={isInternal ? "Add internal note..." : "Type your response..."}
                className="flex-1 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={3}
                onKeyDown={(e) => {
                  if (e?.key === 'Enter' && (e?.ctrlKey || e?.metaKey)) {
                    handleSendMessage();
                  }
                }}
              />
              <div className="flex flex-col gap-2">
                <Button
                  variant="default"
                  onClick={handleSendMessage}
                  disabled={!newMessage?.trim()}
                  iconName="Send"
                  iconPosition="left"
                  iconSize={16}
                >
                  Send
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Paperclip"
                  iconSize={16}
                >
                  Attach
                </Button>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Press Ctrl+Enter to send • Use @ to mention team members
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationThread;