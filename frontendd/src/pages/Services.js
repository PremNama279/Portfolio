import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import awsImage from "../assets/DataAnalysis.JPG";
import fsdImage from "../assets/fsd.jpg";
import mlintImage from "../assets/mlint.jpg";
import resImage from "../assets/WebsiteBuilding.JPG";
import { GlareCard } from "../components/GlareCard";
import "../styles/Services.css";
import { staggerContainer, zoomIn } from "../utils/animations";

const Services = () => {
  // eslint-disable-next-line no-unused-vars
  const [services, setServices] = useState([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    // API call commented out - using static data instead
    // axios.get("http://localhost:8000/services")
    //   .then(res => setServices(res.data))
    //   .catch(err => console.error(err));
  }, []);

  const serviceCards = [
    {
      image: resImage,
      title: "WEBSITE BUIDING",
      description: "Building websites using HTML, CSS, JavaScript, React, Node.js, MySQL with user interaction and user experience in mind"
    },
    {
      image: fsdImage,
      title: "MODEL BUILDING",
      description: "Driven by curiosity and passion to build innovative models using Scikit-learn, TensorFlow, PyTorch, and other machine learning libraries that help to solve real world problems" 
    },
    {
      image: awsImage,
      title: "DATA ANALYSIS",
      description: "Fueled by passion to make data come alive using Python, Pandas, NumPy, Matplotlib, Seaborn, Plotly, Tableau, Power BI , Excel, SQL and other data analysis tools with insight and purpose"
    },
    {
      image: mlintImage,
      title: "AI & ML-INTEGRATION",
      description: "Integrating trained AI/ML models into apps for smart recommendations, predictions, and classifications."
    }
  ];

  return (
    <section id="services" className="services-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        My Services
      </motion.h2>
      <motion.p 
        className="services-subtitle"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        What services I provide -
      </motion.p>
      <motion.div 
        ref={ref}
        className="services-container"
        variants={staggerContainer}
        initial="initial"
        animate={inView ? "animate" : "initial"}
      >
        {serviceCards.map((service, index) => (
          <motion.div 
            key={index}
            className="service-card"
            variants={zoomIn}
          >
            <GlareCard variant="primary" className="w-64">
              <div className="flex flex-col items-center p-6">
                <motion.img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-300 text-center">
                  {service.description}
                </p>
              </div>
            </GlareCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;