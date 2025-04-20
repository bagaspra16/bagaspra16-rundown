import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBrain, FaShieldAlt, FaPuzzlePiece } from 'react-icons/fa';
import { Project, projects } from '@/data/projectData';

type CategoryFilter = 'All' | 'AI' | 'Cybersecurity' | 'Psychology';

const TimelineView = () => {
  const [filter, setFilter] = useState<CategoryFilter>('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Set initial value
      checkMobile();
      
      // Add event listener
      window.addEventListener('resize', checkMobile);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.field.includes(filter))
      );
    }
  }, [filter]);

  const getProjectIcon = (field: string) => {
    if (field.includes('AI')) return <FaBrain className="text-primary" />;
    if (field.includes('Cybersecurity')) return <FaShieldAlt className="text-primary" />;
    return <FaPuzzlePiece className="text-primary" />;
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low':
        return 'bg-green-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'High':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getFieldColor = (field: string) => {
    if (field.includes('AI')) return 'border-blue-500';
    if (field.includes('Cybersecurity')) return 'border-yellow-500';
    return 'border-green-500';
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-10 text-center">
        <motion.h2 
          className="text-3xl font-bold mb-3 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Timeline Proyek
        </motion.h2>
        <motion.p 
          className="text-text-secondary max-w-2xl mx-auto text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Jadwal pengerjaan 30 proyek portfolio selama 60 minggu
        </motion.p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {(['All', 'AI', 'Cybersecurity', 'Psychology'] as CategoryFilter[]).map((category) => (
          <motion.button
            key={category}
            className={`filter-btn text-xs ${filter === category ? 'active' : ''}`}
            onClick={() => setFilter(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {isMobile ? (
        // Mobile Timeline Layout
        <div className="relative max-w-lg mx-auto">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-background-lighter"></div>
          
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <MobileTimelineEntry 
                key={project.id} 
                project={project} 
                getComplexityColor={getComplexityColor}
                getProjectIcon={getProjectIcon}
                getFieldColor={getFieldColor}
              />
            ))}
          </div>
        </div>
      ) : (
        // Desktop Timeline Layout
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 -ml-[1px] h-full border-l-2 border-background-lighter"></div>
          
          <div className="space-y-8">
            {filteredProjects.map((project) => (
              <TimelineEntry 
                key={project.id} 
                project={project} 
                getComplexityColor={getComplexityColor}
                getProjectIcon={getProjectIcon}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Desktop Timeline Entry
const TimelineEntry = ({ 
  project, 
  getComplexityColor,
  getProjectIcon 
}: { 
  project: Project; 
  getComplexityColor: (complexity: string) => string;
  getProjectIcon: (field: string) => JSX.Element;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isEven = project.id % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`flex items-start ${isEven ? 'flex-row-reverse' : ''}`}
      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 30 : -30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={`w-1/2 px-5 ${isEven ? 'text-right' : 'text-left'}`}>
        <div className={`mb-1.5 flex items-center ${isEven ? 'justify-end' : ''} space-x-1.5`}>
          <div className={`w-2.5 h-2.5 rounded-full ${getComplexityColor(project.complexity)}`}></div>
          <span className="text-xs text-text-secondary">{`Minggu ${project.startWeek}-${project.endWeek}`}</span>
        </div>
        <h3 className="text-base font-bold mb-1 text-gradient line-clamp-1">{project.title}</h3>
        <div className={`flex items-center space-x-1.5 mb-1.5 ${isEven ? 'justify-end' : ''}`}>
          {getProjectIcon(project.field)}
          <span className="text-xs">{project.field}</span>
        </div>
        <p className="text-text-secondary text-xs mb-2 line-clamp-2">{project.description}</p>
        <div className={`flex flex-wrap gap-1 mt-2 ${isEven ? 'justify-end' : ''}`}>
          {[...project.technologies.frontend, ...project.technologies.backend].slice(0, 3).map((tech) => (
            <span key={tech} className="text-[10px] bg-background-lighter px-1.5 py-0.5 rounded">
              {tech}
            </span>
          ))}
          {(project.technologies.frontend.length + project.technologies.backend.length > 3) && (
            <span className="text-[10px] bg-background-lighter px-1.5 py-0.5 rounded text-text-secondary">
              +{project.technologies.frontend.length + project.technologies.backend.length - 3}
            </span>
          )}
        </div>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-neon z-10"></div>
    </motion.div>
  );
};

// Mobile Timeline Entry
const MobileTimelineEntry = ({ 
  project, 
  getComplexityColor,
  getProjectIcon,
  getFieldColor
}: { 
  project: Project; 
  getComplexityColor: (complexity: string) => string;
  getProjectIcon: (field: string) => JSX.Element;
  getFieldColor: (field: string) => string;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      className={`flex items-start pl-8 relative ${getFieldColor(project.field)} border-l-0`}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="absolute left-0 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-neon z-10"></div>
      
      <div className="bg-background-light/30 rounded-lg p-3 w-full">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-bold text-gradient line-clamp-1">{project.title}</h3>
          <div className={`w-2.5 h-2.5 rounded-full ${getComplexityColor(project.complexity)}`}></div>
        </div>
        
        <div className="flex items-center space-x-1.5 mb-1.5">
          {getProjectIcon(project.field)}
          <span className="text-xs text-text-secondary">{project.field}</span>
          <span className="text-xs text-text-secondary mx-1">•</span>
          <span className="text-xs text-text-secondary">{`Minggu ${project.startWeek}-${project.endWeek}`}</span>
        </div>
        
        <p className="text-text-secondary text-xs mb-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {[...project.technologies.frontend, ...project.technologies.backend].slice(0, 3).map((tech) => (
            <span key={tech} className="text-[10px] bg-background-lighter px-1.5 py-0.5 rounded">
              {tech}
            </span>
          ))}
          {(project.technologies.frontend.length + project.technologies.backend.length > 3) && (
            <span className="text-[10px] bg-background-lighter px-1.5 py-0.5 rounded text-text-secondary">
              +{project.technologies.frontend.length + project.technologies.backend.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineView; 