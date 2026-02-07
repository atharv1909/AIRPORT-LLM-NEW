import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DollarSign, Plane, TrendingUp, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  {
    id: 'fare-finder',
    tag: 'Fare Finder',
    title: 'Flight Deal Search',
    description: 'Search and compare fares across airlines to find optimal booking options.',
    cta: 'Open Tool',
    link: 'https://air-0.vercel.app/',
    icon: DollarSign,
    bgImage: '/images/terminal_ceiling.jpg',
    iconColor: 'text-amber-400',
    bgGradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    id: 'airport-support',
    tag: 'Airport Support',
    title: 'Navigation Assistance',
    description: 'Real-time directions, gate information, and airport guidance.',
    cta: 'Open Tool',
    link: 'https://green-nananne-16.tiiny.site/?mode=suggestions',
    icon: Plane,
    bgImage: '/images/terminal_corridor.jpg',
    iconColor: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 'trip-estimator',
    tag: 'Trip Estimator',
    title: 'Fare Forecasting',
    description: 'Price predictions and booking window recommendations.',
    cta: 'Open Tool',
    link: 'https://fare-forecast-hub.vercel.app/',
    icon: TrendingUp,
    bgImage: '/images/tarmac_aerial.jpg',
    iconColor: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 to-teal-500/20',
  },
];

export default function ToolsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tools-header',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: index * 0.12,
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
      id="tools-section"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 px-6 lg:px-10 z-20 bg-[#0B0F17]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17] via-[#0d1320] to-[#0B0F17]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="tools-header text-center mb-16">
          <span className="pill-tag mb-4 inline-block">Tools</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-aviation-text uppercase mb-4">
            AI Modules
          </h2>
          <p className="text-aviation-muted text-lg max-w-2xl mx-auto">
            Integrated tools for airport operations and passenger assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div
              key={tool.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/60 hover:bg-[#0f172a]/80 transition-all duration-500 hover:border-white/20 hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
                <img
                  src={tool.bgImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/80 to-transparent" />
              </div>

              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.bgGradient} flex items-center justify-center border border-white/10`}>
                    <tool.icon className={`w-7 h-7 ${tool.iconColor}`} />
                  </div>
                  <span className="pill-tag text-[10px]">{tool.tag}</span>
                </div>

                <h3 className="font-heading text-xl font-bold text-aviation-text uppercase mb-3">
                  {tool.title}
                </h3>
                <p className="text-aviation-muted text-sm leading-relaxed mb-6 flex-grow">
                  {tool.description}
                </p>

                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-fit text-sm py-3 px-5"
                >
                  {tool.cta}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${tool.bgGradient} rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
            </div>
          ))}
        </div>

        {/* Chatbot hint */}
        <div className="mt-12 text-center">
          <p className="text-aviation-muted text-sm">
            Use the chat button in the corner for AI assistance
          </p>
        </div>
      </div>
    </section>
  );
}
