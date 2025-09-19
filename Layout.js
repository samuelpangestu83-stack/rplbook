import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Library } from "lucide-react";

export default function Layout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* CSS Variables for the new theme */}
      <style>{`
        :root {
          --primary-green: #2ECC71;
          --primary-green-dark: #27AE60;
          --bg-light-gray: #F5F6FA;
          --border-gray: #E0E0E0;
          --text-primary: #2c3e50;
          --text-secondary: #7f8c8d;
          --font-sans: 'Poppins', sans-serif;
        }
      `}</style>
      
      <div className="min-h-screen bg-white text-[var(--text-primary)] font-sans">
        {/* Loading Progress Bar */}
        <div
          className={`fixed top-0 left-0 right-0 h-1 bg-[var(--primary-green)] z-50 transition-transform duration-500 ease-out ${
            loading ? 'scale-x-100' : 'scale-x-0'
          }`}
          style={{ transformOrigin: 'left', transition: 'transform 1s cubic-bezier(0.23, 1, 0.32, 1)' }}
        />

        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-[var(--border-gray)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link to={createPageUrl("Books")} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-[var(--primary-green)] rounded-lg flex items-center justify-center shadow-md">
                  <Library className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">MyLibrary</h1>
                  <p className="text-xs text-[var(--text-secondary)]">Koleksi Pribadi</p>
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-[var(--bg-light-gray)] border-t border-[var(--border-gray)] mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-[var(--text-secondary)]">
              <p className="text-sm">© 2025 MyLibrary. Dibuat dengan presisi dan elegan.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}