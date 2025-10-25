import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import Stepper, { Step } from '../components/Stepper';
import "../styles/Contact.css";
import { slideInBottom } from "../utils/animations";

const Contact = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendToWhatsApp = () => {
    setIsSubmitting(true);
    
    // Format the message for WhatsApp
    const whatsappMessage = `
*New Contact Form Submission*

*Name:* ${name}
*Email:* ${formData.email}
*Message:* ${formData.message}

*Submitted from:* Prem Sai Shankar Nama's Portfolio
*Date:* ${new Date().toLocaleDateString()}
*Time:* ${new Date().toLocaleTimeString()}
    `.trim();

    // WhatsApp API URL with the phone number
    const phoneNumber = "+15084259213";
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset form after a short delay
    setTimeout(() => {
      setIsSubmitting(false);
      setName("");
      setFormData({ email: "", message: "" });
      alert("WhatsApp opened! Please send the message to complete your submission.");
    }, 1000);
  };

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendToWhatsApp();
  };

  return (
    <section id="contact" className="contact-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        Get in Touch!
      </motion.h2>
      <motion.div 
        ref={ref}
        className="stepper-section"
        variants={slideInBottom}
        initial="initial"
        animate={inView ? "animate" : "initial"}
      >
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={() => console.log("All steps completed!")}
          backButtonText="Previous"
          nextButtonText="Next"
          hideCompleteButton={true}
        >
          <Step>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>I look forward to collaborating with you and achieving remarkable results together.</h2>
              <p>Check out the next step!</p>
            </motion.div>
          </Step>
          
          <Step>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Let's get to know you</h2>
              <motion.input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Your name?"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </Step>

          <Step>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Your Contact Information</h2>
              <motion.input 
                type="email"
                value={formData.email} 
                onChange={handleChange}
                name="email"
                placeholder="Your email address?"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </Step>

          <Step>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>What's on your mind?</h2>
              <motion.textarea 
                value={formData.message} 
                onChange={handleChange}
                name="message"
                placeholder="Write your message..."
                className="stepper-input"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </Step>
              
          <Step>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Ready to Send!</h2>
              <p>Review your information and send it via WhatsApp</p>
              
              <div className="form-summary">
                <div className="summary-item">
                  <strong>Name:</strong> {name || "Not provided"}
                </div>
                <div className="summary-item">
                  <strong>Email:</strong> {formData.email || "Not provided"}
                </div>
                <div className="summary-item">
                  <strong>Message:</strong> {formData.message || "Not provided"}
                </div>
              </div>
              
              <motion.button
                className="whatsapp-submit-btn"
                onClick={sendToWhatsApp}
                disabled={isSubmitting || !name || !formData.email || !formData.message}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {isSubmitting ? (
                  <span>Opening WhatsApp...</span>
                ) : (
                  <span>
                    📱 Send via WhatsApp
                  </span>
                )}
              </motion.button>
            </motion.div>
          </Step>
        </Stepper>
      </motion.div>
    </section>
  );
};

export default Contact;
