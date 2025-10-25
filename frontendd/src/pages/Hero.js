import { motion } from "framer-motion";
import NeonText from "../components/NeonText";
import "../styles/Hero.css";
import { fadeInUp } from "../utils/animations";

const Hero = () => {
  const scrollToAbout = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      const navHeight = 80; // Height of fixed navbar
      const sectionTop = aboutSection.offsetTop - navHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <section className="hero full-screen">
      <motion.div 
        className="hero-content"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <NeonText />
        <motion.div 
          className="down-arrow" 
          onClick={scrollToAbout}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          ⌄
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
