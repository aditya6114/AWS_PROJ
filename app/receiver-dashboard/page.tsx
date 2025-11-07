'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import DonationList from '../../components/DonationList';

export default function ReceiverDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    } else if (!loading && user && user.role !== 'receiver') {
      router.push('/donor-dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800 mx-auto"></div>
          <p className="mt-4 text-stone-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'receiver') {
    return null;
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header Section */}
      <div className="bg-stone-800 text-stone-50 py-12 shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-stone-100">
              Receiver Dashboard
            </h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto font-light">
              Browse available donations and claim what you need.
            </p>

            {/* User Info and Sign Out */}
            <div className="mt-6">
              <div className="flex flex-col items-center gap-3">
                <p className="text-stone-200">
                  Welcome, {user.name} ({user.email})
                </p>
                <button
                  onClick={logout}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-stone-200">
          <div className="bg-stone-100 px-6 py-4 border-b border-stone-200">
            <h2 className="text-xl font-semibold text-stone-800">
              Available Donations
            </h2>
          </div>
          <div className="p-6">
            <DonationList />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-stone-800 text-stone-400 py-6 mt-12 border-t border-stone-700">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Food Donation Platform. Making a difference, one meal at a time.
          </p>
        </div>
      </footer>
    </main>
  );
}
