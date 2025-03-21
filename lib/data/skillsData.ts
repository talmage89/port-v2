import { Skill } from "@/db/types";

export const skillsData: Omit<Skill, "id" | "order">[] = [
  {
    name: "React",
    category: "frontend",
    description:
      "A JS library for building user interfaces with reusable components. It allows for efficient updates and rendering through its virtual DOM implementation.",
  },
  {
    name: "TypeScript",
    category: "frontend",
    description:
      "A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds static types to JavaScript to help catch errors early and make code more maintainable.",
  },
  {
    name: "Next.js",
    category: "frontend",
    description:
      "A React framework that enables server-side rendering, static site generation, and other performance optimizations. It provides a streamlined development experience with built-in routing and API routes.",
  },
  {
    name: "Django",
    category: "backend",
    description:
      "A high-level Python web framework that encourages rapid development and clean, pragmatic design. It takes care of much of the hassle of web development so you can focus on writing your app.",
  },
  {
    name: "Django REST Framework",
    category: "backend",
    description:
      "A powerful and flexible toolkit for building Web APIs on top of Django. It provides features like serialization, authentication policies, and browsable APIs to simplify API development.",
  },
  {
    name: "CSS/SCSS",
    category: "frontend",
    description:
      "Cascading Style Sheets and its preprocessor Sass that allows for variables, nesting, and mixins. They are used to style web pages and create responsive, visually appealing user interfaces.",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    description:
      "A utility-first CSS framework that allows for rapid UI development through composable utility classes. It promotes consistency and reduces custom CSS by providing pre-defined design primitives.",
  },
  {
    name: "JavaScript",
    category: "frontend",
    description:
      "The programming language of the web that enables interactive web pages and browser-based applications. It allows for dynamic content updates, multimedia control, and complex user interactions.",
  },
  {
    name: "Node.js",
    category: "backend",
    description:
      "A JavaScript runtime built on Chrome's V8 JavaScript engine for building scalable network applications. It enables server-side JavaScript execution with an event-driven, non-blocking I/O model.",
  },
  {
    name: "PostgreSQL",
    category: "database",
    description:
      "A powerful, open-source object-relational database system with strong reputation for reliability and data integrity. It handles complex queries and large datasets while supporting advanced data types and indexing methods.",
  },
  {
    name: "Drizzle",
    category: "backend",
    description:
      "A lightweight TypeScript ORM focused on type safety and developer experience. It provides a SQL-like query builder with automatic migrations and database schema inference.",
  },
  {
    name: "Prisma",
    category: "backend",
    description:
      "A next-generation ORM that helps developers build faster and make fewer errors with an intuitive data model, automated migrations, and type-safety. It simplifies database workflows with a declarative schema and auto-generated queries.",
  },
  {
    name: "Supabase",
    category: "backend",
    description:
      "An open-source Firebase alternative providing ready-to-use backend features including database, authentication, and storage. It offers a PostgreSQL database with real-time capabilities and a simple API.",
  },
  {
    name: "Redis",
    category: "database",
    description:
      "An in-memory data structure store used as a database, cache, and message broker. It provides high performance and low latency access to data with support for various data structures.",
  },
  {
    name: "Celery",
    category: "backend",
    description:
      "A distributed task queue system for Python that enables asynchronous task execution. It handles background processing, scheduled tasks, and workload distribution for applications requiring deferred execution.",
  },
  {
    name: "Solid.js",
    category: "frontend",
    description:
      "A declarative JavaScript library for building user interfaces with a focus on performance and developer experience. It provides a virtual DOM implementation and a reactive state management system.",
  },
  {
    name: "Git",
    category: "devops",
    description:
      "A distributed version control system designed to handle projects with speed and efficiency. It tracks changes in source code during development and facilitates collaborative work among multiple developers.",
  },
  {
    name: "GitHub",
    category: "devops",
    description:
      "A cloud-based platform built around Git for version control and collaboration. It provides hosting for software development, code review, issue tracking, and project management tools.",
  },
  {
    name: "GitLab",
    category: "devops",
    description:
      "A complete DevOps platform delivered as a single application with Git repository management. It includes CI/CD, monitoring, and security features in an integrated workflow.",
  },
  {
    name: "Docker",
    category: "devops",
    description:
      "A platform for developing, shipping, and running applications in containers. It packages software and its dependencies together, ensuring consistent operation regardless of the environment.",
  },
  {
    name: "Digital Ocean",
    category: "cloud",
    description:
      "A cloud infrastructure provider focused on simplicity for developers. It offers virtual servers (Droplets), managed databases, and Kubernetes clusters with predictable pricing and scalability.",
  },
  {
    name: "Vercel",
    category: "cloud",
    description:
      "A cloud platform for static sites and serverless functions that enables developers to deploy instantly with zero configuration. It provides global CDN, continuous deployment, and preview deployments.",
  },
  {
    name: "Deployment",
    category: "devops",
    description:
      "The process of releasing code changes to production environments. It involves techniques like continuous integration, delivery pipelines, and monitoring to ensure reliable software releases.",
  },
  {
    name: "AutoGen (AG2)",
    category: "AI",
    description:
      "A framework for building complex multi-agent systems with LLMs that can collaborate autonomously. It enables creating conversational agents that can solve tasks together through structured communication.",
  },
  {
    name: "LangChain",
    category: "AI",
    description:
      "A framework for developing applications powered by language models through composability. It connects LLMs to other sources of data and allows them to interact with their environment.",
  },
  {
    name: "Hugging Face",
    category: "AI",
    description:
      "A platform providing tools, datasets, and pre-trained models for natural language processing tasks. It offers easy implementation of state-of-the-art AI models through its Transformers library.",
  },
  {
    name: "MCP",
    category: "AI",
    description:
      "Model Control Protocol, a standard for large language model integrations. It enables controlled interactions with AI models while maintaining security and customization options.",
  },
  {
    name: "Cursor AI",
    category: "AI",
    description:
      "An AI-powered code editor designed to enhance developer productivity through intelligent code suggestions and generation. It combines the familiar VS Code interface with built-in AI assistance for coding tasks.",
  },
];
