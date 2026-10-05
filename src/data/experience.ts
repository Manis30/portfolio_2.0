import { ExperienceItem } from '../types';

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "gwc-data-ai",
    company: "GWC DATA.AI",
    role: "Trainee Software Engineer",
    period: "July 2026 – October 2026",
    description:
      "Selected as a Trainee Software Engineer and completed an intensive 12-week, 480-hour Full Stack Developer Training Program covering modern frontend, backend, databases, authentication, business intelligence, deployment, CI/CD, security, testing, and performance engineering.",
    trainingAreas: [
      {
        category: "Frontend",
        skills: "HTML5, CSS3, JavaScript, React, Tailwind CSS, TypeScript, Redux Toolkit",
      },
      {
        category: "Backend",
        skills: "Node.js, Express.js, REST APIs, WebSockets, middleware, validation",
      },
      {
        category: "Authentication & Security",
        skills: "JWT, refresh tokens, bcrypt, RBAC, CORS, security headers, validation",
      },
      {
        category: "Databases",
        skills: "MySQL, MongoDB, Mongoose, Sequelize, normalization, transactions, aggregation, indexing, query optimization",
      },
      {
        category: "Business Intelligence",
        skills: "Domo, ETL, KPI dashboards, Beast Mode, data visualization",
      },
      {
        category: "DevOps & Cloud",
        skills: "Docker, Docker Compose, cloud deployment, GitHub Actions, CI/CD, monitoring, logging, testing, Redis and caching",
      },
    ],
  },
  {
    id: "avenstek-solutions",
    company: "Avenstek Solutions",
    role: "Junior Web Developer Intern",
    period: "December 2025 – May 2026",
    description:
      "Worked on a production MERN e-commerce platform with 8+ management modules and a Next.js storefront. Implemented SEO-friendly dynamic routing, Razorpay integration, JWT authentication, RBAC, password reset, and email verification. Architected centralized configurations and optimized global state with Zustand to minimize redundant re-renders.",
    highlights: [
      "Built and maintained production MERN platform with 8+ management modules (category, product, blog, FAQ, promotion, brand, shipment)",
      "Engineered Next.js storefront with dynamic routes and secure payment/auth lifecycles",
      "Architected centralized settings module reducing hardcoded parameters across codebase",
      "Optimized state management using Zustand, reducing unnecessary React re-renders",
    ],
    certificateUrl: "/certificates/Avenstek-Internship-Certificate.pdf",
  },
];
