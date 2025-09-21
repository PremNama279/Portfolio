import { useEffect } from "react";
import ReactDOM from "react-dom";
import "../styles/ProjectModal.css";

const ProjectModal = ({ open, onClose, project }) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [open]);

  if (!open || !project) return null;

  const modalContent = (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-content-only">
          <h2 className="modal-title">{project.title}</h2>
          
          {project.tech && (
            <div className="modal-technologies">
              {project.tech.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          )}
          
          <p className="modal-description">{project.description}</p>
          
          <div className="modal-buttons">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="modal-btn primary">
                View Live
              </a>
            )}
            {project.source && (
              <a href={project.source} target="_blank" rel="noopener noreferrer" className="modal-btn secondary">
                View Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ProjectModal; 