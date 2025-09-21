// import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import img from "../assets/yes.jpeg";
import { GlareCard } from "../components/GlareCard";
import '../styles/About.css';
import { fadeInUp, slideInLeft } from "../utils/animations";

const About = () => {
  // eslint-disable-next-line no-unused-vars
  const [about, setAbout] = useState({
    name: "",
    bio: "",
    image_url: ""
  });

  const [textRef, textInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    // API call commented out - using static data instead
    // axios.get("http://localhost:8000/about")
    //   .then((res) => {
    //     setAbout(res.data);
    //   })
    //   .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  return (
    <section id="about-section" className="about-section">
      <motion.h2 
        className="section-title" 
        style={{ textAlign: "center" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>
      <div className="about-container">
        <motion.div 
          ref={textRef}
          className="about-text" 
          style={{ 
            textAlign: "left",
            padding: "20px",
            borderRadius: "10px",
            backdropFilter: "blur(5px)"
          }}
          initial="initial"
          animate={textInView ? "animate" : "initial"}
          variants={slideInLeft}
        >
          <p>My name is <span className="highlight">Devulapelly Kushal Kumar Reddy</span> and I am an accomplished full-stack developer with a deep passion for software development, machine learning, and cloud computing.</p>
          <p>With over three years of hands-on experience in the software development field as a remote freelancer, I have honed my skills and expertise in various domains.With over three years of hands-on experience in the software development field as a remote freelancer, I have honed my skills and expertise in various domains.
          With over three years of hands-on experience in the software development field as a remote freelancer, I have honed my skills and expertise in various domains.
          </p>
          <p>With over three years of hands-on experience in the software development field as a remote freelancer, I have honed my skills and expertise in various domains.</p> 
        </motion.div>
        <motion.div 
          ref={imageRef}
          className="about-image" 
          style={{ textAlign: "right", transform: "translateX(0%) translateY(0px) translateZ(0px)" }}
          initial="initial"
          animate={imageInView ? "animate" : "initial"}
          variants={fadeInUp}
        >
          <GlareCard variant="primary" className="w-full">
            <img src={img} alt="Kushal" />
          </GlareCard>
        </motion.div>
      </div>
    </section>
  );
};

export default About;



