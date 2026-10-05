import { Project } from '../types';

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "careflow",
    title: "CareFlow",
    category: "Full Stack Healthcare Management Platform",
    description:
      "A full-stack healthcare consultation and clinic management platform connecting patients, doctors and administrators through appointment, consultation and healthcare workflows.",
    longDescription:
      "CareFlow is a full-stack platform designed to connect patients, doctors, receptionists, organization administrators, and platform administrators through a centralized system. Built with React, Node.js, Express, and MongoDB, it handles the end-to-end patient appointment lifecycle, clinical consultations, role-based controls, and payment integrations.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Razorpay",
      "Tailwind CSS",
    ],
    image: "/images/projects/careflow.png",
    githubUrl: "https://github.com/Manis30/CareFlow",
    liveUrl: "https://care-flow-eosin.vercel.app/",
    workflowSteps: [
      "Patient",
      "Department",
      "Doctor",
      "Slot",
      "Booking",
      "Payment",
      "Receptionist Verification",
      "Doctor Consultation",
      "Prescription / Record",
      "Completed",
    ],
    features: [
      "JWT authentication with access & refresh tokens and secure HTTP-only cookies",
      "Role-Based Access Control (RBAC) across Super Admin, Organization Admin, Doctor, and Patient",
      "Complete appointment management with real-time status updates and availability slots",
      "Medical records, prescription management, and doctor-patient communication",
      "Seamless Razorpay payment gateway integration and clinic operations oversight",
    ],
    highlights: [
      "Full consultation lifecycle orchestration",
      "Multi-role RBAC architecture",
    ],
    problem:
      "Clinic workflows typically suffer from fragmented communication between receptionists, physicians, and billing desks, creating delays and booking conflicts.",
    solution:
      "CareFlow unifies the entire lifecycle into a deterministic state-machine workflow from initial booking to prescription issuance and clinic analytics.",
    featured: true,
  },
  {
    id: "codesphere",
    title: "CodeSphere",
    category: "Developer Social & Collaboration Platform",
    description:
      "A modern application for collaborative coding and creative development.",
    longDescription:
      "CodeSphere is a modern, full-featured developer social networking and collaboration platform. Designed specifically for software engineers and creators, it empowers developers to showcase their projects, connect with peers, discover talent by tech stack, and engage in real-time direct messaging powered by Appwrite Cloud and WebSockets.",
    technologies: [
      "React 19",
      "Vite 8",
      "Tailwind CSS v4",
      "React Router v7",
      "Appwrite Cloud",
      "WebSockets",
      "date-fns",
      "React Toastify",
    ],
    image: "/images/projects/codesphere.png",
    githubUrl: "https://github.com/Manis30/CodeSphere",
    liveUrl: "https://code-sphere-delta.vercel.app/",
    workflowSteps: [
      "Developer Signup",
      "Profile & Skills Matrix",
      "Tech Feed & Discovery",
      "Rich Post Creation",
      "Media Bucket Storage",
      "Real-time Direct Chat",
    ],
    architecture:
      "Client Browser (React 19 + Tailwind CSS + React Router) ⟷ HTTPS REST API + WebSocket Subscriptions ⟷ Appwrite Cloud (Auth, Database, Cloud Storage)",
    modules: [
      {
        name: "Authentication & Session Security",
        description:
          "Appwrite Account auth with Email/Password, Forgot/Reset Password flows, strict ProtectedRoute client guards, and online presence tracking with last-seen timestamps.",
      },
      {
        name: "Developer Feed & Social Engagement",
        description:
          "Chronological tech feed with interactive post cards, project links, engagement metrics (likes, comments, bookmarking), and relative timestamps powered by date-fns.",
      },
      {
        name: "Post Creation & Portfolio Showcase",
        description:
          "Rich post editor for technical breakthroughs, dynamic tagging (#react, #tailwindcss, #appwrite), media uploads via Appwrite Storage buckets, and dedicated 'My Posts' management.",
      },
      {
        name: "Developer Discovery & Explore",
        description:
          "Searchable community directory filtering developers by name and technical skills with designation, avatar, bio, and direct connect shortcuts.",
      },
      {
        name: "Real-Time Direct Messaging",
        description:
          "1-on-1 instant messaging powered by Appwrite WebSocket subscriptions (client.subscribe) for instant message delivery without manual polling and smooth auto-scroll.",
      },
      {
        name: "Comprehensive Developer Profiles",
        description:
          "Complete profile customization with avatars, cover images, headline, bio, location, technical skills matrix, social integrations (GitHub, LinkedIn, portfolio), and user activity stats.",
      },
    ],
    features: [
      "Appwrite Cloud authentication, session security, password recovery & protected routing",
      "Chronological developer feed with rich post editor, dynamic tech tagging & media storage",
      "1-on-1 real-time direct messaging with WebSocket subscriptions (client.subscribe) & auto-scroll",
      "Developer directory & explore module with real-time stack filtering & developer profile cards",
      "Comprehensive developer profiles with skills matrix, project links, activity stats & social handles",
    ],
    highlights: [
      "Appwrite Realtime WebSockets",
      "Live 1-on-1 Direct Messaging",
    ],
    problem:
      "Software engineers and tech creators often lack a dedicated platform focused exclusively on code sharing, project showcases, discovering peers by technical stack, and instant real-time collaboration.",
    solution:
      "CodeSphere integrates React 19, Tailwind CSS v4, and Appwrite Cloud into an edge-deployed platform with WebSocket-driven real-time messaging, media buckets, and instant developer discovery.",
    featured: true,
  },
  {
    id: "supplieriq",
    title: "SupplierIQ",
    category: "Enterprise Supplier Intelligence & Governance",
    description:
      "Enterprise supplier intelligence and governance application built for Domo Business Cloud with automated validation, document processing, risk analysis and human-in-the-loop review workflows.",
    longDescription:
      "SupplierIQ is an enterprise-grade supplier governance application created for the Domo Business Cloud platform. It incorporates automated validation pipelines, document OCR extraction, algorithmic risk scoring, and human-in-the-loop review queues with SLA enforcement.",
    technologies: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "amCharts 5",
      "Recharts",
      "Lucide",
      "Motion",
      "Domo Ryuu",
      "AppDB",
      "FileSets",
      "busboy",
    ],
    image: "/images/projects/supplieriq.png",
    githubUrl: "https://github.com/Manis30/SupplierIQ",
    isDomoRequestOnly: true,
    features: [
      "Autonomous multi-agent validation pipeline and document OCR extraction",
      "Algorithmic risk scoring and compliance verification across vendors",
      "Human-in-the-loop review queue with SLA tracking and automated email workflows",
      "Supplier 360 profile, geographic distribution across India with interactive map visualization",
      "Built with Domo Ryuu proxy, AppDB collections, and multipart document processing",
    ],
    highlights: [
      "Multi-agent validation pipeline",
      "Domo Business Cloud native",
    ],
    problem:
      "Enterprise vendor onboarding is hindered by manual document verification, opaque risk levels, and fragmented compliance audits.",
    solution:
      "An automated pipeline combines document parsing, automated compliance scoring, and review governance inside Domo Business Cloud.",
    featured: true,
  },
  {
    id: "careflow-intelligence",
    title: "CareFlow Intelligence",
    category: "Healthcare BI & Clinical Operations Analytics",
    description:
      "Enterprise healthcare BI and clinical operations analytics platform built around executive KPIs, operational trends, patient insights, doctor performance and financial analytics.",
    longDescription:
      "CareFlow Intelligence provides real-time visibility into encounter volumes, physician performance, patient demographics, clinical workflows, and hospital financial health across 25,000+ patient records using 15+ custom analytical visualizations.",
    technologies: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "ECharts",
      "Recharts",
      "Custom SVG",
      "Framer Motion",
      "Lucide",
      "TanStack Table",
      "Domo Ryuu",
    ],
    image: "/images/projects/careflow-intelligence.png",
    githubUrl: "https://github.com/Manis30/CareFlow-Intelligence-Dashboard",
    isDomoRequestOnly: true,
    highlights: ["25,000+ patient records", "15+ custom visualizations"],
    features: [
      "Executive overview with KPI bento, sparklines, and rolling performance micro-charts",
      "Dual-ring radial KPIs for encounter completion rate alongside visit type composition",
      "Interactive multi-granularity trend timelines across daily, weekly, and monthly views",
      "Department intelligence grid measuring patient loads, satisfaction ratings, and revenue attribution",
      "Specialized visualizations: FlowSankey, QuadrantScatter, CalendarHeatmap, and RevenueWaterfall",
    ],
    problem:
      "Hospital leadership frequently faces fragmented data silos between clinical operations, patient registries, and revenue realization.",
    solution:
      "CareFlow Intelligence centralizes hospital operations into an executive BI dashboard operating seamlessly on 25,000+ patient records.",
    featured: true,
  },
];

export const MORE_BUILDS: Project[] = [
  {
    id: "startup",
    title: "Startup",
    category: "Marketing Website",
    description:
      "Modern startup marketing website built with React, TypeScript, Vite and Tailwind CSS.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    image: "/images/projects/startup.png",
    githubUrl: "https://github.com/Manis30/startup",
    liveUrl: "https://startup-three-livid.vercel.app/",
    featured: false,
  },
  {
    id: "clarity",
    title: "Clarity",
    category: "Digital Agency Landing Page",
    description:
      "Modern digital-agency landing page built with HTML5, CSS3 and JavaScript.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Owl Carousel", "AOS"],
    image: "/images/projects/clarity.png",
    githubUrl: "https://github.com/Manis30/clarityLandingPage",
    liveUrl: "https://clarity-vert-theta.vercel.app/",
    featured: false,
  },
  {
    id: "landify",
    title: "Landify",
    category: "Agency & SaaS Landing Page",
    description:
      "Modern landing page for digital agencies and SaaS products.",
    technologies: ["React 19", "Vite", "Tailwind CSS"],
    image: "/images/projects/landify.png",
    githubUrl: "https://github.com/Manis30/Landify",
    liveUrl: "https://landify-one-plum.vercel.app/",
    featured: false,
  },
];
