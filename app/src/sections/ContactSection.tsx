import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel,
        { y: 70, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        panel.querySelectorAll('.word'),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineText = 'GET IN TOUCH';
  const words = headlineText.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 px-6 lg:px-10 z-60"
    >
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/closing_aerial.jpg"
          alt="Aerial airport view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/80 to-[#0B0F17]/60" />
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div
          ref={panelRef}
          className="glass-panel w-full max-w-[760px] px-8 py-12 md:px-12 md:py-16 text-center"
        >
          <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-aviation-text uppercase leading-tight mb-6">
            {words.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </h2>

          <p className="text-aviation-muted text-base md:text-lg max-w-xl mx-auto mb-10">
            Contact us for pilots, integrations, and enterprise inquiries.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="mailto:hello@airportllm.ai"
              className="btn-primary"
            >
              Contact
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <a
            href="mailto:hello@airportllm.ai"
            className="inline-flex items-center gap-2 text-aviation-muted hover:text-aviation-text transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="font-mono text-sm">hello@airportllm.ai</span>
          </a>

          <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-center gap-6">
            <a href="#" className="text-xs text-aviation-muted hover:text-aviation-text transition-colors">
              Privacy
            </a>
            <span className="text-aviation-muted/30">|</span>
            <a href="#" className="text-xs text-aviation-muted hover:text-aviation-text transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-xs text-aviation-muted/50">
          © 2026 AIRPORT LLM
        </p>
      </div>
    </section>
  );
}
