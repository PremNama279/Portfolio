"use client";
import {
    AnimatePresence,
    motion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
// import resume from "../../assets/resume.pdf"; // No longer needed - using Google Drive link
import { cn } from "../../utils/utils";
import BackgroundSelector from "../BackgroundSelector";
import styles from "./FloatingNavbar.module.css";

const FloatingNav = ({ navItems, className, currentBackground, onBackgroundChange }) => {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const arrowRef = useRef(null);

  const navItemsWithIcons = [
    { name: "About", link: "#about-section", icon: "👤" },
    { name: "Services", link: "#services", icon: "🛠️" },
    { name: "Projects", link: "#projects", icon: "💻" },
    { name: "Contact", link: "#contact", icon: "📧" }
  ];

  useEffect(() => {
    // Find the down-arrow element in the DOM
    const arrow = document.querySelector('.down-arrow');
    if (!arrow) return;
    arrowRef.current = arrow;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(arrow);
    return () => observer.disconnect();
  }, []);

  // Close menu if window is resized above 375px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 500 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  // Hamburger menu for very small screens
  const handleMenuToggle = () => setMenuOpen((open) => !open);

  return (
    <AnimatePresence mode="sync">
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.2 }}
          drag
          dragMomentum={false}
          className={cn(styles.floatingNavbar, className)}
          style={{ zIndex: 5000 }}
        >
          {/* Hamburger menu icon for <=400px */}
          <button
            className={styles.menuButton}
            onClick={handleMenuToggle}
            aria-label="Open menu"
          >
            <span className={styles.hamburgerIcon}>☰</span>
          </button>

          {/* Regular nav items, hidden on <=400px or when menu is open */}
          <div className={menuOpen ? styles.hideNav : styles.showNav}>
            {navItemsWithIcons.map((navItem, idx) => (
              <a
                key={`link-${idx}`}
                href={navItem.link}
                className={cn(
                  "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 transition-colors duration-200"
                )}
              >
                <span className={`${styles.iconOnly} icon-only`}>{navItem.icon}</span>
                <span className={`${styles.textOnly} text-only`}>{navItem.name}</span>
              </a>
            ))}
            <div className={styles.backgroundSelectorWrapper}>
              <BackgroundSelector 
                currentBackground={currentBackground}
                onBackgroundChange={onBackgroundChange}
              />
            </div>
            <a 
              href="https://drive.google.com/file/d/10eh4m9ey6PPCXUK0l8ALWx6SI4Lh0NjA/view?usp=sharing" 
              target="_blank"
              rel="noopener noreferrer"
              className={cn(styles.resumeBtn, "border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200")}
            >
              <span className="hidden sm:inline">Resume</span>
              {/* <span className="sm:hidden">📄</span> */}
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
            </a>
          </div>

          {/* Dropdown menu for very small screens */}
          {menuOpen && (
            <>
              <div className={styles.dropdownBackdrop} onClick={() => setMenuOpen(false)} />
              <div className={styles.dropdownMenu}>
                <button className={styles.closeButton} onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                {navItemsWithIcons.map((navItem, idx) => (
                  <a
                    key={`dropdown-link-${idx}`}
                    href={navItem.link}
                    className={styles.dropdownItem}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={styles.dropdownIcon}>{navItem.icon}</span>
                    <span className={styles.dropdownText}>{navItem.name}</span>
                  </a>
                ))}
                <a
                  href="https://drive.google.com/file/d/10eh4m9ey6PPCXUK0l8ALWx6SI4Lh0NjA/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.dropdownItem}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={styles.dropdownIcon}>📄</span>
                  <span className={styles.dropdownText}>Resume</span>
                </a>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav; 