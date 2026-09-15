export type TimelineEntry = {
  period: string;
  badge: string;
  role: string;
  organization: string;
  description: string;
  accent: "cyan" | "violet" | "amber" | "emerald" | "rose";
  highlights: string[];
  tags: string[];
};

export type ResearchInterest = {
  title: string;
  domain: string;
  accent: "cyan" | "violet" | "amber";
  description: string;
  focusTopics: string[];
};

export const timeline: readonly TimelineEntry[] = [
  {
    period: "2024 — Present",
    badge: "Degree Program",
    role: "B.Tech in Robotics & Artificial Intelligence Engineering",
    organization: "School of Engineering",
    description:
      "Engineering curriculum focused on autonomous physical systems, algorithmic problem solving, and hardware-software integration.",
    accent: "cyan",
    highlights: [
      "Algorithms, data structures, and mathematical modeling in C++",
      "Kinematics, sensor fusion, and closed-loop robotic control",
      "Machine learning pipelines and autonomous navigation architectures",
    ],
    tags: ["Robotics & AI", "C++ / Python", "Kinematics", "System Design"],
  },
  {
    period: "2024 — Present",
    badge: "Independent Engineering",
    role: "Independent Systems & Game Engine Developer",
    organization: "Open Source Lab",
    description:
      "Engineering standalone open-source software across graphics programming, numerical physics, and mobile systems.",
    accent: "amber",
    highlights: [
      "Engineered custom 2D game loop, sprite renderer, and collision systems in C++",
      "Implemented N-body gravitational mechanics with real-time vector integration",
      "Built background geofencing Android app using Jetpack Compose and GPS services",
    ],
    tags: ["C++ Engines", "Physics Sim", "Android Kotlin", "Open Source"],
  },
];

export const researchInterests: readonly ResearchInterest[] = [
  {
    title: "Autonomous Navigation & Spatial Perception",
    domain: "Robotics & Mobile Automation",
    accent: "cyan",
    description:
      "Real-time obstacle avoidance, sensor fusion, and trajectory optimization for autonomous mobile agents.",
    focusTopics: ["SLAM & Odometry", "Path Planning (A* / RRT*)", "Sensor Fusion", "Real-Time Control"],
  },
  {
    title: "Computer Vision for Robotics Manipulation",
    domain: "Artificial Intelligence",
    accent: "violet",
    description:
      "Spatial depth estimation, feature extraction, and neural perception architectures for environment reconstruction.",
    focusTopics: ["Spatial Perception", "Object Classification", "Feature Tracking", "Edge AI"],
  },
  {
    title: "Numerical Simulation of Multi-Body Physics",
    domain: "Computational Physics & Graphics",
    accent: "amber",
    description:
      "High-performance vector integration, collision dynamics, and multi-body gravitational mechanics.",
    focusTopics: ["Symplectic Integrators", "N-Body Gravity", "Vector Math", "Interactive Physics"],
  },
];
