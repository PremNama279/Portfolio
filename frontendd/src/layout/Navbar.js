import logo from "../assets/dklogo.png";

import { useEffect, useState } from "react";
import BackgroundSelector from "../components/BackgroundSelector";
import "../styles/Navbar.css";

const Navbar = ({ currentBackground, onBackgroundChange }) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { name: "About", link: "#about-section", icon: "" },
    { name: "Services", link: "#services", icon: "" },
    { name: "Projects", link: "#projects", icon: "" },
    { name: "Contact", link: "#contact", icon: "" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        
        // Show navbar when scrolled past hero section
        setShowNavbar(scrollPosition > heroHeight - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 80; // Height of fixed navbar
      const sectionTop = section.offsetTop - navHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`nav ${showNavbar ? 'nav-visible' : 'nav-hidden'}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <a href='#about-section' onClick={(e) => scrollToSection('about-section', e)}>
            <img src={logo} alt="Kushal" className="nav-logo-img" />
          </a>
        </div>
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="nav-link"
              onClick={(e) => scrollToSection(item.link.replace('#', ''), e)}
            >
              {item.name}
            </a>
          ))}
          <div className="nav-background-selector">
            <BackgroundSelector 
              currentBackground={currentBackground}
              onBackgroundChange={onBackgroundChange}
            />
          </div>
          <a 
            href="https://drive.google.com/file/d/10eh4m9ey6PPCXUK0l8ALWx6SI4Lh0NjA/view?usp=sharing" 
            target="_blank"
            rel="noopener noreferrer"
            className="nav-resume-btn"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
