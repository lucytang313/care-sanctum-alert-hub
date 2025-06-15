
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedInput } from '@/components/AnimatedInput';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      navigate('/verify-email', { state: { email: formData.email } });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-700">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/ce42e031-be3b-4c21-8b06-f0ea6e60fe7e.png" 
              alt="CareStanctum Logo" 
              className="h-16 w-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Create Account</CardTitle>
          <CardDescription className="text-gray-400">
            Join CareStanctum today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <AnimatedInput
                type="text"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange('firstName')}
                required
              />
              <AnimatedInput
                type="text"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange('lastName')}
                required
              />
            </div>

            <AnimatedInput
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange('email')}
              required
            />
            
            <div className="relative">
              <AnimatedInput
                type={showPassword ? "text" : "password"}
                label="Password"
                value={formData.password}
                onChange={handleChange('password')}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-4 text-gray-400 hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <AnimatedInput
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-4 text-gray-400 hover:text-gray-300"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
                  Sign in
                </Link>
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
