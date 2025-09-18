// app/page.tsx
"use client";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  // In your login page, make sure the redirect URL is correct
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/main`, // Use window.location.origin instead
      },
    });
    if (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 opacity-20 animate-spin animation-duration-20000"></div>
      </div>
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div className="relative">
                <Image
                  src="/jack_career.png"
                  alt="Jack Careers Logo"
                  width={50}
                  height={50}
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg transform transition-transform duration-300 hover:rotate-12"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl animate-pulse"></div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Jack Careers
              </div>
            </div>
            <p className="text-gray-600 text-sm sm:text-base font-medium">
              Welcome back! Sign in to continue your journey
            </p>
          </div>
          <div className="text-center mb-8 animate-slide-up animation-delay-300">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Sign In to Your Account
            </h1>
            <p className="text-gray-500 text-sm">
              Access your personalized career dashboard
            </p>
          </div>
          <div className="animate-slide-up animation-delay-600">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="group relative w-full flex items-center justify-center px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-700 font-semibold text-base sm:text-lg transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-100 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Continue with Google
                  </span>
                </div>
              )}

              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center animate-fade-in animation-delay-900">
            <p className="text-xs sm:text-sm text-gray-500">
              By continuing, you agree to our{" "}
              <span className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>

        {/* Floating elements for extra flair */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60 animate-bounce animation-delay-1000"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-bounce animation-delay-1500"></div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animation-delay-900 {
          animation-delay: 0.9s;
          opacity: 0;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-1500 {
          animation-delay: 1.5s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-duration-20000 {
          animation-duration: 20s;
        }

        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}
