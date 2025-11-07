'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

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

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-stone-800">Grain Chain</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-stone-600 hover:text-stone-900 transition-colors">About Us</a>
              <a href="#how-it-works" className="text-stone-600 hover:text-stone-900 transition-colors">How It Works</a>
              <a href="#impact" className="text-stone-600 hover:text-stone-900 transition-colors">Our Impact</a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogin}
                className="px-6 py-2.5 text-stone-700 hover:text-stone-900 font-medium transition-colors"
              >
                Login
              </button>
              <button
                onClick={handleSignup}
                className="px-6 py-2.5 bg-stone-800 hover:bg-stone-900 text-white font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                🌾 Blockchain-Powered Food Donation
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-stone-900 leading-tight">
                Every Grain Shared Creates Endless Impact
              </h1>
              
              <p className="text-xl text-stone-600 leading-relaxed">
                Connecting surplus food with communities in need through transparent, 
                traceable blockchain technology. Building a hunger-free future, one donation at a time.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleSignup}
                  className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group"
                >
                  Join the Mission
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="px-8 py-4 bg-white hover:bg-stone-50 text-stone-800 font-semibold rounded-lg transition-all shadow-md hover:shadow-lg border border-stone-200">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold text-stone-900">2.5M+</div>
                  <div className="text-sm text-stone-600">Meals Donated</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-stone-900">1,200+</div>
                  <div className="text-sm text-stone-600">Active Donors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-stone-900">500+</div>
                  <div className="text-sm text-stone-600">Communities</div>
                </div>
              </div>
            </div>

            {/* Right Content - Donation Card */}
            <div className="relative">
              {/* Background Image Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-stone-300 rounded-3xl opacity-20"></div>
              
              {/* Floating Card */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                {/* Stats Card */}
                <div className="bg-gradient-to-br from-stone-50 to-amber-50 rounded-xl p-6 space-y-3">
                  <div className="text-4xl font-bold text-stone-900">$245,800.50</div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600">512 Donors</span>
                    <span className="text-amber-700 font-semibold">56%</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full" style={{ width: '56%' }}></div>
                  </div>
                </div>

                {/* Program Info */}
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    🌾 Food Security Initiative
                  </div>
                  
                  <h3 className="text-2xl font-bold text-stone-900">
                    Donation and Distribution Program
                  </h3>
                  
                  <p className="text-stone-600">
                    Transparent blockchain-verified food donation system connecting surplus food 
                    with communities in need. Every donation is tracked and verified.
                  </p>

                  <button
                    onClick={handleSignup}
                    className="w-full py-4 bg-stone-800 hover:bg-stone-900 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                  >
                    Start Donating
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-4 pt-4 border-t border-stone-200">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-stone-600">Blockchain Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-stone-600">100% Transparent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">How Grain Chain Works</h2>
            <p className="text-xl text-stone-600">Simple, transparent, and impactful food donation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-2xl p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-amber-600 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-stone-900">Create Donation</h3>
              <p className="text-stone-600">
                Donors register surplus food items with details like type, quantity, and expiry date on the blockchain.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-2xl p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-amber-600 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-stone-900">Blockchain Verification</h3>
              <p className="text-stone-600">
                Every donation is recorded on the blockchain, ensuring complete transparency and traceability.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-2xl p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-amber-600 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-stone-900">Reach Communities</h3>
              <p className="text-stone-600">
                Verified receivers claim donations, and the entire journey is tracked from donor to recipient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-6 bg-gradient-to-br from-stone-900 to-stone-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Our Impact on Communities</h2>
          <p className="text-xl text-stone-300 mb-12 max-w-3xl mx-auto">
            Through blockchain technology, we're creating a transparent and efficient food distribution 
            network that reduces waste and fights hunger.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-5xl font-bold text-amber-400">2.5M+</div>
              <div className="text-stone-300">Meals Distributed</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-amber-400">98%</div>
              <div className="text-stone-300">Transparency Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-amber-400">1,200+</div>
              <div className="text-stone-300">Active Donors</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-amber-400">500+</div>
              <div className="text-stone-300">Communities Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-stone-900">Ready to Make a Difference?</h2>
          <p className="text-xl text-stone-600">
            Join thousands of donors and receivers creating a transparent, hunger-free future through blockchain technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleSignup}
              className="px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl text-lg"
            >
              Get Started Today
            </button>
            <button
              onClick={handleLogin}
              className="px-10 py-4 bg-white hover:bg-stone-50 text-stone-800 font-semibold rounded-lg transition-all shadow-md hover:shadow-lg border border-stone-200 text-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">Grain Chain</span>
          </div>
          <p className="text-stone-400 mb-6">
            Building a transparent, blockchain-powered food donation network
          </p>
          <div className="text-sm text-stone-500">
            © 2024 Grain Chain. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}