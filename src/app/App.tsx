import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, ChevronLeft, ChevronRight, MapPin, Mail, Phone, Check } from "lucide-react";

// ─── Global responsive styles ──────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; }
      html { scroll-behavior: smooth; }

      .nav-desktop { display: flex; align-items: center; gap: 28px; }
      .nav-burger  { display: none; }

      .section-pad { padding: 120px 64px; }
      .hero-title  { font-size: clamp(40px, 6vw, 80px); }

      .why-outer  { display: grid; grid-template-columns: 1fr 2fr; gap: 96px; align-items: start; }
      .why-cards  { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(26,25,23,0.08); }

      .stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: rgba(255,255,255,0.06); }

      .projects-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }

      .process-tabs   { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: rgba(26,25,23,0.08); margin-bottom: 1px; }
      .process-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }

      .manuf-grid   { display: grid; grid-template-columns: 1fr 1fr; }
      .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 96px; }
      .form-row     { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

      @media (max-width: 1024px) {
        .nav-desktop { display: none; }
        .nav-burger  { display: flex; }
        .section-pad { padding: 80px 32px; }
        .why-outer   { grid-template-columns: 1fr; gap: 48px; }
        .manuf-grid  { grid-template-columns: 1fr; }
        .contact-grid{ grid-template-columns: 1fr; gap: 48px; }
        .process-detail { grid-template-columns: 1fr; gap: 36px; }
      }

      @media (max-width: 768px) {
        .section-pad { padding: 60px 20px; }
        .why-cards   { grid-template-columns: 1fr; }
        .stats-grid  { grid-template-columns: repeat(2,1fr); }
        .projects-grid { grid-template-columns: repeat(2,1fr); gap: 16px; }
        .process-tabs{ grid-template-columns: repeat(2,1fr); }
        .form-row    { grid-template-columns: 1fr; }
      }

      @media (max-width: 480px) {
        .projects-grid { grid-template-columns: 1fr; }
        .hero-title  { font-size: 36px !important; }
        .process-tabs{ grid-template-columns: repeat(2,1fr); }
      }

      .project-card { background:#fff; overflow:hidden; cursor:pointer; transition: box-shadow 0.3s, transform 0.3s; }
      .project-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(26,25,23,0.1); }
      .project-card .card-img { overflow:hidden; height: 220px; }
      .project-card .card-img img { width:100%; height:100%; object-fit:cover; transition: transform 0.7s ease; display:block; }
      .project-card:hover .card-img img { transform: scale(1.06); }

      .modal-overlay { position:fixed; inset:0; background:rgba(10,9,8,0.88); z-index:300; display:flex; align-items:center; justify-content:center; padding:20px; }
      .modal-box { background:#fff; width:100%; max-width:920px; max-height:92vh; overflow-y:auto; position:relative; }

      .why-card { padding:40px; display:flex; flex-direction:column; gap:20px; background:#F9F7F4; transition:background 0.3s; }
      .why-card:hover { background:#fff; }

      ::-webkit-scrollbar { width: 0; height: 0; }
    `}</style>
  );
}

// ─── SVG Icons for Why Choose Us ─────────────────────────────────────────────
function IconDesign() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#B8906A" strokeWidth="1.2" strokeLinecap="square">
      <path d="M20 6L9 32H16L18 26H22L24 32H31L20 6Z" />
      <path d="M14 18H26" />
      <circle cx="20" cy="11" r="2" />
    </svg>
  );
}
function IconDelivery() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#B8906A" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="bevel">
      <path d="M20 4L4 12L20 20L36 12L20 4Z" />
      <path d="M4 20L20 28L36 20" />
      <path d="M4 28L20 36L36 28" />
      <path d="M20 20V36" />
    </svg>
  );
}
function IconCompliance() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#B8906A" strokeWidth="1.2" strokeLinecap="square">
      <path d="M20 4L6 10V22C6 28 12 34 20 38C28 34 34 28 34 22V10L20 4Z" />
      <path d="M14 21L18 25L26 15" />
    </svg>
  );
}
function IconMaintenance() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#B8906A" strokeWidth="1.2" strokeLinecap="square">
      <circle cx="20" cy="20" r="10" />
      <path d="M20 10V5M20 35V30M10 20H5M35 20H30M13 13L9 9M27 27L31 31M13 27L9 31M27 13L31 9" />
      <circle cx="20" cy="20" r="3" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const WHY_ITEMS = [
  {
    n: "01", Icon: IconDesign,
    title: "Professional Design Collaboration",
    desc: "Our team works alongside interior designers and project managers from concept through shop drawings, ensuring vision is preserved through to delivery.",
  },
  {
    n: "02", Icon: IconDelivery,
    title: "Fast & Predictable Delivery",
    desc: "Structured production schedules and milestone-based tracking ensure your project arrives on time, every time. No surprises at handover.",
  },
  {
    n: "03", Icon: IconCompliance,
    title: "Hospitality Standards Compliance",
    desc: "Every piece is engineered to meet fire-retardancy, durability, and hotel-grade performance standards required by international hospitality operators.",
  },
  {
    n: "04", Icon: IconMaintenance,
    title: "Easy Maintenance & Long-Term Operation",
    desc: "We design for the full lifecycle — specifying materials and finishes that remain serviceable, replaceable, and cost-effective over years of operation.",
  },
];

const PROJECTS = [
  {
    id: 1, type: "Hotel", name: "The Meridian Residences", location: "Dubai, UAE", rooms: "412 rooms", year: "2023",
    desc: "Full guestroom and suite furniture package for a five-star business hotel, including custom joinery, headboards, and in-room desking.",
    cover: "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/A/A1.jpeg",
    images: [
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/A/A1.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/A/A2.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/A/A3.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/A/A4.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/A/A5.jpeg",
    ],
  },
  {
    id: 2, type: "Hotel", name: "Harbour Grand Kuala Lumpur", location: "Kuala Lumpur, Malaysia", rooms: "228 rooms", year: "2022",
    desc: "Bespoke bedroom and lounge furniture for a four-star city hotel, engineered to meet international fire-retardancy standards.",
    cover: "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/B/B1.jpg",
    images: [
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/B/B1.jpg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/B/B2.jpg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/B/B3.jpg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/B/B4.jpg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/B/B5.jpg",
    ],
  },
  {
    id: 3, type: "Serviced Apartment", name: "Civic Living Suites", location: "Singapore", rooms: "186 units", year: "2023",
    desc: "Complete apartment furniture package for a premium serviced residence, balancing residential comfort with hospitality-grade durability.",
    cover: "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/C/C1.png",
    images: [
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/C/C1.png",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/C/C2.jpg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/C/C3.jpg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/C/C4.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/C/C5.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/C/C6.png",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/C/C7.jpg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/C/C8.jpg",
    ],
  },
  {
    id: 4, type: "Serviced Apartment", name: "Riva Residences Prague", location: "Prague, Czech Republic", rooms: "97 units", year: "2022",
    desc: "European-style serviced apartment furnishing with custom soft goods, casegoods, and coordinated accessories across all unit categories.",
    cover: "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/D/D1.jpg",
    images: [
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/D/D1.jpg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/D/D2.png",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/D/D3.png",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/D/D4.png",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/D/D5.png",
    ],
  },
  {
    id: 5, type: "Hotel", name: "Skyline Business Hotel", location: "Shanghai, China", rooms: "356 rooms", year: "2024",
    desc: "Large-scale hotel FF&E package including custom lobby furniture, all-day dining seating, guestroom casegoods and soft furnishings.",
    cover: "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/E/E1.jpeg",
    images: [
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/E/E1.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/E/E2.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/E/E3.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/E/E4.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/E/E5.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/E/E6.jpeg",
    ],
  },
  {
    id: 6, type: "Serviced Apartment", name: "Urban Stay Bangkok", location: "Bangkok, Thailand", rooms: "124 units", year: "2023",
    desc: "Mid-scale serviced apartment FF&E including modular living room units, custom-built wardrobes, and coordinated kitchen furniture.",
    cover: "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/F/F1.jpeg",
    images: [
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/F/F1.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/F/F2.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/F/F3.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/F/F4.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/F/F5.jpeg",
      "https://raw.githubusercontent.com/yihuan0208/Livspacee-web/main/Projects/F/F6.jpeg",
    ],
  },
];

const PROCESS_STEPS = [
  {
    n: "01", days: "Day 1–4", title: "Rapid Planning",
    subtitle: "48-hour BOQ & digital site survey",
    desc: "We issue an initial BOQ within 48 hours of receiving your floor plan, supported by digital site survey via Matterport cloud. Every SKU is locked to four fixed parameters: dimension, material, FR grade, and VOC value.",
    deliverables: ["Digital BOQ with quantity schedule", "Draft FF&E Control Book"],
  },
  {
    n: "02", days: "Day 5–20", title: "Mock-up Approval",
    subtitle: "1:1 physical guest room mock-up in 15 days",
    desc: "A full-scale standard guest room mock-up is completed in our factory within 15 days — not a 3D render. Three-party sign-off: designer aesthetic approval, client video review, and technical compliance testing including BS 5852 flame-retardant certification.",
    deliverables: ["HD video & VR mock-up inspection", "Material box physical sample kit", "Flame retardant test report (BS 5852 / NFPA 701)"],
  },
  {
    n: "03", days: "Day 21–56", title: "Mass Production",
    subtitle: "35-day production with 5 QC checkpoints",
    desc: "Mass production is completed within 35 days, with five structured QC checkpoints covering woodwork, hardware, upholstery, painting, and final assembly. Weekly HD video progress reports are issued, and consistency is verified between the 1st and 100th set.",
    deliverables: ["Weekly HD production video reports", "Inbound material compliance records", "Batch finished goods inspection report"],
  },
  {
    n: "04", days: "Day 57–75", title: "Global Delivery",
    subtitle: "Container optimization & pre-clearance in 8 hours",
    desc: "Our algorithm-based container loading plan is issued within 8 hours, saving an average of 10–15% on sea freight. All customs clearance documents — CI, PL, COO, and BL — are pre-prepared to reduce port clearance time by 3–5 days.",
    deliverables: ["Digital container loading optimization plan", "Pre-clearance document package (CI / PL / COO / BL)"],
  },
];

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const fg = scrolled ? "#1A1917" : "#FFFFFF";
  const bg = scrolled ? "rgba(249,247,244,0.96)" : "transparent";

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all 0.4s", background: bg, backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid rgba(26,25,23,0.08)" : "none" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontFamily: "'Fraunces',serif", fontStyle: "italic", fontWeight: 300, fontSize: 24, letterSpacing: "0.01em", lineHeight: 1 }}>
            <span style={{ color: fg }}>Liv</span>
            <span style={{ color: "#B8906A" }}>space</span>
            <span style={{ color: fg }}>e</span>
          </span>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: fg, opacity: 0.4, fontWeight: 400 }}>Hospitality</span>
        </a>

        <div className="nav-desktop">
          {["about","projects","process","capabilities","contact"].map(id => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, color: fg, opacity: 0.8 }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, padding: "10px 20px", background: scrolled ? "#1A1917" : "rgba(255,255,255,0.15)", color: "#fff", border: scrolled ? "none" : "1px solid rgba(255,255,255,0.4)", cursor: "pointer" }}>
            Request a Quote
          </button>
        </div>

        <button className="nav-burger" onClick={() => setMenuOpen(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: fg, padding: 4 }}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: "#F9F7F4", borderTop: "1px solid rgba(26,25,23,0.08)", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
          {["about","projects","process","capabilities","contact"].map(id => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, color: "#1A1917" }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, padding: "12px 20px", background: "#1A1917", color: "#fff", border: "none", cursor: "pointer", marginTop: 4 }}>
            Request a Quote
          </button>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 600, display: "flex", alignItems: "flex-end", paddingBottom: 80, overflow: "hidden" }}>
      <img
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop&auto=format"
        alt="Premium hotel interior"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,8,0.84) 0%, rgba(10,9,8,0.32) 55%, rgba(10,9,8,0.1) 100%)" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1440, margin: "0 auto", padding: "0 32px", width: "100%" }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
          Hospitality Furniture Project Partner
        </p>
        <h1 className="hero-title" style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, color: "#fff", lineHeight: 1.08, margin: "0 0 28px 0" }}>
          Furniture that serves<br /><em>the guest experience</em>
        </h1>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 16, color: "rgba(255,255,255,0.7)", maxWidth: 500, marginBottom: 36, lineHeight: 1.75 }}>
          From design collaboration and engineering to manufacturing, QC, and on-site delivery — complete hospitality furniture solutions for hotels and serviced apartments worldwide.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <button
            onClick={() => scrollTo("contact")}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 28px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, background: "#B8906A", color: "#fff", border: "none", cursor: "pointer" }}
          >
            Request a Quote <ArrowRight size={13} />
          </button>
          <button
            onClick={() => scrollTo("projects")}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 28px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", cursor: "pointer" }}
          >
            View Projects
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyChooseUsSection() {
  return (
    <section id="about" className="section-pad" style={{ background: "#F9F7F4" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div className="why-outer">
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8906A", fontWeight: 500, marginBottom: 20 }}>Why Choose Livspacee</p>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: "clamp(32px,3.5vw,52px)", color: "#1A1917", lineHeight: 1.15, margin: 0 }}>
              Built for<br /><em>hospitality</em>
            </h2>
          </div>
          <div className="why-cards">
            {WHY_ITEMS.map(({ n, Icon, title, desc }) => (
              <div key={n} className="why-card">
                <Icon />
                <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 400, fontSize: 18, color: "#1A1917", lineHeight: 1.3, margin: 0 }}>{title}</h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 13, color: "#7A756C", lineHeight: 1.75, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function StatsSection() {
  const stats = [
    { v: "12+", l: "Years of Experience", s: "In hospitality furnishing" },
    { v: "100+", l: "Projects Delivered", s: "Hotels & serviced apartments" },
    { v: "7", l: "Countries Served", s: "Asia, Middle East & Europe" },
    { v: "68%", l: "Repeat Client Rate", s: "Long-term partnerships" },
  ];
  return (
    <section style={{ background: "#1A1917", padding: "64px 0" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 32px" }}>
        <div className="stats-grid" style={{ background: "rgba(255,255,255,0.06)" }}>
          {stats.map(s => (
            <div key={s.v} style={{ background: "#1A1917", padding: "48px 32px" }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: "clamp(36px,4vw,60px)", color: "#fff", marginBottom: 10 }}>{s.v}</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, fontWeight: 500, color: "#B8906A", marginBottom: 6 }}>{s.l}</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 300, color: "rgba(255,255,255,0.35)" }}>{s.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Project Modal ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {/* Image carousel */}
        <div style={{ position: "relative", background: "#1A1917" }}>
          <img
            src={project.images[idx]}
            alt={project.name}
            style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
          />
          {project.images.length > 1 && (
            <>
              <button
                onClick={() => setIdx(i => (i - 1 + project.images.length) % project.images.length)}
                style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(8px)" }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setIdx(i => (i + 1) % project.images.length)}
                style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(8px)" }}
              >
                <ChevronRight size={18} />
              </button>
              <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
                {project.images.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 20 : 6, height: 6, borderRadius: 3, background: i === idx ? "#B8906A" : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
                ))}
              </div>
            </>
          )}
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.4)", border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X size={16} />
          </button>
        </div>

        {/* Project info */}
        <div style={{ padding: "40px 40px 48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8906A", fontWeight: 500 }}>{project.type}</span>
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: "#7A756C" }}>{project.rooms} · {project.year}</span>
          </div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: 28, color: "#1A1917", margin: "0 0 8px 0" }}>{project.name}</h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: "#7A756C", margin: "0 0 20px 0", display: "flex", alignItems: "center", gap: 4 }}>
            <MapPin size={12} /> {project.location}
          </p>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 14, color: "#5A5550", lineHeight: 1.75, margin: 0 }}>{project.desc}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function ProjectsSection() {
  const [open, setOpen] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <section id="projects" className="section-pad" style={{ background: "#F0EDE7" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8906A", fontWeight: 500, marginBottom: 20 }}>Featured Projects</p>
        <h2 style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: "clamp(32px,3.5vw,52px)", color: "#1A1917", lineHeight: 1.15, margin: "0 0 48px 0" }}>
          Project <em>experience</em>
        </h2>

        <div className="projects-grid">
          {PROJECTS.map(p => (
            <div key={p.id} className="project-card" onClick={() => setOpen(p)}>
              <div className="card-img">
                <img src={p.cover} alt={p.name} />
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8906A", fontWeight: 500 }}>{p.type}</span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: "#7A756C" }}>{p.rooms}</span>
                </div>
                <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 400, fontSize: 17, color: "#1A1917", margin: "0 0 6px 0" }}>{p.name}</h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: "#7A756C", margin: 0, display: "flex", alignItems: "center", gap: 3 }}>
                  <MapPin size={10} /> {p.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
function ProcessSection() {
  const [active, setActive] = useState(0);
  const s = PROCESS_STEPS[active];

  return (
    <section id="process" className="section-pad" style={{ background: "#F9F7F4" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8906A", fontWeight: 500, marginBottom: 20 }}>How We Work</p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: "clamp(32px,3.5vw,52px)", color: "#1A1917", lineHeight: 1.15, margin: 0 }}>
            75-Day Design-to-<em>Delivery</em>
          </h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 14, color: "#7A756C", maxWidth: 380, margin: 0, lineHeight: 1.75 }}>
            A standardized, quantified process for small and medium hotels and serviced apartments.
          </p>
        </div>

        {/* Tabs */}
        <div className="process-tabs" style={{ background: "rgba(26,25,23,0.08)", marginBottom: 1 }}>
          {PROCESS_STEPS.map((step, i) => (
            <button
              key={step.n}
              onClick={() => setActive(i)}
              style={{ padding: "32px 28px", textAlign: "left", background: active === i ? "#1A1917" : "#F9F7F4", border: "none", cursor: "pointer", transition: "background 0.3s", width: "100%" }}
            >
              {/* Big number */}
              <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: "clamp(48px,5vw,72px)", lineHeight: 1, color: active === i ? "#fff" : "rgba(26,25,23,0.15)", marginBottom: 8, transition: "color 0.3s" }}>
                {step.n}
              </div>
              {/* Day range */}
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8906A", marginBottom: 10 }}>
                {step.days}
              </div>
              {/* Title */}
              <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 400, fontSize: "clamp(15px,1.4vw,18px)", color: active === i ? "#fff" : "#1A1917", lineHeight: 1.3, transition: "color 0.3s" }}>
                {step.title}
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div style={{ background: "#fff", padding: "48px 40px" }}>
          <div className="process-detail">
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: "#B8906A", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px 0" }}>{s.days}</p>
              <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: 30, color: "#1A1917", margin: "0 0 8px 0" }}>{s.title}</h3>
              <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: "#B8906A", fontWeight: 500, margin: "0 0 20px 0" }}>{s.subtitle}</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 14, color: "#7A756C", lineHeight: 1.8, margin: 0 }}>{s.desc}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A756C", fontWeight: 500, margin: "0 0 20px 0" }}>Stage Deliverables</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px 0", display: "flex", flexDirection: "column", gap: 14 }}>
                  {s.deliverables.map(d => (
                    <li key={d} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: "rgba(184,144,106,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                        <Check size={10} color="#B8906A" />
                      </span>
                      <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 13, color: "#1A1917", lineHeight: 1.6 }}>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1, height: 2, background: "#EAE6DF", borderRadius: 2, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, background: "#B8906A", width: `${((active + 1) / 4) * 100}%`, transition: "width 0.4s ease", borderRadius: 2 }} />
                </div>
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: "#7A756C", fontWeight: 500, whiteSpace: "nowrap" }}>Stage {active + 1} of 4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Manufacturing ────────────────────────────────────────────────────────────
function ManufacturingSection() {
  const caps = [
    "Solid wood and engineered timber construction",
    "Hotel-grade fabric and leather upholstery",
    "Lacquer, veneer, and high-pressure laminate finishing",
    "Custom metal fabrication and hardware",
    "Fire-retardant material compliance (BS EN 1021, CRIB 5)",
    "Capacity for 400+ rooms per production cycle",
  ];
  return (
    <section id="capabilities" style={{ background: "#1A1917", overflow: "hidden" }}>
      <div className="manuf-grid">
        <div style={{ position: "relative", minHeight: 480 }}>
          <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&h=700&fit=crop&auto=format" alt="Manufacturing workshop" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(26,25,23,0.2)" }} />
        </div>
        <div className="section-pad">
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8906A", fontWeight: 500, marginBottom: 20 }}>Manufacturing Capability</p>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: "clamp(32px,3.5vw,52px)", color: "#fff", lineHeight: 1.15, margin: "0 0 24px 0" }}>
            Built to<br /><em>perform</em>
          </h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: "0 0 36px 0", maxWidth: 400 }}>
            Our dedicated hospitality manufacturing facility combines traditional craft with modern production engineering. Consistency, traceability, and on-schedule output — at every scale.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 44px 0", display: "flex", flexDirection: "column", gap: 13 }}>
            {caps.map(c => (
              <li key={c} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: "50%", background: "rgba(184,144,106,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                  <Check size={9} color="#B8906A" />
                </span>
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{c}</span>
              </li>
            ))}
          </ul>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, paddingTop: 36, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {[{ v: "18,000m²", l: "Factory Floor" }, { v: "ISO 9001", l: "Certified QMS" }, { v: "6 wks", l: "Avg. Lead Time" }].map(s => (
              <div key={s.v}>
                <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: 24, color: "#fff", marginBottom: 6 }}>{s.v}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", company: "", email: "", type: "Hotel", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const base: React.CSSProperties = { fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 14, color: "#1A1917", background: "transparent", border: "none", borderBottom: "1px solid rgba(26,25,23,0.15)", padding: "10px 0", outline: "none", width: "100%" };
  const lbl: React.CSSProperties = { fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7A756C", fontWeight: 500, display: "block", marginBottom: 6 };

  return (
    <section id="contact" className="section-pad" style={{ background: "#F0EDE7" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div className="contact-grid">
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8906A", fontWeight: 500, marginBottom: 20 }}>Start a Conversation</p>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: "clamp(32px,3.5vw,52px)", color: "#1A1917", lineHeight: 1.15, margin: "0 0 28px 0" }}>
              {"Let's discuss"}<br /><em>your project</em>
            </h2>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 14, color: "#7A756C", lineHeight: 1.75, margin: "0 0 44px 0", maxWidth: 340 }}>
              Whether you have a live project brief or are in early planning, we welcome the opportunity to understand your requirements.
            </p>
            {[
              { icon: <Mail size={14} />, l: "Email", v: "projects@arvofurnishing.com" },
              { icon: <Phone size={14} />, l: "WhatsApp", v: "+86 138 0000 0000" },
              { icon: <MapPin size={14} />, l: "Office", v: "Guangdong, China · Available worldwide" },
            ].map(c => (
              <div key={c.l} style={{ display: "flex", gap: 14, marginBottom: 22 }}>
                <div style={{ color: "#B8906A", marginTop: 2 }}>{c.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A756C", fontWeight: 500, marginBottom: 4 }}>{c.l}</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 14, color: "#1A1917" }}>{c.v}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", padding: "48px 40px" }}>
            {submitted ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "60px 0" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(184,144,106,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Check size={20} color="#B8906A" />
                </div>
                <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: 24, color: "#1A1917", margin: "0 0 12px 0" }}>{"We've received your enquiry"}</h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 14, color: "#7A756C", lineHeight: 1.75, maxWidth: 300, margin: 0 }}>
                  A member of our project team will be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1A1917", fontWeight: 500, margin: "0 0 4px 0" }}>Enquiry Form</p>
                <div className="form-row">
                  <div><label style={lbl}>Full Name</label><input name="name" type="text" required value={form.name} onChange={handle} style={base} /></div>
                  <div><label style={lbl}>Company / Project</label><input name="company" type="text" required value={form.company} onChange={handle} style={base} /></div>
                </div>
                <div className="form-row">
                  <div><label style={lbl}>Email</label><input name="email" type="email" required value={form.email} onChange={handle} style={base} /></div>
                  <div>
                    <label style={lbl}>Project Type</label>
                    <select name="type" value={form.type} onChange={handle} style={{ ...base, cursor: "pointer" }}>
                      <option>Hotel</option><option>Serviced Apartment</option><option>Resort</option><option>Other Hospitality</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={lbl}>Tell us about your project</label>
                  <textarea name="message" rows={4} value={form.message} onChange={handle} placeholder="Scale, timeline, requirements..." style={{ ...base, resize: "none" }} />
                </div>
                <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "15px 28px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, background: "#1A1917", color: "#fff", border: "none", cursor: "pointer", marginTop: 4 }}>
                  Send Enquiry <ArrowRight size={13} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#1A1917", padding: "36px 32px" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontFamily: "'Fraunces',serif", fontStyle: "italic", fontWeight: 300, fontSize: 22, letterSpacing: "0.01em", lineHeight: 1 }}>
            <span style={{ color: "#fff" }}>Liv</span>
            <span style={{ color: "#B8906A" }}>space</span>
            <span style={{ color: "#fff" }}>e</span>
          </span>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>Hospitality</span>
        </div>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.3)", margin: 0 }}>© 2024 Livspacee Hospitality Furnishing. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─── Logo Preview ─────────────────────────────────────────────────────────────
function LogoPreview() {
  const brass = "#B8906A";
  const dark = "#1A1917";

  const variants = [
    {
      id: "A",
      label: "A — Plus Jakarta Sans · 细/中 双重量",
      dark: (
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.01em" }}>
          <span style={{ fontWeight: 300, fontSize: 28, color: "#fff" }}>L</span>
          <span style={{ fontWeight: 300, fontSize: 28, color: "#fff" }}>iv</span>
          <span style={{ fontWeight: 500, fontSize: 28, color: brass }}>space</span>
          <span style={{ fontWeight: 300, fontSize: 28, color: "#fff" }}>e</span>
        </span>
      ),
      light: (
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.01em" }}>
          <span style={{ fontWeight: 300, fontSize: 28, color: dark }}>L</span>
          <span style={{ fontWeight: 300, fontSize: 28, color: dark }}>iv</span>
          <span style={{ fontWeight: 500, fontSize: 28, color: brass }}>space</span>
          <span style={{ fontWeight: 300, fontSize: 28, color: dark }}>e</span>
        </span>
      ),
    },
    {
      id: "B",
      label: "B — Plus Jakarta Sans · 全 SemiBold 均匀",
      dark: (
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "0.04em" }}>
          <span style={{ fontWeight: 600, fontSize: 22, color: "#fff" }}>Liv</span>
          <span style={{ fontWeight: 600, fontSize: 22, color: brass }}>space</span>
          <span style={{ fontWeight: 600, fontSize: 22, color: "#fff" }}>e</span>
        </span>
      ),
      light: (
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "0.04em" }}>
          <span style={{ fontWeight: 600, fontSize: 22, color: dark }}>Liv</span>
          <span style={{ fontWeight: 600, fontSize: 22, color: brass }}>space</span>
          <span style={{ fontWeight: 600, fontSize: 22, color: dark }}>e</span>
        </span>
      ),
    },
    {
      id: "C",
      label: "C — Fraunces 衬线 · Light Italic",
      dark: (
        <span style={{ fontFamily: "'Fraunces',serif", letterSpacing: "0.01em" }}>
          <span style={{ fontWeight: 300, fontSize: 30, fontStyle: "italic", color: "#fff" }}>Liv</span>
          <span style={{ fontWeight: 300, fontSize: 30, fontStyle: "italic", color: brass }}>space</span>
          <span style={{ fontWeight: 300, fontSize: 30, fontStyle: "italic", color: "#fff" }}>e</span>
        </span>
      ),
      light: (
        <span style={{ fontFamily: "'Fraunces',serif", letterSpacing: "0.01em" }}>
          <span style={{ fontWeight: 300, fontSize: 30, fontStyle: "italic", color: dark }}>Liv</span>
          <span style={{ fontWeight: 300, fontSize: 30, fontStyle: "italic", color: brass }}>space</span>
          <span style={{ fontWeight: 300, fontSize: 30, fontStyle: "italic", color: dark }}>e</span>
        </span>
      ),
    },
    {
      id: "D",
      label: "D — 混搭：L 用 Fraunces + ivspacee 用 Plus Jakarta",
      dark: (
        <span style={{ letterSpacing: "-0.01em" }}>
          <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: 32, fontStyle: "italic", color: "#fff" }}>L</span>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 26, color: "#fff" }}>iv</span>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 400, fontSize: 26, color: brass }}>space</span>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 26, color: "#fff" }}>e</span>
        </span>
      ),
      light: (
        <span style={{ letterSpacing: "-0.01em" }}>
          <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: 32, fontStyle: "italic", color: dark }}>L</span>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 26, color: dark }}>iv</span>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 400, fontSize: 26, color: brass }}>space</span>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 26, color: dark }}>e</span>
        </span>
      ),
    },
    {
      id: "E",
      label: "E — Plus Jakarta Sans · ExtraLight 极细 全小写 L大写",
      dark: (
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "0.08em" }}>
          <span style={{ fontWeight: 200, fontSize: 24, color: "#fff" }}>Liv</span>
          <span style={{ fontWeight: 300, fontSize: 24, color: brass }}>space</span>
          <span style={{ fontWeight: 200, fontSize: 24, color: "#fff" }}>e</span>
        </span>
      ),
      light: (
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "0.08em" }}>
          <span style={{ fontWeight: 200, fontSize: 24, color: dark }}>Liv</span>
          <span style={{ fontWeight: 300, fontSize: 24, color: brass }}>space</span>
          <span style={{ fontWeight: 200, fontSize: 24, color: dark }}>e</span>
        </span>
      ),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#F9F7F4", padding: "60px 40px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8906A", fontWeight: 500, marginBottom: 8 }}>Logo 方案预览</p>
      <h1 style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: 36, color: "#1A1917", marginBottom: 8 }}>选择你喜欢的版本</h1>
      <p style={{ fontSize: 13, color: "#7A756C", marginBottom: 60 }}>每个方案分别展示深色背景（导航栏默认）和浅色背景（滚动后）两种状态</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        {variants.map(v => (
          <div key={v.id} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontSize: 12, color: "#7A756C", margin: 0, letterSpacing: "0.05em" }}>{v.label}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
              {/* Dark background state */}
              <div style={{ background: "#1A1917", padding: "40px 48px", display: "flex", alignItems: "center", gap: 16 }}>
                {v.dark}
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>Hospitality</span>
              </div>
              {/* Light background state */}
              <div style={{ background: "#F9F7F4", padding: "40px 48px", display: "flex", alignItems: "center", gap: 16, border: "1px solid rgba(26,25,23,0.08)" }}>
                {v.light}
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,25,23,0.35)", fontWeight: 400 }}>Hospitality</span>
              </div>
            </div>
            {/* Small size preview */}
            <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "12px 0" }}>
              <span style={{ fontSize: 10, color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>小尺寸预览</span>
              <div style={{ transform: "scale(0.5)", transformOrigin: "left center" }}>{v.light}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 72, padding: "32px", background: "#fff", border: "1px solid rgba(26,25,23,0.08)" }}>
        <p style={{ fontSize: 13, color: "#7A756C", margin: 0 }}>告诉我你选哪个方案（A/B/C/D/E），我立刻替换进网站导航栏和页脚。</p>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <GlobalStyles />
      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", background: "#F9F7F4" }}>
        <Nav />
        <HeroSection />
        <WhyChooseUsSection />
        <StatsSection />
        <ProjectsSection />
        <ProcessSection />
        <ManufacturingSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
