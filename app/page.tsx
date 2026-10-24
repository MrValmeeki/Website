"use client";
import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Pause, Play, RotateCcw } from "lucide-react";
import { PlayShape } from "@/components/play-shape";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
function Playground({ still }: {
    still: boolean;
}) {
    const bounds = useRef<HTMLDivElement>(null);
    const [reset, setReset] = useState(0);
    return <div className="playground" ref={bounds}>
  <div className="playground-label"><span>A LITTLE DISTRACTION</span><span>YOU CAN DRAG THESE AROUND ↙</span></div>
  <span className="sr-only" id="playground-help">Drag a shape, or focus it and use arrow keys to move. Hold Shift for larger steps. Press Enter to reset its position.</span><div className="crosshair crosshair-one"/><div className="crosshair crosshair-two"/>
  <PlayShape key={`orb-${reset}`} name="orbit" className="toy orb" bounds={bounds} still={still}><div className="orb-wire"/><div className="orb-wire two"/><div className="orb-equator"/><span>GO ON,<br />GIVE IT A NUDGE.</span></PlayShape>
  <PlayShape key={`tile-${reset}`} name="code card" className="toy code-tile" bounds={bounds} still={still}><span>hello_world.cpp</span><strong>{"{ }"}</strong><small>STILL FIGURING IT OUT</small></PlayShape>
  <PlayShape key={`star-${reset}`} name="star" className="toy star-toy" bounds={bounds} still={still}><span>✳</span></PlayShape>
  <div className="playground-bottom"><span>MOVE THINGS AROUND. IT’S FINE.</span><button onClick={() => setReset(v => v + 1)} aria-label="Reset playground shapes"><RotateCcw size={14}/> reset</button></div>
 </div>;
}
function Artwork({ kind }: {
    kind: string;
}) {
    if (kind === "pixel")
        return <div className="art art-game" aria-label="Animated illustration of a pixel game"><span className="art-label">01 / ASHVALE</span><div className="game-grid"/><div className="game-window"><div className="window-bar"><span>ASHVALE.EXE</span><span>— □ ×</span></div><div className="game-world"><div className="game-moon"/><div className="game-hill one"/><div className="game-hill two"/><div className="platform p1"/><div className="platform p2"/><div className="little-guy"/><span className="game-hud">HP ♥ ♥ ♥<br />LVL 01</span></div></div><span className="art-note">Built in C++, including the engine.</span></div>;
    if (kind === "orbit")
        return <div className="art art-space" aria-label="Animated illustration of orbiting planets"><span className="art-label">02 / COSMIC CANVAS</span><div className="space-system"><div className="orbit-ring r1"><i /></div><div className="orbit-ring r2"><i /></div><div className="orbit-ring r3"><i /></div><div className="space-core">✳</div></div><span className="space-equation">F = G(m₁m₂)/r²</span><span className="art-note">Planets, orbits, and the occasional collision.</span></div>;
    return <div className="art art-map" aria-label="Animated illustration of a destination alarm"><span className="art-label">03 / WAKEMETHERE</span><div className="map-lines"/><svg className="map-route" viewBox="0 0 600 420" aria-hidden="true"><path className="route-base" d="M80 360V220Q80 195 110 195H360Q390 195 390 165V55"/><path className="route-dash" d="M80 360V220Q80 195 110 195H360Q390 195 390 165V55"/><circle cx="390" cy="55" r="17" fill="#df542f"/></svg><div className="phone"><div className="phone-speaker"/><span className="phone-time">Almost there.</span><div className="phone-icon">↗</div><strong>Your stop<br />is coming up.</strong><small>WakeMeThere</small><div className="phone-progress"><i /></div></div><span className="art-note">An alarm for when you’re close to your stop.</span></div>;
}
export default function Home() {
    const systemReduced = useReducedMotion();
    const [paused, setPaused] = useState(false);
    const still = Boolean(systemReduced || paused);
    const [copied, setCopied] = useState(false);
    const [motionReady, setMotionReady] = useState(false);
    const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => {
        try {
            setPaused(localStorage.getItem("atharv-play-motion") === "paused");
        }
        catch { }
        setMotionReady(true);
        return () => { if (copyTimer.current)
            clearTimeout(copyTimer.current); };
    }, []);
    useEffect(() => {
        if (!motionReady)
            return;
        try {
            localStorage.setItem("atharv-play-motion", paused ? "paused" : "auto");
        }
        catch { }
    }, [paused, motionReady]);
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    useEffect(() => { document.documentElement.dataset.motion = still ? "off" : "on"; }, [still]);
    async function copyEmail() {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            if (copyTimer.current)
                clearTimeout(copyTimer.current);
            copyTimer.current = setTimeout(() => setCopied(false), 2200);
        }
        catch {
            window.location.href = `mailto:${profile.email}`;
        }
    }
    const reveal = { initial: still ? false as const : { opacity: 0, y: 45 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.7 } };
    return <MotionConfig reducedMotion={still ? "always" : "never"}>
 <a href="#main" className="skip">Skip to content</a>{!still && <motion.div className="scroll-progress" style={{ scaleX: progress }}/>}
 <header className="header shell"><a className="logo" href="#" aria-label="Atharv Babu home">ab<span>✳</span></a><span className="header-caption">MY PROJECTS<br />AND A BIT ABOUT ME.</span><nav aria-label="Main navigation"><a href="#work">Projects <sup>03</sup></a><a href="#about">About me</a><a href="#contact">Say hello <ArrowUpRight size={15}/></a></nav><button className="motion-toggle" onClick={() => setPaused(v => !v)} disabled={Boolean(systemReduced)} title={systemReduced ? "Reduced motion follows your device setting" : "Remember motion preference"} aria-label={systemReduced ? "Reduced motion enabled by your device" : paused ? "Enable animations" : "Pause animations"} aria-pressed={still}>{paused ? <Play size={14}/> : <Pause size={14}/>}<span>{systemReduced ? "Reduced" : paused ? "Play" : "Motion"}</span></button></header>
 <main id="main"><section className="hero shell"><div className="hero-meta"><span><i /> ATHARV BABU / ROBOTICS & AI STUDENT</span><span>GAMES, SIMULATIONS & SOFTWARE</span></div><h1 aria-label="Hi, I’m Atharv. I make things."><span className="title-line"><motion.span initial={still ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: .9, delay: .1 }}>Hi, I’m Atharv.</motion.span></span><span className="title-line"><motion.span className="outline-title" initial={still ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: .9, delay: .25 }}>I make <em>things.</em></motion.span></span></h1><div className="hero-lower"><div className="hero-bio"><span className="scribble">thanks for stopping by ↗</span><p>I’m a Robotics & AI student. I spend a lot of my time writing C++, working on simulations, and figuring out how things work.</p><p className="muted">Here are a few projects I’ve been working on.</p><a href="#work" className="round-link"><span className="round-icon"><ArrowDown size={20}/></span> TAKE A LOOK AT MY PROJECTS</a><a className="hero-contact" href={`mailto:${profile.email}`}>Have a project in mind? <ArrowUpRight size={14}/></a></div><Playground still={still}/></div><div className="hero-end"><span>THE PROJECTS ARE JUST BELOW</span><span>↓</span><span>C++ / PYTHON / KOTLIN</span></div></section>
 <div className="marquee" aria-hidden="true"><div>{[0, 1, 2, 3].map(n => <span key={n}>GAME ENGINES <i>✳</i> PHYSICS SIMULATIONS <i>✳</i> ROBOTICS <i>✳</i> </span>)}</div></div>
 <section className="work shell" id="work"><div className="section-meta"><span>01 / PROJECTS</span><span>THE CODE IS ON GITHUB</span></div><div className="section-heading"><h2>A few things<br /><em>I’ve built.</em></h2><p>A game engine, a gravity simulator,<br />and an app for catching your stop.</p></div><div className="project-list">{projects.filter(p => p.featured).map((p, i) => <motion.article key={p.title} {...reveal} className={`project project-${p.kind}`}><a className="project-visual" href={p.href} target="_blank" rel="noreferrer" aria-label={`View ${p.title} on GitHub (opens in a new tab)`}><Artwork kind={p.kind}/><span className="art-disclaimer">Illustrated preview</span><span className="open-project"><ArrowUpRight /></span></a><div className="project-detail"><span className="project-index">0{i + 1} ↗</span><div><span className="eyebrow">{p.label}</span><h3><a href={p.href} target="_blank" rel="noreferrer">{p.title}</a></h3><p>{p.kind === "pixel" ? "AshVale is a 2D RPG built in C++. I wrote the engine too, including the game loop, collision handling, and sprite animations." : p.kind === "orbit" ? "A gravity sandbox built with Python and Pygame. You can set bodies in motion, watch their orbits, and see what happens when they collide." : "An Android app that alerts you when you’re near your destination. It uses GPS and geofencing, so you don’t have to keep checking the map."}</p><div className="tech-list">{p.technologies.slice(0, 3).map(t => <span key={t}>{t}</span>)}</div><a className="source-link" href={p.href} target="_blank" rel="noreferrer">VIEW ON GITHUB <ArrowUpRight size={17}/></a><details className="build-notes"><summary>Build notes <span aria-hidden="true">+</span></summary><dl>{p.stats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl></details></div></div></motion.article>)}</div><motion.a {...reveal} className="github-strip" href={profile.github} target="_blank" rel="noreferrer"><Github size={25}/><span>More of my work is on GitHub.<small>Including smaller projects and things I’m still working on.</small></span><ArrowUpRight size={30}/></motion.a></section>
 <section className="about" id="about"><div className="shell"><div className="section-meta"><span>02 / ABOUT ME</span><span>STILL A LOT TO LEARN</span></div><div className="about-grid"><motion.div {...reveal}><h2>A bit about<br /><em>how I work.</em></h2><div className="about-graphic" aria-hidden="true"><div className="about-star">✳</div><div className="about-sticker">CURRENTLY<br /><strong>learning.</strong><span>ROBOTICS & AI</span></div></div></motion.div><motion.div {...reveal} className="about-copy"><p className="big-copy">I tend to understand things better when I try building them myself.</p><p>I’m studying Robotics & Artificial Intelligence. My projects have taken me from C++ game engines to Python simulations and Android development.</p><p>I’m into coding, embedded systems, and robotics. I like writing software and figuring out how to bring it together with electronics and hardware to build things that work in the real world.</p><div className="about-facts"><div><span>WHAT I USE</span><p>C++ · Python · C · Kotlin<br />JavaScript · NumPy · Git</p></div><div><span>WHAT I’M LEARNING ABOUT</span><p>Autonomous navigation<br />Computer vision · Physics simulation</p></div></div></motion.div></div></div></section>
 <section className="contact shell" id="contact"><div className="section-meta"><span>03 / GET IN TOUCH</span><span><i /> OPEN TO PROJECTS & COLLABORATION</span></div><motion.div {...reveal}><h2>Have an idea?<br /><em>Let’s talk.</em> <a href={`mailto:${profile.email}`} aria-label="Email Atharv"><ArrowUpRight /></a></h2><div className="contact-bottom"><p>Want to work on a project together?<br />Or have a question about something here?<br /><strong>Drop me a message.</strong></p><div><a href={`mailto:${profile.email}`} className="email">{profile.email}</a><button onClick={copyEmail} className="copy" aria-live="polite">{copied ? "COPIED ✓" : "COPY EMAIL ↗"}</button></div></div></motion.div></section>
 </main><footer className="shell"><a href="#" className="footer-logo">ab✳</a><span>© {new Date().getFullYear()} ATHARV BABU<br />THANKS FOR HAVING A LOOK.</span><div><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="#">Back to top ↑</a></div></footer>
 </MotionConfig>;
}
