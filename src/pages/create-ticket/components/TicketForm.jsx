import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TicketForm = ({ onSubmit, loading, onDescriptionChange, suggestedCategory, suggestedArticles }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    attachmentUrl: '',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});
  const [autoSaveStatus, setAutoSaveStatus] = useState('');

  const categoryOptions = [
    { value: '', label: 'Select a category' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'shipping', label: 'Shipping & Delivery' },
    { value: 'other', label: 'General Inquiry' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  // Auto-save functionality
  useEffect(() => {
    if (formData?.title || formData?.description) {
      const timer = setTimeout(() => {
        localStorage.setItem('ticket-draft', JSON.stringify(formData));
        setAutoSaveStatus('Draft saved');
        setTimeout(() => setAutoSaveStatus(''), 2000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [formData]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('ticket-draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData(draft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Update category based on AI suggestion
  useEffect(() => {
    if (suggestedCategory && !formData?.category) {
      setFormData(prev => ({ ...prev, category: suggestedCategory }));
    }
  }, [suggestedCategory, formData?.category]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Trigger description analysis for AI suggestions
    if (field === 'description') {
      onDescriptionChange(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData?.title?.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData?.description?.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData?.category) {
      newErrors.category = 'Please select a category';
    }

    if (formData?.attachmentUrl && !isValidUrl(formData?.attachmentUrl)) {
      newErrors.attachmentUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      // Clear draft after successful submission
      localStorage.removeItem('ticket-draft');
    }
  };

  const clearDraft = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      attachmentUrl: '',
      priority: 'medium'
    });
    localStorage.removeItem('ticket-draft');
    setAutoSaveStatus('Draft cleared');
    setTimeout(() => setAutoSaveStatus(''), 2000);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Create Support Ticket</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Provide detailed information to help us resolve your issue quickly
          </p>
        </div>
        {autoSaveStatus && (
          <div className="flex items-center space-x-2 text-sm text-success">
            <Icon name="Check" size={16} />
            <span>{autoSaveStatus}</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <Input
          label="Ticket Title"
          type="text"
          placeholder="Brief summary of your issue"
          value={formData?.title}
          onChange={(e) => handleInputChange('title', e?.target?.value)}
          error={errors?.title}
          required
          description="Provide a clear, concise title that describes your issue"
        />

        {/* Description Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Description <span className="text-error">*</span>
          </label>
          <textarea
            placeholder="Describe your issue in detail. Include steps to reproduce, error messages, and any relevant information..."
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            className={`w-full px-3 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth ${
              errors?.description 
                ? 'border-error bg-error/5' :'border-border bg-input hover:border-border/80'
            }`}
            rows={6}
            required
          />
          {errors?.description && (
            <p className="text-sm text-error">{errors?.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Minimum 20 characters. Be specific to help us provide better assistance.
          </p>
        </div>

        {/* Category and Priority Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Category"
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            error={errors?.category}
            required
            description={suggestedCategory ? `AI suggests: ${categoryOptions?.find(opt => opt?.value === suggestedCategory)?.label}` : ''}
          />

          <Select
            label="Priority Level"
            options={priorityOptions}
            value={formData?.priority}
            onChange={(value) => handleInputChange('priority', value)}
            description="How urgent is this issue for your business?"
          />
        </div>

        {/* Attachment URL Field */}
        <Input
          label="Attachment URL (Optional)"
          type="url"
          placeholder="https://example.com/screenshot.png"
          value={formData?.attachmentUrl}
          onChange={(e) => handleInputChange('attachmentUrl', e?.target?.value)}
          error={errors?.attachmentUrl}
          description="Provide a URL to screenshots, documents, or other relevant files"
        />

        {/* AI Suggestions */}
        {suggestedArticles && suggestedArticles?.length > 0 && (
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Lightbulb" size={16} className="text-accent" />
              <h3 className="text-sm font-medium text-foreground">
                Suggested Knowledge Base Articles
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              These articles might help resolve your issue without creating a ticket:
            </p>
            <div className="space-y-2">
              {suggestedArticles?.slice(0, 3)?.map((article) => (
                <div key={article?.id} className="flex items-start space-x-2">
                  <Icon name="FileText" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <button
                      type="button"
                      className="text-sm text-accent hover:text-accent/80 font-medium text-left"
                      onClick={() => window.open(`/knowledge-base/${article?.id}`, '_blank')}
                    >
                      {article?.title}
                    </button>
                    <p className="text-xs text-muted-foreground mt-1">
                      {article?.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            type="submit"
            variant="default"
            loading={loading}
            iconName="Send"
            iconPosition="left"
            className="sm:order-2"
          >
            {loading ? 'Creating Ticket...' : 'Create Ticket'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={clearDraft}
            iconName="Trash2"
            iconPosition="left"
            className="sm:order-1"
          >
            Clear Draft
          </Button>
          
          <div className="flex-1 sm:order-3" />
          
          <div className="text-xs text-muted-foreground sm:order-4 flex items-center">
            <Icon name="Shield" size={12} className="mr-1" />
            Your information is secure and encrypted
          </div>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;