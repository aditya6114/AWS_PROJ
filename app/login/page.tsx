'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

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

  return <LoginForm />;
}
