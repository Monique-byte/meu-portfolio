import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Calendar, Eye } from 'lucide-react';

const CertificateCard = ({ title, issuer, date, image }) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      <motion.div 
        className="project-card d-flex flex-column h-100" 
        whileHover={{ y: -5 }}
      >
        <div className="project-thumbnail" style={{ height: '180px' }}>
          <img src={image} alt={title} className="project-img" />
          <div className="card-overlay d-flex align-items-center justify-content-center">
             <button onClick={() => setShowImage(true)} className="btn-live">
                Ver Certificado <Eye size={16} className="ms-2"/>
             </button>
          </div>
        </div>
        
        <div className="p-3 d-flex flex-column flex-grow-1 card-body-glass">
          <div className="d-flex align-items-center gap-2 mb-2 text-purple-light">
             <Award size={16} />
             <span className="fw-bold small text-uppercase">{issuer}</span>
          </div>
          <h5 className="fw-bold mb-2 text-white">{title}</h5>
          <div className="mt-auto d-flex align-items-center gap-2 text-white-50 small">
             <Calendar size={14} />
             <span>{date}</span>
          </div>
        </div>
      </motion.div>

      {/* Modal Simples para Ver o Certificado em Tela Cheia */}
      <AnimatePresence>
        {showImage && (
          <div className="modal-fixed-container">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowImage(false)} className="modal-backdrop"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="position-relative z-index-1000000"
              style={{ maxWidth: '90%', maxHeight: '90%' }}
            >
              <button className="modal-close-btn" onClick={() => setShowImage(false)}>
                <X size={20} />
              </button>
              <img src={image} alt={title} style={{ width: '100%', borderRadius: '15px', boxShadow: '0 0 40px rgba(0,0,0,0.8)' }} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificateCard;