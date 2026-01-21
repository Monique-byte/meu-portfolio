import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Rocket, Target, Cpu } from 'lucide-react';
import './vitrine.css';

const ProjectCard = ({ title, description, tech, linkDemo, image, details }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      <motion.div 
        className="project-card d-flex flex-column h-100" 
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="project-thumbnail">
          {image ? (
            <>
              <img src={image} alt={title} className="project-img" />
              <div className="card-overlay"></div>
            </>
          ) : (
            <div className="placeholder-overlay">Preview</div>
          )}
        </div>
        <div className="p-3 d-flex flex-column flex-grow-1 card-body-glass">
          <h4 className="fw-bold mb-1 title-gradient">{title}</h4>
          <p className="text-white-50 small mb-3">{description}</p>
          <div className="mt-auto">
            <span className="badge tech-badge mb-4">{tech}</span>
            <div className="d-flex justify-content-between align-items-center">
              <button onClick={() => setIsOpen(true)} className="btn btn-sm text-white-50 p-0 btn-details">
                Details +
              </button>
              <a href={linkDemo} target="_blank" rel="noreferrer" className="btn-live text-decoration-none">
                Acessar projeto
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="modal-fixed-container">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)} className="modal-backdrop"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="modal-glass-content"
            >
              <button className="modal-close-btn" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>

              <div className="modal-inner-scroll">
                <div className="row g-4 align-items-center">
                  <div className="col-lg-5 text-center">
                    <img src={image} alt={title} className="modal-main-img shadow-lg" />
                    <div className="mt-3 d-flex flex-wrap justify-content-center gap-2">
                      <span className="badge tech-badge">{tech}</span>
                    </div>
                    <a href={linkDemo} target="_blank" rel="noreferrer" className="btn-live w-100 mt-4 text-center text-decoration-none d-block">
                      Acessar Projeto <ExternalLink size={14} className="ms-1" />
                    </a>
                  </div>

                  <div className="col-lg-7 text-start">
                    <h2 className="fw-bold title-gradient mb-3">{title}</h2>
                    
                    {/* Renderização Dinâmica dos Detalhes */}
                    <div className="story-section mb-3">
                      <div className="d-flex align-items-center gap-2 mb-2 text-purple-light">
                        <span className="fw-bold small text-uppercase">software</span>
                      </div>
                      <p className="modal-text-description m-0">{details?.journey}</p>
                    </div>  
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;