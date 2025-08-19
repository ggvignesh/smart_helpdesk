import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password?.length >= 8,
      lowercase: /[a-z]/?.test(password),
      uppercase: /[A-Z]/?.test(password),
      numbers: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };
    
    score = Object.values(checks)?.filter(Boolean)?.length;
    
    const strengthLevels = {
      0: { label: '', color: '', bgColor: '' },
      1: { label: 'Very Weak', color: 'text-error', bgColor: 'bg-error' },
      2: { label: 'Weak', color: 'text-error', bgColor: 'bg-error' },
      3: { label: 'Fair', color: 'text-warning', bgColor: 'bg-warning' },
      4: { label: 'Good', color: 'text-accent', bgColor: 'bg-accent' },
      5: { label: 'Strong', color: 'text-success', bgColor: 'bg-success' }
    };
    
    return { score, ...strengthLevels?.[score], checks };
  };
  
  const strength = calculateStrength(password);
  
  if (!password) return null;
  
  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Password Strength</span>
        <span className={`text-xs font-medium ${strength?.color}`}>
          {strength?.label}
        </span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5]?.map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-colors ${
              level <= strength?.score ? strength?.bgColor : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <div className="text-xs text-muted-foreground space-y-1">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span className={strength?.checks?.length ? 'text-success' : ''}>
            ✓ 8+ characters
          </span>
          <span className={strength?.checks?.lowercase ? 'text-success' : ''}>
            ✓ Lowercase
          </span>
          <span className={strength?.checks?.uppercase ? 'text-success' : ''}>
            ✓ Uppercase
          </span>
          <span className={strength?.checks?.numbers ? 'text-success' : ''}>
            ✓ Numbers
          </span>
          <span className={strength?.checks?.special ? 'text-success' : ''}>
            ✓ Special chars
          </span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;