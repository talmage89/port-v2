"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const tiltEffect = {
  // Core tilt parameters
  intensity: {
    rotation: 10, // Maximum rotation in degrees (higher = more dramatic tilt)
    scale: 1.02, // Scale factor on hover (1 = no scale, 1.1 = 10% larger)
    perspective: 200, // Perspective value in px (smaller = more dramatic)
  },

  // Shadow effect
  shadow: {
    initial: "0 2px 4px rgba(0,0,0,0.1)", // Default shadow
    depthFactor: 1.1, // How much shadow grows with tilt (higher = more dramatic)
    maxBlur: 10, // Maximum shadow blur in px
    maxDistance: 2, // Maximum shadow distance in px
  },

  // Glare/lighting effect
  glare: {
    opacity: 0.25, // Maximum opacity of the glare effect (0-1)
    size: 40, // Size of the glare (lower = larger highlight)
    borderGlow: 0.9, // Maximum border highlight effect (0-1)
  },

  // Color effect
  colorShift: {
    enable: true, // Whether to enable color shifting
    hueRange: 180, // Maximum hue rotation in degrees
  },

  // Animation timing
  timing: {
    hover: 300, // Transition time during hover in ms
    return: 500, // Transition time when returning to normal in ms
    returnCurve: "cubic-bezier(0.34, 1.56, 0.64, 1)", // Bounce effect curve
  },
};

type Skill = {
  name: string;
  icon: string; // This would be an SVG string or a path to an icon
  level: number; // 1-5
  category: "frontend" | "backend" | "design" | "tools";
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | "frontend" | "backend" | "design" | "tools">("all");

  // Container ref for event delegation
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample skills data - you would replace these with your actual skills
  const skills: Skill[] = [
    { name: "React", icon: "⚛️", level: 5, category: "frontend" },
    { name: "TypeScript", icon: "🔷", level: 4, category: "frontend" },
    { name: "Next.js", icon: "▲", level: 4, category: "frontend" },
    { name: "CSS/SCSS", icon: "🎨", level: 5, category: "frontend" },
    { name: "Tailwind CSS", icon: "🌊", level: 5, category: "frontend" },
    { name: "JavaScript", icon: "📜", level: 5, category: "frontend" },
    { name: "Node.js", icon: "🟢", level: 4, category: "backend" },
    { name: "Express", icon: "⚡", level: 4, category: "backend" },
    { name: "MongoDB", icon: "🍃", level: 3, category: "backend" },
    { name: "PostgreSQL", icon: "🐘", level: 4, category: "backend" },
    { name: "GraphQL", icon: "◼️", level: 3, category: "backend" },
    { name: "Figma", icon: "🎭", level: 4, category: "design" },
    { name: "UI/UX Design", icon: "🖌️", level: 4, category: "design" },
    { name: "Git & GitHub", icon: "🔄", level: 5, category: "tools" },
    { name: "Docker", icon: "🐳", level: 3, category: "tools" },
    { name: "AWS", icon: "☁️", level: 3, category: "tools" },
  ];

  // Filter skills based on active category
  const filteredSkills =
    activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let activeCard: HTMLElement | null = null;

    // Reset function to ensure card returns to original state
    const resetCard = (card: HTMLElement) => {
      card.style.transition = `all ${tiltEffect.timing.return}ms ${tiltEffect.timing.returnCurve}`;
      card.style.transform = `perspective(${tiltEffect.intensity.perspective}px) rotateX(0) rotateY(0) scale(1)`;
      card.style.boxShadow = tiltEffect.shadow.initial;
      card.style.zIndex = "1";

      const overlay = card.querySelector("[data-card-surface]") as HTMLElement;
      if (overlay) {
        overlay.style.background = "";
        overlay.style.border = "";
      }

      // Reset all parallax elements
      const parallaxElements = card.querySelectorAll(".card-icon, .card-title-text, .skill-bar");
      parallaxElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.transform = "";
        }
      });

      // Reset color shift
      if (tiltEffect.colorShift.enable) {
        const fillBar = card.querySelector(".skill-bar-fill") as HTMLElement;
        if (fillBar) {
          fillBar.style.filter = "";
        }
      }
    };

    // Reset all cards to original state
    const resetAllCards = () => {
      const allCards = container.querySelectorAll("[data-skill-card]");
      allCards.forEach((card) => {
        if (card instanceof HTMLElement) {
          resetCard(card);
        }
      });
      activeCard = null;
    };

    // Rest of existing mouse move handler...
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const target = e.target as HTMLElement;
        const card = target.closest("[data-skill-card]");

        if (!card || !(card instanceof HTMLElement)) return;

        if (activeCard !== card) {
          activeCard = card;
        }

        const rect = card.getBoundingClientRect();

        // Calculate mouse position relative to the card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation based on intensity setting
        const rotateX = ((y - rect.height / 2) / rect.height) * -tiltEffect.intensity.rotation;
        const rotateY = ((x - rect.width / 2) / rect.width) * tiltEffect.intensity.rotation;

        // Calculate mouse position as percentage for effects
        const mouseXpercentage = Math.round((x / rect.width) * 100);
        const mouseYpercentage = Math.round((y / rect.height) * 100);

        // Apply transform using intensity settings
        card.style.transform = `perspective(${tiltEffect.intensity.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${tiltEffect.intensity.scale})`;

        // Enhanced dynamic shadow based on shadow settings
        card.style.boxShadow = `
          0 ${tiltEffect.shadow.maxDistance + Math.abs(rotateY)}px ${
            tiltEffect.shadow.maxBlur + Math.abs(rotateX) * tiltEffect.shadow.depthFactor
          }px rgba(0,0,0,0.14),
          ${-rotateY / 2}px ${-rotateX / 2}px ${Math.abs(rotateY) + tiltEffect.shadow.maxDistance}px rgba(0,0,0,0.12)
        `;

        // Increase stacking context
        card.style.zIndex = "20";

        // Glare effect based on glare settings
        const overlay = card.querySelector("[data-card-surface]") as HTMLElement;
        if (overlay) {
          overlay.style.background = `
            radial-gradient(
              circle at ${mouseXpercentage}% ${mouseYpercentage}%, 
              rgba(255, 255, 255, ${tiltEffect.glare.opacity}) 0%, 
              rgba(255, 255, 255, 0.05) ${tiltEffect.glare.size}%, 
              rgba(0, 0, 0, 0.05) 80%,
              rgba(0, 0, 0, 0.1) 100%
            )
          `;

          // Add border highlight effect based on settings
          overlay.style.border = `1px solid rgba(255, 255, 255, ${
            tiltEffect.glare.borderGlow + Math.abs(rotateX) / 100
          })`;
        }

        // Apply color shift if enabled
        if (tiltEffect.colorShift.enable) {
          const fillBar = card.querySelector(".skill-bar-fill") as HTMLElement;
          if (fillBar) {
            const hueShift = Math.round(
              ((rotateY + tiltEffect.intensity.rotation) / (tiltEffect.intensity.rotation * 2)) *
                tiltEffect.colorShift.hueRange,
            );
            fillBar.style.filter = `hue-rotate(${hueShift}deg)`;
          }
        }
      });
    };

    // Updated mouse leave handler
    const handleMouseLeave = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      const target = e.target as HTMLElement;

      const targetCard = target.closest("[data-skill-card]");
      const relatedCard = relatedTarget?.closest("[data-skill-card]");

      if (targetCard && targetCard !== relatedCard) {
        const card = targetCard as HTMLElement;
        resetCard(card);

        if (targetCard === activeCard) {
          activeCard = null;
        }
      }

      // If mouse leaves the container entirely, reset all cards
      if (target === container && !container.contains(relatedTarget)) {
        resetAllCards();
      }
    };

    // Global document mouse move handler to catch when mouse is outside container
    const handleDocumentMouseMove = (e: MouseEvent) => {
      // If we have an active card but mouse is outside container
      if (activeCard && !container.contains(e.target as Node)) {
        resetAllCards();
      }
    };

    // Reset any card if it loses focus (window blur event)
    const handleWindowBlur = () => {
      if (activeCard) {
        resetAllCards();
      }
    };

    // Add event listeners to the container
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave, true);
    container.addEventListener("mouseout", handleMouseLeave);

    // Add global listeners
    document.addEventListener("mousemove", handleDocumentMouseMove);
    window.addEventListener("blur", handleWindowBlur);

    // Reset cards when component unmounts or when visibility changes
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible") {
        resetAllCards();
      }
    });

    return () => {
      // Clean up all event listeners
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave, true);
      container.removeEventListener("mouseout", handleMouseLeave);
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("visibilitychange", resetAllCards);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="skills" className="py-16 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">My Skills</h2>
          <div className="mb-8 h-1 w-20 rounded bg-slate-900"></div>
          <p className="max-w-3xl text-center text-gray-600 dark:text-gray-400">
            These are the technologies and tools I work with to bring ideas to life. I'm always learning and expanding
            my toolkit.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {(["all", "frontend", "backend", "design", "tools"] as const).map((category) => (
            <button
              aria-label={`Filter by ${category}`}
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-slate-900 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div ref={containerRef} className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filteredSkills.map((skill) => (
            <Card
              key={skill.name}
              data-skill-card
              className={`transition-all duration-${tiltEffect.timing.hover} relative overflow-hidden ease-out will-change-transform`}
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(${tiltEffect.intensity.perspective}px) rotateX(0) rotateY(0)`,
                boxShadow: tiltEffect.shadow.initial,
              }}
            >
              {/* Overlay for lighting effects */}
              <div
                className={`absolute inset-0 z-10 transition-all duration-${tiltEffect.timing.hover}`}
                data-card-surface
                style={{
                  backgroundBlendMode: "overlay",
                  pointerEvents: "none",
                }}
              ></div>

              <CardHeader className="pointer-events-none relative z-0">
                <CardTitle className="flex items-center gap-2">
                  <span
                    className={`text-2xl transition-transform duration-${tiltEffect.timing.hover} card-icon`}
                    style={{
                      display: "inline-block",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {skill.icon}
                  </span>
                  <span
                    className={`card-title-text transition-transform duration-${tiltEffect.timing.hover}`}
                    style={{
                      display: "inline-block",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {skill.name}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pointer-events-none relative z-0">
                <div
                  className={`skill-bar h-2 w-full rounded-full bg-gray-200 transition-transform dark:bg-gray-700 duration-${tiltEffect.timing.hover}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className={`skill-bar-fill h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-${tiltEffect.timing.hover}`}
                    style={{
                      width: `${(skill.level / 5) * 100}%`,
                      transformStyle: "preserve-3d",
                    }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
