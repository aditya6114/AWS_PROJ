'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { user, loading, signup } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'donor' as 'donor' | 'receiver',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      // Redirect to appropriate dashboard based on role
      if (user.role === 'donor') {
        router.push('/donor-dashboard');
      } else if (user.role === 'receiver') {
        router.push('/receiver-dashboard');
      }
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signup(formData.name, formData.email, formData.password, formData.role);
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800 mx-auto"></div>
          <p className="mt-4 text-stone-600">Loading...</p>
        </div>
      </main>
    );
  }

  if (user) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800 mx-auto"></div>
          <p className="mt-4 text-stone-600">Redirecting...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-stone-800">Grain Chain</span>
          </div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">
            Create Your Account
          </h1>
          <p className="text-stone-600">
            Join the mission to end food waste and hunger
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                placeholder="you@example.com"
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                placeholder="Create a strong password"
                minLength={6}
              />
              <p className="text-xs text-stone-500 mt-1">Must be at least 6 characters</p>
            </div>

            {/* Role selection */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">
                I want to:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'donor' })}
                  className={`px-4 py-4 rounded-lg font-medium transition-all border-2 ${
                    formData.role === 'donor'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                      : 'bg-white text-stone-700 border-stone-300 hover:border-amber-400'
                  }`}
                >
                  <div className="text-2xl mb-1">🌾</div>
                  Donate Food
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'receiver' })}
                  className={`px-4 py-4 rounded-lg font-medium transition-all border-2 ${
                    formData.role === 'receiver'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                      : 'bg-white text-stone-700 border-stone-300 hover:border-amber-400'
                  }`}
                >
                  <div className="text-2xl mb-1">🤝</div>
                  Receive Food
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-300 rounded-lg p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-6 rounded-lg font-semibold transition-all ${
                isLoading
                  ? 'bg-stone-300 cursor-not-allowed text-stone-500'
                  : 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Toggle to login */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="text-stone-600 hover:text-stone-800 text-sm font-medium"
            >
              Already have an account? <span className="text-amber-600 hover:text-amber-700">Sign in</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-stone-500 text-sm mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
