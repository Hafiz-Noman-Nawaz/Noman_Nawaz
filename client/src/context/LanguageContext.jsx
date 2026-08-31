import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    nav: {
      work: 'Work',
      skills: 'Skills',
      experience: 'Experience',
      certifications: 'Certifications',
      testimonials: 'Testimonials',
      contact: 'Contact',
      resume: 'Resume',
      search: 'Search',
      hireMe: 'Hire Me',
    },
    hero: {
      badge: 'Available for Global Full-Time & High-Impact Contracts',
      ctaExplore: 'Explore Projects',
      ctaContact: 'Get In Touch',
      ctaEstimator: 'Scope Estimator',
      ctaHire: 'Hire Fast-Track',
    },
    sections: {
      skillsTitle: 'Core Technical Arsenal',
      skillsDesc: 'A curated inventory of programming languages, distributed backend runtimes, reactive frontends, and database engines.',
      projectsTitle: 'Featured Engineering Case Studies',
      projectsDesc: 'High-performance web applications, interactive physics sandboxes, and enterprise architectures built with modern stacks.',
      radarTitle: 'Architecture & Performance Radar',
      radarDesc: 'Empirical benchmarks and technical mastery across full-stack engineering disciplines.',
      codeTitle: 'Architecture & Live Code Snippets',
      codeDesc: 'Select a core module below and click "Run Snippet" to test live simulated execution in the runtime terminal.',
      githubTitle: 'Open-Source & GitHub Cadence',
      timelineTitle: 'Career Journey & Milestones',
      certTitle: 'Verified Accreditations & Honors',
      testimonialsTitle: 'Peer & Client Recommendations',
      contactTitle: "Let's Build Something Exceptional Together",
      contactDesc: 'Have a high-impact project or an engineering role? Send a message and I will reply within 24 hours.',
    },
    contact: {
      namePlaceholder: 'Your Full Name',
      emailPlaceholder: 'your.email@company.com',
      messagePlaceholder: 'Tell me about your project or role requirements...',
      sendBtn: 'Send Message',
      sendingBtn: 'Transmitting...',
      successMsg: 'Transmission received! I will get back to you shortly.',
    },
  },
  ur: {
    nav: {
      work: 'کام',
      skills: 'مہارتیں',
      experience: 'تجربہ',
      certifications: 'اسناد',
      testimonials: 'آراء',
      contact: 'رابطہ',
      resume: 'سی وی',
      search: 'تلاش',
      hireMe: 'ہائر کریں',
    },
    hero: {
      badge: 'عالمی ملازمت اور پروجیکٹس کے لیے دستیاب',
      ctaExplore: 'پروجیکٹس دیکھیں',
      ctaContact: 'رابطہ کریں',
      ctaEstimator: 'پروجیکٹ تخمینہ',
      ctaHire: 'فوری ہائرنگ',
    },
    sections: {
      skillsTitle: 'تکنیکی مہارتیں اور ٹولز',
      skillsDesc: 'پروگرامنگ زبانوں، بیک اینڈ سروسز، ری ایکٹو فرنٹ اینڈز اور ڈیٹا بیس سسٹمز کا جدید ترین مجموعہ۔',
      projectsTitle: 'منتخب سافٹ ویئر کیس اسٹڈیز',
      projectsDesc: 'جدید فل اسٹیک ٹیکنالوجی، اینیمیشنز اور جدید ترین آرکیٹیکچر پر مبنی پروجیکٹس۔',
      radarTitle: 'آرکیٹیکچر اور کارکردگی کا معیار',
      radarDesc: 'سافٹ ویئر انجینئرنگ کے مختلف شعبوں میں رفتار، کارکردگی اور سیکیورٹی کا تجزیہ۔',
      codeTitle: 'لائیو کوڈ اور انٹرایکٹو سکرپٹس',
      codeDesc: 'کسی بھی ماڈیول کا انتخاب کریں اور رن بٹن دبا کر لائیو عملدرآمد دیکھیں۔',
      githubTitle: 'گٹ ہب اوپن سورس سرگرمیاں',
      timelineTitle: 'کیریئر کا سفر اور سنگ میل',
      certTitle: 'تصدیق شدہ سرٹیفکیٹس اور اعزازات',
      testimonialsTitle: 'کلائنٹس اور ساتھیوں کے تاثرات',
      contactTitle: 'آئیے مل کر کچھ شاندار بناتے ہیں',
      contactDesc: 'کیا آپ کے پاس کوئی پروجیکٹ ہے؟ مجھے میسج بھیجیں، میں جلد جواب دوں گا۔',
    },
    contact: {
      namePlaceholder: 'آپ کا پورا نام',
      emailPlaceholder: 'آپ کی ای میل',
      messagePlaceholder: 'اپنے پروجیکٹ کے بارے میں تفصیل بتائیں...',
      sendBtn: 'پیغام بھیجیں',
      sendingBtn: 'بھیجا جا رہا ہے...',
      successMsg: 'آپ کا پیغام مل گیا! میں جلد رابطہ کروں گا۔',
    },
  },
  de: {
    nav: {
      work: 'Projekte',
      skills: 'Skills',
      experience: 'Erfahrung',
      certifications: 'Zertifikate',
      testimonials: 'Referenzen',
      contact: 'Kontakt',
      resume: 'Lebenslauf',
      search: 'Suche',
      hireMe: 'Anstellen',
    },
    hero: {
      badge: 'Verfügbar für weltweite Vollzeit- & Projektverträge',
      ctaExplore: 'Projekte Entdecken',
      ctaContact: 'Kontakt Aufnehmen',
      ctaEstimator: 'Umfangsrechner',
      ctaHire: 'Direkt Anfragen',
    },
    sections: {
      skillsTitle: 'Technologisches Arsenal',
      skillsDesc: 'Ein kuratiertes Inventar aus modernen Programmiersprachen, Cloud-Architekturen und reaktiven Benutzeroberflächen.',
      projectsTitle: 'Ausgewählte Fallstudien',
      projectsDesc: 'Hochperformante Webanwendungen und verteilte Systeme auf Enterprise-Niveau.',
      radarTitle: 'Architektur- & Performance-Radar',
      radarDesc: 'Empirische Benchmarks und technische Meisterschaft in allen Full-Stack-Disziplinen.',
      codeTitle: 'Live-Code & Architektur-Module',
      codeDesc: 'Wählen Sie ein Modul und führen Sie interaktive Snippets in Echtzeit aus.',
      githubTitle: 'Open-Source & GitHub-Aktivität',
      timelineTitle: 'Beruflicher Werdegang',
      certTitle: 'Verifizierte Zertifizierungen',
      testimonialsTitle: 'Kundenstimmen & Empfehlungen',
      contactTitle: 'Lassen Sie uns Großes erschaffen',
      contactDesc: 'Haben Sie ein spannendes Projekt? Ich freue mich auf Ihre Nachricht.',
    },
    contact: {
      namePlaceholder: 'Ihr vollständiger Name',
      emailPlaceholder: 'ihre.email@firma.de',
      messagePlaceholder: 'Beschreiben Sie Ihr Projekt oder Ihre Anforderungen...',
      sendBtn: 'Nachricht Senden',
      sendingBtn: 'Wird übermittelt...',
      successMsg: 'Nachricht erhalten! Ich antworte innerhalb von 24 Stunden.',
    },
  },
  es: {
    nav: {
      work: 'Proyectos',
      skills: 'Habilidades',
      experience: 'Experiencia',
      certifications: 'Certificados',
      testimonials: 'Testimonios',
      contact: 'Contacto',
      resume: 'Currículum',
      search: 'Buscar',
      hireMe: 'Contratar',
    },
    hero: {
      badge: 'Disponible para contratos remotos globales y tiempo completo',
      ctaExplore: 'Explorar Proyectos',
      ctaContact: 'Contactar',
      ctaEstimator: 'Estimador',
      ctaHire: 'Contratar',
    },
    sections: {
      skillsTitle: 'Arsenal Tecnológico',
      skillsDesc: 'Un inventario de lenguajes de programación, backend escalables y frontend reactivos.',
      projectsTitle: 'Estudios de Caso de Ingeniería',
      projectsDesc: 'Aplicaciones web de alto rendimiento y arquitecturas empresariales modernas.',
      radarTitle: 'Radar de Arquitectura y Rendimiento',
      radarDesc: 'Métricas empíricas y maestría técnica en ingeniería full-stack.',
      codeTitle: 'Código en Vivo y Fragmentos',
      codeDesc: 'Selecciona un módulo y ejecuta código simulado en tiempo real.',
      githubTitle: 'Actividad en GitHub y Código Abierto',
      timelineTitle: 'Trayectoria y Logros',
      certTitle: 'Certificaciones Verificadas',
      testimonialsTitle: 'Recomendaciones de Clientes',
      contactTitle: 'Construyamos algo extraordinario',
      contactDesc: '¿Tienes un proyecto de alto impacto? Escríbeme y responderé en 24 horas.',
    },
    contact: {
      namePlaceholder: 'Tu nombre completo',
      emailPlaceholder: 'tu.correo@empresa.com',
      messagePlaceholder: 'Cuéntame sobre los requisitos de tu proyecto...',
      sendBtn: 'Enviar Mensaje',
      sendingBtn: 'Enviando...',
      successMsg: '¡Mensaje recibido! Me pondré en contacto contigo pronto.',
    },
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('noman_lang') || 'en';
  });

  const changeLanguage = (newLang) => {
    if (translations[newLang]) {
      setLang(newLang);
      localStorage.setItem('noman_lang', newLang);
    }
  };

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;
