export type SkillCategory = {
  id: string;
  name: string;
  subtitle: string;
  accent: "cyan" | "violet" | "amber" | "emerald";
  skills: {
    name: string;
    level: "Advanced" | "Proficient" | "Exploring";
    experience: string;
    projects?: string[];
  }[];
};

export const skillCategories: readonly SkillCategory[] = [
  {
    id: "languages",
    name: "Programming Languages",
    subtitle: "Core syntax for performance and high-level computation",
    accent: "cyan",
    skills: [
      { name: "C++", level: "Advanced", experience: "Engine loops, memory management & deterministic simulation", projects: ["AshVale"] },
      { name: "Python", level: "Advanced", experience: "Numerical modeling, AI experimentation & automation", projects: ["Cosmic Canvas"] },
      { name: "C", level: "Proficient", experience: "Low-level systems & embedded hardware fundamentals", projects: [] },
      { name: "Kotlin", level: "Proficient", experience: "Android architecture, Jetpack Compose & background services", projects: ["WakeMeThere"] },
      { name: "JavaScript / TS", level: "Proficient", experience: "Interactive web architectures & state-driven UI", projects: ["Mini-Blog"] },
      { name: "HTML5 / Modern CSS", level: "Advanced", experience: "Design systems, responsive layouts & performant CSS", projects: ["Portfolio"] },
    ],
  },
  {
    id: "ai-robotics",
    name: "Robotics & Artificial Intelligence",
    subtitle: "Where computational models interface with real-world autonomy",
    accent: "violet",
    skills: [
      { name: "Autonomous Systems", level: "Proficient", experience: "Path planning, coordinate transforms & spatial navigation", projects: [] },
      { name: "Computer Vision", level: "Exploring", experience: "Feature extraction, depth estimation & perception pipelines", projects: [] },
      { name: "Machine Learning", level: "Proficient", experience: "Neural architectures, classification & model inference", projects: [] },
      { name: "Embedded Systems", level: "Proficient", experience: "Microcontroller logic, sensor interfacing & I/O control", projects: [] },
      { name: "N-Body Physics Algorithms", level: "Advanced", experience: "Gravitational vector integration & multi-body physics", projects: ["Cosmic Canvas"] },
    ],
  },
  {
    id: "graphics-games",
    name: "Graphics & Interactive Engines",
    subtitle: "Real-time rendering, entity systems, and mathematical simulations",
    accent: "amber",
    skills: [
      { name: "2D Graphics Programming", level: "Advanced", experience: "Rendering pipelines, tilemaps & viewport transformation", projects: ["AshVale"] },
      { name: "Pygame & Numerical Simulation", level: "Advanced", experience: "NumPy matrix computation & interactive canvas physics", projects: ["Cosmic Canvas"] },
      { name: "State Machine Architecture", level: "Advanced", experience: "Finite state machines, entity loops & input routing", projects: ["AshVale"] },
      { name: "Sprite & Tile Animation", level: "Proficient", experience: "Sprite sheet slicing, frame timing & hitbox detection", projects: ["AshVale"] },
    ],
  },
  {
    id: "systems-tools",
    name: "Software & Systems Architecture",
    subtitle: "Engineering discipline, version control, and production workflows",
    accent: "emerald",
    skills: [
      { name: "Git & GitHub", level: "Advanced", experience: "Version control, branching workflows & open source releases", projects: ["All Repositories"] },
      { name: "Jetpack Compose & Android SDK", level: "Proficient", experience: "Declarative UI, geofencing APIs & Room persistence", projects: ["WakeMeThere"] },
      { name: "Linux & Terminal Workflows", level: "Proficient", experience: "Shell scripting, build automation & POSIX tools", projects: ["Terminal Portfolio"] },
      { name: "System Design", level: "Proficient", experience: "Modular architecture, clean APIs & performance profiling", projects: ["WakeMeThere", "AshVale"] },
      { name: "Technical Documentation", level: "Advanced", experience: "Architecture specs, clean READMEs & engineering logs", projects: [] },
    ],
  },
];
