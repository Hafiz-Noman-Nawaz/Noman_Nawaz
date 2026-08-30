require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Hero = require('./models/Hero');
const Project = require('./models/Project');
const Settings = require('./models/Settings');
const Testimonial = require('./models/Testimonial');
const Timeline = require('./models/Timeline');
const Certificate = require('./models/Certificate');

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/noman_portfolio';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // 1. Seed Admin User
    const adminEmail = 'nawaznoman7766@gmail.com';
    const adminPassword = '668626@Noman';

    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = new User({
        email: adminEmail,
        password: adminPassword,
        name: 'Noman Nawaz',
        role: 'admin',
      });
      await admin.save();
      console.log(`Admin user created: ${adminEmail}`);
    } else {
      admin.password = adminPassword;
      await admin.save();
      console.log(`Admin user updated: ${adminEmail}`);
    }

    // 2. Seed Hero Section
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({
        name: 'Noman Nawaz',
        title: 'Full-Stack MERN Developer & UI/UX Motion Designer',
        subtitle: "Crafting scalable full-stack web applications, high-contrast visual systems, and physics-driven micro-interactions with React, Node.js, and MongoDB.",
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        ctaText: 'Explore Projects',
        ctaLink: '#projects',
        availableForHire: true,
      });
      console.log('Hero section seeded');
    }

    // 3. Seed Settings / Contact Info
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        fullName: 'Noman Nawaz',
        email: 'nawaznoman7766@gmail.com',
        phone: '+92 300 1234567',
        location: 'Pakistan — Available Worldwide / Remote',
        bio: 'Full-stack developer working with React, Node.js, and MongoDB. I build products that are fast, visually striking, and engineered for high performance.',
        github: 'https://github.com/nomannawaz',
        linkedin: 'https://linkedin.com/in/nomannawaz',
        twitter: 'https://twitter.com/nomannawaz',
        instagram: 'https://instagram.com/nomannawaz',
      });
      console.log('Settings seeded');
    }

    // 4. Seed Projects if empty
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const sampleProjects = [
        {
          title: 'NexusAI — Workflow Automation Platform',
          date: '2025 - Present',
          thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
          gallery: [
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
          ],
          techStack: ['React 19', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Redis'],
          metrics: ['⚡ 99/100 Lighthouse', '<35ms API Latency', '10k+ Active Nodes'],
          description: 'An AI-driven enterprise orchestration dashboard handling real-time event monitoring across distributed systems with sub-second UI updates.',
          caseStudy: `## Overview\nNexusAI was developed to solve multi-stage pipeline latency in enterprise automated deployments.\n\n### Key Challenges\n- Real-time event streaming across 10,000+ nodes.\n- Sub-second UI updates without frame drops.\n\n### The Solution\nBuilt on a reactive MERN architecture paired with Redis pub/sub and high-contrast glassmorphic widgets for instant cognitive clarity.`,
          liveUrl: 'https://example.com/nexus-ai',
          githubUrl: 'https://github.com/nomannawaz/nexus-ai',
          featured: true,
          order: 1,
        },
        {
          title: 'AuraPay — Next-Gen Decentralized Fintech',
          date: '2024 - 2025',
          thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80',
          gallery: [
            'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80',
          ],
          techStack: ['React', 'Express.js', 'MongoDB', 'Cloudinary', 'Tailwind CSS'],
          metrics: ['$2.4M Volume Settled', '99.99% Uptime', 'Zero Chargebacks'],
          description: 'A frictionless crypto-fiat settlement engine with 3D interactive asset visualization and biometric security checkpoints.',
          caseStudy: `## Context\nAuraPay bridges fiat gateways with Web3 wallets. The user experience was built with 60fps smooth fluid transitions and high-contrast dark visual design.\n\n## Architecture & Security\nImplemented multi-sig escrow with optimistic UI rollbacks and AES-256 encrypted payload channels.`,
          liveUrl: 'https://example.com/aurapay',
          githubUrl: 'https://github.com/nomannawaz/aurapay',
          featured: true,
          order: 2,
        },
        {
          title: 'Vortex Studio — Collaborative Motion Canvas',
          date: '2024',
          thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
          gallery: [
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
          ],
          techStack: ['React', 'Node.js', 'WebSockets', 'Canvas API', 'Tailwind CSS'],
          metrics: ['60 FPS WebGL', '<2KB Delta Packets', '100% Client-Side Sync'],
          description: 'Real-time multi-user animation and prototyping canvas allowing designers and developers to co-create interactive keyframe curves.',
          caseStudy: `## Technical Feat\nImplemented custom WebGL/Canvas rendering pipeline with delta compression over WebSockets for zero-lag collaborative staging.`,
          liveUrl: 'https://example.com/vortex',
          githubUrl: 'https://github.com/nomannawaz/vortex-canvas',
          featured: true,
          order: 3,
        },
      ];

      await Project.insertMany(sampleProjects);
      console.log('Sample projects seeded');
    }

    // 5. Seed Testimonials if empty
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      const sampleTestimonials = [
        {
          name: 'Sarah Jenkins',
          role: 'Head of Product',
          company: 'HyperScale AI',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
          content: 'Noman is one of the rare full-stack developers who truly understands the nuance of motion design and performance. He turned our complex dashboard into a work of art that our customers love.',
          rating: 5,
          order: 1,
        },
        {
          name: 'David Chen',
          role: 'CTO & Co-Founder',
          company: 'AuraPay Global',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          content: 'Working with Noman was an absolute pleasure. His MERN stack mastery, attention to code quality, and proactive communication made our product launch effortless and fast.',
          rating: 5,
          order: 2,
        },
        {
          name: 'Elena Rostova',
          role: 'Design Director',
          company: 'Vortex Interactive',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          content: 'High-contrast typography, silky smooth micro-interactions, and pristine backend architecture. Noman delivers top-tier engineering every single time.',
          rating: 5,
          order: 3,
        },
      ];

      await Testimonial.insertMany(sampleTestimonials);
      console.log('Testimonials seeded');
    }

    // 6. Seed Timeline if empty
    const timelineCount = await Timeline.countDocuments();
    if (timelineCount === 0) {
      const sampleTimeline = [
        {
          year: '2024 — Present',
          title: 'Lead Full-Stack MERN & Motion Engineer',
          company: 'HyperScale Systems',
          description: 'Architecting high-frequency real-time web applications, managing microservices with Docker, and engineering 60fps physics animations.',
          type: 'work',
          order: 1,
        },
        {
          year: '2023 — 2024',
          title: 'Senior Frontend & Motion Developer',
          company: 'Vortex Interactive Studio',
          description: 'Created collaborative WebGL animation canvases, bespoke client visual design systems, and sub-30ms WebSocket syncing pipelines.',
          type: 'work',
          order: 2,
        },
        {
          year: '2022 — 2023',
          title: 'Full-Stack JavaScript Developer',
          company: 'Nexus Innovations',
          description: 'Developed scalable REST APIs with Express.js, integrated JWT authorization systems, and built responsive React user interfaces.',
          type: 'work',
          order: 3,
        },
        {
          year: '2022',
          title: 'B.S. in Computer Science (Honors)',
          company: 'University Graduate',
          description: 'Graduated with high honors focusing on Distributed Systems, Cloud Architecture, and Interactive Human-Computer Graphics.',
          type: 'education',
          order: 4,
        },
      ];

      await Timeline.insertMany(sampleTimeline);
      console.log('Timeline seeded');
    }

    // 7. Seed Certificates if empty
    const certCount = await Certificate.countDocuments();
    if (certCount === 0) {
      const sampleCertificates = [
        {
          title: 'Meta Certified Full-Stack Developer',
          issuer: 'Meta / Coursera',
          issueDate: '2025',
          credentialUrl: 'https://coursera.org/verify/meta-fullstack',
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
          badgeColor: 'blue',
          order: 1,
        },
        {
          title: 'MongoDB Certified Node.js Developer',
          issuer: 'MongoDB University',
          issueDate: '2024',
          credentialUrl: 'https://university.mongodb.com/credentials',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
          badgeColor: 'emerald',
          order: 2,
        },
        {
          title: 'AWS Certified Cloud Practitioner',
          issuer: 'Amazon Web Services',
          issueDate: '2024',
          credentialUrl: 'https://aws.amazon.com/verification',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80',
          badgeColor: 'amber',
          order: 3,
        },
      ];

      await Certificate.insertMany(sampleCertificates);
      console.log('Certificates seeded');
    }

    console.log('Database seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
