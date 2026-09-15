export type ProjectAccent = "amber" | "violet" | "cyan" | "rose" | "emerald";
export type ProjectKind = "pixel" | "orbit" | "route" | "community" | "pulse";

export type Project = {
  number: string;
  title: string;
  label: string;
  tagline: string;
  description: string;
  technologies: readonly string[];
  href: string;
  kind: ProjectKind;
  accent: ProjectAccent;
  category: "Robotics & AI" | "Game Dev & Graphics" | "Systems & Apps";
  stats: { label: string; value: string }[];
  featured?: boolean;
};

export const projects: readonly Project[] = [
  {
    number: "01",
    title: "AshVale",
    label: "2D C++ Game Engine & Pixel RPG",
    tagline: "Deterministic game loop, custom physics, and frame-accurate sprite rendering.",
    description:
      "Custom 2D action RPG engine engineered from scratch in C++. Implements deterministic tick updates, AABB collision detection, sprite sheet animations, and modular finite state machines.",
    technologies: ["C++", "Game Development", "2D Graphics", "Game Design", "State Machines"],
    href: "https://github.com/MrValmeeki/AshVale",
    kind: "pixel",
    accent: "amber",
    category: "Game Dev & Graphics",
    stats: [
      { label: "Language", value: "C++" },
      { label: "Genre", value: "2D Action RPG" },
      { label: "Core Focus", value: "Graphics & Engine Loop" },
    ],
    featured: true,
  },
  {
    number: "02",
    title: "Cosmic Canvas",
    label: "Interactive N-Body Gravity Simulator",
    tagline: "Real-time orbital mechanics, planetary collisions, and black hole evolution.",
    description:
      "Interactive gravitational sandbox solving multi-body orbital mechanics via numerical integration. Simulates gravitational trajectories, mass mergers, and chaotic binary star orbits.",
    technologies: ["Python", "Pygame", "NumPy", "N-body Simulation", "Physics Modeling"],
    href: "https://github.com/MrValmeeki/Cosmic-Canvas",
    kind: "orbit",
    accent: "violet",
    category: "Robotics & AI",
    stats: [
      { label: "Language", value: "Python" },
      { label: "Simulation", value: "N-body Gravity" },
      { label: "Mathematics", value: "Orbital Mechanics" },
    ],
    featured: true,
  },
  {
    number: "03",
    title: "WakeMeThere",
    label: "Smart Travel Alarm & Geofencing Assistant",
    tagline: "Location-aware travel alarm triggering precision alerts near transit stops.",
    description:
      "Android travel assistant built with Kotlin and Jetpack Compose. Tracks real-time GPS trajectories in background services and fires audio alerts upon crossing destination geofence radii.",
    technologies: ["Kotlin", "Jetpack Compose", "MapLibre", "OSRM", "Room DB", "Geofencing"],
    href: "https://github.com/MrValmeeki/WakeMeThere",
    kind: "route",
    accent: "cyan",
    category: "Systems & Apps",
    stats: [
      { label: "Platform", value: "Android (Kotlin)" },
      { label: "Services", value: "Real-Time GPS & MapLibre" },
      { label: "UI Framework", value: "Jetpack Compose" },
    ],
    featured: true,
  },
  {
    number: "04",
    title: "Mini-Blog",
    label: "Fast Social Publishing Engine",
    tagline: "Distraction-free publishing with authentication and real-time cloud sync.",
    description:
      "Minimalist writing platform featuring markdown authoring, session authentication, and instantaneous document persistence powered by Firebase Firestore.",
    technologies: ["JavaScript", "Firebase", "Firestore", "User Authentication", "Web Design"],
    href: "https://github.com/MrValmeeki/Mini-Blog",
    kind: "pulse",
    accent: "emerald",
    category: "Systems & Apps",
    stats: [
      { label: "Stack", value: "JavaScript & Cloud" },
      { label: "Auth", value: "Secure Session State" },
      { label: "Design", value: "Minimalist Publishing" },
    ],
    featured: false,
  },
] as const;
