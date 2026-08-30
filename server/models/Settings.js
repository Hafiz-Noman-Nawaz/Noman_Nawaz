const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      default: 'Noman Nawaz',
    },
    email: {
      type: String,
      default: 'nawaznoman7766@gmail.com',
    },
    phone: {
      type: String,
      default: '+92 300 1234567',
    },
    location: {
      type: String,
      default: 'Available Worldwide / Remote',
    },
    bio: {
      type: String,
      default: 'Passionate Full-Stack MERN Developer and UI/UX Motion Designer focused on building dynamic, high-performance web applications and fluid interactive animations.',
    },
    github: {
      type: String,
      default: 'https://github.com/nomannawaz',
    },
    linkedin: {
      type: String,
      default: 'https://linkedin.com/in/nomannawaz',
    },
    twitter: {
      type: String,
      default: 'https://twitter.com/nomannawaz',
    },
    instagram: {
      type: String,
      default: 'https://instagram.com/nomannawaz',
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    skills: {
      type: [String],
      default: [
        'React', 'Node.js', 'Express', 'MongoDB', 'TypeScript',
        'Tailwind CSS', 'Next.js', 'PostgreSQL', 'Redis', 'GraphQL',
        'Docker', 'AWS', 'Prisma', 'Vite', 'REST APIs',
        'Framer Motion', 'GSAP', 'Figma', 'Git', 'CI/CD',
        'WebSockets', 'JWT Auth', 'Cloudinary', 'Mongoose', 'Zustand',
        'React Query', 'Vercel', 'Python', 'Canvas API', 'Three.js',
      ],
    },
    statusText: {
      type: String,
      default: 'Crafting Next-Gen Web Systems',
    },
    currentActivity: {
      type: String,
      default: 'Building with React 19, Motion & WebGL',
    },
    musicTrack: {
      type: String,
      default: 'Lofi Cyberpunk Coding Beats',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
