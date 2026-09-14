import { UserProfile, Project, SkillCategory, Experience, Education } from '../types';

export const defaultProfile: UserProfile = {
  name: 'Yug Gupta',
  title: 'Full-Stack Developer & AI/LLM Engineer',
  tagline: 'Building production-grade full-stack applications and GraphRAG-powered AI systems with React, Node.js, and AWS.',
  location: 'Ghaziabad, Uttar Pradesh, India',
  email: 'yuggupta905@gmail.com',
  phone: '+91-8081697640',
  availability: 'Available for full-time',
  bioParagraphs: [
    "I'm a B.Tech (CSIT) student at KIET Group of Institutions with strong foundations in full-stack web development, AI/LLM-powered systems, data structures & algorithms, and cloud computing. I have engineered and deployed production-grade full-stack applications and a Python-based LLM/graph-database system, containerized with Docker and backed by CI/CD pipelines.",
    "My core stack spans React.js, Node.js, Express.js, and MongoDB on the web side, and Python, Neo4j, and the Google Gemini API for AI — with AWS, Docker, and CI/CD for deployment. I care about clean architecture, secure APIs with JWT authentication, and fast, well-crafted user interfaces.",
    'Beyond building, I am an active open-source contributor and competitive programmer with 500+ DSA problems solved across LeetCode, CodeChef, and HackerRank. I hold the AWS Certified Solutions Architect – Associate and AWS Certified Developer – Associate credentials, and I enjoy turning complex problems into reliable, well-structured software.'
  ],
  stats: [
    { label: 'DSA Problems Solved', value: '500+', description: 'Across LeetCode, CodeChef & HackerRank' },
    { label: 'AWS Certifications', value: '3', description: 'Solutions Architect, Developer & Cloud Practitioner' },
    { label: 'LeetCode Rating', value: '1400+', description: 'Top 65% globally in contests' },
    { label: 'Merged Pull Requests', value: '3', description: 'GSSoC 2026 open-source contributions' }
  ],
  socialLinks: {
    github: 'https://github.com/Yug-Gupta',
    linkedin: 'https://www.linkedin.com/in/guptayug/',
    email: 'mailto:yuggupta905@gmail.com'
  },
  interests: [
    'Full-Stack Web Development (MERN)',
    'AI/LLM Integration & GraphRAG',
    'Knowledge Graphs & Neo4j',
    'Data Structures & Algorithms',
    'Cloud Computing & DevOps (AWS)'
  ]
};

export const defaultProjects: Project[] = [
  {
    id: 'nexora',
    title: 'Nexora — Knowledge Graph Intelligence Engine',
    tagline: 'GraphRAG question-answering engine with multi-hop, cross-document reasoning.',
    category: 'AI & Tools',
    description: 'A GraphRAG-based question-answering engine that extracts entities and relationships from documents into a Neo4j knowledge graph, enabling reasoning beyond simple keyword search.',
    fullDescription: 'Nexora is an AI-powered knowledge graph intelligence engine. It extracts entities and relationships from documents into a Neo4j graph, then runs a multi-hop retrieval pipeline that ranks seed entities, traverses relationships across hops, and delivers grounded evidence to the Google Gemini API for citation-verified answers. It is deployed to production on Streamlit Community Cloud with Neo4j AuraDB, containerized with Docker Compose, and backed by a GitHub Actions CI pipeline that automates linting and testing across Python 3.10–3.12.',
    technologies: ['Python', 'Neo4j', 'Google Gemini API', 'GraphRAG', 'Streamlit', 'Docker', 'GitHub Actions'],
    features: [
      'GraphRAG-based Q&A engine that builds a Neo4j knowledge graph from documents for multi-hop, cross-document reasoning',
      'Multi-hop retrieval pipeline that ranks seed entities, traverses relationship hops, and delivers grounded evidence to the Gemini API',
      'Citation-verified answers that trace every claim back to source evidence in the graph',
      'Deployed on Streamlit Community Cloud with Neo4j AuraDB, Docker Compose, and GitHub Actions CI across Python 3.10–3.12'
    ],
    metrics: [
      { label: 'Reasoning', value: 'Multi-hop' },
      { label: 'Answers', value: 'Citation-verified' },
      { label: 'CI Matrix', value: 'Python 3.10–3.12' }
    ],
    demoUrl: 'https://nexoraengine.streamlit.app/',
    githubUrl: 'https://github.com/Yug-Gupta/Nexora',
    featured: true,
    year: '2025',
    role: 'Creator & Developer'
  },
  {
    id: 'taskflow',
    title: 'TaskFlow — Task Management Platform',
    tagline: 'Full-stack task manager with JWT authentication and role-based access control.',
    category: 'Full Stack',
    description: 'A full-stack task management application with JWT-based authentication, role-based access control, and persistent MongoDB storage via RESTful APIs.',
    fullDescription: 'TaskFlow is a production-deployed full-stack task management platform built on the MERN stack. It implements JWT-based authentication and role-based access control, persistent MongoDB storage through RESTful APIs for real-time productivity tracking across user roles, and global state management with Zustand to reduce prop-drilling and improve component re-render efficiency.',
    technologies: ['React.js', 'Vite', 'Zustand', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    features: [
      'JWT-based authentication with role-based access control across user roles',
      'Persistent MongoDB storage with RESTful APIs for real-time productivity tracking',
      'Optimized global state management with Zustand, reducing prop-drilling and improving re-render efficiency',
      'Deployed as a production full-stack application with a decoupled React front-end and Express API'
    ],
    metrics: [
      { label: 'Auth', value: 'JWT + RBAC' },
      { label: 'Database', value: 'MongoDB' },
      { label: 'State', value: 'Zustand' }
    ],
    demoUrl: 'https://taskflow-smbc.onrender.com',
    githubUrl: 'https://github.com/Yug-Gupta/Task-Flow',
    featured: false,
    year: '2025',
    role: 'Full-Stack Developer'
  }
];

export const defaultSkillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'Core languages used for problem solving, scripting, and application development',
    skills: [
      { name: 'Java', level: 88, category: 'Languages', experienceYears: '2 yrs', isKey: true },
      { name: 'Python', level: 90, category: 'Languages', experienceYears: '2 yrs', isKey: true },
      { name: 'C', level: 82, category: 'Languages', experienceYears: '2 yrs', isKey: false },
      { name: 'JavaScript', level: 92, category: 'Languages', experienceYears: '3 yrs', isKey: true }
    ]
  },
  {
    title: 'Web Development',
    description: 'Component-driven front-ends, state management, and modern build tooling',
    skills: [
      { name: 'React.js', level: 90, category: 'Frontend', experienceYears: '2 yrs', isKey: true },
      { name: 'HTML', level: 94, category: 'Frontend', experienceYears: '3 yrs', isKey: true },
      { name: 'CSS', level: 92, category: 'Frontend', experienceYears: '3 yrs', isKey: true },
      { name: 'Zustand', level: 85, category: 'Frontend', experienceYears: '1 yr', isKey: false },
      { name: 'Redux Toolkit', level: 80, category: 'Frontend', experienceYears: '1 yr', isKey: false },
      { name: 'Vite', level: 84, category: 'Frontend', experienceYears: '1 yr', isKey: false }
    ]
  },
  {
    title: 'Backend & Databases',
    description: 'API design, authentication, and relational, document, and graph databases',
    skills: [
      { name: 'Node.js', level: 88, category: 'Backend', experienceYears: '2 yrs', isKey: true },
      { name: 'Express.js', level: 88, category: 'Backend', experienceYears: '2 yrs', isKey: true },
      { name: 'REST APIs', level: 90, category: 'Backend', experienceYears: '2 yrs', isKey: true },
      { name: 'JWT Authentication', level: 86, category: 'Backend', experienceYears: '2 yrs', isKey: true },
      { name: 'MongoDB', level: 88, category: 'Backend', experienceYears: '2 yrs', isKey: true },
      { name: 'MySQL', level: 80, category: 'Backend', experienceYears: '2 yrs', isKey: false },
      { name: 'PostgreSQL', level: 76, category: 'Backend', experienceYears: '1 yr', isKey: false },
      { name: 'Neo4j (Graph Database)', level: 82, category: 'Backend', experienceYears: '1 yr', isKey: true }
    ]
  },
  {
    title: 'AI/LLM & Data',
    description: 'LLM integration, retrieval pipelines, and knowledge-graph engineering',
    skills: [
      { name: 'LLM Integration (Google Gemini API)', level: 86, category: 'AI', experienceYears: '1 yr', isKey: true },
      { name: 'GraphRAG', level: 84, category: 'AI', experienceYears: '1 yr', isKey: true },
      { name: 'Knowledge Graphs', level: 84, category: 'AI', experienceYears: '1 yr', isKey: false },
      { name: 'Prompt Engineering', level: 85, category: 'AI', experienceYears: '1 yr', isKey: false }
    ]
  },
  {
    title: 'Cloud & DevOps',
    description: 'AWS infrastructure, containerization, Linux, and automated delivery',
    skills: [
      { name: 'AWS (EC2, S3, IAM, VPC, Lambda, API Gateway, CloudWatch, RDS)', level: 84, category: 'Cloud', experienceYears: '2 yrs', isKey: true },
      { name: 'Docker', level: 85, category: 'Cloud', experienceYears: '2 yrs', isKey: true },
      { name: 'Docker Compose', level: 83, category: 'Cloud', experienceYears: '2 yrs', isKey: false },
      { name: 'Linux', level: 84, category: 'Cloud', experienceYears: '2 yrs', isKey: true },
      { name: 'Git & GitHub', level: 92, category: 'Cloud', experienceYears: '3 yrs', isKey: true },
      { name: 'CI/CD (GitHub Actions)', level: 82, category: 'Cloud', experienceYears: '1 yr', isKey: false }
    ]
  },
  {
    title: 'CS Fundamentals',
    description: 'Computer science foundations backing day-to-day engineering decisions',
    skills: [
      { name: 'Data Structures & Algorithms', level: 90, category: 'Fundamentals', experienceYears: '3 yrs', isKey: true },
      { name: 'Object-Oriented Programming (OOP)', level: 88, category: 'Fundamentals', experienceYears: '3 yrs', isKey: true },
      { name: 'DBMS', level: 84, category: 'Fundamentals', experienceYears: '2 yrs', isKey: false },
      { name: 'Operating Systems', level: 82, category: 'Fundamentals', experienceYears: '2 yrs', isKey: false },
      { name: 'Computer Networks', level: 80, category: 'Fundamentals', experienceYears: '2 yrs', isKey: false },
      { name: 'System Design', level: 78, category: 'Fundamentals', experienceYears: '1 yr', isKey: false }
    ]
  }
];

export const defaultExperiences: Experience[] = [
  {
    id: 'exp-gssoc',
    role: 'Open Source Contributor',
    company: 'GirlScript Summer of Code (GSSoC) 2026',
    location: 'Remote',
    period: '2026',
    type: 'Open Source',
    description: 'Contributed production fixes to the ultimatehealth open-source project during GSSoC 2026.',
    highlights: [
      'Delivered 3 merged pull requests to the ultimatehealth project — resolving a login-flow visibility & recovery issue, an article-slider navigation bug, and a password-visibility accessibility gap.'
    ],
    technologies: ['JavaScript', 'HTML', 'CSS', 'Accessibility', 'Git', 'GitHub']
  },
  {
    id: 'exp-kiet-club',
    role: 'Coordinator — Web Development',
    company: 'School of UI/UX Club, KIET Group of Institutions',
    location: 'Ghaziabad, India',
    period: '2024 – 2025',
    type: 'Leadership',
    description: 'Led web development initiatives for the School of UI/UX Club, organizing hands-on workshops for student developers.',
    highlights: [
      'Spearheaded 2+ web development workshops, reaching 60+ students with hands-on coding sessions.'
    ],
    technologies: ['Web Development', 'HTML', 'CSS', 'JavaScript']
  }
];

export const defaultEducations: Education[] = [
  {
    id: 'edu-btech',
    degree: 'B.Tech (CSIT)',
    institution: 'KIET Group of Institutions',
    location: 'Ghaziabad, Uttar Pradesh',
    period: 'Aug 2024 – May 2028',
    grade: 'CGPA: 8.06/10',
    details: 'Focus areas: Full-Stack Web Development, AI/LLM Systems, Data Structures & Algorithms, and Cloud Computing.',
    description: 'Pursuing a Bachelor of Technology in Computer Science & Information Technology.'
  },
  {
    id: 'edu-xii',
    degree: 'Class XII (Senior Secondary)',
    institution: 'SDSK Int. Public School',
    location: 'Jhinjhak, Kanpur',
    period: '2023',
    grade: '82%',
    description: 'Completed senior secondary education with 82%.'
  },
  {
    id: 'edu-x',
    degree: 'Class X (Secondary)',
    institution: 'Krishna Public School',
    location: 'Sikandra Dehat, Kanpur',
    period: '2021',
    grade: '76.4%',
    description: 'Completed secondary education with 76.4%.'
  }
];
