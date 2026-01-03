import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// Simulated Zustand store (in real app, this would be in a separate file)
const useAuthStore = {
  register: (data) => {
    console.log('Registering user:', data);
    // Here you would call your API
  },
  loginWithGoogle: () => {
    console.log('Login with Google');
  },
  loginWithLinkedIn: () => {
    console.log('Login with LinkedIn');
  }
};

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const roles = [
    { value: 'student', label: 'Student', icon: '🎓' },
    { value: 'alumni', label: 'Alumni', icon: '🎖️' },
    { value: 'admin', label: 'Admin', icon: '⚙️' }
  ];

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    useAuthStore.register(data);
    alert('Registration successful! Check console for data.');
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleGoogleLogin = () => {
    useAuthStore.loginWithGoogle();
    alert('Google login clicked! Implement OAuth flow.');
  };

  const handleLinkedInLogin = () => {
    useAuthStore.loginWithLinkedIn();
    alert('LinkedIn login clicked! Implement OAuth flow.');
  };

  return (
    <div className="min-h-[100dvh] bg-main-color flex items-center justify-center p-1 relative overflow-hidden">
      {/* Animated Background Shapes with Clip Paths */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-white-color opacity-10 animate-pulse"
          style={{
            clipPath: 'circle(40% at 50% 50%)',
            animation: 'float 10s ease-in-out infinite'
          }}
        />
        
        <div 
          className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-green-color opacity-20"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)',
            animation: 'float-reverse 10s ease-in-out infinite'
          }}
        />
        
        <div 
          className="absolute top-1/4 left-1/8 w-64 h-64 bg-blue-300 opacity-15"
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            animation: 'spin-slow 30s linear infinite'
          }}
        />

        <div 
          className="absolute bottom-1/4 right-1/8 w-48 h-48 bg-green-300 opacity-10"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            animation: 'float 15s ease-in-out infinite'
          }}
        />
      </div>

      <div className="relative w-full max-w-4xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Side - Decorative */}
          <div className="hidden lg:flex bg-secondary-color p-12 flex-col justify-center relative overflow-hidden">
            <div 
              className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10"
              style={{
                clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)'
              }}
            />
            <div 
              className="absolute bottom-0 left-0 w-48 h-48 bg-pink-300 opacity-20"
              style={{
                clipPath: 'circle(50% at 0% 100%)'
              }}
            />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold uppercase text-white-color mb-6">
                Join Our Community
              </h2>
              <p className="text-white-color text-sm mb-8">
                Connect with students, alumni, and faculty. Build your network and grow together.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-white-color">
                  <div 
                    className="w-8 h-8 bg-white-color bg-opacity-20 rounded-lg flex items-center justify-center text-xl"
                    style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
                  >
                    🚀
                  </div>
                  <span>Quick & Easy Registration</span>
                </div>
                <div className="flex items-center gap-4 text-white-color">
                  <div 
                    className="w-8 h-8 bg-white-color bg-opacity-20 rounded-lg flex items-center justify-center text-xl"
                    style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
                  >
                    🔒
                  </div>
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-4 text-white-color">
                  <div 
                    className="w-8 h-8 bg-white-color bg-opacity-20 rounded-lg flex items-center justify-center text-xl"
                    style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
                  >
                    🌟
                  </div>
                  <span>Exclusive Features</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="py-4 px-8 lg:px-12 lg:py-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-dark mb-1 ">Create Account</h1>
              <p className="text-gray-medium">Fill in your details to get started</p>
            </div>

            <div className="space-y-4">

              {/* Email */}
              <div>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border-2 border-gray-light rounded-xl focus:border-secondary-color focus:outline-none transition-colors"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-gray-medium mb-2">
                  Select Role
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {roles.map((role) => (
                    <label
                      key={role.value}
                      className="relative cursor-pointer"
                    >
                      <input
                        {...register('role', { required: 'Please select a role' })}
                        type="radio"
                        value={role.value}
                        className="peer sr-only"
                      />
                      <div className="border-2 border-gray-light rounded-xl p-2 text-center peer-checked:border-secondary-color peer-checked:bg-transparent transition-all hover:border-main-color">
                        <div className="text-2xl mb-1">{role.icon}</div>
                        <div className="text-sm font-semibold text-gray-medium">{role.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <input
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters' },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: 'Password must contain uppercase, lowercase, and number'
                      }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    className="w-full px-4 py-2 border-2 border-gray-light rounded-xl focus:border-secondary-color focus:outline-none transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-light hover:text-gray-medium focus:border-secondary-color focus:outline-none transition-colors"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-secondary-color text-white-color py-2 rounded-xl font-semibold text-lg focus:border-secondary-color transform hover:scale-105 transition-all shadow-lg cursor-pointer"
              >
                Create Account
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-light"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white-color text-gray-medium">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 px-4 py-2 border-2 border-gray-light rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all group cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-semibold text-gray-medium">Google</span>
              </button>

              <button
                onClick={handleLinkedInLogin}
                className="flex items-center justify-center gap-3 px-4 py-2 border-2 border-gray-light rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all group cursor-pointer"
              >
                <svg className="w-4 h-4" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-sm font-semibold text-gray-medium">LinkedIn</span>
              </button>
            </div>

            {/* Login Link */}
            <p className="mt-2 text-center text-sm text-gray-medium">
              Already have an account?{' '}
              <button onClick={handleNavigateToLogin} className="text-indigo-light font-semibold hover:text-indigo-dark cursor-pointer">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;