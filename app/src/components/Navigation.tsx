import { useEffect, useState } from 'react';
import { Plane, User } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B0F17]/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-aviation-blue to-blue-500 flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-semibold text-sm tracking-[0.12em] uppercase text-aviation-text">
              AIRPORT LLM
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Live Status */}
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <div className="live-indicator" />
              <span className="font-mono text-xs font-medium tracking-wide text-aviation-emerald">
                System Live
              </span>
            </div>

            {/* User Profile */}
            <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <User className="w-4 h-4 text-aviation-muted" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
