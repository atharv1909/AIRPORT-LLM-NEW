import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const bg = bgRef.current;

    if (!section || !panel || !headline || !subheadline || !cta || !bg) return;

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      loadTl
        .fromTo(bg, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.2 })
        .fromTo(panel, { opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, '-=0.8')
        .fromTo(headline.querySelectorAll('.word'), { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, duration: 0.6 }, '-=0.5')
        .fromTo(subheadline, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
        .fromTo(cta.children, { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.5 }, '-=0.3');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([panel, headline, subheadline, cta], { opacity: 1, y: 0, scale: 1 });
            gsap.set(bg, { scale: 1, y: 0 });
          }
        }
      });

      scrollTl.fromTo(bg, { y: 0 }, { y: '-2vh', ease: 'none' }, 0);
      scrollTl.fromTo(panel, { y: 0, opacity: 1 }, { y: '-18vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(headline, { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(subheadline, { y: 0, opacity: 1 }, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.72);
      scrollTl.fromTo(cta, { y: 0, opacity: 1 }, { y: '-6vh', opacity: 0, ease: 'power2.in' }, 0.74);
      scrollTl.fromTo(bg, { scale: 1, y: '-2vh' }, { scale: 1.06, y: '-6vh', ease: 'none' }, 0.7);

    }, section);

    return () => ctx.revert();
  }, []);

  const headlineText = 'AIRPORT INTELLIGENCE PLATFORM';
  const words = headlineText.split(' ');

  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools-section');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-10"
    >
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/images/hero_runway.jpg"
          alt="Airport runway at dusk"
          className="w-full h-full object-cover"
        />
        <div className="section-overlay" />
      </div>

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-100 800 Q 400 600, 960 540 T 2020 400"
          fill="none"
          stroke="rgba(30, 64, 175, 0.4)"
          strokeWidth="2"
          strokeDasharray="8 8"
          className="animate-pulse"
        />
        <path
          d="M-100 900 Q 500 700, 960 640 T 2020 500"
          fill="none"
          stroke="rgba(34, 197, 94, 0.3)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
      </svg>

      <div className="relative z-10 w-full h-full flex items-center justify-center px-6">
        <div
          ref={panelRef}
          className="glass-panel w-full max-w-[920px] px-8 py-12 md:px-12 md:py-16 text-center"
        >
          <h1
            ref={headlineRef}
            className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-aviation-text uppercase leading-tight mb-6"
          >
            {words.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </h1>

          <p
            ref={subheadlineRef}
            className="text-base md:text-lg text-aviation-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Travel insights, operational support, and fare forecasting in one platform.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={scrollToTools} className="btn-primary">
              Explore Tools
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-secondary">
              <FileText className="w-4 h-4" />
              Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
