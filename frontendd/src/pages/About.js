// import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import img from "../assets/myprofilephoto.JPG";
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
          {/* <p>My name is Prem Sai Shankar Nama</span> and I am an accomplished full-stack developer with a deep passion for software development, machine learning, and cloud computing.</p> */}
          <p>I’m <span className="highlight">Prem Sai Shankar Nama</span>, a passionate student of Artificial Intelligence and Computer Science with a strong interest in applying data-driven and intelligent systems to solve real-world challenges. I specialize in machine learning, data analysis, and full-stack development, combining technical depth with creativity to build impactful solutions.</p>
          <p>Throughout my academic journey, I have developed projects in areas like healthcare analytics, AI content generation, and deepfake detection, gaining hands-on experience in Python, scikit-learn, TensorFlow, and OpenCV. My work reflects both curiosity and discipline—whether it’s preprocessing complex datasets, training machine learning models, or visualizing insights for real-world applications.</p>
          <p>I believe in continuous learning and innovation. As I pursue my Master’s in Artificial Intelligence, my goal is to explore how AI and data science can drive meaningful advancements in sectors like healthcare, automation, and intelligent systems.</p>
          <p>Driven by curiosity and guided by purpose, I aspire to grow as a researcher and developer who builds technology that matters.</p>
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
            <img src={img} alt="Prem Sai Shankar Nama" />
          </GlareCard>
        </motion.div>
      </div>
    </section>
  );
};

export default About;



