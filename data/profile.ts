export const profile = {
  name: "Atharv Babu",
  role: "Robotics & AI Engineering Student",
  bioHeadline: "Building at the intersection of robotics, artificial intelligence, and interactive systems.",
  heroBio:
    "Robotics & AI Engineering student building game dev systems, physics simulations, and low-level software.",
  about: [
    "Engineering intelligent systems and interactive simulations where software meets physical space.",
    "Focusing on C++, Python, and embedded architectures to bridge autonomous robotics, game dev, and perception models.",
    "Exploring game engine loops, computer vision pipelines, and interactive graphics programming.",
  ],
  email: "its.atrv@gmail.com",
  github: "https://github.com/MrValmeeki",
  githubUsername: "MrValmeeki",
  linkedin: "https://www.linkedin.com/in/atharv-babu/",
  linkedinUsername: "atharv-babu",
  availability: "Available for Robotics & AI Engineering projects",
} as const;

export const focusAreas = [
  {
    index: "01",
    title: "Autonomous Robotics",
    color: "cyan",
    tag: "Physical & Embedded",
    copy: "Sensor fusion, path planning, and autonomous navigation in physical space.",
  },
  {
    index: "02",
    title: "Artificial Intelligence & Vision",
    color: "violet",
    tag: "Perception & ML",
    copy: "Perception pipelines, depth estimation, and real-time vision inference.",
  },
  {
    index: "03",
    title: "Graphics & Simulation",
    color: "amber",
    tag: "Game Engines & Physics",
    copy: "Custom C++ game engines and real-time N-body gravitational solvers.",
  },
  {
    index: "04",
    title: "Systems & Interactive Apps",
    color: "emerald",
    tag: "Fullstack & Mobile",
    copy: "Location-aware Android systems with background GPS and geofencing.",
  },
] as const;

export const quickStats = [
  { label: "Engineering Domain", value: "Robotics & AI" },
  { label: "Core Languages", value: "C++ • Python • C" },
  { label: "Core Focus", value: "Autonomous Systems & Sim" },
  { label: "GitHub Repositories", value: "6+ Public Projects" },
] as const;
