import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import RoleSelector from './RoleSelector';

const RegistrationForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value?.trim()) return 'Full name is required';
        if (value?.trim()?.length < 2) return 'Name must be at least 2 characters';
        return '';
      
      case 'email':
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex?.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'password':
        if (!value) return 'Password is required';
        if (value?.length < 8) return 'Password must be at least 8 characters';
        return '';
      
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData?.password) return 'Passwords do not match';
        return '';
      
      case 'role':
        if (!value) return 'Please select your role';
        return '';
      
      case 'agreeToTerms':
        if (!value) return 'You must agree to the terms of service';
        return '';
      
      default:
        return '';
    }
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched?.[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
    
    // Re-validate confirm password if password changes
    if (name === 'password' && touched?.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData?.confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData?.[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData)?.forEach(key => {
      if (key !== 'subscribeNewsletter') {
        const error = validateField(key, formData?.[key]);
        if (error) newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(formData)?.reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    if (Object.keys(newErrors)?.length === 0) {
      onSubmit(formData);
    }
  };

  const isFormValid = () => {
    return Object.keys(formData)?.every(key => {
      if (key === 'subscribeNewsletter') return true;
      return !validateField(key, formData?.[key]);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={(e) => handleChange('fullName', e?.target?.value)}
        onBlur={() => handleBlur('fullName')}
        error={errors?.fullName}
        required
        className="mb-4"
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email address"
        value={formData?.email}
        onChange={(e) => handleChange('email', e?.target?.value)}
        onBlur={() => handleBlur('email')}
        error={errors?.email}
        required
        className="mb-4"
      />
      <div className="space-y-1">
        <Input
          label="Password"
          type="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={(e) => handleChange('password', e?.target?.value)}
          onBlur={() => handleBlur('password')}
          error={errors?.password}
          required
          className="mb-2"
        />
        <PasswordStrengthIndicator password={formData?.password} />
      </div>
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={formData?.confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e?.target?.value)}
        onBlur={() => handleBlur('confirmPassword')}
        error={errors?.confirmPassword}
        required
        className="mb-4"
      />
      <RoleSelector
        value={formData?.role}
        onChange={(value) => handleChange('role', value)}
        error={errors?.role}
        disabled={loading}
      />
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="Subscribe to product updates and newsletters"
          description="Get the latest features and tips delivered to your inbox"
          checked={formData?.subscribeNewsletter}
          onChange={(e) => handleChange('subscribeNewsletter', e?.target?.checked)}
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={loading}
        disabled={!isFormValid() || loading}
        className="mt-6"
      >
        Create Account
      </Button>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-medium text-primary hover:text-primary/80 transition-smooth"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;