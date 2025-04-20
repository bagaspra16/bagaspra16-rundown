import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaCode, FaShieldAlt, FaBrain, FaArrowRight, FaChevronDown } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import { projects, totalWeeks } from '@/data/projectData';

export default function Home() {
  const featuredProjects = projects.slice(0, 6);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(0);
  
  const totalAIProjects = projects.filter(p => p.field.includes('AI')).length;
  const totalCybersecurityProjects = projects.filter(p => p.field.includes('Cybersecurity')).length;
  const totalPsychologyProjects = projects.filter(p => p.field.includes('Psychology')).length;
  
  // Handle scroll events for parallax and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveSection(index);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to next section when clicking the scroll indicator
  const scrollToNextSection = () => {
    const sections = document.querySelectorAll('section');
    if (activeSection < sections.length - 1) {
      const nextSection = sections[activeSection + 1];
      window.scrollTo({
        top: nextSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  // Get field color for visual indicators
  const getFieldColor = (field: string) => {
    if (field.includes('AI')) return 'text-blue-400';
    if (field.includes('Cybersecurity')) return 'text-yellow-400';
    return 'text-green-400';
  };
  
  return (
    <>
      <Head>
        <title>Portfolio Projects Timeline</title>
        <meta name="description" content="Timeline dan galeri 30 proyek portfolio untuk fullstack, backend, dan cybersecurity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="min-h-screen overflow-hidden">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden pt-16">
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"
              style={{ 
                transform: `translate(${scrollY * 0.05}px, ${scrollY * -0.03}px)` 
              }}
            ></div>
            <div 
              className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl"
              style={{ 
                transform: `translate(${scrollY * -0.05}px, ${scrollY * 0.03}px)` 
              }}
            ></div>
          </div>
          
          <div className="container mx-auto px-4 pt-12 pb-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h5 className="text-primary mb-3 font-semibold text-sm">ROADMAP PORTFOLIO PROYEK</h5>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-gradient">30 Proyek</span> untuk <br />
                  <span className="text-gradient">Bagaspra16</span>
                </h1>
                <p className="text-text-secondary text-sm sm:text-base mb-6">
                  Rencana pengerjaan 30 proyek portfolio selama 60 minggu dengan fokus pada AI, Cybersecurity dan Psikologi.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/timeline" className="btn-primary text-sm sm:text-base py-2 px-4 sm:px-6">
                      Lihat Timeline
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/gallery" className="btn-outline text-sm sm:text-base py-2 px-4 sm:px-6">
                      Galeri Proyek
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div
                className="relative mt-8 lg:mt-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-background-light rounded-xl p-4 sm:p-5 shadow-neon relative z-10">
                  <h3 className="text-lg font-bold mb-3">Ringkasan Proyek</h3>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-background-lighter p-3 rounded-lg text-center">
                      <p className="text-xl sm:text-2xl font-bold text-primary mb-0.5">{projects.length}</p>
                      <p className="text-xs text-text-secondary">Total Proyek</p>
                    </div>
                    <div className="bg-background-lighter p-3 rounded-lg text-center">
                      <p className="text-xl sm:text-2xl font-bold text-primary mb-0.5">{totalWeeks}</p>
                      <p className="text-xs text-text-secondary">Minggu</p>
                    </div>
                    <div className="bg-background-lighter p-3 rounded-lg text-center">
                      <p className="text-xl sm:text-2xl font-bold text-primary mb-0.5">3</p>
                      <p className="text-xs text-text-secondary">Kategori</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <FaBrain className="text-blue-400 text-xs" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-0.5">
                          <span className="text-xs">AI</span>
                          <span className="text-xs text-primary">{totalAIProjects} proyek</span>
                        </div>
                        <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                          <motion.div 
                            className="bg-blue-400 h-full rounded-full" 
                            initial={{ width: 0 }}
                            animate={{ width: `${(totalAIProjects / projects.length) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        <FaShieldAlt className="text-yellow-400 text-xs" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-0.5">
                          <span className="text-xs">Cybersecurity</span>
                          <span className="text-xs text-primary">{totalCybersecurityProjects} proyek</span>
                        </div>
                        <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                          <motion.div 
                            className="bg-yellow-400 h-full rounded-full" 
                            initial={{ width: 0 }}
                            animate={{ width: `${(totalCybersecurityProjects / projects.length) * 100}%` }}
                            transition={{ duration: 1, delay: 0.7 }}
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                        <FaCode className="text-green-400 text-xs" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-0.5">
                          <span className="text-xs">Psikologi</span>
                          <span className="text-xs text-primary">{totalPsychologyProjects} proyek</span>
                        </div>
                        <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                          <motion.div 
                            className="bg-green-400 h-full rounded-full" 
                            initial={{ width: 0 }}
                            animate={{ width: `${(totalPsychologyProjects / projects.length) * 100}%` }}
                            transition={{ duration: 1, delay: 0.9 }}
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div 
                  className="absolute -top-3 -right-3 w-20 h-20 bg-primary/10 rounded-full filter blur-xl"
                  style={{ transform: `scale(${1 + scrollY * 0.001})` }}
                ></div>
                <div 
                  className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/5 rounded-full filter blur-xl"
                  style={{ transform: `scale(${1 + scrollY * 0.0015})` }}
                ></div>
              </motion.div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-text-secondary cursor-pointer flex flex-col items-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            onClick={scrollToNextSection}
          >
            <span className="text-xs mb-2">Scroll</span>
            <FaChevronDown />
          </motion.div>
        </section>
        
        {/* Featured Projects Section */}
        <section className="py-16 bg-background-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-3 text-gradient"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                Proyek Unggulan
              </motion.h2>
              <motion.p 
                className="text-text-secondary max-w-2xl mx-auto text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Beberapa proyek menarik dari total 30 proyek yang akan dikerjakan
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="card overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 0 15px #FFD60A' }}
                >
                  <div className="h-2 bg-primary"></div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-bold line-clamp-1">{project.title}</h3>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        project.complexity === 'Low' ? 'bg-green-500/20 text-green-400' :
                        project.complexity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {project.complexity}
                      </span>
                    </div>
                    <p className="text-text-secondary text-xs mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-text-secondary">Minggu {project.startWeek}-{project.endWeek}</span>
                      <span className={`text-xs font-medium ${getFieldColor(project.field)}`}>{project.field}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link href="/gallery" className="btn-primary text-sm flex items-center space-x-2 py-1.5 px-4">
                  <span>Lihat Semua Proyek</span>
                  <FaArrowRight className="text-xs" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-text-secondary text-sm">
            &copy; {new Date().getFullYear()} <span className="text-primary font-medium">bagaspra16-rundown</span>. All rights reserved.
          </p>
          <div className="flex justify-center mt-4 space-x-2">                        
              <p>Created by</p>
              <a href="https://bagaspra16-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary transition-colors flex items-center gap-1.5">
              <span className="text-primary font-medium">bagaspra16</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
} 