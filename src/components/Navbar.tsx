import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaHome, FaStream, FaImages, FaInfoCircle } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.pathname]);

  // Improved scroll lock implementation
  useEffect(() => {
    if (mobileMenuOpen) {
      // Store current scroll position
      setScrollPosition(window.pageYOffset);
      
      // Apply styles to body to prevent scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollPosition}px`;
    } else {
      // Restore scrolling and position
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      
      // Restore scroll position
      if (scrollPosition) window.scrollTo(0, scrollPosition);
    }
    
    return () => {
      // Cleanup
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [mobileMenuOpen, scrollPosition]);

  const navLinks = [
    { href: '/', label: 'Home', icon: <FaHome /> },
    { href: '/timeline', label: 'Timeline', icon: <FaStream /> },
    { href: '/gallery', label: 'Gallery', icon: <FaImages /> },
    { href: '/about', label: 'About', icon: <FaInfoCircle /> },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Animation Variants
  const containerVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.3,
        ease: "easeInOut" 
      }
    }
  };
  
  const mobileMenuVariants = {
    hidden: { 
      x: "100%",
      opacity: 0
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.5 
      }
    },
    exit: { 
      x: "100%",
      opacity: 0,
      transition: { 
        ease: "easeInOut",
        duration: 0.3 
      }
    }
  };
  
  const linkVariants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      y: 10, 
      opacity: 0,
      transition: { 
        duration: 0.2 
      }
    }
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen ? 'bg-background shadow-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 z-20">
          <div className="flex space-x-1.5 items-center">
            <motion.div
              className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <span className="text-background font-bold text-lg">B</span>
            </motion.div>
            <span className="text-lg font-bold text-gradient">Rundown</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-5 items-center">
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative group py-1.5 text-sm ${
                  isActive ? 'text-primary' : 'text-text-secondary hover:text-text'
                }`}
              >
                <span>{link.label}</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : ''
                  }`}
                />
              </Link>
            );
          })}
          <motion.a
            href="https://github.com/bagaspra16/bagaspra16-rundown"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-1.5 px-3 flex items-center space-x-1.5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCode className="text-xs" />
            <span>GitHub</span>
          </motion.a>
        </nav>

        {/* Hamburger Button */}
        <button
          className="md:hidden z-50 w-10 h-10 relative focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                mobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                mobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
              }`}
            ></span>
          </div>
        </button>

        {/* Mobile Menu with smooth transitions */}
        <AnimatePresence mode="wait">
          {mobileMenuOpen && (
            <motion.div 
              className="fixed inset-0 z-40 md:hidden bg-[#121212]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div 
                className="flex flex-col min-h-screen pt-20 pb-6 px-6 bg-[#121212]"
                variants={mobileMenuVariants}
              >
                {/* Navigation Links */}
                <div className="flex flex-col items-center justify-center space-y-4 flex-1">
                  {navLinks.map((link, index) => {
                    const isActive = router.pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        className="w-full"
                        variants={linkVariants}
                        custom={index}
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center justify-center space-x-4 py-4 px-6 rounded-lg border-2 ${
                            isActive 
                              ? 'bg-primary/40 text-white border-primary shadow-lg' 
                              : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#252525] border-[#333333]'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className={`text-2xl ${isActive ? 'text-white' : 'text-gray-300'}`}>
                            {link.icon}
                          </div>
                          <span className={`text-xl font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                            {link.label}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* GitHub Button */}
                <motion.div 
                  className="w-full mt-8"
                  variants={linkVariants}
                >
                  <a
                    href="https://github.com/bagaspra16/bagaspra16-rundown"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white w-full flex items-center justify-center space-x-3 py-4 px-5 rounded-lg shadow-md border-0"
                  >
                    <FaCode className="text-base" />
                    <span className="text-base font-semibold">GitHub Repository</span>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar; 