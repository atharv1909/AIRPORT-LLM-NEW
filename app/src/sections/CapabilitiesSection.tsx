import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MapPin, 
  Clock, 
  CloudRain, 
  FileCheck,
  BookOpen,
  AlertTriangle,
  Route,
  Shield,
  Utensils,
  Users,
  ShoppingBag,
  MessageSquare,
  BarChart3,
  Building2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    id: 'passenger-assistant',
    title: 'Passenger Assistant',
    description: 'Context-aware guidance for travelers throughout their journey.',
    icon: MapPin,
    features: [
      { icon: Clock, text: 'Gate navigation timing' },
      { icon: Users, text: 'Security queue estimates' },
      { icon: CloudRain, text: 'Weather delay alerts' },
      { icon: FileCheck, text: 'Immigration guidance' },
    ],
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    id: 'operations-copilot',
    title: 'Operations Co-Pilot',
    description: 'Real-time support for airport staff during daily operations.',
    icon: BookOpen,
    features: [
      { icon: BookOpen, text: 'Procedure retrieval' },
      { icon: AlertTriangle, text: 'Incident response' },
      { icon: Route, text: 'Diversion handling' },
      { icon: Shield, text: 'Risk assessment' },
    ],
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
  },
  {
    id: 'retail-intelligence',
    title: 'Retail Intelligence',
    description: 'Personalized recommendations based on flight and location.',
    icon: Utensils,
    features: [
      { icon: Utensils, text: 'Dining suggestions' },
      { icon: Users, text: 'Lounge availability' },
      { icon: ShoppingBag, text: 'Retail targeting' },
    ],
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'feedback-intelligence',
    title: 'Feedback Intelligence',
    description: 'Transform passenger feedback into operational improvements.',
    icon: MessageSquare,
    features: [
      { icon: MessageSquare, text: 'Issue clustering' },
      { icon: BarChart3, text: 'Analytics reports' },
      { icon: Building2, text: 'Infrastructure insights' },
    ],
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.capabilities-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      );

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 70, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 px-6 lg:px-10 z-30 bg-[#0B0F17]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17] via-[#0a0e15] to-[#0B0F17]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="capabilities-header mb-16">
          <span className="pill-tag mb-4 inline-block">Capabilities</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-aviation-text uppercase mb-4 max-w-4xl">
            For Passengers. For Operations.
          </h2>
          <p className="text-aviation-muted text-lg max-w-2xl">
            AI agents that process complex airport data into actionable information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {capabilities.map((cap, index) => (
            <div
              key={cap.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="glass-card p-8 relative overflow-hidden group"
            >
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${cap.color} rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />

              <div className="flex items-start gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cap.color} flex items-center justify-center border border-white/10 flex-shrink-0`}>
                  <cap.icon className={`w-6 h-6 ${cap.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-aviation-text mb-1">
                    {cap.title}
                  </h3>
                  <p className="text-aviation-muted text-sm">
                    {cap.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {cap.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-2.5">
                    <feature.icon className="w-4 h-4 text-aviation-muted" />
                    <span className="text-sm text-aviation-text/80">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
