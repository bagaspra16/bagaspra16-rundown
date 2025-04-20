import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain, FaShieldAlt, FaPuzzlePiece, FaTimes, FaCode, FaLayerGroup, FaDatabase, FaCogs, FaFilter, FaArrowLeft } from 'react-icons/fa';
import { Project, projects } from '@/data/projectData';

type CategoryFilter = 'All' | 'AI' | 'Cybersecurity' | 'Psychology';
type ComplexityFilter = 'All' | 'Low' | 'Medium' | 'High';

const ProjectGallery = () => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [complexityFilter, setComplexityFilter] = useState<ComplexityFilter>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  
  // Check if viewport is mobile size
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  // Close filters dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = categoryFilter === 'All' || project.field.includes(categoryFilter);
    const matchesComplexity = complexityFilter === 'All' || project.complexity === complexityFilter;
    return matchesCategory && matchesComplexity;
  });

  const closeModal = () => {
    setSelectedProject(null);
  };

  const getProjectIcon = (field: string) => {
    if (field.includes('AI')) return <FaBrain className="text-primary text-xl" />;
    if (field.includes('Cybersecurity')) return <FaShieldAlt className="text-primary text-xl" />;
    return <FaPuzzlePiece className="text-primary text-xl" />;
  };

  const getFieldGradient = (field: string) => {
    if (field.includes('AI')) return 'bg-gradient-to-br from-blue-500/20 to-indigo-600/20';
    if (field.includes('Cybersecurity')) return 'bg-gradient-to-br from-yellow-500/20 to-orange-600/20';
    return 'bg-gradient-to-br from-green-500/20 to-teal-600/20';
  };
  
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': 
        return 'bg-green-500/20 text-green-400';
      case 'Medium': 
        return 'bg-yellow-500/20 text-yellow-400';
      case 'High': 
        return 'bg-red-500/20 text-red-400';
      default: 
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-20">
      <div className="mb-8 md:mb-12 text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Galeri Proyek
        </motion.h2>
        <motion.p 
          className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Kumpulan 30 proyek portfolio untuk pengembangan skill fullstack, backend, dan cybersecurity
        </motion.p>
      </div>

      {/* Mobile filters button */}
      {isMobile && (
        <div className="mb-6 flex justify-center" ref={filterRef}>
          <motion.button
            className="btn-primary text-sm flex items-center space-x-2 py-1.5 px-4"
            onClick={toggleFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFilter className="text-xs" />
            <span>Filter</span>
            {(categoryFilter !== 'All' || complexityFilter !== 'All') && (
              <span className="bg-background text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">
                {(categoryFilter !== 'All' ? 1 : 0) + (complexityFilter !== 'All' ? 1 : 0)}
              </span>
            )}
          </motion.button>
          
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                className="absolute top-full left-0 right-0 bg-background-lighter mt-2 p-4 rounded-lg shadow-lg z-20 mx-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Kategori:</h4>
                  <div className="flex flex-wrap gap-2">
                    {(['All', 'AI', 'Cybersecurity', 'Psychology'] as CategoryFilter[]).map((category) => (
                      <motion.button
                        key={category}
                        className={`filter-btn text-xs ${categoryFilter === category ? 'active' : ''}`}
                        onClick={() => setCategoryFilter(category)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Kompleksitas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {(['All', 'Low', 'Medium', 'High'] as ComplexityFilter[]).map((complexity) => (
                      <motion.button
                        key={complexity}
                        className={`filter-btn text-xs ${complexityFilter === complexity ? 'active' : ''}`}
                        onClick={() => setComplexityFilter(complexity)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {complexity}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Desktop filters */}
      {!isMobile && (
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
          <div className="flex justify-center space-x-2">
            <span className="text-text-secondary self-center mr-2">Kategori:</span>
            {(['All', 'AI', 'Cybersecurity', 'Psychology'] as CategoryFilter[]).map((category) => (
              <motion.button
                key={category}
                className={`filter-btn ${categoryFilter === category ? 'active' : ''}`}
                onClick={() => setCategoryFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
          
          <div className="flex justify-center space-x-2">
            <span className="text-text-secondary self-center mr-2">Kompleksitas:</span>
            {(['All', 'Low', 'Medium', 'High'] as ComplexityFilter[]).map((complexity) => (
              <motion.button
                key={complexity}
                className={`filter-btn ${complexityFilter === complexity ? 'active' : ''}`}
                onClick={() => setComplexityFilter(complexity)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {complexity}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="mb-6 text-center">
        <p className="text-sm text-text-secondary">
          Menampilkan {filteredProjects.length} dari {projects.length} proyek
        </p>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            className="card cursor-pointer overflow-hidden group"
            whileHover={{ y: -5, boxShadow: '0 0 15px #FFD60A' }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedProject(project)}
            layoutId={`project-${project.id}`}
          >
            <div className={`h-32 sm:h-40 relative overflow-hidden ${getFieldGradient(project.field)}`}>
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                {getProjectIcon(project.field)}
              </div>
              <div className="absolute bottom-2 right-2 bg-background/60 backdrop-blur-sm px-2 py-1 rounded text-xs">
                {`Minggu ${project.startWeek}-${project.endWeek}`}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-bold line-clamp-1">{project.title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${getComplexityColor(project.complexity)}`}>
                  {project.complexity}
                </span>
              </div>
              <p className="text-text-secondary text-xs mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.frontend.slice(0, 2).map((tech) => (
                  <span key={tech} className="text-[10px] bg-background px-1.5 py-0.5 rounded text-primary">
                    {tech}
                  </span>
                ))}
                {project.technologies.backend.slice(0, 1).map((tech) => (
                  <span key={tech} className="text-[10px] bg-background px-1.5 py-0.5 rounded text-primary-light">
                    {tech}
                  </span>
                ))}
                {(project.technologies.frontend.length > 2 || project.technologies.backend.length > 1) && (
                  <span className="text-[10px] bg-background px-1.5 py-0.5 rounded text-text-secondary">
                    +{project.technologies.frontend.length + project.technologies.backend.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No results message */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary mb-4">Tidak ada proyek yang sesuai dengan filter yang dipilih.</p>
          <motion.button
            className="btn-primary text-sm"
            onClick={() => {
              setCategoryFilter('All');
              setComplexityFilter('All');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset Filter
          </motion.button>
        </div>
      )}

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col md:items-center justify-center p-0 md:p-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              ref={modalRef}
              className="bg-background-light w-full md:w-auto md:max-w-2xl h-full md:h-auto md:max-h-[90vh] overflow-hidden rounded-none md:rounded-xl shadow-neon-lg flex flex-col"
              layoutId={`project-${selectedProject.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile back button */}
              {isMobile && (
                <div className="sticky top-0 left-0 right-0 bg-background-lighter p-3 z-20 flex items-center justify-between">
                  <button 
                    className="flex items-center text-sm font-medium text-text-secondary"
                    onClick={closeModal}
                  >
                    <FaArrowLeft className="mr-2" />
                    Kembali
                  </button>
                  <div className={`text-xs px-2 py-1 rounded ${getComplexityColor(selectedProject.complexity)}`}>
                    {selectedProject.complexity}
                  </div>
                </div>
              )}
              
              <div className={`h-36 relative ${getFieldGradient(selectedProject.field)}`}>
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                  {getProjectIcon(selectedProject.field)}
                </div>
                
                {!isMobile && (
                  <>
                    <button
                      className="absolute top-3 right-3 bg-background/50 p-2 rounded-full hover:bg-background/80 transition-colors"
                      onClick={closeModal}
                    >
                      <FaTimes className="text-white" />
                    </button>
                    
                    <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                      <span className={`text-xs px-3 py-1 rounded ${getComplexityColor(selectedProject.complexity)}`}>
                        {selectedProject.complexity}
                      </span>
                      <span className="text-xs bg-background/40 backdrop-blur-sm px-3 py-1 rounded">{`Minggu ${selectedProject.startWeek}-${selectedProject.endWeek}`}</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className="p-4 md:p-5 overflow-y-auto flex-grow">
                <div className="flex items-start space-x-3 mb-4">
                  {getProjectIcon(selectedProject.field)}
                  <div>
                    <h2 className="text-xl font-bold text-gradient">{selectedProject.title}</h2>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-text-secondary">{selectedProject.field}</span>
                      {isMobile && (
                        <>
                          <span className="mx-1 text-text-secondary">•</span>
                          <span className="text-xs text-text-secondary">{`Minggu ${selectedProject.startWeek}-${selectedProject.endWeek}`}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-text-secondary text-sm mb-5">{selectedProject.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div className="bg-background/30 p-3 rounded-lg">
                    <h3 className="flex items-center text-sm font-semibold mb-2">
                      <FaCode className="text-primary mr-2 text-xs" />
                      Frontend
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.frontend.map((tech) => (
                        <span key={tech} className="text-xs bg-background/50 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-background/30 p-3 rounded-lg">
                    <h3 className="flex items-center text-sm font-semibold mb-2">
                      <FaLayerGroup className="text-primary mr-2 text-xs" />
                      Backend
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.backend.length === 0 ? (
                        <span className="text-xs text-text-secondary">Tidak ada</span>
                      ) : selectedProject.technologies.backend.map((tech) => (
                        <span key={tech} className="text-xs bg-background/50 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-background/30 p-3 rounded-lg">
                    <h3 className="flex items-center text-sm font-semibold mb-2">
                      <FaDatabase className="text-primary mr-2 text-xs" />
                      Database
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.database.length === 0 ? (
                        <span className="text-xs text-text-secondary">Tidak ada</span>
                      ) : selectedProject.technologies.database.map((tech) => (
                        <span key={tech} className="text-xs bg-background/50 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-background/30 p-3 rounded-lg">
                    <h3 className="flex items-center text-sm font-semibold mb-2">
                      <FaCogs className="text-primary mr-2 text-xs" />
                      Lainnya
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.other.length === 0 ? (
                        <span className="text-xs text-text-secondary">Tidak ada</span>
                      ) : selectedProject.technologies.other.map((tech) => (
                        <span key={tech} className="text-xs bg-background/50 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-background/30 p-3 rounded-lg mb-5">
                  <h3 className="text-sm font-semibold mb-2">Fitur</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-3 text-xs text-text-secondary">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {!isMobile && (
                  <div className="flex justify-end">
                    <motion.button
                      className="btn-primary text-sm py-1.5 px-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeModal}
                    >
                      Tutup
                    </motion.button>
                  </div>
                )}
              </div>
              
              {/* Mobile bottom button */}
              {isMobile && (
                <div className="sticky bottom-0 left-0 right-0 bg-background-lighter p-3 flex justify-center">
                  <motion.button
                    className="btn-primary text-sm py-2 px-6 w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeModal}
                  >
                    Tutup
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGallery; 