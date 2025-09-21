import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import chalyatiLogo from "../assets/Chalyatilogo.jpg";
import dhirajPhoto from "../assets/dhiraj.jpeg";
import sharanPhoto from "../assets/sharan.jpeg";
import sridharPhoto from "../assets/sridhar.jpeg";
import "../styles/Testimonials.css";
import { fadeInUp } from "../utils/animations";

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const testimonials = [
    {
      name: "Dhiraj Shinde",
      role: "NIT Warangal",
      company: "Summer Internship Peer-mate",
      image: dhirajPhoto,
      text: "During his 2-month summer internship at NIT Warangal, Devulapelly Kushal Kumar consistently demonstrated strong dedication and a genuine passion for learning. His work in web development and machine learning was commendable, and his proactive approach to problem-solving truly set him apart from his peers.",
      linkedin: "https://www.linkedin.com/in/dhirajrshinde/"
    },
    {
      name: "Sharan Medamoni",
      role: "Software Developer",
      company: "Tech Solutions",
      image: sharanPhoto,
      text: "Kushal's attention to detail and commitment to quality is outstanding. He consistently delivered high-quality code and was always available to help with any challenges we faced.",
      linkedin: "https://www.linkedin.com/in/sharan-medamoni-267926256/"
    },
    {
      name: "Ramavath Sridhar",
      role: "Software Engineer",
      company: "Tech Solutions",
      image: sridharPhoto,
      text: "Kushal's expertise in full-stack development and machine learning helped us build a robust and scalable application. His technical knowledge and communication skills make him an invaluable team member.",
      linkedin: "https://www.linkedin.com/in/ramavath-sridhar-03248a272/"
    },
    {
      name: "Santosh Metta",
      role: "Founder",
      company: "Chalyati.com",
      image: chalyatiLogo,
      text: "I'm absolutely thrilled with the website built by Kushal. Chalyati.com looks amazing, and it works even better. From the user-friendly interface to the seamless experience from desktop to mobile — everything feels polished and professional. It's already making a difference in how customers view our brand, and I couldn't be happier with the outcome.",
      linkedin: "https://www.chalyati.com/"
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        Testimonials
      </motion.h2>
      <motion.p 
        className="testimonials-subtitle"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        What people say about my work
      </motion.p>
      <motion.div 
        ref={ref}
        className="testimonials-grid"
        variants={fadeInUp}
        initial="initial"
        animate={inView ? "animate" : "initial"}
      >
        <AnimatePresence mode="sync">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut"
                }
              }}
              exit={{ opacity: 0, y: -30 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="testimonial-content">
                <motion.div 
                  className="testimonial-image-container"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.3
                    }
                  }}
                >
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonial-image"
                  />
                  <motion.div 
                    className="testimonial-info"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.4
                      }
                    }}
                  >
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <p className="testimonial-role">{testimonial.role}</p>
                    <p className="testimonial-company">{testimonial.company}</p>
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="testimonial-text-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.5
                    }
                  }}
                >
                  <p className="testimonial-text">
                    {testimonial.text}
                  </p>
                </motion.div>
                <motion.a 
                  href={testimonial.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="linkedin-link"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className="linkedin-icon"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Testimonials; 