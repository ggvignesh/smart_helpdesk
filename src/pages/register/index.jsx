import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import RegistrationSuccess from './components/RegistrationSuccess';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [error, setError] = useState('');

  // Mock user data for demonstration
  const mockUsers = [
    { email: "admin@smarthelpdesk.com", role: "admin" },
    { email: "agent@smarthelpdesk.com", role: "agent" },
    { email: "user@smarthelpdesk.com", role: "user" }
  ];

  const handleRegistration = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if email already exists
      const existingUser = mockUsers?.find(user => user?.email === formData?.email);
      if (existingUser) {
        throw new Error('An account with this email address already exists. Please use a different email or sign in to your existing account.');
      }

      // Simulate successful registration
      const newUser = {
        id: Date.now(),
        fullName: formData?.fullName,
        email: formData?.email,
        role: formData?.role,
        createdAt: new Date()?.toISOString(),
        verified: false
      };

      setRegisteredUser(newUser);
      setRegistrationComplete(true);

      // Store registration data in localStorage for demo purposes
      const existingRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
      existingRegistrations?.push(newUser);
      localStorage.setItem('registrations', JSON.stringify(existingRegistrations));

    } catch (err) {
      setError(err?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-elevation-3 p-8 border border-border">
          {!registrationComplete ? (
            <>
              <RegistrationHeader />
              
              {error && (
                <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-error rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-error mb-1">
                        Registration Error
                      </p>
                      <p className="text-sm text-error/80">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <RegistrationForm 
                onSubmit={handleRegistration}
                loading={loading}
              />
            </>
          ) : (
            <RegistrationSuccess 
              userEmail={registeredUser?.email}
              userName={registeredUser?.fullName}
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <a 
              href="#" 
              className="hover:text-foreground transition-smooth"
            >
              Terms of Service
            </a>
            <span>•</span>
            <a 
              href="#" 
              className="hover:text-foreground transition-smooth"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a 
              href="#" 
              className="hover:text-foreground transition-smooth"
            >
              Help Center
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            © {new Date()?.getFullYear()} Smart Helpdesk. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;