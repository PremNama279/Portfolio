import { motion } from "framer-motion";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import imgAIBott from "../assets/aibott.png";
import imgDiet from "../assets/diet.png";
import imgEDA from "../assets/eda.png";
import imgGANs from "../assets/gans.png";
import imgPresence from "../assets/presence.png";
import imgSkin from "../assets/skin.png";
import "../styles/Projects.css";
import { fadeInScale, staggerContainer } from "../utils/animations";
import ProjectModal from "./ProjectModal";

const Projects = () => {
  const [hovered, setHovered] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const projects = [
    {
      title: "AI Health Metrics Analyzer",
      description: "An AI-powered tool that analyzes health metrics to generate personalized insights and responds to queries via a chatbot. Built a hybrid health insight generation engine using Python and Pandas to process user-uploaded health data (CSV). Integrated a React-based chatbot frontend with Gemini's API for real-time, context-aware health conversations. Deployed the backend on Render using Flask. Designed the system to provide visual health trends, risk alerts, and recommendations, improving user wellness engagement.",
      image: imgAIBott,
      slides: [
        { title: "Dashboard", src: imgAIBott, button: "Learn More" },
        { title: "EDA Insights", src: imgEDA, button: "Explore" },
        { title: "Diet Chatbot", src: imgDiet, button: "Details" }
      ],
      demo: "https://your-demo-link.com/health-analyzer",
      source: "https://github.com/yourusername/health-metrics-analyzer",
      tech: ["#Python", "#ReactJS", "#Flask", "#GeminiAPI", "#Pandas"]
    },
    {
      title: "Multi-Modal Deepfake Content Detection",
      description: "A full-stack AI application capable of detecting fake content across videos, images, and text. • Designed and deployed backend APIs using Flask, integrated with a React-based frontend for real-time uploads and results visualization. • Implemented machine learning models using TensorFlow, PyTorch, and scikit-learn to classify media as real or fake, and fine-tuned image and text classifiers using Hugging Face models. • Trained on datasets like the Deepfake Detection Challenge to enhance model performance and robustness. • Demonstrated expertise in Computer Vision, Natural Language Processing (NLP), and full-stack web development.",
      image: imgPresence,
      slides: [
        { title: "Landing", src: imgPresence, button: "Learn More" },
        { title: "GANs Output", src: imgGANs, button: "Explore" },
        { title: "Skin Detection", src: imgSkin, button: "Details" }
      ],
      demo: "https://your-demo-link.com/deepfake-detection",
      source: "https://github.com/yourusername/deepfake-detection-system",
      tech: ["#Python", "#ReactJS", "#Flask", "#NLP", "#ComputerVision"]
    },
    {
      title: "Image Generation using GANs",
      description: "Advanced GAN-based Image Generation for Enhanced Real vs. Fake Classification and Detection. • Developed and fine-tuned GAN models, including DCGANs and Conditional GANs, using Python to create realistic and adaptable images. • Focused on overcoming challenges like mode collapse through advanced optimization techniques, enabling high-quality image generation for applications such as medical imaging and data augmentation.",
      image: imgGANs,
      slides: [
        { title: "GANs Model", src: imgGANs, button: "Learn More" },
        { title: "Skin Cancer", src: imgSkin, button: "Explore" },
        { title: "Diet System", src: imgDiet, button: "Details" }
      ],
      demo: "https://your-demo-link.com/gan",
      source: "https://github.com/yourusername/image-generation-gans",
      tech: ["#Python", "#PyTorch", "#GANs", "#DeepLearning"]
    },
    {
      title: "Web Based Diet Recommendation System",
      description: "Personalized Diet Recommendations with Enhanced User Experience. • Developed a personalized diet calculator tailored to user metrics, significantly enhancing user engagement. • Designed a 3-page web application featuring a Home Page for seamless post-login navigation, improving overall user experience. • Technologies utilized: Flask, HTML, CSS, JavaScript, Bootstrap.",
      image: imgDiet,
      slides: [
        { title: "Diet Home", src: imgDiet, button: "Learn More" },
        { title: "EDA Dashboard", src: imgEDA, button: "Explore" },
        { title: "AI Health", src: imgAIBott, button: "Details" }
      ],
      demo: "https://your-demo-link.com/diet",
      source: "https://github.com/yourusername/diet-recommendation-system",
      tech: ["#HTML", "#CSS", "#JavaScript", "#Flask"]
    },
    {
      title: "EDA - Google Play Store",
      description: "Google Play Store Data Analysis and Visualization using Python, NumPy, Pandas, Matplotlib. • Performed EDA using Pandas and Matplotlib to analyze trends, extract insights, and optimize data-driven decisions. • Technologies used: Python, NumPy, Pandas, Matplotlib.",
      image: imgEDA,
      slides: [
        { title: "EDA Overview", src: imgEDA, button: "Learn More" },
        { title: "GANs Output", src: imgGANs, button: "Explore" },
        { title: "Skin Detection", src: imgSkin, button: "Details" }
      ],
      demo: "https://your-demo-link.com/playstore",
      source: "https://github.com/yourusername/google-play-store-analysis",
      tech: ["#Python", "#NumPy", "#Pandas", "#Matplotlib"]
    },
    {
      title: "Skin Cancer Detection",
      description: "Developed a machine learning model to detect skin cancer using image analysis. Utilized deep learning techniques to identify malignant and benign skin lesions.",
      image: imgSkin,
      slides: [
        { title: "Skin Cancer", src: imgSkin, button: "Learn More" },
        { title: "GANs Output", src: imgGANs, button: "Explore" },
        { title: "AI Health", src: imgAIBott, button: "Details" }
      ],
      demo: "https://your-demo-link.com/cancer",
      source: "https://github.com/yourusername/skin-cancer-detection",
      tech: ["#Python", "#DeepLearning", "#ImageAnalysis"]
    },
    // {
    //   title: "Portfolio Website",
    //   description: "Designed and developed a portfolio website to showcase my projects and skills. Used React and CSS to create a responsive and visually appealing website.",
    //   image: imgPortfolio,
    //   images: [imgPortfolio, imgPlaystore, imgLogo],
    //   demo: "https://your-demo-link.com/portfolio",
    //   source: "https://github.com/yourusername/portfolio-website",
    //   tech: ["#ReactJS", "#CSS3", "#Portfolio"]
    // },
    // {
    //   title: "Brand Identity Design",
    //   description: "Designed a brand identity for a client, including logo design and color scheme. Used Adobe Illustrator to create a visually appealing and memorable brand.",
    //   image: imgLogo,
    //   images: [imgLogo, imgPortfolio, imgPlaystore],
    //   demo: "https://your-demo-link.com/brand",
    //   source: "https://github.com/yourusername/brand-identity-design",
    //   tech: ["#AdobeIllustrator", "#Branding", "#Design"]
    // },
  ];

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="section projects-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>
      <motion.div 
        ref={ref}
        className="projects-container"
        variants={staggerContainer}
        initial="initial"
        animate={inView ? "animate" : "initial"}
      >
        {projects.map((project, idx) => (
          <motion.div 
            className="project-card" 
            key={idx}
            variants={fadeInScale}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            onHoverStart={() => setHovered(idx)}
            onHoverEnd={() => setHovered(null)}
          >
            <motion.div 
              className="project-image"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={project.image} alt={project.title} />
            </motion.div>
            <div className="project-content">
              <motion.h3 
                className="project-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.title}
              </motion.h3>
              <motion.div 
                className="project-tech"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {project.tech && project.tech.map((t, i) => (
                  <motion.span 
                    className="tech-tag" 
                    data-tech={t.toLowerCase()} 
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </motion.div>
              <motion.div 
                className="project-link" 
                onClick={() => handleOpenModal(project)} 
                style={{cursor: 'pointer'}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>LEARN MORE</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <ProjectModal open={modalOpen} onClose={handleCloseModal} project={selectedProject} />
    </section>
  );
};

export default Projects;


// const Projects = () => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8000/projects")
//       .then((response) => setProjects(response.data))
//       .catch((error) => console.error("Error fetching projects:", error));
//   }, []);

//   return (
//     <section className="projects-section">
//       <h2 className="section-title">My Projects</h2>
//       <div className="projects-container">
//         {projects.map((project) => (
//           <div key={project.id} className="project-card">
//             <h3 className="project-title">{project.title}</h3>
//             <p className="project-description">{project.description}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Projects;

